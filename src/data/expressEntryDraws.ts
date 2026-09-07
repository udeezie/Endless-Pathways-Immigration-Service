/**
 * Recent Express Entry rounds of invitations.
 *
 * Transcribed from IRCC's published table of rounds:
 * canada.ca -> Ministerial instructions respecting invitations to apply for
 * permanent residence under the Express Entry system.
 *
 * This is a record of draws that have already happened, not a prediction and
 * not a threshold to aim at. Cut-offs move every round and depend on which
 * category is drawn, so nothing on the site should present these as a target.
 *
 * To update: add new rounds to the top of the list and change DRAWS_UPDATED to
 * the date you checked. The strip prints that date, so a stale list announces
 * itself rather than passing as current.
 */

export interface ExpressEntryDraw {
  round: number;
  date: string;
  type: string;
  invitations: number;
  lowestCrs: number;
}

export const DRAWS_UPDATED = "September 6, 2026";

export const DRAWS_SOURCE =
  "https://www.canada.ca/en/immigration-refugees-citizenship/corporate/mandate/policies-operational-instructions-agreements/ministerial-instructions/express-entry-rounds.html";

export const expressEntryDraws: ExpressEntryDraw[] = [
  {
    round: 441,
    date: "September 4, 2026",
    type: "Healthcare and social services occupations",
    invitations: 3500,
    lowestCrs: 475,
  },
  {
    round: 440,
    date: "September 3, 2026",
    type: "Physicians with Canadian work experience",
    invitations: 229,
    lowestCrs: 198,
  },
  {
    round: 439,
    date: "September 1, 2026",
    type: "Canadian Experience Class",
    invitations: 2000,
    lowestCrs: 521,
  },
  {
    round: 438,
    date: "August 31, 2026",
    type: "Provincial Nominee Program",
    invitations: 562,
    lowestCrs: 697,
  },
  {
    round: 437,
    date: "August 19, 2026",
    type: "French-language proficiency",
    invitations: 5000,
    lowestCrs: 382,
  },
  {
    round: 436,
    date: "August 18, 2026",
    type: "Canadian Experience Class",
    invitations: 1000,
    lowestCrs: 523,
  },
  {
    round: 435,
    date: "August 17, 2026",
    type: "Provincial Nominee Program",
    invitations: 442,
    lowestCrs: 760,
  },
  {
    round: 434,
    date: "August 7, 2026",
    type: "Transport occupations",
    invitations: 300,
    lowestCrs: 470,
  },
];
