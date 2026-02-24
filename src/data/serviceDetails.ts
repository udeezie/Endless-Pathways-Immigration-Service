export interface ServiceDetail {
  id: string;
  title: string;
  heroText: string;
  hookParagraph?: string;
  sections: {
    heading: string;
    content: (string | string[])[];
  }[];
  policyAlert?: {
    title: string;
    description: string;
    effectiveDate: string;
  };
  comparisonTable?: {
    title: string;
    headers: string[];
    rows: string[][];
  };
  feeBreakdown?: {
    items: { description: string; amount: string }[];
    total: string;
  };
  processingTime?: {
    insideCanada?: string;
    outsideCanada?: string;
    note?: string;
  };
  refusalReasons?: {
    reason: string;
    solution: string;
  }[];
  howWeHelp: {
    intro: string;
    points?: string[];
    ctaText: string;
  };
  faqs: { q: string; a: string }[];
  relatedServices?: string[];
}

export const serviceDetails: Record<string, ServiceDetail> = {
  "temporary-resident-visa": {
    id: "temporary-resident-visa",
    title: "Temporary Resident Visa",
    heroText:
      "Travel to Canada for visiting family, tourism or business purposes from visa required countries.",
    hookParagraph:
      "Nearly 40 percent of TRV applications are refused because applicants fail to convincingly demonstrate they will return home. We help you present a clear, credible case that addresses the officer's key concerns.",
    sections: [
      {
        heading: "Definition",
        content: [
          "A Temporary Resident Visa is an official counterfoil issued by Immigration, Refugees and Citizenship Canada that allows foreign nationals from visa required countries to travel to Canada for a temporary purpose. It does not guarantee entry; final admissibility is determined by a border officer at the port of entry.",
        ],
      },
      {
        heading: "Eligibility Criteria",
        content: [
          "Applicants must satisfy an officer that they:",
          [
            "Will leave Canada at the end of their authorized stay",
            "Have sufficient financial resources for their stay and return transportation",
            "Maintain strong ties to their home country (employment, family, property)",
            "Have no criminal inadmissibility concerns",
            "Hold a valid travel document",
          ],
        ],
      },
      {
        heading: "Application Process",
        content: [
          [
            "Determine if you need a visa and identify the responsible visa office.",
            "Gather all required documents.",
            "Complete the application forms and pay the government fee.",
            "Submit biometrics (fingerprints and photograph).",
            "Await a decision. Processing times vary by country.",
          ],
        ],
      },
      {
        heading: "Required Documents",
        content: [
          [
            "Valid passport",
            "Recent passport sized photographs",
            "Proof of financial means (bank statements, employment letter, pay stubs)",
            "Travel itinerary or explanation of purpose of visit",
            "Invitation letter from a Canadian host (if applicable)",
            "Family information form",
            "Biometrics fee receipt",
          ],
        ],
      },
      {
        heading: "Validity and Fees",
        content: [
          "Validity is at the discretion of the visa officer.",
          "Government fee: CAD $100 per person.",
        ],
      },
    ],
    policyAlert: {
      title: "No major policy changes in 2026",
      description:
        "TRV eligibility and processing remain stable. Biometrics are now strictly enforced for all applicants aged 14 to 79.",
      effectiveDate: "Ongoing",
    },
    feeBreakdown: {
      items: [
        { description: "Visa application fee", amount: "$100" },
        { description: "Biometrics fee", amount: "$85" },
      ],
      total: "$185 CAD",
    },
    processingTime: {
      insideCanada: "Updated weekly by IRCC; current estimate is 15 days.",
      outsideCanada: "15 to 90 days (varies by country)",
      note: "Processing times are estimates; incomplete applications cause significant delays.",
    },
    refusalReasons: [
      {
        reason: "Insufficient funds",
        solution:
          "Provide three to six months of bank statements, pay stubs and proof of assets. We help you calculate the exact amount IRCC expects.",
      },
      {
        reason: "Weak ties to home country",
        solution:
          "We assist you in documenting employment, family responsibilities, property ownership or ongoing studies that demonstrate your intent to return.",
      },
      {
        reason: "Unclear purpose of visit",
        solution:
          "A detailed itinerary and a well written invitation letter are essential. We review and strengthen your explanation.",
      },
      {
        reason: "Past immigration violations",
        solution:
          "We help you prepare a sincere explanation and, if necessary, apply for restoration or an Authorization to Return to Canada.",
      },
      {
        reason: "Inadmissibility concerns",
        solution:
          "Criminal inadmissibility may require separate remedies such as a Temporary Resident Permit or rehabilitation. We assess your situation and guide you.",
      },
    ],
    howWeHelp: {
      intro:
        "We help clients navigate this highly discretionary process with precision and care.",
      points: [
        "Assess your eligibility and identify potential risks before you apply.",
        "Prepare clear, well documented applications that demonstrate genuine temporary intent.",
        "Reduce the likelihood of refusal and protect your immigration history.",
      ],
      ctaText: "Book a consultation for your TRV application",
    },
    faqs: [
      {
        q: "Can I work in Canada with a TRV?",
        a: "No, a TRV does not permit work. You need a valid work permit.",
      },
      {
        q: "What is the difference between a TRV and an eTA?",
        a: "A TRV is for nationals of visa required countries; an eTA is for visa exempt nationals flying to Canada.",
      },
      {
        q: "How long can I stay in Canada with a TRV?",
        a: "Usually up to six months per visit. The border officer determines the exact period and may impose conditions.",
      },
      {
        q: "Can I extend my stay as a visitor?",
        a: "Yes, you must apply for a Visitor Record before your current status expires.",
      },
      {
        q: "Do children need a TRV?",
        a: "Yes, every foreign national from a visa required country needs their own visa, regardless of age.",
      },
    ],
    relatedServices: ["eta", "super-visa", "visitor-record"],
  },

  eta: {
    id: "eta",
    title: "Electronic Travel Authorization",
    heroText:
      "Mandatory travel authorization for visa exempt nationals flying to or transiting through Canada.",
    hookParagraph:
      "An eTA is a quick online prescreening, yet thousands of travellers are delayed or denied boarding each year because of simple errors or overlooked admissibility issues. We ensure your application is flawless.",
    sections: [
      {
        heading: "Definition",
        content: [
          "An Electronic Travel Authorization is a mandatory entry requirement for visa exempt foreign nationals who travel by air to or through Canada. It is electronically linked to your passport and valid for up to five years or until your passport expires.",
        ],
      },
      {
        heading: "Eligibility",
        content: [
          "You may apply for an eTA if you:",
          [
            "Are a citizen of a visa exempt country",
            "Hold a valid passport",
            "Travel by air to or through Canada",
            "Are not inadmissible on criminal or immigration grounds",
          ],
        ],
      },
      {
        heading: "Application Process",
        content: [
          [
            "Complete the online form; the process takes only a few minutes.",
            "Pay the CAD $7 fee.",
            "Receive approval, usually within minutes.",
            "Your eTA is electronically linked to your passport.",
          ],
        ],
      },
      {
        heading: "Important Notes",
        content: [
          "An eTA does not guarantee entry; the final decision is made by a border officer.",
          "If your passport expires, you must obtain a new eTA.",
          "United States citizens do not need an eTA.",
        ],
      },
    ],
    policyAlert: {
      title: "No recent changes",
      description:
        "eTA requirements remain stable. Applicants with minor criminal inadmissibility may still be approved; we help you determine whether you should apply or seek a Temporary Resident Permit.",
      effectiveDate: "Current",
    },
    feeBreakdown: {
      items: [{ description: "eTA application fee", amount: "$7" }],
      total: "$7 CAD",
    },
    processingTime: {
      insideCanada: "Not applicable",
      outsideCanada: "Minutes to a few days",
      note: "Most applications are approved instantly; some are referred for manual review, which can take up to 72 hours.",
    },
    refusalReasons: [
      {
        reason: "Criminal inadmissibility",
        solution:
          "An eTA may be refused if you have a DUI or other criminal record. You may need a Temporary Resident Permit. We assess your case and advise on the best path.",
      },
      {
        reason: "Incomplete or incorrect information",
        solution:
          "Even a minor typographical error can trigger a refusal. We review your application before submission to ensure accuracy.",
      },
    ],
    howWeHelp: {
      intro:
        "We assist clients in determining eTA eligibility, addressing potential admissibility concerns and submitting accurate applications.",
      points: [
        "Help you avoid delays, refusals or travel disruptions.",
        "Ensure your application is error free and complete.",
      ],
      ctaText: "Get help with your eTA application",
    },
    faqs: [
      {
        q: "Do I need an eTA if I am a United States citizen?",
        a: "No, United States citizens do not need an eTA or visa to travel to Canada, but they must carry proper identification.",
      },
      {
        q: "Can I apply for an eTA if I have a criminal record?",
        a: "You may be inadmissible. Contact us for a confidential assessment.",
      },
      {
        q: "How long is an eTA valid?",
        a: "Up to five years or until your passport expires, whichever comes first.",
      },
      {
        q: "Can I work or study with an eTA?",
        a: "No, an eTA only authorizes travel. You need a separate work or study permit.",
      },
    ],
    relatedServices: ["temporary-resident-visa", "temporary-resident-permit"],
  },

  "super-visa": {
    id: "super-visa",
    title: "Parent and Grandparent Super Visa",
    heroText:
      "Long term visitor visa allowing parents and grandparents to stay in Canada for up to five years at a time.",
    hookParagraph:
      "The Super Visa allows parents and grandparents to visit for up to five years per stay, valid for ten years. Strict income, insurance and medical requirements must be met. We help families navigate every detail.",
    sections: [
      {
        heading: "Definition",
        content: [
          "The Parent and Grandparent Super Visa is a special visa that allows parents and grandparents of Canadian citizens or permanent residents to visit Canada for extended periods of up to five years per entry, with multiple entries possible over a ten year validity period.",
        ],
      },
      {
        heading: "Eligibility Requirements",
        content: [
          "To be eligible, you must:",
          [
            "Be the parent or grandparent of a Canadian citizen or permanent resident",
            "Have a written commitment of financial support from your child or grandchild in Canada",
            "Have a child or grandchild who meets the minimum necessary income threshold",
            "Purchase Canadian private medical insurance for at least one year",
            "Undergo an immigration medical examination",
            "Be admissible to Canada",
          ],
        ],
      },
      {
        heading: "Required Documents",
        content: [
          [
            "Proof of relationship (birth certificate etc.)",
            "Invitation letter from your child or grandchild",
            "Child or grandchild's proof of Canadian status",
            "Child or grandchild's recent Notice of Assessment",
            "Proof of private medical insurance",
            "Medical examination receipt",
            "Valid passport",
          ],
        ],
      },
      {
        heading: "Validity and Fees",
        content: [
          "Validity: up to 10 years. Maximum stay per entry: five years.",
          "Processing times vary by country of application.",
        ],
      },
    ],
    policyAlert: {
      title: "No changes in 2026",
      description:
        "The Super Visa program continues unchanged. The income requirement is updated annually based on the Low Income Cut Off; we help you confirm that you meet the threshold.",
      effectiveDate: "Annual update each January",
    },
    feeBreakdown: {
      items: [
        { description: "Super Visa application fee", amount: "$100" },
        { description: "Biometrics fee", amount: "$85" },
        {
          description: "Medical examination",
          amount: "Varies (paid directly to panel physician)",
        },
      ],
      total: "$185 plus medical examination",
    },
    processingTime: {
      insideCanada: "Not applicable",
      outsideCanada: "100 to 200 days",
      note: "Processing times vary by country; applications from certain regions may take longer.",
    },
    refusalReasons: [
      {
        reason: "Child or grandchild does not meet the income requirement",
        solution:
          "We calculate the exact Low Income Cut Off based on family size and advise on available options, such as a cosigner, waiting period or applying for a regular visitor visa.",
      },
      {
        reason: "Insufficient or invalid medical insurance",
        solution:
          "We help you find CICC compliant insurance providers and verify that the policy meets IRCC's minimum coverage of CAD $100,000 and duration of one year.",
      },
      {
        reason: "Weak ties to home country",
        solution:
          "Even Super Visa applicants must demonstrate they will leave Canada at the end of their authorized stay. We help document property, employment or family responsibilities abroad.",
      },
    ],
    howWeHelp: {
      intro:
        "We help families navigate the Super Visa requirements with confidence and care.",
      points: [
        "Assess eligibility and prepare compliant invitation and financial documents.",
        "Guide you through medical insurance and medical examination requirements.",
        "Submit well structured applications to support long term family reunification.",
      ],
      ctaText: "Start your Super Visa application",
    },
    faqs: [
      {
        q: "What is the income requirement for 2026?",
        a: "The Low Income Cut Off is updated annually. We calculate your exact requirement based on your family size.",
      },
      {
        q: "Can I apply for the Super Visa if my parent is already in Canada?",
        a: "No, the Super Visa must be applied for outside Canada. If your parent is already visiting, consider a Visitor Record extension instead.",
      },
      {
        q: "Is the Super Visa better than the Parent and Grandparent Sponsorship Program?",
        a: "They serve different purposes. The Super Visa is for temporary visits; sponsorship leads to permanent residence. Many families use the Super Visa while waiting for sponsorship.",
      },
      {
        q: "Do I need to buy insurance for the full five years?",
        a: "No, you only need to purchase one year of coverage at a time. You may renew annually while your parent is in Canada.",
      },
    ],
    relatedServices: ["family-class", "visitor-record"],
  },

  "visitor-record": {
    id: "visitor-record",
    title: "Visitor Record",
    heroText:
      "Extend your authorized stay in Canada or restore your status as a visitor.",
    hookParagraph:
      "Life happens: flights are cancelled, family emergencies arise or you simply wish to stay longer. A Visitor Record lets you extend your stay legally, preserving your immigration history and avoiding the serious consequences of overstaying.",
    sections: [
      {
        heading: "Definition",
        content: [
          "A Visitor Record is an official document issued by IRCC that allows a foreign national to extend their authorized stay in Canada or change their status to visitor from another temporary category. Unlike a visa, it does not permit reentry; it only confirms the conditions of your stay and the date by which you must leave.",
        ],
      },
      {
        heading: "When You Need a Visitor Record",
        content: [
          [
            "You are a visitor and wish to stay longer than six months.",
            "You are a worker or student and wish to remain in Canada as a visitor after your status expires.",
            "You need to restore your visitor status after an overstay.",
          ],
        ],
      },
      {
        heading: "Application Requirements",
        content: [
          "You must apply before your current status expires. You must demonstrate:",
          [
            "Sufficient funds to support your extended stay",
            "Ties to your home country",
            "Purpose of extension",
            "Compliance with previous immigration conditions",
          ],
        ],
      },
    ],
    policyAlert: {
      title: "Restoration rules unchanged",
      description:
        "You have 90 days from the loss of status to apply for restoration. After 90 days, you must leave Canada and may need an Authorization to Return to Canada.",
      effectiveDate: "Ongoing",
    },
    feeBreakdown: {
      items: [{ description: "Visitor Record fee", amount: "$100" }],
      total: "$100 CAD",
    },
    processingTime: {
      insideCanada: "Three to five months (may vary)",
      outsideCanada: "Not applicable",
      note: "You may maintain status until a decision is made if you applied before your status expired.",
    },
    refusalReasons: [
      {
        reason: "Application submitted too late",
        solution:
          "We help you calculate your exact expiry date. If you are already out of status, we can assist with restoration within the 90 day window.",
      },
      {
        reason: "Insufficient funds",
        solution:
          "We help you prepare bank statements and proof of ongoing financial support.",
      },
      {
        reason: "Unclear purpose of extension",
        solution:
          "A simple, honest explanation for family visit, tourism or awaiting travel arrangements is usually sufficient. We help you articulate it clearly.",
      },
    ],
    howWeHelp: {
      intro:
        "We help clients calculate status expiry correctly and submit timely, well supported Visitor Record applications.",
      points: [
        "Ensure you maintain lawful status and avoid overstays.",
        "Assist with restoration applications if you have already lost status.",
      ],
      ctaText: "Extend your stay with confidence",
    },
    faqs: [
      {
        q: "Can I work or study with a Visitor Record?",
        a: "No, a Visitor Record only authorizes you to remain in Canada as a visitor. You may not work or study without separate permits.",
      },
      {
        q: "What happens if I overstay?",
        a: "You lose your status and must apply for restoration within 90 days. After 90 days, you must leave and may need an Authorization to Return to Canada.",
      },
      {
        q: "Can I travel outside Canada and return with a Visitor Record?",
        a: "No, a Visitor Record is not a visa. To reenter, you need a valid TRV or eTA, and a new Visitor Record may be issued at the port of entry.",
      },
    ],
    relatedServices: ["temporary-resident-visa", "temporary-resident-permit"],
  },

  "temporary-resident-permit": {
    id: "temporary-resident-permit",
    title: "Temporary Resident Permit",
    heroText:
      "Enter or remain in Canada even if you are inadmissible or out of status.",
    hookParagraph:
      "A criminal record, past deportation or serious inadmissibility does not have to be a permanent bar to Canada. A Temporary Resident Permit is a discretionary tool that allows you to enter or stay when the need outweighs the risk.",
    sections: [
      {
        heading: "Definition",
        content: [
          "A Temporary Resident Permit is a discretionary document that allows a foreign national who is otherwise inadmissible or not in compliance with Canadian immigration law to enter or remain in Canada for a limited period. It is issued when an officer determines that the need for your presence in Canada outweighs the health or safety risks.",
        ],
      },
      {
        heading: "Who Needs a TRP?",
        content: [
          [
            "Individuals with criminal inadmissibility",
            "Those who have previously been deported or removed",
            "People who have misrepresented themselves",
            "Individuals with serious medical conditions that make them inadmissible",
            "Those who have overstayed their visa and are not eligible for restoration",
          ],
        ],
      },
      {
        heading: "Key Considerations",
        content: [
          [
            "TRPs are issued for a specific period and may include conditions.",
            "They do not guarantee reentry; a new TRP is required each time you travel.",
            "You must apply from outside Canada if seeking entry, or from inside Canada if you are already here.",
          ],
        ],
      },
    ],
    policyAlert: {
      title: "Stricter scrutiny in 2026",
      description:
        "IRCC has signalled increased scrutiny of TRPs for serious criminality. Comprehensive documentation and strong justification are more critical than ever.",
      effectiveDate: "2026",
    },
    feeBreakdown: {
      items: [
        { description: "TRP fee", amount: "$200" },
        { description: "Biometrics fee", amount: "$85" },
      ],
      total: "$285 CAD",
    },
    processingTime: {
      insideCanada: "Three to six months",
      outsideCanada: "Four to eight months (varies by visa office)",
      note: "Processing times depend on complexity and the need for background checks.",
    },
    refusalReasons: [
      {
        reason:
          "Insufficient justification: officer unconvinced that need outweighs risk",
        solution:
          "We help you articulate compelling reasons: family reunification, employment, medical treatment or other significant benefits to Canada.",
      },
      {
        reason: "Incomplete or missing rehabilitation evidence",
        solution:
          "We guide you in gathering court documents, probation records, character references and evidence of rehabilitation.",
      },
    ],
    howWeHelp: {
      intro:
        "We assist clients by assessing admissibility issues, identifying compelling factors and preparing persuasive TRP submissions.",
      points: [
        "Present the strongest possible case to an immigration officer.",
        "Guide you through the complex documentation and legal arguments.",
      ],
      ctaText: "Discuss your TRP options",
    },
    faqs: [
      {
        q: "How long is a TRP valid?",
        a: "It can be issued for days, months or up to three years. Validity is at the officer's discretion based on the purpose of the permit.",
      },
      {
        q: "Can I work or study with a TRP?",
        a: "Only if specifically authorized on the permit. You may request work or study conditions in your application.",
      },
      {
        q: "What is the difference between a TRP and criminal rehabilitation?",
        a: "A TRP is temporary; rehabilitation permanently removes the inadmissibility. Rehabilitation is only available after enough time has passed (five or ten years, depending on the offence).",
      },
    ],
    relatedServices: ["admissibility-issues", "removal-orders-enforcement"],
  },

  "study-permit": {
    id: "study-permit",
    title: "Study Permit",
    heroText:
      "Authorization for international students to pursue education at designated Canadian institutions.",
    hookParagraph:
      "Canada welcomes more than 800,000 international students each year, but study permit refusals are at an all time high. The difference between approval and refusal often comes down to how convincingly you demonstrate genuine study intent and financial capacity.",
    sections: [
      {
        heading: "Definition",
        content: [
          "A Study Permit is a document issued by IRCC that allows foreign nationals to study at a designated learning institution in Canada. It is typically valid for the length of your study program, plus an extra 90 days.",
        ],
      },
      {
        heading: "Eligibility",
        content: [
          "To be eligible, you must:",
          [
            "Have an acceptance letter from a designated learning institution",
            "Prove sufficient financial resources for tuition, living expenses and return transportation",
            "Have no criminal record (a police certificate may be required)",
            "Be in good health (a medical examination may be required)",
            "Satisfy an officer that you will leave Canada after your studies",
          ],
        ],
      },
      {
        heading: "Working While Studying",
        content: [
          "Eligible students may work:",
          [
            "On campus without a work permit",
            "Off campus up to 24 hours per week during academic sessions, and full time during scheduled breaks",
            "In co-op or internship placements if work is an essential part of your program",
          ],
        ],
      },
      {
        heading: "Pathway to Permanent Residence",
        content: [
          "After graduation, you may be eligible for:",
          [
            "A Post Graduation Work Permit to gain Canadian work experience",
            "The Canadian Experience Class for permanent residence",
            "Provincial Nominee Programs, many of which have international graduate streams",
          ],
        ],
      },
    ],
    policyAlert: {
      title: "2025 cost of living requirement",
      description:
        "As of 2024, the cost of living requirement for study permit applicants increased to CAD $20,635, plus first year tuition. This applies to all new applications.",
      effectiveDate: "2024 (ongoing)",
    },
    feeBreakdown: {
      items: [
        { description: "Study permit fee", amount: "$150" },
        { description: "Biometrics fee", amount: "$85" },
      ],
      total: "$235 CAD",
    },
    processingTime: {
      insideCanada: "Three to five weeks (extension)",
      outsideCanada: "Eight to fifteen weeks (varies by country)",
      note: "The Student Direct Stream offers faster processing for applicants from 14 countries.",
    },
    refusalReasons: [
      {
        reason: "Genuine study intent not convincingly demonstrated",
        solution:
          "We help you articulate a logical connection between your chosen program, your academic background and your future career goals; a key factor officers evaluate.",
      },
      {
        reason: "Insufficient financial proof",
        solution:
          "We calculate the exact funds required (tuition plus living expenses plus travel) and help you present bank statements, education loans or scholarship letters in a clear, IRCC friendly format.",
      },
      {
        reason: "Weak ties to home country",
        solution:
          "We assist in documenting family, employment, property or other commitments that demonstrate you will return after your studies.",
      },
    ],
    howWeHelp: {
      intro:
        "We support international students at every stage of their journey.",
      points: [
        "Assess your eligibility and recommend the strongest study pathway.",
        "Review your admission and financial documents to ensure they meet IRCC standards.",
        "Prepare a persuasive study permit application that aligns your education goals with long term immigration objectives.",
      ],
      ctaText: "Start your study permit application",
    },
    faqs: [
      {
        q: "How much money do I need to show for a study permit?",
        a: "First year tuition plus CAD $20,635 for living expenses, plus return transportation. For an accompanying family member, add CAD $4,000 for a spouse and CAD $3,000 per child.",
      },
      {
        q: "Can I change schools with a study permit?",
        a: "No, from November 8, 2024 you need to get a new study permit by applying to extend your current one to change your school at the post secondary level.",
      },
      {
        q: "What is the Student Direct Stream?",
        a: "As of November 8, 2024 this stream is closed. It previously offered faster processing for applicants from certain countries who met additional requirements.",
      },
    ],
    relatedServices: ["work-permits", "economic-immigration"],
  },

  "work-permits": {
    id: "work-permits",
    title: "Work Permits",
    heroText:
      "Legal authorization for foreign nationals to work in Canada under various program options.",
    hookParagraph:
      "For many professionals and graduates, the biggest challenge is finding an employer willing to sponsor a Labour Market Impact Assessment. Open work permits remove that barrier, allowing you to work for almost any employer in Canada without restrictions.",
    sections: [
      {
        heading: "Types of Work Permits",
        content: [
          [
            "Employer specific work permit: allows you to work for a specific employer, location and duration",
            "Open work permit: allows you to work for any employer, with some exceptions",
            "Post Graduation Work Permit: for graduates of Canadian designated learning institutions",
            "Co-op work permit: for students whose program requires work experience",
          ],
        ],
      },
      {
        heading: "Employer Specific Work Permits",
        content: [
          "Most employer specific work permits require a Labour Market Impact Assessment, which demonstrates that hiring a foreign worker will not negatively affect the Canadian labour market. Certain LMIA exempt categories exist, such as intra company transfers and CUSMA professionals.",
        ],
      },
      {
        heading: "Open Work Permits: 2026 Eligibility",
        content: [
          "You may be eligible for an open work permit if you are:",
          [
            "The spouse of a skilled worker employed in TEER 0, 1, 2 or 3",
            "The spouse of an international student enrolled in a master's or doctoral program",
            "A Post Graduation Work Permit holder",
            "A vulnerable worker facing abuse or exploitation under an employer specific permit",
            "A refugee claimant or certain humanitarian applicants",
          ],
        ],
      },
      {
        heading: "Post Graduation Work Permit",
        content: [
          [
            "An open work permit valid for up to three years, depending on the length of your study program.",
            "No job offer is required.",
            "You must apply within 180 days of receiving your final grades or completion letter.",
            "Canadian work experience gained through the PGWP can help you qualify for permanent residence.",
          ],
        ],
      },
    ],
    policyAlert: {
      title: "2025 update: Spousal open work permit eligibility narrowed",
      description:
        "As of January 21, 2025, only spouses of workers in TEER 0, 1 and selected occupations in TEER 2 and 3, and spouses of master's or doctoral students qualify for an open work permit. Spouses of undergraduate students and lower skilled workers are no longer eligible.",
      effectiveDate: "January 21, 2025",
    },
    comparisonTable: {
      title: "Open Work Permit vs. Employer Specific Work Permit",
      headers: ["Feature", "Open Work Permit", "Employer Specific Permit"],
      rows: [
        ["LMIA Required", "No", "Yes (most cases)"],
        ["Job Offer", "Not required", "Required"],
        [
          "Employer Restriction",
          "Work for any eligible employer",
          "Tied to one employer",
        ],
        ["Job Changes", "Freely change jobs", "Must reapply for new permit"],
        [
          "Processing Time",
          "Three to five months (may vary)",
          "Varies, often longer with LMIA (may vary)",
        ],
        ["Government Fee", "$255", "$155"],
        [
          "Family Eligibility",
          "Spouse may also qualify for an open permit",
          "Spouse may need a separate LMIA",
        ],
      ],
    },
    feeBreakdown: {
      items: [
        { description: "Work permit fee", amount: "$155" },
        { description: "Open work permit holder fee", amount: "$100" },
      ],
      total: "$255 (open) / $155 (employer specific)",
    },
    processingTime: {
      insideCanada: "Three to five months (may vary)",
      outsideCanada: "Four to seven months (may vary)",
      note: "PGWP applications are typically faster, often two to four months.",
    },
    refusalReasons: [
      {
        reason: "Ineligible for spousal open work permit under the 2025 rules",
        solution:
          "We verify your partner's occupation or program level before you apply. If you are not eligible, we explore alternatives such as an employer specific permit or other open permit categories.",
      },
      {
        reason: "Insufficient proof of relationship (spousal applicants)",
        solution:
          "We help you gather marriage certificates, evidence of cohabitation, joint accounts, photographs and affidavits to prove a genuine relationship.",
      },
      {
        reason:
          "Incomplete PGWP application: missing transcripts or completion letter",
        solution:
          "We provide a comprehensive checklist and review all documents before submission.",
      },
    ],
    howWeHelp: {
      intro:
        "We help clients determine the most appropriate work authorization, assess eligibility and prepare compliant applications.",
      points: [
        "Guide students, graduates and foreign workers through LMIA, employer specific and open work permit options.",
        "Ensure your application is complete, accurate and strategically aligned with your long term goals.",
      ],
      ctaText: "Get help with your work permit",
    },
    faqs: [
      {
        q: "Who is eligible for an open work permit in 2026?",
        a: "Spouses of workers in TEER 0 to 3, spouses of master's or doctoral students, PGWP holders, vulnerable workers and certain refugee or humanitarian applicants.",
      },
      {
        q: "How long does it take to get a PGWP?",
        a: "Current processing time is approximately two to four months. You may work full time while waiting for a decision if you applied before your study permit expired.",
      },
      {
        q: "Can I switch from an employer specific permit to an open work permit?",
        a: "Yes, if you become eligible (for example, as the spouse of a skilled worker or as a vulnerable worker). You must apply for a new permit.",
      },
      {
        q: "What is the cost of an open work permit?",
        a: "CAD $255 total: $155 work permit fee plus $100 open permit holder fee.",
      },
    ],
    relatedServices: ["study-permit", "economic-immigration", "family-class"],
  },

  "family-class": {
    id: "family-class",
    title: "Family Class Sponsorship",
    heroText:
      "Reunite with close family members through sponsorship for permanent residence.",
    hookParagraph:
      "Canadian immigration law recognizes the importance of family with one of the most generous reunification systems in the world. Yet sponsorship applications are often delayed or refused due to incomplete documentation, income shortfalls or concerns about relationship genuineness.",
    sections: [
      {
        heading: "Spousal and Common Law Partner Sponsorship",
        content: [
          "Canadian citizens and permanent residents may sponsor their spouse, common law partner or conjugal partner for permanent residence. Two streams are available:",
          [
            "Outside Canada: for partners living abroad. Conjugal partners and dependent children are also eligible",
            "Inside Canada: for partners living together in Canada. Applicants may be eligible for an open work permit while the application is processed",
          ],
          "Sponsors must provide financial support for the basic needs of the sponsored individual for three years.",
        ],
      },
      {
        heading: "Parent and Grandparent Sponsorship",
        content: [
          "The Parent and Grandparent Program operates through an interest to sponsor lottery. Selected sponsors may submit a complete application.",
          "Financial requirement: sponsors must meet the minimum necessary income for three consecutive years and sign a 20 year undertaking.",
          "Alternative: The Super Visa allows parents and grandparents to visit for up to five years at a time while waiting for sponsorship.",
        ],
      },
      {
        heading: "Dependent Child Sponsorship",
        content: [
          "You may sponsor your biological or adopted child if they:",
          [
            "Are under 22 years old and unmarried, or",
            "Are 22 or older and financially dependent on a parent due to a physical or mental condition",
          ],
          "Sponsorship undertaking: 10 years or until the child turns 25, whichever comes first.",
        ],
      },
    ],
    policyAlert: {
      title: "2026 Parent and Grandparent Program",
      description:
        "IRCC will accept interest to sponsor forms in early 2026. Invitations to apply will be sent randomly. The income requirement remains the Low Income Cut Off plus 30 percent.",
      effectiveDate: "2026",
    },
    feeBreakdown: {
      items: [
        { description: "Sponsorship fee", amount: "$85" },
        { description: "Principal applicant processing fee", amount: "$545" },
        { description: "Right of Permanent Residence Fee", amount: "$575" },
        { description: "Biometrics fee", amount: "$85" },
      ],
      total: "$1,290 plus additional family member fees",
    },
    processingTime: {
      insideCanada: "19 months (varies)",
      outsideCanada: "15 months (varies by country)",
      note: "Parent and Grandparent Program processing times are significantly longer, typically 24 to 36 months.",
    },
    refusalReasons: [
      {
        reason: "Relationship deemed not genuine",
        solution:
          "We help you compile a comprehensive relationship evidence package: wedding photographs, communication logs, joint accounts, affidavits from friends and family, and travel history.",
      },
      {
        reason: "Sponsor does not meet the income requirement (PGP only)",
        solution:
          "We calculate your family size and the Low Income Cut Off threshold, and advise whether you need a cosigner or should wait until your income meets the requirement.",
      },
      {
        reason: "Incomplete or inconsistent application",
        solution:
          "We review every form for accuracy and consistency, ensuring no fields are left blank.",
      },
    ],
    howWeHelp: {
      intro:
        "Family sponsorship applications involve complex requirements and significant responsibilities. Our team is here to help you navigate the process with confidence and precision.",
      points: [
        "Help sponsors and applicants understand their obligations and prepare complete, credible applications.",
        "Anticipate potential obstacles and provide tailored solutions.",
        "Support you whether you are applying from inside or outside Canada.",
      ],
      ctaText: "Start reuniting your family today",
    },
    faqs: [
      {
        q: "Can I sponsor my spouse if I am on a work permit?",
        a: "No, only Canadian citizens and permanent residents may sponsor.",
      },
      {
        q: "What is the income requirement for spousal sponsorship?",
        a: "There is no minimum income requirement for spousal or dependent child sponsorship, unless the sponsored person has a dependent child who has children of their own.",
      },
      {
        q: "How long must I financially support my sponsored spouse?",
        a: "Three years from the date they become a permanent resident.",
      },
    ],
    relatedServices: ["super-visa", "humanitarian-compassionate"],
  },

  "economic-immigration": {
    id: "economic-immigration",
    title: "Economic Immigration",
    heroText:
      "Pathways for skilled workers, entrepreneurs and professionals to contribute to Canada's economy and build a prosperous future.",
    hookParagraph:
      "With more than 80 economic immigration streams, finding the right one can be overwhelming. We cut through the complexity to match your unique profile with the program that gives you the best chance of success.",
    sections: [
      {
        heading: "Overview",
        content: [
          "Economic immigration is a cornerstone of Canada's immigration system, designed to attract skilled workers, entrepreneurs and professionals who can contribute to the country's long term economic growth.",
        ],
      },
      {
        heading: "Federal Skilled Worker Program",
        content: [
          "Designed for skilled professionals with foreign work experience, strong language ability and education who can integrate successfully into Canada's labour market. Candidates are assessed under a six selection factor grid and must meet minimum points thresholds.",
        ],
      },
      {
        heading: "Canadian Experience Class",
        content: [
          "For individuals with at least one year of skilled work experience in Canada, often transitioning from temporary status to permanent residence. This pathway is popular among international graduates and temporary foreign workers.",
        ],
      },
      {
        heading: "Federal Skilled Trades Program",
        content: [
          "Tailored to qualified tradespersons with hands on experience in designated skilled trades. Candidates must have a valid job offer or certificate of qualification and meet language and experience requirements.",
        ],
      },
      {
        heading: "Provincial Nominee Programs",
        content: [
          "This program allows provinces and territories to nominate candidates who meet specific regional labour market and economic needs. Each province operates its own streams. Some are aligned with Express Entry, others are base streams with paper applications. PNPs offer faster and more targeted pathways to permanent residence.",
        ],
      },
      {
        heading: "Business and Entrepreneur Pathways",
        content: [
          [
            "Start Up Visa Program: for innovative entrepreneurs who have a qualifying business and secure support from a designated organization. Requires a commitment to operate a business in Canada",
            "Self Employed Persons Program: for individuals with relevant experience in cultural activities or athletics who intend to become self employed in Canada and contribute significantly to the field",
          ],
        ],
      },
      {
        heading: "Regional Programs",
        content: [
          [
            "Atlantic Immigration Program: a pathway for skilled workers and international graduates to settle in one of Canada's four Atlantic provinces. Offers streamlined processing and employer driven selection",
            "Rural and Northern Immigration Pilot: community driven program that connects skilled foreign workers with employers in participating rural and northern communities",
          ],
        ],
      },
      {
        heading: "Caregiver Pathways",
        content: [
          "Permanent residence options for individuals with experience caring for children, seniors or persons with medical needs in Canada. Includes the Home Child Care Provider Pilot and Home Support Worker Pilot, offering direct to permanent residence pathways.",
        ],
      },
    ],
    policyAlert: {
      title: "2026 Express Entry: Category Based Draws Continue",
      description:
        "IRCC continues to prioritize candidates with French language proficiency or work experience in health care, STEM, trades, transport, education occupations, physicians with Canadian experience, senior managers with Canadian experience, researchers with Canadain work experience and skilled military recruits. Comprehensive Ranking System cut off scores for general draws remain high, often exceeding 500 points.",
      effectiveDate: "2026",
    },
    comparisonTable: {
      title: "Express Entry vs. Provincial Nominee Program",
      headers: ["Factor", "Express Entry", "Provincial Nominee Program"],
      rows: [
        ["Processing Time", "Six to eight months", "Nine to 12 months"],
        ["Job Offer", "Not required (but adds points)", "Often required"],
        [
          "CRS Points Needed",
          "500+ (2026)",
          "Not applicable: nomination adds 600 points",
        ],
        ["Cost", "$1,525", "Province specific fees plus federal fees"],
        [
          "Flexibility",
          "Live anywhere in Canada except Quebec",
          "Must intend to live in the nominating province",
        ],
      ],
    },
    feeBreakdown: {
      items: [
        { description: "Application processing fee", amount: "$950" },
        { description: "Right of Permanent Residence Fee", amount: "$575" },
        { description: "Biometrics fee", amount: "$85" },
      ],
      total: "$1,600 CAD (single applicant)",
    },
    processingTime: {
      insideCanada: "Six to eight months (Express Entry)",
      outsideCanada: "Six to eight months (Express Entry)",
      note: "Provincial Nominee Program paper applications take 12 to 18 months. Enhanced PNPs aligned with Express Entry are processed in six months after nomination.",
    },
    refusalReasons: [
      {
        reason: "Insufficient Comprehensive Ranking System score",
        solution:
          "We help you maximize points: retake language tests, obtain a qualifying job offer, improve education credentials or consider a Provincial Nominee Program as an alternative.",
      },
      {
        reason: "Incomplete or inconsistent work experience documentation",
        solution:
          "We review your reference letters to ensure they include all required details: job duties, hours, salary and dates of employment.",
      },
    ],
    howWeHelp: {
      intro:
        "Economic immigration programs are highly competitive and documentation driven, with eligibility criteria that change frequently. We help clients navigate this complexity.",
      points: [
        "Identify the most suitable economic immigration options based on your profile and goals.",
        "Assess eligibility strategically and prepare strong, well supported applications.",
        "Align your professional background with Canada's economic priorities for long term success.",
      ],
      ctaText: "Start your economic immigration journey",
    },
    faqs: [
      {
        q: "What is the minimum CRS score for 2026?",
        a: "General draws have been above 500 points. Category based draws for French language, health care and trades are lower, often 400 to 450 points.",
      },
      {
        q: "Can I apply for Express Entry without a job offer?",
        a: "Yes, job offers are not required.",
      },
      {
        q: "Is a Provincial Nominee Program faster than Express Entry?",
        a: "Enhanced PNPs aligned with Express Entry are processed in six months after nomination. Base PNPs (paper applications) take 12 to 18 months.",
      },
    ],
    relatedServices: ["work-permits", "study-permit"],
  },

  "humanitarian-compassionate": {
    id: "humanitarian-compassionate",
    title: "Humanitarian and Compassionate Considerations",
    heroText:
      "A discretionary pathway for individuals who would face unusual, undeserved or disproportionate hardship if required to leave Canada.",
    hookParagraph:
      "Not everyone fits neatly into Canada's immigration categories. H and C applications are for those who have built a life here, whose children are Canadian, or who face danger or hardship if forced to leave.",
    sections: [
      {
        heading: "Definition",
        content: [
          "Humanitarian and Compassionate considerations, under section 25 of the Immigration and Refugee Protection Act, provide a discretionary pathway to permanent residence for individuals who do not otherwise meet Canada's immigration requirements but would face significant hardship if required to leave the country.",
        ],
      },
      {
        heading: "Key Factors Considered",
        content: [
          "IRCC officers weigh several factors when assessing H and C applications:",
          [
            "Establishment in Canada: length of time in Canada, employment, community ties, volunteer work",
            "Family ties: connections to family members in Canada",
            "Best interests of a child: how removal would directly affect any child involved",
            "Hardship if removed: adverse conditions, lack of support, medical needs, discrimination",
            "Health considerations: ability to access medical care in the home country",
            "Consequences of non compliance: past immigration breaches, but also compelling reasons",
          ],
        ],
      },
      {
        heading: "Application Process",
        content: [
          "H and C applications are submitted with extensive supporting evidence. They are assessed on a case by case basis, and there is no guarantee of approval. Processing times vary significantly. Applicants may be eligible for a work permit while the application is processed.",
        ],
      },
      {
        heading: "When to Apply",
        content: [
          "You may submit an H and C application from inside Canada at any time, even if you are out of status. However, if you have a pending refugee claim, you generally cannot apply for H and C unless you have been refused and the appeal period has expired.",
        ],
      },
    ],
    policyAlert: {
      title: "No recent policy changes",
      description:
        "H and C remains a highly discretionary, last resort remedy. Officers are instructed to grant relief only when exceptional circumstances warrant it.",
      effectiveDate: "Ongoing",
    },
    feeBreakdown: {
      items: [
        { description: "H and C application fee", amount: "$550" },
        { description: "Biometrics fee", amount: "$85" },
        { description: "Open work permit fee (optional)", amount: "$255" },
      ],
      total: "$635 to $890",
    },
    processingTime: {
      insideCanada: "24 to 36 months",
      outsideCanada: "Not applicable",
      note: "Processing times are long; you may be eligible for a work permit after six months.",
    },
    refusalReasons: [
      {
        reason: "Insufficient evidence of establishment or hardship",
        solution:
          "We help you gather five to ten years of documentation: tax returns, employment letters, rental agreements, utility bills, community involvement and detailed personal affidavits.",
      },
    ],
    howWeHelp: {
      intro:
        "H and C applications are among the most nuanced and evidence intensive immigration cases. We approach each case with empathy and legal precision.",
      points: [
        "Carefully assess your circumstances and identify the strongest humanitarian factors.",
        "Gather and organize compelling evidence to present a clear, emotionally resonant case.",
        "Prepare detailed written submissions that articulate both the legal basis and human impact of your situation.",
      ],
      ctaText: "Discuss your H and C options",
    },
    faqs: [
      {
        q: "Can I apply for H and C if I have a criminal record?",
        a: "Yes, but criminality is a negative factor. You may also need criminal rehabilitation. We assess your overall case.",
      },
      {
        q: "What is the success rate of H and C applications?",
        a: "Approval rates are low, typically under 20 percent. Strong establishment of five or more years and Canadian children significantly increase your chances.",
      },
    ],
    relatedServices: ["refugee-protection", "admissibility-issues"],
  },

  "refugee-protection": {
    id: "refugee-protection",
    title: "Refugee Protection",
    heroText:
      "Protection for individuals fleeing persecution, conflict or serious threats to life or freedom.",
    hookParagraph:
      "If you fear returning to your country because of war, persecution or torture, you may be eligible for protection. The refugee determination process is complex and rigorous, but with skilled representation, your story can be heard and believed.",
    sections: [
      {
        heading: "Canada's Refugee System",
        content: [
          "Canada's refugee protection system is grounded in international law and humanitarian principles. Protection is reserved for those who meet specific legal definitions and face genuine risks if returned to their country of origin.",
        ],
      },
      {
        heading: "Refugee Claims Made in Canada",
        content: [
          "Individuals who arrive in Canada and fear persecution or serious harm may make a refugee claim from within Canada. These claims are assessed by the Refugee Protection Division of the Immigration and Refugee Board. Claimants must establish that they meet the definition of a Convention Refugee or a Person in Need of Protection.",
        ],
      },
      {
        heading: "Convention Refugees",
        content: [
          "A Convention Refugee is a person who has a well founded fear of persecution based on race, religion, nationality, political opinion or membership in a particular social group. They are unable or unwilling to avail themselves of the protection of their home country.",
        ],
      },
      {
        heading: "Persons in Need of Protection",
        content: [
          "A Person in Need of Protection is a person whose removal to their home country would subject them personally to a danger of torture, a risk to life, or a risk of cruel and unusual treatment or punishment.",
        ],
      },
      {
        heading: "Refugees Resettled from Abroad",
        content: [
          "Canada also protects refugees outside Canada through resettlement programs:",
          [
            "Government Assisted Refugees: referred by UNHCR and fully supported by the government",
            "Privately Sponsored Refugees: supported by private groups for one year",
            "Blended Visa Office Referred: shared sponsorship between the government and private groups",
          ],
        ],
      },
      {
        heading: "Humanitarian and Special Protection Programs",
        content: [
          "In certain situations, Canada provides protection through special humanitarian initiatives responding to global crises, armed conflict or widespread human rights violations.",
        ],
      },
    ],
    policyAlert: {
      title: "Safe Third Country Agreement",
      description:
        "Claimants who arrive from the United States at official land border crossings are ineligible to claim refugee status in Canada, with limited exceptions for family members and unaccompanied minors.",
      effectiveDate: "Ongoing",
    },
    feeBreakdown: {
      items: [
        { description: "Refugee claim fee", amount: "$0" },
        { description: "Work permit application (optional)", amount: "$255" },
      ],
      total: "$0 to $255",
    },
    processingTime: {
      insideCanada: "12 to 24 months (Refugee Protection Division hearing)",
      outsideCanada: "Not applicable",
      note: "Hearing dates vary by region. You may receive a work permit six months after your claim is referred.",
    },
    refusalReasons: [
      {
        reason: "Credibility concerns: inconsistent or implausible testimony",
        solution:
          "We prepare you thoroughly for your hearing, identify potential inconsistencies in advance and present corroborating evidence to support your account.",
      },
      {
        reason: "Internal flight alternative",
        solution:
          "If the Refugee Protection Division finds you could safely relocate within your country, we argue why the internal flight alternative is unreasonable, citing factors such as danger, family separation or economic survival.",
      },
    ],
    howWeHelp: {
      intro:
        "Refugee and protection applications involve strict legal standards, evolving policies and high evidentiary burdens. We approach these cases with care, professionalism and respect.",
      points: [
        "Help clients understand their options and prepare credible, well documented claims.",
        "Provide representation before the Refugee Protection Division and, if needed, the Refugee Appeal Division.",
      ],
      ctaText: "Get help with your refugee claim",
    },
    faqs: [
      {
        q: "Can I work while my refugee claim is being processed?",
        a: "Yes, you may apply for a work permit after your claim is referred to the Refugee Protection Division. Processing takes approximately four months.",
      },
      {
        q: "What happens if my claim is refused?",
        a: "You may appeal to the Refugee Appeal Division within 15 days. If the appeal is dismissed, you may apply for leave and judicial review at the Federal Court.",
      },
    ],
    relatedServices: ["humanitarian-compassionate", "rad-appeals"],
  },

  "citizenship-naturalization": {
    id: "citizenship-naturalization",
    title: "Citizenship by Naturalization",
    heroText:
      "Apply for Canadian citizenship as a permanent resident who meets residency, language and knowledge requirements.",
    hookParagraph:
      "Citizenship is the final step in your Canadian journey: the right to vote, hold a Canadian passport and never worry about status again. The physical presence calculation is unforgiving, and even one miscalculated day can lead to refusal.",
    sections: [
      {
        heading: "Overview",
        content: [
          "Canadian citizenship represents the final step in many newcomers' immigration journey. It offers full participation in Canadian society, including the right to vote, hold a Canadian passport and permanent security of status. Citizenship by naturalization is for permanent residents who meet specific requirements.",
        ],
      },
      {
        heading: "Eligibility Requirements",
        content: [
          "To be eligible for citizenship by naturalization, you must:",
          [
            "Have been a permanent resident",
            "Have lived in Canada for at least 1,095 days in the five years before applying",
            "Have filed taxes for at least three years during that period, if required",
            "Demonstrate adequate knowledge of English or French",
            "Pass a citizenship test on the rights, responsibilities and history of Canada",
            "Not be under a removal order, inadmissible or prohibited on criminal or security grounds",
          ],
        ],
      },
      {
        heading: "Application Process",
        content: [
          [
            "Submit your application online or by paper with supporting documents",
            "Pay the fees: CAD $630 for adults, CAD $100 for minors",
            "Receive acknowledgement of receipt",
            "Complete the citizenship test if you are between 18 and 54 years old",
            "Attend a citizenship interview if requested",
            "Receive a decision; if approved, attend a citizenship ceremony and take the Oath of Citizenship",
          ],
        ],
      },
      {
        heading: "Processing Time",
        content: [
          "As of 2026, most applications are completed within 12 to 18 months. You may check current processing times on the IRCC website.",
        ],
      },
    ],
    policyAlert: {
      title: "Physical presence requirement unchanged",
      description:
        "1,095 days remains the standard. Half days accrued before becoming a permanent resident are counted, with a maximum credit of 365 days.",
      effectiveDate: "Ongoing",
    },
    feeBreakdown: {
      items: [
        { description: "Application fee (adult)", amount: "$630" },
        { description: "Right of citizenship fee", amount: "$100" },
      ],
      total: "$730 (adult) / $100 (minor)",
    },
    processingTime: {
      insideCanada: "12 to 18 months",
      outsideCanada: "Not applicable",
      note: "Processing times are estimates. Test and ceremony scheduling vary by location.",
    },
    refusalReasons: [
      {
        reason: "Insufficient physical presence: miscalculated days",
        solution:
          "We calculate your exact presence using entry and exit records, boarding passes and employment history. We never guess.",
      },
      {
        reason: "Language or test failure",
        solution:
          "We assess your language level before application and provide resources to prepare for the citizenship test.",
      },
    ],
    howWeHelp: {
      intro:
        "Citizenship applications require careful calculation of physical presence and accurate documentation. We help clients navigate the process with confidence.",
      points: [
        "Assess your residency history and calculate your physical presence days.",
        "Review your application for completeness and accuracy.",
        "Help you prepare for the citizenship test and interview.",
        "Address any concerns such as residency questions or past immigration issues.",
      ],
      ctaText: "Start your citizenship application",
    },
    faqs: [
      {
        q: "Do I need to be in Canada when I apply?",
        a: "Yes, you must be physically present in Canada when you submit your application.",
      },
      {
        q: "Can I travel while my application is being processed?",
        a: "Yes, but you must continue to meet the residency requirement until you take the oath.",
      },
    ],
    relatedServices: ["citizenship-descent", "citizenship-minors"],
  },

  "citizenship-descent": {
    id: "citizenship-descent",
    title: "Citizenship by Descent",
    heroText:
      "Proof of Canadian citizenship for individuals born outside Canada to a Canadian parent.",
    hookParagraph:
      "If you were born abroad to a Canadian parent, you may already be a citizen. Proving it requires navigating the first generation limit and gathering documents from multiple countries.",
    sections: [
      {
        heading: "Definition",
        content: [
          "Canadian citizenship by descent is acquired when a person is born outside Canada to a Canadian citizen parent. It is not automatic in all cases. Most individuals born abroad to a Canadian parent must apply for a Citizenship Certificate to confirm their status.",
        ],
      },
      {
        heading: "First Generation Limit",
        content: [
          "As a general rule, Canadian citizenship by descent is limited to the first generation born abroad. This means:",
          [
            "If you were born outside Canada and one of your parents was a Canadian citizen at the time of your birth, you are likely a Canadian citizen",
            "However, if you were born outside Canada and your Canadian parent also acquired citizenship by descent, you may not automatically be a citizen",
          ],
          "Exception: If your Canadian parent was employed abroad by the Canadian government or armed forces, the first generation limit may not apply.",
        ],
      },
      {
        heading: "Application Process",
        content: [
          "You apply for a Citizenship Certificate by submitting:",
          [
            "Application form CIT 0001",
            "Your birth certificate",
            "Your Canadian parent's proof of citizenship",
            "Proof of your parent's relationship to you",
            "Photographs and identity documents",
          ],
          "Processing time: approximately five to eight months.",
        ],
      },
    ],
    policyAlert: {
      title: "Proposed changes to the first generation limit",
      description:
        "A Federal Court decision in 2024 declared the first generation limit unconstitutional. The government has appealed. Until the law changes, the limit still applies.",
      effectiveDate: "Ongoing",
    },
    feeBreakdown: {
      items: [{ description: "Citizenship certificate fee", amount: "$75" }],
      total: "$75 CAD",
    },
    processingTime: {
      insideCanada: "Five to eight months",
      outsideCanada: "Five to eight months",
      note: "Applications requiring complex document verification may take longer.",
    },
    refusalReasons: [
      {
        reason: "First generation limit applies",
        solution:
          "We assess your family tree to determine if you are ineligible. If you are, we advise on other pathways such as a grant of citizenship or H and C considerations.",
      },
    ],
    howWeHelp: {
      intro:
        "Citizenship by descent can be complex, especially with the first generation limit and historical changes to citizenship laws. We help applicants gather the correct documents and prepare strong applications.",
      points: [
        "Assess whether you are likely a citizen based on your family history.",
        "Guide you through the documentation requirements.",
        "Help with complex cases involving the first generation limit or citizenship gaps.",
      ],
      ctaText: "Confirm your citizenship status",
    },
    faqs: [
      {
        q: "I was born abroad and my parent is Canadian. Am I automatically a citizen?",
        a: "If your parent was born in Canada or naturalized before your birth, yes. But you still need to apply for a Citizenship Certificate to prove it.",
      },
      {
        q: "Can I pass citizenship to my children if I am a citizen by descent?",
        a: "Generally, no, unless your children are born in Canada or you work for the Canadian government abroad.",
      },
    ],
    relatedServices: ["citizenship-naturalization"],
  },

  "citizenship-minors": {
    id: "citizenship-minors",
    title: "Citizenship Applications for Minors",
    heroText:
      "Canadian citizenship applications for children under 18, with or without a Canadian parent.",
    hookParagraph:
      "Children deserve security. Whether your child was born abroad, adopted or is a permanent resident waiting to naturalize with you, we help you navigate the specific rules for minors.",
    sections: [
      {
        heading: "When a Minor Needs to Apply",
        content: [
          "A minor child under 18 may need to apply for citizenship in several situations:",
          [
            "Born outside Canada to a Canadian parent: apply for proof of citizenship",
            "Adopted by a Canadian citizen: may be eligible for direct citizenship",
            "Permanent resident child of a naturalizing parent: can apply for a grant of citizenship",
            "Stateless children: special provisions apply",
          ],
        ],
      },
      {
        heading: "Requirements for a Grant of Citizenship",
        content: [
          "The child must be a permanent resident.",
          "The child must have lived in Canada with their parent if they are under 18.",
          "The parent must be a citizen or applying concurrently.",
          "No minimum physical presence requirement for the child.",
        ],
      },
      {
        heading: "Application Process",
        content: [
          "Applications for minors must be signed by all legal guardians. Required documents include the child's birth certificate, proof of the parent's citizenship, the child's permanent resident card and photographs. Processing times are similar to adult applications.",
        ],
      },
    ],
    policyAlert: {
      title: "No recent changes",
      description:
        "Rules for minor citizenship applications remain stable. Parental consent and adoption documentation are key areas where applications can be delayed.",
      effectiveDate: "Ongoing",
    },
    feeBreakdown: {
      items: [
        { description: "Citizenship application fee (minor)", amount: "$100" },
      ],
      total: "$100 CAD",
    },
    processingTime: {
      insideCanada: "12 to 18 months",
      outsideCanada: "Not applicable",
      note: "Processing times are similar to adult applications.",
    },
    refusalReasons: [
      {
        reason: "Missing or incomplete parental consent",
        solution:
          "We ensure both parents or legal guardians sign the application and provide required consent forms.",
      },
      {
        reason: "Insufficient proof of adoption",
        solution:
          "We guide you in obtaining complete adoption records and demonstrate that the adoption meets Canadian legal standards.",
      },
    ],
    howWeHelp: {
      intro:
        "Citizenship applications for minors require careful attention to parental consent, adoption documentation and special rules. We help families navigate the process smoothly.",
      points: [
        "Assess eligibility and advise on the correct application type.",
        "Review all documents for completeness and accuracy.",
        "Assist with complex cases involving adoption, guardianship or separated parents.",
      ],
      ctaText: "Help with my child's citizenship",
    },
    faqs: [
      {
        q: "Does my child need to meet the physical presence requirement?",
        a: "No, for a grant of citizenship, minors have no physical presence requirement. They must be permanent residents and live with their citizen parent.",
      },
      {
        q: "Can my child apply for citizenship if we are separated?",
        a: "Yes, but you need consent from both legal guardians or a court order. We can help navigate these situations.",
      },
    ],
    relatedServices: ["citizenship-naturalization", "citizenship-descent"],
  },

  "citizenship-refusals-delays": {
    id: "citizenship-refusals-delays",
    title: "Citizenship Refusals and Delays",
    heroText:
      "Assistance with addressing residency concerns, incomplete applications or procedural issues that may lead to refusal or prolonged processing.",
    hookParagraph:
      "A citizenship refusal can feel like the end of the road, but it does not have to be. Many refusals are based on miscalculated days or simple errors. We review your file, identify the problem and help you get back on track.",
    sections: [
      {
        heading: "Common Reasons for Refusal",
        content: [
          [
            "Insufficient physical presence: miscalculation of days or inadequate evidence",
            "Language proficiency: failing to meet minimum requirements",
            "Citizenship test failure: multiple unsuccessful attempts",
            "Criminal inadmissibility: pending charges, probation or past convictions",
            "Misrepresentation: incorrect or incomplete information",
            "Residency questions: doubts about intention to reside in Canada",
          ],
        ],
      },
      {
        heading: "Delays and Procedural Fairness",
        content: [
          "If IRCC has concerns about your application, they may send a Procedural Fairness Letter giving you an opportunity to respond before a final decision. Responding effectively is critical. Failure to address concerns often leads to refusal.",
        ],
      },
      {
        heading: "Options After Refusal",
        content: [
          "Unlike permanent residence applications, there is no appeal tribunal for citizenship refusals. Options are limited:",
          [
            "Reapply: address the reasons for refusal and submit a new application",
            "Judicial Review: apply to the Federal Court for a review of the decision; must be filed within 30 days of the refusal",
            "Reconsideration: in rare cases, IRCC may agree to reconsider if new evidence is submitted",
          ],
        ],
      },
    ],
    policyAlert: {
      title: "Strict 30 day deadline for judicial review",
      description:
        "If you intend to challenge a citizenship refusal in Federal Court, you must file an application for leave and judicial review within 30 days of receiving the refusal letter.",
      effectiveDate: "Ongoing",
    },
    feeBreakdown: {
      items: [
        { description: "New citizenship application", amount: "$630" },
        { description: "Federal Court application fee", amount: "$50" },
      ],
      total: "$50 to $630",
    },
    processingTime: {
      insideCanada: "12 to 18 months (reapplication)",
      outsideCanada: "Not applicable",
      note: "Judicial review applications take four to eight months at the Federal Court.",
    },
    refusalReasons: [
      {
        reason: "Insufficient physical presence",
        solution:
          "We recalculate your days using entry and exit records and advise whether you should reapply now or wait until you meet the requirement.",
      },
      {
        reason: "Language or test failure",
        solution:
          "We help you prepare for retesting and, if necessary, submit new language evidence.",
      },
    ],
    howWeHelp: {
      intro:
        "Citizenship refusals and delays can be frustrating and stressful. We help clients understand why their application was refused, assess their options and prepare strong responses or new applications.",
      points: [
        "Review the refusal letter and identify the key issues.",
        "Assist with responding to Procedural Fairness Letters.",
        "Help with reapplications or, if appropriate, Federal Court applications for judicial review.",
      ],
      ctaText: "Resolve my citizenship issue",
    },
    faqs: [
      {
        q: "Can I appeal a citizenship refusal?",
        a: "No, there is no appeal tribunal. Your only remedy is to reapply or seek judicial review at the Federal Court.",
      },
      {
        q: "How long do I have to file for judicial review?",
        a: "30 days from the date of the refusal letter.",
      },
    ],
    relatedServices: [
      "citizenship-naturalization",
      "citizenship-refusals-federal-court",
    ],
  },

  "citizenship-renunciation-resumption": {
    id: "citizenship-renunciation-resumption",
    title: "Renunciation and Resumption of Citizenship",
    heroText:
      "Guidance for voluntarily giving up Canadian citizenship or regaining it after renunciation or loss.",
    hookParagraph:
      "Renouncing citizenship is a major decision, whether for personal reasons, to comply with another country's laws or to sever ties with Canada. If you later regret that decision, resumption may be possible.",
    sections: [
      {
        heading: "Renunciation",
        content: [
          "Canadian citizens may voluntarily renounce their citizenship to:",
          [
            "Comply with the citizenship laws of another country that does not permit dual citizenship",
            "Avoid obligations or liabilities",
            "Permanently sever ties with Canada",
          ],
          "Requirements: You must be a citizen of another country or will become one upon renunciation, and you must not be a threat to national security. The process takes approximately six to eight months.",
        ],
      },
      {
        heading: "Resumption",
        content: [
          "Former Canadian citizens who renounced their citizenship or lost it under previous laws may apply to resume citizenship. Resumption restores full citizenship status. Requirements include:",
          [
            "Having previously been a Canadian citizen",
            "Not having been convicted of an offence related to national security",
            "Being a permanent resident if you lost citizenship while in Canada",
            "Meeting residency requirements, which vary by situation",
          ],
        ],
      },
    ],
    policyAlert: {
      title: "Resumption process streamlined",
      description:
        "Recent changes have simplified the resumption process for most former citizens who renounced to acquire or retain another nationality.",
      effectiveDate: "Ongoing",
    },
    feeBreakdown: {
      items: [
        { description: "Renunciation application fee", amount: "$100" },
        { description: "Resumption application fee", amount: "$530" },
      ],
      total: "$100 to $530",
    },
    processingTime: {
      insideCanada:
        "Six to eight months (renunciation); 12 to 18 months (resumption)",
      outsideCanada:
        "Six to eight months (renunciation); 12 to 18 months (resumption)",
      note: "Processing times vary based on complexity.",
    },
    refusalReasons: [
      {
        reason: "Applicant does not have another citizenship (renunciation)",
        solution:
          "You must be a citizen of another country or become one upon renunciation. We verify this before applying.",
      },
      {
        reason: "Insufficient residency for resumption",
        solution:
          "We calculate your presence in Canada and advise whether you meet the requirements or need to wait.",
      },
    ],
    howWeHelp: {
      intro:
        "Renunciation and resumption are significant decisions with long term consequences. We provide clear, strategic guidance to help you make informed choices.",
      points: [
        "Assess your eligibility and explain the legal implications.",
        "Prepare and submit complete, accurate applications.",
        "Advise on timing and how renunciation may affect other immigration matters.",
      ],
      ctaText: "Discuss renunciation or resumption",
    },
    faqs: [
      {
        q: "Can I renounce citizenship if I live in Canada?",
        a: "Yes, but you must have another citizenship. Renunciation does not affect your status as a permanent resident.",
      },
      {
        q: "If I renounce, can I ever get citizenship back?",
        a: "Yes, you may apply for resumption. You must meet residency requirements and be admissible.",
      },
    ],
    relatedServices: ["citizenship-naturalization"],
  },

  "citizenship-revocation": {
    id: "citizenship-revocation",
    title: "Revocation of Citizenship",
    heroText:
      "Support for individuals facing loss of citizenship due to allegations such as misrepresentation or fraud.",
    hookParagraph:
      "Facing revocation is one of the most stressful experiences a Canadian citizen can endure. The government alleges you obtained citizenship through deception. These cases are complex, but we have experience defending clients against revocation.",
    sections: [
      {
        heading: "Definition",
        content: [
          "Revocation is the process by which the Government of Canada cancels a person's citizenship. It can occur when an individual obtained citizenship through:",
          [
            "Misrepresentation: providing false information or withholding material facts",
            "Fraud: knowingly deceiving immigration authorities",
            "Concealment: hiding important information during the citizenship process",
          ],
        ],
      },
      {
        heading: "The Revocation Process",
        content: [
          [
            "Notice of Intent: IRCC sends a letter explaining the grounds for revocation and gives you 30 days to respond",
            "Response: You may provide evidence and submissions challenging the allegations",
            "Decision: A decision is made. If revoked, you lose citizenship status and may become a permanent resident or foreign national",
            "Appeal: Decisions can be appealed to the Federal Court within 30 days",
          ],
        ],
      },
      {
        heading: "Consequences",
        content: [
          "Loss of citizenship can have severe implications, including loss of passport, voting rights and the ability to sponsor family. It may also affect permanent resident status and lead to removal proceedings.",
        ],
      },
    ],
    policyAlert: {
      title: "Increased enforcement",
      description:
        "IRCC has dedicated resources to investigate and revoke citizenship obtained through misrepresentation. Timely, well documented responses are critical.",
      effectiveDate: "Ongoing",
    },
    feeBreakdown: {
      items: [
        {
          description: "No application fee to respond to a Notice of Intent",
          amount: "$0",
        },
        {
          description: "Federal Court application fee (appeal)",
          amount: "$50",
        },
      ],
      total: "$0 to $50",
    },
    processingTime: {
      insideCanada: "Six to 12 months (revocation process)",
      outsideCanada: "Not applicable",
      note: "Timelines vary. Responding to the Notice of Intent is urgent: 30 days.",
    },
    refusalReasons: [],
    howWeHelp: {
      intro:
        "Facing citizenship revocation is a serious matter. We provide strategic representation to protect your status and rights.",
      points: [
        "Review the allegations and advise on the strength of your case.",
        "Prepare comprehensive responses to Notices of Intent.",
        "Represent clients at the Federal Court if an appeal is necessary.",
      ],
      ctaText: "Get help with revocation",
    },
    faqs: [
      {
        q: "What happens if my citizenship is revoked?",
        a: "You revert to your previous immigration status, usually permanent resident. You may be subject to removal if you are inadmissible.",
      },
      {
        q: "Can I appeal a revocation decision?",
        a: "Yes, you have 30 days to apply for judicial review at the Federal Court.",
      },
    ],
    relatedServices: [
      "misrepresentation-concerns",
      "citizenship-refusals-federal-court",
    ],
  },

  "admissibility-issues": {
    id: "admissibility-issues",
    title: "Admissibility and Inadmissibility Issues",
    heroText:
      "Assistance for individuals facing criminality, misrepresentation, medical or non compliance concerns.",
    hookParagraph:
      "Inadmissibility can be a temporary barrier or a permanent one. It depends on the ground and how you respond. We help you understand your status, explore remedies and, when possible, overcome inadmissibility.",
    sections: [
      {
        heading: "Definition",
        content: [
          "Inadmissibility means a person is not permitted to enter or remain in Canada under the Immigration and Refugee Protection Act. Grounds include:",
          [
            "Criminality: serious criminality, organized crime or certain offences",
            "Misrepresentation: providing false information or withholding material facts",
            "Medical: health conditions that pose a danger to public health or safety, or cause excessive demand",
            "Financial: inability or unwillingness to support oneself",
            "Non compliance: overstaying, working without authorization",
            "Security: espionage, subversion, terrorism or membership in certain organizations",
          ],
        ],
      },
      {
        heading: "Remedies",
        content: [
          "Depending on the ground of inadmissibility, several remedies may be available:",
          [
            "Criminal Rehabilitation: for individuals who committed acts outside Canada that would be indictable offences in Canada",
            "Deemed Rehabilitation: automatic after 10 years under certain conditions",
            "Temporary Resident Permit: for those who need to enter Canada for a valid purpose despite inadmissibility",
            "Authorization to Return to Canada: for those previously deported",
            "Record Suspension: for Canadian convictions",
          ],
        ],
      },
    ],
    policyAlert: {
      title: "No recent changes",
      description:
        "Inadmissibility rules remain stable. Rehabilitation applications are processed in 12 to 18 months.",
      effectiveDate: "Ongoing",
    },
    feeBreakdown: {
      items: [
        { description: "Criminal Rehabilitation fee", amount: "$200" },
        { description: "Temporary Resident Permit fee", amount: "$200" },
        {
          description: "Authorization to Return to Canada fee",
          amount: "$400",
        },
      ],
      total: "$200 to $400",
    },
    processingTime: {
      insideCanada: "12 to 18 months (rehabilitation)",
      outsideCanada: "12 to 18 months (rehabilitation)",
      note: "Temporary Resident Permit processing times are shorter, typically three to six months.",
    },
    refusalReasons: [
      {
        reason: "Insufficient evidence of rehabilitation",
        solution:
          "We help you gather court records, police certificates, character references and proof of time elapsed since the offence.",
      },
    ],
    howWeHelp: {
      intro:
        "Inadmissibility can be complex and stressful. We help clients understand their status, assess available remedies and prepare successful applications.",
      points: [
        "Analyze the inadmissibility ground and identify the most appropriate solution.",
        "Prepare detailed submissions for Criminal Rehabilitation, Temporary Resident Permits, Authorization to Return to Canada or other remedies.",
        "Represent clients before IRCC and at admissibility hearings.",
      ],
      ctaText: "Resolve my inadmissibility",
    },
    faqs: [
      {
        q: "How long after a DUI can I apply for rehabilitation?",
        a: "If you have only one conviction, you may be deemed rehabilitated after 10 years. Otherwise, you may apply for individual rehabilitation after five years.",
      },
      {
        q: "Can I get a Temporary Resident Permit while waiting for rehabilitation?",
        a: "Yes, a Temporary Resident Permit can be a temporary solution for those who need to travel to Canada before they are eligible for rehabilitation.",
      },
    ],
    relatedServices: [
      "temporary-resident-permit",
      "misrepresentation-concerns",
    ],
  },

  "port-of-entry-issues": {
    id: "port-of-entry-issues",
    title: "Port of Entry Issues",
    heroText:
      "Support for travellers facing refusal, questioning or secondary examination at a Canadian port of entry.",
    hookParagraph:
      "A refusal at the border can be embarrassing, frightening and have long term consequences. Whether you were denied entry, referred to secondary or issued a removal order, we help you understand what happened and plan your next steps.",
    sections: [
      {
        heading: "What Happens at a Port of Entry",
        content: [
          "When you arrive in Canada, a border services officer determines your admissibility. They may:",
          [
            "Admit you as a visitor, worker or student",
            "Refer you to secondary examination for more detailed questioning",
            "Issue a removal order if you are inadmissible",
            "Seize documents or goods",
            "Detain you pending further review",
          ],
        ],
      },
      {
        heading: "Common Issues",
        content: [
          [
            "Insufficient funds",
            "Unclear purpose of visit",
            "Concerns about ties to home country",
            "Past immigration violations",
            "Criminal record or medical concerns",
            "Work without authorization",
            "Misrepresentation at the border",
          ],
        ],
      },
      {
        heading: "What to Do After a Refusal",
        content: [
          "If you are refused entry, you will receive a removal order and written reasons. Options may include:",
          [
            "Reapplying with stronger documentation",
            "Applying for a Temporary Resident Permit if you are inadmissible",
            "Seeking legal advice before attempting reentry",
          ],
        ],
      },
    ],
    policyAlert: {
      title: "Enhanced CBSA screening",
      description:
        "Border officers have access to more information than ever. Honesty and thorough preparation are essential.",
      effectiveDate: "Ongoing",
    },
    feeBreakdown: {
      items: [
        {
          description: "Consultation after refusal",
          amount: "Contact us for fee",
        },
      ],
      total: "Varies",
    },
    processingTime: {
      insideCanada: "Not applicable",
      outsideCanada: "Not applicable",
      note: "Reapplying may take weeks to months; Temporary Resident Permit applications take three to six months.",
    },
    refusalReasons: [],
    howWeHelp: {
      intro:
        "A refusal at the border can have serious implications for future travel and immigration applications. We help you understand what happened and plan your next steps.",
      points: [
        "Review the refusal letter and advise on the reasons.",
        "Help you prepare stronger applications or remedies.",
        "Provide guidance on how to address the refusal in future applications.",
      ],
      ctaText: "Get help after a port of entry refusal",
    },
    faqs: [
      {
        q: "I was refused entry. Can I try again?",
        a: "Yes, but you should understand why you were refused and address those issues before reapplying. We can help you prepare.",
      },
      {
        q: "Will a refusal affect future applications?",
        a: "Yes, you must declare any previous refusals. A well explained, resolved issue is usually not fatal.",
      },
    ],
    relatedServices: ["admissibility-issues", "temporary-resident-permit"],
  },

  "removal-orders-enforcement": {
    id: "removal-orders-enforcement",
    title: "Removal Orders and Enforcement Matters",
    heroText:
      "Assistance for individuals facing departure, exclusion or deportation orders.",
    hookParagraph:
      "A removal order is one of the most serious immigration consequences. But depending on the type of order and your status, you may have rights to appeal or apply for relief. We act quickly to protect your ability to stay in Canada.",
    sections: [
      {
        heading: "Types of Removal Orders",
        content: [
          [
            "Departure Order: you must leave Canada within 30 days. If confirmed by CBSA, it becomes a deportation order",
            "Exclusion Order: you are inadmissible for one year if no misrepresentation, or five years if misrepresentation",
            "Deportation Order: permanent exclusion from Canada; you must apply for an Authorization to Return to Canada to reenter",
          ],
        ],
      },
      {
        heading: "Options to Challenge",
        content: [
          "Depending on the type of order and your status, you may:",
          [
            "Appeal to the Immigration Appeal Division: for permanent residents, protected persons and certain sponsors",
            "Apply for a stay of removal",
            "Apply for a Pre Removal Risk Assessment if you fear persecution",
            "Submit an H and C application",
          ],
        ],
      },
      {
        heading: "Consequences of Non Compliance",
        content: [
          "Failing to comply with a removal order can result in arrest, detention and a five year bar on reentry. It may also affect future sponsorship and immigration applications.",
        ],
      },
    ],
    policyAlert: {
      title: "Strict timelines",
      description:
        "Appeals to the Immigration Appeal Division must be filed within 30 days of the removal order. Pre Removal Risk Assessment applications are subject to strict deadlines.",
      effectiveDate: "Ongoing",
    },
    feeBreakdown: {
      items: [
        {
          description: "Immigration Appeal Division appeal fee",
          amount: "$75",
        },
        {
          description: "Pre Removal Risk Assessment application fee",
          amount: "$0",
        },
        {
          description: "Authorization to Return to Canada fee",
          amount: "$400",
        },
      ],
      total: "$0 to $400",
    },
    processingTime: {
      insideCanada: "12 to 24 months (IAD appeals)",
      outsideCanada: "Six to 12 months (Pre Removal Risk Assessment)",
      note: "Timelines vary. Urgent stays may be requested.",
    },
    refusalReasons: [],
    howWeHelp: {
      intro:
        "Facing removal is one of the most serious immigration situations. We provide compassionate, strategic representation to help you explore all available options.",
      points: [
        "Review your case and advise on appeal rights and deadlines.",
        "Represent you before the Immigration Appeal Division.",
        "Assist with Pre Removal Risk Assessment, H and C applications and Authorization to Return to Canada applications if needed.",
      ],
      ctaText: "Get help with a removal order",
    },
    faqs: [
      {
        q: "Can I appeal a deportation order?",
        a: "Permanent residents and protected persons can appeal to the Immigration Appeal Division. Others may have limited options, such as Pre Removal Risk Assessment or H and C.",
      },
      {
        q: "What is a stay of removal?",
        a: "A temporary suspension of the removal order while your appeal or application is being processed.",
      },
    ],
    relatedServices: ["iad-appeals", "humanitarian-compassionate"],
  },

  "detention-reviews": {
    id: "detention-reviews",
    title: "Detention Reviews",
    heroText:
      "Guidance for foreign nationals or permanent residents detained by the Canada Border Services Agency.",
    hookParagraph:
      "Being detained by CBSA is a frightening experience, but you have rights. Detention reviews are held regularly, and we can attend with you to advocate for your release.",
    sections: [
      {
        heading: "When CBSA May Detain an Individual",
        content: [
          "CBSA may detain an individual if:",
          [
            "They are a danger to the public",
            "They are unlikely to appear for immigration proceedings",
            "Their identity cannot be confirmed",
            "They are inadmissible on security grounds",
          ],
        ],
      },
      {
        heading: "Detention Review Process",
        content: [
          "Detention reviews are conducted by the Immigration Division of the Immigration and Refugee Board. Within 48 hours of detention, a review must take place. A second review occurs within seven days, and subsequent reviews every 30 days.",
          "At the hearing, CBSA must justify continued detention. The detainee may present evidence and arguments for release.",
        ],
      },
      {
        heading: "Release Options",
        content: [
          "Release may be granted with conditions, such as:",
          [
            "Posting a cash deposit or bond",
            "Reporting regularly to CBSA",
            "Residing at a specific address",
            "Surrendering a passport",
          ],
        ],
      },
    ],
    policyAlert: {
      title: "Right to counsel",
      description:
        "Detainees have the right to be represented by a consultant or lawyer at detention reviews. We can attend with you.",
      effectiveDate: "Ongoing",
    },
    feeBreakdown: {
      items: [
        {
          description: "Detention review representation",
          amount: "Contact us for fee",
        },
      ],
      total: "Varies",
    },
    processingTime: {
      insideCanada: "First review within 48 hours",
      outsideCanada: "Not applicable",
      note: "Subsequent reviews every 30 days.",
    },
    refusalReasons: [],
    howWeHelp: {
      intro:
        "Detention can be frightening and isolating. We act quickly to secure your release and protect your rights.",
      points: [
        "Attend detention reviews with you and advocate for release.",
        "Propose reasonable release plans and conditions.",
        "Work to resolve the underlying immigration issues leading to detention.",
      ],
      ctaText: "Get help with detention",
    },
    faqs: [
      {
        q: "How much is a bond?",
        a: "Bonds vary depending on the case. They are typically cash deposits that are refunded when conditions are met.",
      },
      {
        q: "Can I be detained indefinitely?",
        a: "No, detention must be reviewed regularly. If it is no longer justified, you must be released.",
      },
    ],
    relatedServices: ["removal-orders-enforcement", "admissibility-hearings"],
  },

  "admissibility-hearings": {
    id: "admissibility-hearings",
    title: "Admissibility Hearings",
    heroText:
      "Support with matters referred to the Immigration and Refugee Board for admissibility hearings.",
    hookParagraph:
      "An admissibility hearing is a formal proceeding where an Immigration and Refugee Board member decides whether you can remain in Canada. With experienced representation, you can challenge the allegations and present evidence that you are admissible.",
    sections: [
      {
        heading: "Definition",
        content: [
          "An admissibility hearing is conducted by the Immigration Division of the Immigration and Refugee Board when CBSA alleges that a person is inadmissible to Canada. The hearing determines whether the person may remain in or must leave Canada.",
        ],
      },
      {
        heading: "Grounds for Referral",
        content: [
          "Common grounds include:",
          [
            "Criminality",
            "Misrepresentation",
            "Non compliance with the Immigration and Refugee Protection Act",
            "Security or human rights violations",
            "Organized criminality",
          ],
        ],
      },
      {
        heading: "Possible Outcomes",
        content: [
          "If the Immigration Division finds you inadmissible, they will issue a removal order. You may be able to appeal the decision to the Immigration Appeal Division if you are a permanent resident, protected person or sponsor.",
        ],
      },
    ],
    policyAlert: {
      title: "Legal representation strongly recommended",
      description:
        "Admissibility hearings are complex. Respondents without counsel are at a significant disadvantage.",
      effectiveDate: "Ongoing",
    },
    feeBreakdown: {
      items: [{ description: "No government fee", amount: "$0" }],
      total: "$0",
    },
    processingTime: {
      insideCanada: "Six to 12 months from referral",
      outsideCanada: "Not applicable",
      note: "Timelines vary by region and complexity.",
    },
    refusalReasons: [],
    howWeHelp: {
      intro:
        "Admissibility hearings are high stakes proceedings. We provide experienced representation to challenge the allegations and protect your status.",
      points: [
        "Analyze the evidence and develop a defence strategy.",
        "Represent you at the hearing and cross examine witnesses.",
        "Prepare legal submissions and argue on your behalf.",
      ],
      ctaText: "Defend against inadmissibility",
    },
    faqs: [
      {
        q: "Do I need a lawyer for an admissibility hearing?",
        a: "While not required, having representation significantly increases your chances of a favourable outcome.",
      },
      {
        q: "Can I appeal a negative decision?",
        a: "Permanent residents, protected persons and sponsors can appeal to the Immigration Appeal Division. Others may have limited options.",
      },
    ],
    relatedServices: ["iad-appeals", "admissibility-issues"],
  },

  "compliance-reviews-status-problems": {
    id: "compliance-reviews-status-problems",
    title: "Compliance Reviews and Status Problems",
    heroText:
      "Assistance with restoring status, addressing overstays, unauthorized work or study and correcting past immigration non compliance.",
    hookParagraph:
      "Losing status, overstaying or working without authorization can feel like a dead end. But Canada provides pathways to restore status and, in some cases, overcome past mistakes.",
    sections: [
      {
        heading: "Common Status Problems",
        content: [
          [
            "Overstay: remaining in Canada after your authorized period has expired",
            "Unauthorized work or study: working or studying without a valid permit",
            "Loss of status: expiry of study permit, work permit or visitor status",
            "Non compliance with conditions: working more hours than permitted, changing schools without notifying IRCC",
          ],
        ],
      },
      {
        heading: "Restoration of Status",
        content: [
          "If you have lost status, you may apply to restore it within 90 days. You must meet the original eligibility requirements and explain the circumstances of your non compliance. After 90 days, you must leave Canada and reapply from abroad.",
        ],
      },
      {
        heading: "Impact on Future Applications",
        content: [
          "Past non compliance can affect future applications. Misrepresentation findings can lead to a five year ban. Overstays and unauthorized work may be considered in admissibility assessments.",
        ],
      },
    ],
    policyAlert: {
      title: "90 day restoration window",
      description:
        "You have 90 days from the loss of status to apply for restoration. After that, you must leave Canada and may need an Authorization to Return to Canada.",
      effectiveDate: "Ongoing",
    },
    feeBreakdown: {
      items: [
        { description: "Restoration fee", amount: "$200" },
        {
          description: "Work or study permit fee (if applicable)",
          amount: "$150 to $255",
        },
      ],
      total: "$200 to $455",
    },
    processingTime: {
      insideCanada: "Three to five months (restoration)",
      outsideCanada: "Not applicable",
      note: "You may be eligible to remain in Canada while your restoration is processed.",
    },
    refusalReasons: [
      {
        reason: "Applied after 90 days",
        solution:
          "We advise on leaving Canada and reapplying, possibly requiring an Authorization to Return to Canada.",
      },
      {
        reason: "Insufficient explanation for non compliance",
        solution:
          "We help you draft a sincere, reasonable explanation addressing the circumstances of your overstay or unauthorized work.",
      },
    ],
    howWeHelp: {
      intro:
        "We help clients resolve status problems and minimize the long term consequences of non compliance.",
      points: [
        "Assess your situation and advise on restoration or other remedies.",
        "Prepare complete, honest applications with strong explanations.",
        "Help you understand how past issues may affect future applications and how to address them.",
      ],
      ctaText: "Fix my immigration status",
    },
    faqs: [
      {
        q: "Can I restore my status if I worked without a permit?",
        a: "Yes, if you apply within 90 days. You must explain the unauthorized work and demonstrate that you are otherwise eligible.",
      },
      {
        q: "What is an Authorization to Return to Canada?",
        a: "An Authorization to Return to Canada is required for individuals who have been removed or left Canada after a removal order.",
      },
    ],
    relatedServices: ["visitor-record", "misrepresentation-concerns"],
  },

  "misrepresentation-concerns": {
    id: "misrepresentation-concerns",
    title: "Misrepresentation Concerns",
    heroText:
      "Strategic support for individuals accused of providing incorrect or incomplete information.",
    hookParagraph:
      "An accusation of misrepresentation can lead to a five year ban from Canada, loss of status and removal. But not every mistake is deliberate, and not every allegation is valid. We help you respond effectively.",
    sections: [
      {
        heading: "Definition",
        content: [
          "Misrepresentation under the Immigration and Refugee Protection Act means directly or indirectly providing false information or withholding material facts that could lead to an error in the administration of the Act. It includes:",
          [
            "Lying on an application form",
            "Submitting forged documents",
            "Withholding relevant information, such as criminal history or previous refusals",
            "Misleading an immigration or border officer",
          ],
        ],
      },
      {
        heading: "Consequences",
        content: [
          "A finding of misrepresentation results in:",
          [
            "Inadmissibility for five years, which can be permanent for serious cases",
            "Refusal of the current application",
            "Loss of status: permanent residents may lose their permanent residence; citizens may face revocation",
            "A removal order in many cases",
          ],
        ],
      },
      {
        heading: "Procedural Fairness",
        content: [
          "Before a final decision, IRCC or CBSA will send a Procedural Fairness Letter outlining their concerns and giving you an opportunity to respond. This is your chance to explain, correct the record or provide additional evidence.",
        ],
      },
    ],
    policyAlert: {
      title: "Strict liability",
      description:
        "Misrepresentation does not require intent. Even innocent mistakes can lead to a finding of misrepresentation if the information was material.",
      effectiveDate: "Ongoing",
    },
    feeBreakdown: {
      items: [
        {
          description:
            "No government fee to respond to a Procedural Fairness Letter",
          amount: "$0",
        },
      ],
      total: "$0",
    },
    processingTime: {
      insideCanada:
        "Not applicable: respond by the deadline stated in the letter",
      outsideCanada: "Not applicable",
      note: "Deadlines are typically 7 to 30 days.",
    },
    refusalReasons: [],
    howWeHelp: {
      intro:
        "Misrepresentation allegations are serious and can have long lasting consequences. We help you respond effectively and, when possible, avoid a formal finding.",
      points: [
        "Review the allegations and advise on your best course of action.",
        "Draft comprehensive responses to Procedural Fairness Letters.",
        "Help you gather evidence to demonstrate innocence or honest mistake.",
        "Represent you at admissibility hearings if necessary.",
      ],
      ctaText: "Respond to misrepresentation allegations",
    },
    faqs: [
      {
        q: "I made an honest mistake on my application. Will I be banned?",
        a: "Not necessarily. If you can show it was an innocent error and the information was not material, a finding may be avoided. Responding to a Procedural Fairness Letter is critical.",
      },
      {
        q: "Can I overcome a misrepresentation finding?",
        a: "After five years, you may apply for rehabilitation. Some remedies, such as a Temporary Resident Permit, are available sooner.",
      },
    ],
    relatedServices: ["admissibility-issues", "citizenship-revocation"],
  },

  "strategic-immigration-advice": {
    id: "strategic-immigration-advice",
    title: "Strategic Immigration Advice",
    heroText:
      "Case specific consultations for complex immigration histories, enforcement risks or long term planning.",
    hookParagraph:
      "Some immigration situations do not fit into a standard application. Whether you have multiple refusals, a criminal record or are planning a multi step pathway for your family, we offer confidential, in depth consultations.",
    sections: [
      {
        heading: "When You Need Strategic Advice",
        content: [
          "Standard applications may not be appropriate when:",
          [
            "You have a complex immigration history, including multiple refusals, overstays or misrepresentation",
            "You are inadmissible or at risk of inadmissibility",
            "You have been deported or are under a removal order",
            "You are considering renouncing citizenship or applying for an Authorization to Return to Canada",
            "You need to plan a long term strategy for family reunification or business immigration",
            "You are facing enforcement action",
          ],
        ],
      },
      {
        heading: "What We Provide",
        content: [
          "Our strategic consultations are in depth, confidential sessions where we:",
          [
            "Review your entire immigration history and current status",
            "Identify risks, options and timelines",
            "Develop a customized step by step plan",
            "Advise on documentation, timing and potential pitfalls",
          ],
        ],
      },
    ],
    policyAlert: undefined,
    feeBreakdown: {
      items: [
        { description: "Strategic consultation (one hour)", amount: "$250" },
      ],
      total: "$250",
    },
    processingTime: undefined,
    refusalReasons: [],
    howWeHelp: {
      intro:
        "We offer strategic advice to clients with complex cases. Our goal is to give you clarity, confidence and a realistic roadmap forward.",
      points: [
        "Take the time to understand your unique circumstances.",
        "Provide honest assessments, including when the news is not favourable.",
        "Help you avoid costly mistakes and choose the best pathway.",
      ],
      ctaText: "Book a strategic consultation",
    },
    faqs: [
      {
        q: "How is a strategic consultation different from a regular consultation?",
        a: "Strategic consultations are longer, typically one hour, and focus on complex cases, historical issues and multi step planning. They include a detailed written summary of our advice.",
      },
    ],
    relatedServices: [],
  },

  "iad-appeals": {
    id: "iad-appeals",
    title: "Immigration Appeal Division Appeals",
    heroText:
      "We assist with appeals before the Immigration Appeal Division for family sponsorship refusals and certain removal orders.",
    hookParagraph:
      "A sponsorship refusal or removal order is not the final word. Permanent residents, protected persons and sponsors have a statutory right to appeal to the Immigration Appeal Division.",
    sections: [
      {
        heading: "What Can Be Appealed to the IAD",
        content: [
          [
            "Family sponsorship refusals: where a visa officer refuses a sponsored application for a spouse, partner or dependent child",
            "Removal orders: made against permanent residents, protected persons and certain others",
            "Residency obligation appeals: for permanent residents who fail to meet the residency requirement",
          ],
        ],
      },
      {
        heading: "Appeal Process",
        content: [
          [
            "Notice of Appeal: must be filed within 30 days of the decision",
            "Disclosure: both parties exchange documents and evidence",
            "Case management: pre hearing conferences to narrow issues",
            "Hearing: typically in person; you may present witnesses and evidence",
            "Decision: the IAD may allow the appeal, dismiss it or stay the removal order",
          ],
        ],
      },
      {
        heading: "Humanitarian and Compassionate Factors",
        content: [
          "In sponsorship appeals, the IAD may consider H and C factors even if the applicant does not meet the strict legal requirements. This includes the best interests of any child affected by the decision.",
        ],
      },
    ],
    policyAlert: {
      title: "30 day deadline",
      description:
        "Notice of Appeal must be received by the IAD within 30 days of the decision. Late appeals are rarely accepted.",
      effectiveDate: "Ongoing",
    },
    feeBreakdown: {
      items: [{ description: "IAD appeal fee", amount: "$75" }],
      total: "$75",
    },
    processingTime: {
      insideCanada: "12 to 24 months",
      outsideCanada: "Not applicable",
      note: "Processing times vary. Alternative Dispute Resolution may expedite resolution.",
    },
    refusalReasons: [],
    howWeHelp: {
      intro:
        "IAD appeals are formal legal proceedings. We provide skilled representation to present your case effectively.",
      points: [
        "Assess your grounds for appeal and advise on your chances of success.",
        "Prepare and file all necessary documents within strict deadlines.",
        "Represent you at the hearing and present evidence and legal arguments.",
        "Help gather H and C evidence to support your appeal.",
      ],
      ctaText: "Appeal a sponsorship refusal",
    },
    faqs: [
      {
        q: "What is the difference between an appeal and judicial review?",
        a: "An IAD appeal is a full hearing on the merits; you may present new evidence. Judicial review is a review of the decision for reasonableness, with limited ability to introduce new evidence.",
      },
      {
        q: "Can I appeal if I missed the deadline?",
        a: "In very limited circumstances, you may request an extension. Contact us immediately.",
      },
    ],
    relatedServices: ["family-class", "removal-orders-enforcement"],
  },

  "rad-appeals": {
    id: "rad-appeals",
    title: "Refugee Appeal Division Appeals",
    heroText:
      "Support for refugee claimants appealing a negative decision of the Refugee Protection Division.",
    hookParagraph:
      "A negative refugee decision is devastating, but you have the right to appeal to the Refugee Appeal Division. We review your Refugee Protection Division decision for errors and prepare persuasive appeals.",
    sections: [
      {
        heading: "Definition",
        content: [
          "The Refugee Appeal Division is a tribunal within the Immigration and Refugee Board that hears appeals of decisions made by the Refugee Protection Division. Both claimants and the Minister may appeal.",
        ],
      },
      {
        heading: "Grounds for Appeal",
        content: [
          [
            "Error of law: misinterpretation or misapplication of refugee law",
            "Error of fact: the Refugee Protection Division made a finding that is perverse, capricious or without regard to the evidence",
            "Mixed fact and law: both errors present",
          ],
        ],
      },
      {
        heading: "Process and Timelines",
        content: [
          "Notice of Appeal must be filed within 15 days of receiving the Refugee Protection Division decision. The appellant's record is due 30 days after that. The Refugee Appeal Division conducts a review on the record; no new evidence is permitted unless it meets strict admissibility criteria.",
        ],
      },
    ],
    policyAlert: {
      title: "15 day deadline",
      description:
        "You have only 15 days from the date you receive the Refugee Protection Division decision to file a Notice of Appeal. Missing this deadline is fatal.",
      effectiveDate: "Ongoing",
    },
    feeBreakdown: {
      items: [{ description: "RAD appeal fee", amount: "$0" }],
      total: "$0",
    },
    processingTime: {
      insideCanada: "Six to 12 months",
      outsideCanada: "Not applicable",
      note: "Refugee Appeal Division decisions are typically rendered within six to 12 months of the appellant's record being filed.",
    },
    refusalReasons: [],
    howWeHelp: {
      intro:
        "Refugee Appeal Division appeals are complex and time sensitive. We provide thorough, strategic representation to challenge negative Refugee Protection Division decisions.",
      points: [
        "Review the Refugee Protection Division decision and identify appealable errors.",
        "Prepare persuasive appeal memoranda citing legal authorities.",
        "Advise on the admissibility of new evidence and prepare applications if warranted.",
      ],
      ctaText: "Appeal your refugee decision",
    },
    faqs: [
      {
        q: "Can I submit new evidence on appeal?",
        a: "Generally, no. New evidence is only admissible if it was not reasonably available at the time of the Refugee Protection Division hearing or if it responds to a new issue raised by the Refugee Protection Division.",
      },
      {
        q: "What if the Refugee Appeal Division dismisses my appeal?",
        a: "You may apply for leave and judicial review at the Federal Court within 15 days.",
      },
    ],
    relatedServices: [
      "refugee-protection",
      "citizenship-refusals-federal-court",
    ],
  },

  "procedural-fairness-challenges": {
    id: "procedural-fairness-challenges",
    title: "Procedural Fairness Challenges",
    heroText:
      "Assistance responding to procedural fairness letters and preparing submissions when decision makers raise concerns.",
    hookParagraph:
      "A Procedural Fairness Letter is not a refusal; it is an opportunity. It means the officer has concerns but is willing to consider your side before making a final decision. A well crafted response can turn a potential refusal into an approval.",
    sections: [
      {
        heading: "Definition",
        content: [
          "A Procedural Fairness Letter is sent by IRCC or CBSA when an officer has concerns about an application. It gives you an opportunity to respond before a negative decision is made. Common triggers include:",
          [
            "Credibility concerns",
            "Insufficient evidence",
            "Misrepresentation allegations",
            "Inconsistencies in documents or interviews",
            "Concerns about the genuineness of a relationship in sponsorship cases",
            "Study permit concerns about genuine temporary intent",
          ],
        ],
      },
      {
        heading: "How to Respond",
        content: [
          "A strong response can overcome many concerns. It should:",
          [
            "Directly address each concern raised",
            "Provide new, credible evidence",
            "Explain inconsistencies, not ignore them",
            "Include legal arguments if applicable",
            "Be submitted within the deadline, usually 7 to 30 days",
          ],
        ],
      },
    ],
    policyAlert: {
      title: "Deadlines are strict",
      description:
        "Failure to respond by the deadline will almost certainly result in a refusal. Extensions are rarely granted.",
      effectiveDate: "Ongoing",
    },
    feeBreakdown: {
      items: [{ description: "No government fee to respond", amount: "$0" }],
      total: "$0",
    },
    processingTime: {
      insideCanada: "Not applicable: respond by the deadline",
      outsideCanada: "Not applicable",
      note: "The deadline is specified in the letter, typically 7 to 30 days.",
    },
    refusalReasons: [],
    howWeHelp: {
      intro:
        "A Procedural Fairness Letter is not a refusal; it is an opportunity. We help you respond effectively to protect your application.",
      points: [
        "Analyze the concerns and identify the strongest arguments.",
        "Draft clear, comprehensive response letters.",
        "Help you gather and organize supporting evidence.",
        "Ensure your response is submitted on time.",
      ],
      ctaText: "Respond to a fairness letter",
    },
    faqs: [
      {
        q: "What if I cannot obtain the requested evidence by the deadline?",
        a: "Request an extension as soon as possible. Provide a reasonable explanation and timeline.",
      },
      {
        q: "Should I hire a consultant to respond to a Procedural Fairness Letter?",
        a: "Absolutely. A professionally crafted response can make the difference between approval and refusal.",
      },
    ],
    relatedServices: ["misrepresentation-concerns"],
  },

  "alternative-dispute-resolution": {
    id: "alternative-dispute-resolution",
    title: "Alternative Dispute Resolution",
    heroText:
      "Support in Immigration Appeal Division matters that may be resolved through ADR conferences, helping avoid lengthy hearings when appropriate.",
    hookParagraph:
      "ADR is a faster, less adversarial way to resolve certain Immigration Appeal Division appeals. In an ADR conference, your representative and the Minister's counsel work together to find a mutually acceptable solution.",
    sections: [
      {
        heading: "Definition",
        content: [
          "Alternative Dispute Resolution is a voluntary, informal process offered by the Immigration Appeal Division in certain appeals. It allows the parties (the appellant and the Minister's counsel) to attempt to resolve the appeal by agreement, without a formal hearing.",
        ],
      },
      {
        heading: "When ADR Is Available",
        content: [
          "ADR is most commonly used in:",
          [
            "Family sponsorship appeals",
            "Residency obligation appeals",
            "Certain removal order appeals",
          ],
          "Not every case is suitable for ADR. The IAD may offer ADR if both parties consent and the issues can potentially be resolved.",
        ],
      },
      {
        heading: "Benefits of ADR",
        content: [
          [
            "Faster resolution, often weeks instead of months",
            "Less formal and less stressful",
            "Opportunity for creative solutions",
            "Lower costs",
            "Confidential process",
          ],
        ],
      },
    ],
    policyAlert: undefined,
    feeBreakdown: {
      items: [{ description: "No additional government fee", amount: "$0" }],
      total: "$0",
    },
    processingTime: {
      insideCanada: "ADR conference scheduled within weeks",
      outsideCanada: "Not applicable",
      note: "Much faster than a full hearing.",
    },
    refusalReasons: [],
    howWeHelp: {
      intro:
        "We help clients determine whether ADR is appropriate and prepare effectively for ADR conferences.",
      points: [
        "Assess the strengths and weaknesses of your case.",
        "Prepare a clear, concise presentation of your position.",
        "Negotiate with the Minister's counsel to reach a favourable resolution.",
        "Draft the consent agreement for IAD approval.",
      ],
      ctaText: "Explore ADR options",
    },
    faqs: [
      {
        q: "What happens if ADR is unsuccessful?",
        a: "The case proceeds to a regular IAD hearing. Nothing said in ADR can be used against you at the hearing.",
      },
      {
        q: "Who decides if my case is suitable for ADR?",
        a: "The IAD will make an offer based on the issues. Both parties must agree.",
      },
    ],
    relatedServices: ["iad-appeals"],
  },

  "citizenship-refusals-federal-court": {
    id: "citizenship-refusals-federal-court",
    title: "Citizenship Refusals and Federal Court Review",
    heroText:
      "Guidance for individuals whose citizenship applications have been refused, including review options through the Federal Court.",
    hookParagraph:
      "A citizenship refusal cannot be appealed, but it can be challenged in Federal Court. Judicial review is a complex, time sensitive process. We assess the reasonableness of the decision and, if there are grounds, file an application for leave and judicial review within 30 days.",
    sections: [
      {
        heading: "No Appeal, Only Judicial Review",
        content: [
          "Unlike permanent residence applications, there is no administrative appeal for citizenship refusals. The only recourse is to apply for leave and judicial review at the Federal Court of Canada.",
        ],
      },
      {
        heading: "Judicial Review Process",
        content: [
          [
            "Application for Leave: filed within 30 days of the refusal decision",
            "Leave Stage: a Federal Court judge reviews the application and decides whether the case is arguable",
            "If Leave Is Granted: the case proceeds to a full hearing where both parties submit arguments",
            "Decision: the Court may dismiss the application, quash the decision and order a redetermination by a different officer",
          ],
        ],
      },
      {
        heading: "Standard of Review",
        content: [
          "The Court will not reweigh the evidence. It reviews whether the decision was reasonable, that is, justified, transparent, intelligible and within the range of acceptable outcomes. This is a high bar.",
        ],
      },
    ],
    policyAlert: {
      title: "30 day deadline",
      description:
        "Applications for leave and judicial review must be filed within 30 days of the refusal decision. There are no exceptions.",
      effectiveDate: "Ongoing",
    },
    feeBreakdown: {
      items: [{ description: "Federal Court application fee", amount: "$50" }],
      total: "$50",
    },
    processingTime: {
      insideCanada: "Four to eight months",
      outsideCanada: "Not applicable",
      note: "Leave decision: two to four months; hearing, if leave is granted, two to four months later.",
    },
    refusalReasons: [],
    howWeHelp: {
      intro:
        "Federal Court reviews are highly technical and must be filed quickly. We provide experienced representation at all stages.",
      points: [
        "Review the refusal decision and assess the merits of a judicial review application.",
        "Prepare and file the application for leave within the 30 day deadline.",
        "Draft comprehensive memoranda and represent you at the hearing if leave is granted.",
      ],
      ctaText: "Challenge a citizenship refusal",
    },
    faqs: [
      {
        q: "What are the chances of success?",
        a: "Leave is granted in about 10 to 15 percent of cases. However, a strong application can significantly improve your odds.",
      },
      {
        q: "What if leave is denied?",
        a: "The decision is final. You cannot appeal a leave denial.",
      },
    ],
    relatedServices: ["citizenship-refusals-delays"],
  },

  "missed-deadlines-defective-filings": {
    id: "missed-deadlines-defective-filings",
    title: "Missed Deadlines and Defective Filings",
    heroText:
      "Strategic advice where appeals or reviews are at risk due to missed deadlines, incomplete records or procedural non compliance.",
    hookParagraph:
      "Immigration deadlines are unforgiving. A single missed deadline can mean losing your right to appeal or judicial review. If you have missed a deadline or your filing was rejected as defective, time is of the essence. We may still be able to help.",
    sections: [
      {
        heading: "Consequences of Missed Deadlines",
        content: [
          "Immigration appeals and judicial reviews have strict, non extendable deadlines:",
          [
            "Immigration Appeal Division appeals: 30 days from the decision",
            "Refugee Appeal Division appeals: 15 days for notice, 30 days for memorandum",
            "Federal Court: 30 days for leave applications",
            "Restoration of status: 90 days from loss of status",
          ],
          "Missing a deadline can result in automatic dismissal or loss of rights.",
        ],
      },
      {
        heading: "Defective Filings",
        content: [
          "A filing is defective if it:",
          [
            "Omits required documents or forms",
            "Fails to include all parties",
            "Does not comply with formatting or service rules",
            "Is incomplete or unsigned",
          ],
          "Courts and tribunals may reject defective filings or grant limited time to correct them.",
        ],
      },
      {
        heading: "What to Do",
        content: [
          "If you have missed a deadline or received a rejection, options may include:",
          [
            "Requesting an extension: rarely granted for statutory deadlines",
            "Filing a motion to extend time in Federal Court",
            "Reapplying if the underlying matter is still eligible",
            "Seeking alternative remedies",
          ],
        ],
      },
    ],
    policyAlert: {
      title: "Federal Court motions to extend time",
      description:
        "If you missed the 30 day deadline for judicial review, you may file a motion to extend time. The Court considers four factors: continuing intention, merit of the application, prejudice to the respondent and a reasonable explanation for the delay.",
      effectiveDate: "Ongoing",
    },
    feeBreakdown: {
      items: [
        { description: "Motion to extend time (Federal Court)", amount: "$50" },
      ],
      total: "$50",
    },
    processingTime: {
      insideCanada: "Motions decided within weeks",
      outsideCanada: "Not applicable",
      note: "Act quickly; delays reduce your chances of success.",
    },
    refusalReasons: [],
    howWeHelp: {
      intro:
        "Time is critical in immigration matters. If you have missed a deadline or your filing was rejected, contact us immediately.",
      points: [
        "Assess your situation and advise on the best course of action.",
        "Prepare and file motions to extend time when possible.",
        "Help you correct defective filings quickly and accurately.",
      ],
      ctaText: "Fix a missed deadline",
    },
    faqs: [
      {
        q: "Is it possible to extend a statutory deadline?",
        a: "For Immigration Appeal Division and Refugee Appeal Division appeals, deadlines are set by regulation and extensions are rarely granted. For Federal Court, you may file a motion to extend time, but you must show a reasonable explanation for the delay.",
      },
      {
        q: "What if my appeal was rejected as defective?",
        a: "You may have a short window to refile correctly. Contact us immediately.",
      },
    ],
    relatedServices: [
      "iad-appeals",
      "rad-appeals",
      "citizenship-refusals-federal-court",
    ],
  },
};
