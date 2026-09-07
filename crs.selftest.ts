/**
 * Checks the CRS tables against known scores. Run with: npx tsx crs.selftest.ts
 *
 * The point values come from a government grid, so a silent typo here would
 * quietly mislead applicants. These cases pin the boundaries: the age cliffs,
 * the with-spouse columns and their caps, the French bonus thresholds, the
 * second-language cap and the overall 1200 ceiling.
 */
import { calculateCrs, DEFAULT_INPUT, CrsInput } from "./src/data/crs";

const clb = (n: number) => ({ speaking: n, listening: n, reading: n, writing: n });
const mk = (o: Partial<CrsInput>): CrsInput => ({ ...DEFAULT_INPUT, ...o });
let fails = 0;
const eq = (name: string, got: number, want: number) => {
  const ok = got === want;
  if (!ok) fails++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}: got ${got}, want ${want}`);
};

// Everything empty
eq("empty (age 29 only)", calculateCrs(mk({ education: "none", first: clb(0) })).total, 110);

// Strong single applicant
const strong = calculateCrs(mk({
  age: 29, education: "doctoral", first: clb(10),
  canadianWorkYears: 5, foreignWorkYears: 3,
}));
eq("strong single total", strong.total, 576);
eq("  core", strong.sections[0].points, 476);
eq("  transferability", strong.sections.find(s=>s.key==="transfer")!.points, 100);

// Age boundaries
eq("age 17", calculateCrs(mk({ age: 17, education: "none", first: clb(0) })).total, 0);
eq("age 45", calculateCrs(mk({ age: 45, education: "none", first: clb(0) })).total, 0);
eq("age 44 single", calculateCrs(mk({ age: 44, education: "none", first: clb(0) })).total, 6);
eq("age 20 single", calculateCrs(mk({ age: 20, education: "none", first: clb(0) })).total, 110);

// With spouse uses the lower columns and adds spouse factors
const sp = calculateCrs(mk({
  marital: "spouse", spouseAccompanying: true,
  age: 29, education: "doctoral", first: clb(10),
  canadianWorkYears: 5, foreignWorkYears: 3,
  spouseEducation: "doctoral", spouseLanguage: clb(9), spouseCanadianWorkYears: 5,
}));
eq("with spouse core (100+140+128+70)", sp.sections[0].points, 438);
eq("with spouse factors (10+20+10)", sp.sections[1].points, 40);
eq("with spouse total", sp.total, 438 + 40 + 100);

// A spouse who is a citizen/PR or not coming scores as single
eq("spouse not accompanying = single",
  calculateCrs(mk({ marital: "spouse", spouseAccompanying: false, age: 29, education: "doctoral", first: clb(10), canadianWorkYears: 5, foreignWorkYears: 3 })).total,
  576);

// Provincial nomination
eq("PN adds 600", calculateCrs(mk({ age: 29, education: "none", first: clb(0), provincialNomination: true })).total, 710);

// French bonus
eq("french only, no english -> 25",
  calculateCrs(mk({ age: 29, education: "none", firstLanguage: "french", first: clb(7), hasSecond: false })).total,
  110 + (17*4) + 25);
eq("french + english CLB5 -> 50",
  calculateCrs(mk({ age: 29, education: "none", firstLanguage: "french", first: clb(7), hasSecond: true, second: clb(5) })).total,
  110 + (17*4) + 4 + 50);

// Second language cap
eq("second language capped at 24",
  calculateCrs(mk({ age: 29, education: "none", first: clb(0), hasSecond: true, second: clb(10) })).sections[0].rows[3].points, 24);

// Certificate of qualification
eq("cert + CLB7 = 50", calculateCrs(mk({ age: 29, education: "none", first: clb(7), certificateOfQualification: true })).sections.find(s=>s.key==="transfer")!.points, 50);
eq("cert + CLB5 = 25", calculateCrs(mk({ age: 29, education: "none", first: clb(5), certificateOfQualification: true })).sections.find(s=>s.key==="transfer")!.points, 25);

// Overall cap
eq("capped at 1200", calculateCrs(mk({
  age: 20, education: "doctoral", firstLanguage: "french", first: clb(10),
  hasSecond: true, second: clb(10), canadianWorkYears: 5, foreignWorkYears: 3,
  certificateOfQualification: true, siblingInCanada: true,
  canadianEducation: "three-plus", provincialNomination: true,
})).total, 1200);

console.log(fails ? `\n${fails} FAILING` : "\nAll passed");
process.exit(fails ? 1 : 0);
