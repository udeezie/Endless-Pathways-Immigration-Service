/**
 * Comprehensive Ranking System scoring.
 *
 * Every table here is transcribed from IRCC's published CRS grid
 * (canada.ca -> Express Entry -> Comprehensive Ranking System criteria).
 * Nothing is estimated. If IRCC changes the grid, change it here — the UI
 * reads these tables and holds no numbers of its own.
 *
 * One thing worth knowing when comparing against older calculators: IRCC
 * removed the arranged-employment points (formerly 50 or 200 for a valid job
 * offer) in March 2025. A job offer now contributes nothing to CRS, so there
 * is deliberately no job-offer factor below. Calculators that still award it
 * overstate scores by up to 200 points.
 */

export type Marital = "single" | "spouse";

/** Which column of the grid applies: with or without an accompanying spouse. */
export type Column = "with" | "without";

export type EducationLevel =
  | "none"
  | "secondary"
  | "one-year"
  | "two-year"
  | "bachelor"
  | "two-or-more"
  | "masters"
  | "doctoral";

export interface Abilities {
  speaking: number;
  listening: number;
  reading: number;
  writing: number;
}

export const ABILITY_KEYS: (keyof Abilities)[] = [
  "speaking",
  "listening",
  "reading",
  "writing",
];

export interface CrsInput {
  marital: Marital;
  /** A spouse who is already a citizen or PR, or who is not coming, scores as single. */
  spouseAccompanying: boolean;
  /** 17 and under scores 0; 45 and over scores 0. */
  age: number;
  education: EducationLevel;
  firstLanguage: "english" | "french";
  first: Abilities;
  hasSecond: boolean;
  second: Abilities;
  canadianWorkYears: number; // 0-5, where 5 means "5 or more"
  foreignWorkYears: number; // 0, 1 (1-2), 3 (3 or more)
  certificateOfQualification: boolean;
  spouseEducation: EducationLevel;
  spouseLanguage: Abilities;
  spouseCanadianWorkYears: number;
  siblingInCanada: boolean;
  canadianEducation: "none" | "one-two" | "three-plus";
  provincialNomination: boolean;
}

export const EMPTY_ABILITIES: Abilities = {
  speaking: 0,
  listening: 0,
  reading: 0,
  writing: 0,
};

export const DEFAULT_INPUT: CrsInput = {
  marital: "single",
  spouseAccompanying: true,
  age: 29,
  education: "bachelor",
  firstLanguage: "english",
  first: { ...EMPTY_ABILITIES },
  hasSecond: false,
  second: { ...EMPTY_ABILITIES },
  canadianWorkYears: 0,
  foreignWorkYears: 0,
  certificateOfQualification: false,
  spouseEducation: "none",
  spouseLanguage: { ...EMPTY_ABILITIES },
  spouseCanadianWorkYears: 0,
  siblingInCanada: false,
  canadianEducation: "none",
  provincialNomination: false,
};

// A. Core / human capital -----------------------------------------------------

/** Indexed by age in years; 17 and under and 45 and over both score nothing. */
const AGE_POINTS: Record<number, [number, number]> = {
  // age: [with spouse, without spouse]
  18: [90, 99],
  19: [95, 105],
  20: [100, 110],
  21: [100, 110],
  22: [100, 110],
  23: [100, 110],
  24: [100, 110],
  25: [100, 110],
  26: [100, 110],
  27: [100, 110],
  28: [100, 110],
  29: [100, 110],
  30: [95, 105],
  31: [90, 99],
  32: [85, 94],
  33: [80, 88],
  34: [75, 83],
  35: [70, 77],
  36: [65, 72],
  37: [60, 66],
  38: [55, 61],
  39: [50, 55],
  40: [45, 50],
  41: [35, 39],
  42: [25, 28],
  43: [15, 17],
  44: [5, 6],
};

