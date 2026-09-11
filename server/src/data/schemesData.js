// STATIC_OFFICIAL_INFORMATION
// Each scheme's details are manually verified against its official government source.
// This is NOT fetched from a live API — no reliable free API exists for this data.
// Re-verify periodically against the official URLs, since amounts/rates can change.

const schemesData = [
  {
    id: "pm-kisan",
    name: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
    category: "farmer",
    icon: "🌾",
    whoCanBenefit: "Landholding farmer families (husband, wife, minor children)",
    mainBenefit: "₹6,000 per year, paid in 3 installments of ₹2,000 directly to bank account",
    eligibility: [
      "Indian citizen",
      "Must own cultivable agricultural land recorded in state/UT land records",
      "Valid Aadhaar linked to bank account",
    ],
    requiredDocuments: ["Aadhaar card", "Land ownership records", "Bank account details (IFSC + account number)"],
    howToApply: "Register online at the official PM-KISAN portal, or visit your nearest Common Service Centre (CSC)",
    officialWebsite: "https://pmkisan.gov.in",
    lastVerified: "2026-09-11",
  },
  {
    id: "ayushman-bharat",
    name: "Ayushman Bharat - PM Jan Arogya Yojana (PMJAY)",
    category: "healthcare",
    icon: "🏥",
    whoCanBenefit: "Economically weaker families (identified via SECC 2011 data); all citizens aged 70+ regardless of income",
    mainBenefit: "₹5 lakh per family per year for hospitalisation, cashless treatment at empaneled hospitals",
    eligibility: [
      "Families identified as poor/deprived under SECC 2011 socio-economic criteria",
      "OR any Indian citizen aged 70 or above (universal, regardless of income)",
      "Check exact eligibility using the 'Am I Eligible' tool on the official site",
    ],
    requiredDocuments: ["Aadhaar card", "Ration card (if applicable)", "Mobile number for OTP verification"],
    howToApply: "Check eligibility and apply via the Ayushman App or official PMJAY portal using Aadhaar e-KYC",
    officialWebsite: "https://pmjay.gov.in",
    lastVerified: "2026-09-11",
  },
  {
    id: "pmay",
    name: "Pradhan Mantri Awas Yojana (PMAY)",
    category: "housing",
    icon: "🏠",
    whoCanBenefit: "Families without a pucca (permanent) house, in both rural (PMAY-Gramin) and urban (PMAY-Urban) areas",
    mainBenefit: "Financial assistance to build/buy a house, plus interest subsidy on home loans (subsidy % varies by income category)",
    eligibility: [
      "Rural: name must appear in the SECC/Awaas+ survey list, verified by gram sabha",
      "Urban: household in EWS/LIG/MIG income category without an existing pucca house",
      "Priority to SC/ST households, minorities, widows, persons with disabilities",
    ],
    requiredDocuments: ["Aadhaar card", "Income certificate", "Bank passbook", "Land/house documents (if applicable)"],
    howToApply: "Rural: contact your gram panchayat / block office. Urban: apply via your Urban Local Body or state PMAY-Urban portal",
    officialWebsite: "https://pmay-urban.gov.in",
    lastVerified: "2026-09-11",
  },
  {
    id: "sukanya-samriddhi",
    name: "Sukanya Samriddhi Yojana (SSY)",
    category: "women",
    icon: "👧",
    whoCanBenefit: "Parents/guardians of a girl child below 10 years of age",
    mainBenefit: "Tax-free savings account for a girl child at 8.2% annual interest (compounded yearly), matures after 21 years",
    eligibility: [
      "Girl child must be below 10 years old at account opening",
      "One account per girl child, maximum two accounts per family (three in case of twins/triplets)",
      "Minimum deposit ₹250/year, maximum ₹1.5 lakh/year",
    ],
    requiredDocuments: ["Girl child's birth certificate", "Parent/guardian ID and address proof", "PAN or Aadhaar"],
    howToApply: "Open an account at any participating bank or post office branch",
    officialWebsite: "https://www.indiapost.gov.in",
    lastVerified: "2026-09-11",
  },
  {
    id: "pm-mudra",
    name: "Pradhan Mantri Mudra Yojana (PMMY)",
    category: "employment",
    icon: "💼",
    whoCanBenefit: "Small/micro business owners, self-employed individuals, non-corporate non-farm businesses",
    mainBenefit: "Collateral-free business loans from ₹50,000 up to ₹20 lakh (Shishu/Kishor/Tarun/Tarun Plus categories)",
    eligibility: [
      "Indian citizen aged 18–65 with a viable business plan",
      "Non-corporate small business in manufacturing, trading, or services",
      "Agricultural crop loans are NOT covered here (see PM-KISAN instead)",
    ],
    requiredDocuments: ["Aadhaar card", "Business proof/plan", "Address proof", "Bank account details"],
    howToApply: "Apply via the Udyami Mitra portal, or visit any bank, NBFC, or microfinance institution branch",
    officialWebsite: "https://www.mudra.org.in",
    lastVerified: "2026-09-11",
  },
];

export default schemesData;