const EDUCATION_POINTS: Record<EducationLevel, [number, number]> = {
  none: [0, 0],
  secondary: [28, 30],
  "one-year": [84, 90],
  "two-year": [91, 98],
  bachelor: [112, 120],
  "two-or-more": [119, 128],
  masters: [126, 135],
  doctoral: [140, 150],
};

/** First official language, points per ability. */
const FIRST_LANG_POINTS: [number, number, number][] = [
  // [minimum CLB, with spouse, without spouse]
  [10, 32, 34],
  [9, 29, 31],
  [8, 22, 23],
  [7, 16, 17],
  [6, 8, 9],
  [4, 6, 6],
];

/** Second official language, points per ability. */
const SECOND_LANG_POINTS: [number, number][] = [
  // [minimum CLB, points per ability]
  [9, 6],
  [7, 3],
  [5, 1],
];

const CANADIAN_WORK_POINTS: [number, number][] = [
  // index = years, [with spouse, without spouse]
  [0, 0],
  [35, 40],
  [46, 53],
  [56, 64],
  [63, 72],
  [70, 80],
];

// B. Spouse factors -----------------------------------------------------------

const SPOUSE_EDUCATION_POINTS: Record<EducationLevel, number> = {
  none: 0,
  secondary: 2,
  "one-year": 6,
  "two-year": 7,
  bachelor: 8,
  "two-or-more": 9,
  masters: 10,
  doctoral: 10,
};

/** Spouse first official language, points per ability (max 5 each, 20 total). */
const SPOUSE_LANG_POINTS: [number, number][] = [
  [9, 5],
  [7, 3],
  [5, 1],
];

const SPOUSE_WORK_POINTS = [0, 5, 7, 8, 9, 10];

// C. Skill transferability ----------------------------------------------------

/**
 * Education tiers used by the transferability tables. Secondary and below earn
 * nothing; a single post-secondary credential of a year or more sits in the
 * lower tier; everything from two-or-more credentials upward sits in the higher.
 */
const eduTier = (e: EducationLevel): 0 | 1 | 2 => {
  if (e === "none" || e === "secondary") return 0;
  if (e === "one-year" || e === "two-year" || e === "bachelor") return 1;
  return 2;
};

// D. Additional points --------------------------------------------------------

const CANADIAN_EDUCATION_POINTS = {
  none: 0,
  "one-two": 15,
  "three-plus": 30,
};

// Scoring ---------------------------------------------------------------------

const min = (a: Abilities) =>
  Math.min(a.speaking, a.listening, a.reading, a.writing);

const lookup = (table: [number, number][], clb: number) => {
  for (const [threshold, points] of table) if (clb >= threshold) return points;
  return 0;
};

export interface CrsBreakdownRow {
  label: string;
  points: number;
  max: number;
  detail?: string;
}

export interface CrsSection {
  key: string;
  title: string;
  points: number;
  max: number;
  rows: CrsBreakdownRow[];
}

export interface CrsResult {
  total: number;
  column: Column;
  sections: CrsSection[];
}

export const MAX_SCORE = 1200;

export function calculateCrs(input: CrsInput): CrsResult {
  // A spouse only changes the grid if they are actually coming along and are
  // not already a citizen or PR. Otherwise the single columns apply and the
  // spouse factors are skipped entirely.
  const withSpouse = input.marital === "spouse" && input.spouseAccompanying;
  const column: Column = withSpouse ? "with" : "without";
  const col = withSpouse ? 0 : 1;

  // A. Core / human capital
  const agePoints = AGE_POINTS[Math.floor(input.age)]?.[col] ?? 0;
  const educationPoints = EDUCATION_POINTS[input.education][col];

  const firstClb = min(input.first);
  const firstPoints = ABILITY_KEYS.reduce((sum, k) => {
    const clb = input.first[k];
    for (const [threshold, w, wo] of FIRST_LANG_POINTS) {
      if (clb >= threshold) return sum + (withSpouse ? w : wo);
    }
    return sum;
  }, 0);

  const secondPoints = input.hasSecond
    ? Math.min(
        withSpouse ? 22 : 24,
        ABILITY_KEYS.reduce(
          (sum, k) => sum + lookup(SECOND_LANG_POINTS, input.second[k]),
          0,
        ),
      )
    : 0;

  const canadianWork = Math.min(5, Math.max(0, input.canadianWorkYears));
  const canadianWorkPoints = CANADIAN_WORK_POINTS[canadianWork][col];

  const coreMax = withSpouse ? 460 : 500;
  const coreRaw =
    agePoints +
    educationPoints +
    firstPoints +
    secondPoints +
    canadianWorkPoints;
  const corePoints = Math.min(coreMax, coreRaw);

  // B. Spouse factors
  let spousePoints = 0;
  const spouseRows: CrsBreakdownRow[] = [];
  if (withSpouse) {
    const sEdu = SPOUSE_EDUCATION_POINTS[input.spouseEducation];
    const sLang = Math.min(
      20,
      ABILITY_KEYS.reduce(
        (sum, k) => sum + lookup(SPOUSE_LANG_POINTS, input.spouseLanguage[k]),
        0,
      ),
    );
    const sWork =
      SPOUSE_WORK_POINTS[Math.min(5, Math.max(0, input.spouseCanadianWorkYears))];
    spousePoints = Math.min(40, sEdu + sLang + sWork);
    spouseRows.push(
      { label: "Spouse's level of education", points: sEdu, max: 10 },
      { label: "Spouse's language ability", points: sLang, max: 20 },
      { label: "Spouse's Canadian work experience", points: sWork, max: 10 },
    );
  }

  // C. Skill transferability
  const tier = eduTier(input.education);
  const strongLang = firstClb >= 9; // CLB 9+ across all four abilities
  const goodLang = firstClb >= 7;

  const eduLang = tier === 0 ? 0 : tier === 1 ? (strongLang ? 25 : goodLang ? 13 : 0) : strongLang ? 50 : goodLang ? 25 : 0;

  const eduWork =
    tier === 0
      ? 0
      : tier === 1
        ? canadianWork >= 2
          ? 25
          : canadianWork === 1
            ? 13
            : 0
        : canadianWork >= 2
          ? 50
          : canadianWork === 1
            ? 25
            : 0;

  const educationTransfer = Math.min(50, eduLang + eduWork);

  const foreign = input.foreignWorkYears;
  const foreignTier = foreign >= 3 ? 2 : foreign >= 1 ? 1 : 0;

  const foreignLang =
    foreignTier === 0
      ? 0
      : foreignTier === 1
        ? strongLang
          ? 25
          : goodLang
            ? 13
            : 0
        : strongLang
          ? 50
          : goodLang
            ? 25
            : 0;

  const foreignWork =
    foreignTier === 0
      ? 0
      : foreignTier === 1
        ? canadianWork >= 2
          ? 25
          : canadianWork === 1
            ? 13
            : 0
        : canadianWork >= 2
          ? 50
          : canadianWork === 1
            ? 25
            : 0;

  const foreignTransfer = Math.min(50, foreignLang + foreignWork);

  const certificateTransfer = input.certificateOfQualification
    ? firstClb >= 7
      ? 50
      : firstClb >= 5
        ? 25
        : 0
    : 0;

  const transferPoints = Math.min(
    100,
    educationTransfer + foreignTransfer + certificateTransfer,
  );

  // D. Additional points
  const sibling = input.siblingInCanada ? 15 : 0;

  // French bonus depends on both languages, whichever slot each sits in.
  const french =
    input.firstLanguage === "french"
      ? input.first
      : input.hasSecond
        ? input.second
        : EMPTY_ABILITIES;
  const english =
    input.firstLanguage === "english"
      ? input.first
      : input.hasSecond
        ? input.second
        : EMPTY_ABILITIES;

  const frenchPoints =
    min(french) >= 7 ? (min(english) >= 5 ? 50 : 25) : 0;

  const canadianEducationPoints =
    CANADIAN_EDUCATION_POINTS[input.canadianEducation];
  const nomination = input.provincialNomination ? 600 : 0;

  const additionalPoints = Math.min(
    600,
    sibling + frenchPoints + canadianEducationPoints + nomination,
  );

  const total = Math.min(
    MAX_SCORE,
    corePoints + spousePoints + transferPoints + additionalPoints,
  );

  const sections: CrsSection[] = [
    {
      key: "core",
      title: "Core / human capital",
      points: corePoints,
      max: coreMax,
      rows: [
        { label: "Age", points: agePoints, max: withSpouse ? 100 : 110 },
        {
          label: "Level of education",
          points: educationPoints,
          max: withSpouse ? 140 : 150,
        },
        {
          label: "First official language",
          points: firstPoints,
          max: withSpouse ? 128 : 136,
        },
        {
          label: "Second official language",
          points: secondPoints,
          max: withSpouse ? 22 : 24,
        },
        {
          label: "Canadian work experience",
          points: canadianWorkPoints,
          max: withSpouse ? 70 : 80,
        },
      ],
    },
    {
      key: "spouse",
      title: "Spouse or common-law partner",
      points: spousePoints,
      max: 40,
      rows: spouseRows,
    },
    {
      key: "transfer",
      title: "Skill transferability",
      points: transferPoints,
      max: 100,
      rows: [
        { label: "Education with language or Canadian work", points: educationTransfer, max: 50 },
        { label: "Foreign work with language or Canadian work", points: foreignTransfer, max: 50 },
        { label: "Certificate of qualification with language", points: certificateTransfer, max: 50 },
      ],
    },
    {
      key: "additional",
      title: "Additional points",
      points: additionalPoints,
      max: 600,
      rows: [
        { label: "Provincial or territorial nomination", points: nomination, max: 600 },
        { label: "French language ability", points: frenchPoints, max: 50 },
        { label: "Post-secondary education in Canada", points: canadianEducationPoints, max: 30 },
        { label: "Sibling in Canada", points: sibling, max: 15 },
      ],
    },
  ];

  return { total, column, sections: sections.filter((s) => s.rows.length) };
}

/**
 * CLB equivalents for the two English tests IRCC accepts. CELPIP maps one to
 * one, so only IELTS needs a table. Shown as a helper beside the CLB inputs
 * because most applicants know their test scores, not their benchmark level.
 */
export const IELTS_TO_CLB: { clb: number; listening: string; reading: string; writing: string; speaking: string }[] = [
  { clb: 10, listening: "8.5–9.0", reading: "8.0–9.0", writing: "7.5–9.0", speaking: "7.5–9.0" },
  { clb: 9, listening: "8.0", reading: "7.0–7.5", writing: "7.0", speaking: "7.0" },
  { clb: 8, listening: "7.5", reading: "6.5", writing: "6.5", speaking: "6.5" },
  { clb: 7, listening: "6.0–7.0", reading: "6.0", writing: "6.0", speaking: "6.0" },
  { clb: 6, listening: "5.5", reading: "5.0–5.5", writing: "5.5", speaking: "5.5" },
  { clb: 5, listening: "5.0", reading: "4.0–4.5", writing: "5.0", speaking: "5.0" },
  { clb: 4, listening: "4.5", reading: "3.5", writing: "4.0", speaking: "4.0" },
];

export const EDUCATION_OPTIONS: { value: EducationLevel; label: string }[] = [
  { value: "none", label: "Less than secondary school" },
  { value: "secondary", label: "Secondary diploma (high school)" },
  { value: "one-year", label: "One-year post-secondary credential" },
  { value: "two-year", label: "Two-year post-secondary credential" },
  { value: "bachelor", label: "Bachelor's degree or three-year credential" },
  { value: "two-or-more", label: "Two or more credentials, one of three years or more" },
  { value: "masters", label: "Master's or professional degree" },
  { value: "doctoral", label: "Doctoral degree (PhD)" },
];
