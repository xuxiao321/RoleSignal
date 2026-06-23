export type CompensationRange = {
  base: [number, number];
  bonus: [number, number];
  equity: [number, number];
  total: [number, number];
};

export type SourceSignal = {
  name: string;
  kind: "Compensation" | "Employee reviews" | "User reports" | "Job postings";
  coverage: number;
  freshness: string;
};

export type FieldEvidence = {
  field: string;
  status: "Available" | "Partial" | "Inferred" | "Needs data" | "Needs user reports";
  confidence: number;
  sourceType: string;
  sourceName: string;
  sourceUrl: string;
  observedAt: string;
  note: string;
};

export type DecisionGap = {
  label: string;
  detail: string;
  severity: "high" | "medium" | "low";
  source: "official_posting" | "missing_employee_reports" | "rolesignal_rule";
};

export type SeniorityBand =
  | "Entry"
  | "Mid"
  | "Senior"
  | "Staff"
  | "Principal"
  | "Leadership"
  | "Unspecified";

export type RoleProfile = {
  slug: string;
  company: string;
  domain: string;
  role: string;
  level: string;
  companyLevel: string;
  levelSystem: string;
  seniorityBand: SeniorityBand;
  levelRank: number;
  levelNotes: string;
  location: string;
  team: string;
  employmentMode: "Remote" | "Hybrid" | "Onsite" | "Unspecified";
  verdict: "Strong fit" | "Proceed carefully" | "Negotiate" | "High intensity";
  oneLine: string;
  compensation: CompensationRange;
  workLifeBalance: number;
  benefits: number;
  growth: number;
  confidence: number;
  sampleCount: number;
  verifiedCount: number;
  lastUpdated: string;
  hoursPerWeek: [number, number];
  workplaceSignals: string[];
  oncall: string;
  promotionSpeed: "Fast" | "Moderate" | "Slow" | "Needs data";
  negotiationRoom: "Low" | "Medium" | "High" | "Needs data";
  sourceSignals: SourceSignal[];
  benefitSignals: string[];
  evidence: FieldEvidence[];
  decisionGaps: DecisionGap[];
  upside: string[];
  watchouts: string[];
};

export const roleProfiles: RoleProfile[] = [
  {
    "slug": "thinking-machines-software-engineer-supercomputing-sf",
    "company": "Thinking Machines Lab",
    "domain": "thinkingmachines.ai",
    "role": "Software Engineer",
    "level": "Not disclosed",
    "companyLevel": "Not disclosed",
    "levelSystem": "Not disclosed",
    "seniorityBand": "Unspecified",
    "levelRank": 0,
    "levelNotes": "The official posting does not disclose a clear seniority band.",
    "location": "San Francisco, CA",
    "team": "Supercomputing",
    "employmentMode": "Onsite",
    "verdict": "High intensity",
    "oneLine": "Official posting for a supercomputing engineering role focused on large GPU clusters, storage paths, and training infrastructure.",
    "compensation": {
      "base": [
        350000,
        475000
      ],
      "bonus": [
        0,
        0
      ],
      "equity": [
        0,
        0
      ],
      "total": [
        350000,
        475000
      ]
    },
    "workLifeBalance": 0,
    "benefits": 0,
    "growth": 0,
    "confidence": 68,
    "sampleCount": 1,
    "verifiedCount": 1,
    "lastUpdated": "2026-06-22",
    "hoursPerWeek": [
      0,
      0
    ],
    "workplaceSignals": [
      "Work mode: Onsite",
      "Location: San Francisco, CA"
    ],
    "oncall": "Not disclosed in the official posting; needs user reports.",
    "promotionSpeed": "Needs data",
    "negotiationRoom": "Needs data",
    "sourceSignals": [
      {
        "name": "Official job posting",
        "kind": "Job postings",
        "coverage": 95,
        "freshness": "Observed Jun 2026"
      },
      {
        "name": "Public wage data",
        "kind": "Compensation",
        "coverage": 45,
        "freshness": "Baseline only"
      },
      {
        "name": "Needs user reports",
        "kind": "User reports",
        "coverage": 10,
        "freshness": "No verified reports yet"
      }
    ],
    "benefitSignals": [
      "Health insurance",
      "Dental insurance",
      "Vision insurance",
      "Unlimited PTO",
      "Paid parental leave",
      "Relocation support as needed"
    ],
    "evidence": [
      {
        "field": "Listed compensation",
        "status": "Available",
        "confidence": 95,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://job-boards.greenhouse.io/thinkingmachines/jobs/5013914008",
        "observedAt": "2026-06-22",
        "note": "Official posting discloses annual salary range of $350000-$475000 USD; bonus/equity not quantified."
      },
      {
        "field": "Company level",
        "status": "Needs data",
        "confidence": 20,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://job-boards.greenhouse.io/thinkingmachines/jobs/5013914008",
        "observedAt": "2026-06-22",
        "note": "The official posting does not disclose an internal company ladder level."
      },
      {
        "field": "Seniority",
        "status": "Inferred",
        "confidence": 70,
        "sourceType": "rolesignal_inference",
        "sourceName": "RoleSignal normalization",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Normalized from title and posting-level text. Verify with user reports when possible."
      },
      {
        "field": "Benefits",
        "status": "Partial",
        "confidence": 65,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://job-boards.greenhouse.io/thinkingmachines/jobs/5013914008",
        "observedAt": "2026-06-22",
        "note": "Official posting benefits are listed as coverage signals. Benefit quality still needs employee reports."
      },
      {
        "field": "WLB",
        "status": "Needs user reports",
        "confidence": 10,
        "sourceType": "missing",
        "sourceName": "No verified source yet",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Needs verified user reports before showing a real WLB score."
      },
      {
        "field": "On-call",
        "status": "Needs user reports",
        "confidence": 10,
        "sourceType": "missing",
        "sourceName": "No verified source yet",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Official postings rarely disclose on-call cadence; needs user reports."
      }
    ],
    "decisionGaps": [
      {
        "label": "Full TC unclear",
        "detail": "Posting only confirms listed/base pay.",
        "severity": "high",
        "source": "rolesignal_rule"
      },
      {
        "label": "Equity/bonus unclear",
        "detail": "Eligibility is mentioned, but amount is not.",
        "severity": "high",
        "source": "official_posting"
      },
      {
        "label": "WLB uncertain",
        "detail": "No employee reports for hours, evenings, or weekends yet.",
        "severity": "high",
        "source": "missing_employee_reports"
      },
      {
        "label": "On-call uncertain",
        "detail": "Cadence and incident load are not verified.",
        "severity": "medium",
        "source": "missing_employee_reports"
      },
      {
        "label": "Level unclear",
        "detail": "Internal ladder level is not disclosed.",
        "severity": "medium",
        "source": "official_posting"
      },
      {
        "label": "Seniority unclear",
        "detail": "Scope and promotion bar need confirmation.",
        "severity": "medium",
        "source": "rolesignal_rule"
      },
      {
        "label": "Few employee reports",
        "detail": "Mostly posting-backed today.",
        "severity": "low",
        "source": "missing_employee_reports"
      }
    ],
    "upside": [
      "Very high listed salary range",
      "Direct work on large-scale AI infrastructure",
      "Benefits listed in official posting"
    ],
    "watchouts": [
      "Base/listed salary only; bonus and equity not quantified",
      "WLB and on-call not disclosed",
      "Small sample count"
    ]
  },
  {
    "slug": "branch-senior-software-engineer-platform-remote-us",
    "company": "Branch",
    "domain": "branchapp.com",
    "role": "Senior Software Engineer",
    "level": "Senior",
    "companyLevel": "Not disclosed",
    "levelSystem": "Not disclosed",
    "seniorityBand": "Senior",
    "levelRank": 3,
    "levelNotes": "Inferred from Senior, Sr., III, or IC4/IC5 in the title or level.",
    "location": "United States",
    "team": "Platform",
    "employmentMode": "Remote",
    "verdict": "Strong fit",
    "oneLine": "Official posting for a remote senior platform role building scalable backend services and REST APIs.",
    "compensation": {
      "base": [
        160000,
        170000
      ],
      "bonus": [
        0,
        0
      ],
      "equity": [
        0,
        0
      ],
      "total": [
        160000,
        170000
      ]
    },
    "workLifeBalance": 0,
    "benefits": 0,
    "growth": 0,
    "confidence": 62,
    "sampleCount": 1,
    "verifiedCount": 1,
    "lastUpdated": "2026-06-22",
    "hoursPerWeek": [
      0,
      0
    ],
    "workplaceSignals": [
      "Work mode: Remote",
      "Location: United States",
      "Remote signal found in official posting",
      "US location restriction mentioned"
    ],
    "oncall": "Not disclosed in the official posting; needs user reports.",
    "promotionSpeed": "Needs data",
    "negotiationRoom": "Needs data",
    "sourceSignals": [
      {
        "name": "Official job posting",
        "kind": "Job postings",
        "coverage": 95,
        "freshness": "Observed Jun 2026"
      },
      {
        "name": "Public wage data",
        "kind": "Compensation",
        "coverage": 45,
        "freshness": "Baseline only"
      },
      {
        "name": "Needs user reports",
        "kind": "User reports",
        "coverage": 10,
        "freshness": "No verified reports yet"
      }
    ],
    "benefitSignals": [
      "Market-leading medical insurance",
      "Dental insurance",
      "Vision insurance",
      "Stock options",
      "401(k)",
      "12 weeks paid parental leave"
    ],
    "evidence": [
      {
        "field": "Listed compensation",
        "status": "Available",
        "confidence": 95,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://job-boards.greenhouse.io/branch/jobs/7771615003",
        "observedAt": "2026-06-22",
        "note": "Official posting discloses salary range of $160000-$170000; stock options listed but not quantified."
      },
      {
        "field": "Company level",
        "status": "Needs data",
        "confidence": 20,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://job-boards.greenhouse.io/branch/jobs/7771615003",
        "observedAt": "2026-06-22",
        "note": "The official posting does not disclose an internal company ladder level."
      },
      {
        "field": "Seniority",
        "status": "Inferred",
        "confidence": 70,
        "sourceType": "rolesignal_inference",
        "sourceName": "RoleSignal normalization",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Normalized from title and posting-level text. Verify with user reports when possible."
      },
      {
        "field": "Benefits",
        "status": "Partial",
        "confidence": 65,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://job-boards.greenhouse.io/branch/jobs/7771615003",
        "observedAt": "2026-06-22",
        "note": "Official posting benefits are listed as coverage signals. Benefit quality still needs employee reports."
      },
      {
        "field": "WLB",
        "status": "Needs user reports",
        "confidence": 10,
        "sourceType": "missing",
        "sourceName": "No verified source yet",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Needs verified user reports before showing a real WLB score."
      },
      {
        "field": "On-call",
        "status": "Needs user reports",
        "confidence": 10,
        "sourceType": "missing",
        "sourceName": "No verified source yet",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Official postings rarely disclose on-call cadence; needs user reports."
      }
    ],
    "decisionGaps": [
      {
        "label": "Full TC unclear",
        "detail": "Posting only confirms listed/base pay.",
        "severity": "high",
        "source": "rolesignal_rule"
      },
      {
        "label": "Equity/bonus unclear",
        "detail": "Eligibility is mentioned, but amount is not.",
        "severity": "high",
        "source": "official_posting"
      },
      {
        "label": "WLB uncertain",
        "detail": "No employee reports for hours, evenings, or weekends yet.",
        "severity": "high",
        "source": "missing_employee_reports"
      },
      {
        "label": "On-call uncertain",
        "detail": "Cadence and incident load are not verified.",
        "severity": "medium",
        "source": "missing_employee_reports"
      },
      {
        "label": "Level unclear",
        "detail": "Internal ladder level is not disclosed.",
        "severity": "medium",
        "source": "official_posting"
      },
      {
        "label": "Few employee reports",
        "detail": "Mostly posting-backed today.",
        "severity": "low",
        "source": "missing_employee_reports"
      }
    ],
    "upside": [
      "Remote US role",
      "Stock options listed as a benefit",
      "Clear backend platform scope"
    ],
    "watchouts": [
      "Base salary only; equity not quantified",
      "WLB and on-call not disclosed",
      "Unable to hire outside the US per posting"
    ]
  },
  {
    "slug": "chainguard-staff-software-engineer-athena-remote-us",
    "company": "Chainguard",
    "domain": "chainguard.dev",
    "role": "Staff Software Engineer",
    "level": "Staff",
    "companyLevel": "Not disclosed",
    "levelSystem": "Not disclosed",
    "seniorityBand": "Staff",
    "levelRank": 4,
    "levelNotes": "Inferred from Staff or Lead in the title or level.",
    "location": "United States - Remote",
    "team": "Athena",
    "employmentMode": "Remote",
    "verdict": "Strong fit",
    "oneLine": "Official posting for a staff backend role owning customer onboarding workflows, entitlement management, and data validation pipelines.",
    "compensation": {
      "base": [
        170000,
        231000
      ],
      "bonus": [
        0,
        0
      ],
      "equity": [
        0,
        0
      ],
      "total": [
        170000,
        231000
      ]
    },
    "workLifeBalance": 0,
    "benefits": 0,
    "growth": 0,
    "confidence": 64,
    "sampleCount": 1,
    "verifiedCount": 1,
    "lastUpdated": "2026-06-22",
    "hoursPerWeek": [
      0,
      0
    ],
    "workplaceSignals": [
      "Work mode: Remote",
      "Location: United States - Remote",
      "Remote signal found in official posting"
    ],
    "oncall": "Not disclosed in the official posting; needs user reports.",
    "promotionSpeed": "Needs data",
    "negotiationRoom": "Needs data",
    "sourceSignals": [
      {
        "name": "Official job posting",
        "kind": "Job postings",
        "coverage": 95,
        "freshness": "Observed Jun 2026"
      },
      {
        "name": "Public wage data",
        "kind": "Compensation",
        "coverage": 45,
        "freshness": "Baseline only"
      },
      {
        "name": "Needs user reports",
        "kind": "User reports",
        "coverage": 10,
        "freshness": "No verified reports yet"
      }
    ],
    "benefitSignals": [
      "Stock options",
      "Secondary offering participation",
      "10-year option exercise window",
      "100% covered health insurance premiums",
      "Vision insurance",
      "Dental insurance",
      "Paid parental leave",
      "Remote-first culture"
    ],
    "evidence": [
      {
        "field": "Listed compensation",
        "status": "Available",
        "confidence": 95,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://job-boards.greenhouse.io/chainguard/jobs/4689447006",
        "observedAt": "2026-06-22",
        "note": "Official posting discloses base salary range of $170000-$231000 USD; stock options listed but not quantified."
      },
      {
        "field": "Company level",
        "status": "Needs data",
        "confidence": 20,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://job-boards.greenhouse.io/chainguard/jobs/4689447006",
        "observedAt": "2026-06-22",
        "note": "The official posting does not disclose an internal company ladder level."
      },
      {
        "field": "Seniority",
        "status": "Inferred",
        "confidence": 70,
        "sourceType": "rolesignal_inference",
        "sourceName": "RoleSignal normalization",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Normalized from title and posting-level text. Verify with user reports when possible."
      },
      {
        "field": "Benefits",
        "status": "Partial",
        "confidence": 65,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://job-boards.greenhouse.io/chainguard/jobs/4689447006",
        "observedAt": "2026-06-22",
        "note": "Official posting benefits are listed as coverage signals. Benefit quality still needs employee reports."
      },
      {
        "field": "WLB",
        "status": "Needs user reports",
        "confidence": 10,
        "sourceType": "missing",
        "sourceName": "No verified source yet",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Needs verified user reports before showing a real WLB score."
      },
      {
        "field": "On-call",
        "status": "Needs user reports",
        "confidence": 10,
        "sourceType": "missing",
        "sourceName": "No verified source yet",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Official postings rarely disclose on-call cadence; needs user reports."
      }
    ],
    "decisionGaps": [
      {
        "label": "Full TC unclear",
        "detail": "Posting only confirms listed/base pay.",
        "severity": "high",
        "source": "rolesignal_rule"
      },
      {
        "label": "Equity/bonus unclear",
        "detail": "Eligibility is mentioned, but amount is not.",
        "severity": "high",
        "source": "official_posting"
      },
      {
        "label": "WLB uncertain",
        "detail": "No employee reports for hours, evenings, or weekends yet.",
        "severity": "high",
        "source": "missing_employee_reports"
      },
      {
        "label": "On-call uncertain",
        "detail": "Cadence and incident load are not verified.",
        "severity": "medium",
        "source": "missing_employee_reports"
      },
      {
        "label": "Level unclear",
        "detail": "Internal ladder level is not disclosed.",
        "severity": "medium",
        "source": "official_posting"
      },
      {
        "label": "Few employee reports",
        "detail": "Mostly posting-backed today.",
        "severity": "low",
        "source": "missing_employee_reports"
      }
    ],
    "upside": [
      "Remote-first culture",
      "Stock options listed",
      "Strong health and parental leave benefits"
    ],
    "watchouts": [
      "Base salary only; equity not quantified",
      "WLB and on-call not disclosed",
      "Security domain may require operational rigor"
    ]
  },
  {
    "slug": "chainguard-principal-software-engineer-athena-remote-us",
    "company": "Chainguard",
    "domain": "chainguard.dev",
    "role": "Principal Software Engineer",
    "level": "Principal",
    "companyLevel": "Not disclosed",
    "levelSystem": "Not disclosed",
    "seniorityBand": "Principal",
    "levelRank": 5,
    "levelNotes": "Inferred from Principal in the title or level.",
    "location": "United States - Remote",
    "team": "Athena",
    "employmentMode": "Remote",
    "verdict": "Strong fit",
    "oneLine": "Official posting for a principal-level distributed systems role setting technical direction for Chainguard's Athena product area.",
    "compensation": {
      "base": [
        220000,
        258000
      ],
      "bonus": [
        0,
        0
      ],
      "equity": [
        0,
        0
      ],
      "total": [
        220000,
        258000
      ]
    },
    "workLifeBalance": 0,
    "benefits": 0,
    "growth": 0,
    "confidence": 66,
    "sampleCount": 1,
    "verifiedCount": 1,
    "lastUpdated": "2026-06-22",
    "hoursPerWeek": [
      0,
      0
    ],
    "workplaceSignals": [
      "Work mode: Remote",
      "Location: United States - Remote"
    ],
    "oncall": "Not disclosed in the official posting; needs user reports.",
    "promotionSpeed": "Needs data",
    "negotiationRoom": "Needs data",
    "sourceSignals": [
      {
        "name": "Official job posting",
        "kind": "Job postings",
        "coverage": 95,
        "freshness": "Observed Jun 2026"
      },
      {
        "name": "Public wage data",
        "kind": "Compensation",
        "coverage": 45,
        "freshness": "Baseline only"
      },
      {
        "name": "Needs user reports",
        "kind": "User reports",
        "coverage": 10,
        "freshness": "No verified reports yet"
      }
    ],
    "benefitSignals": [
      "Stock options",
      "Secondary offering participation",
      "10-year option exercise window",
      "100% covered health insurance premiums",
      "Vision insurance",
      "Dental insurance",
      "Paid parental leave",
      "Remote-first culture"
    ],
    "evidence": [
      {
        "field": "Listed compensation",
        "status": "Available",
        "confidence": 95,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://job-boards.greenhouse.io/chainguard/jobs/4689477006",
        "observedAt": "2026-06-22",
        "note": "Official posting discloses base salary range of $220000-$258000 USD; stock options listed but not quantified."
      },
      {
        "field": "Company level",
        "status": "Needs data",
        "confidence": 20,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://job-boards.greenhouse.io/chainguard/jobs/4689477006",
        "observedAt": "2026-06-22",
        "note": "The official posting does not disclose an internal company ladder level."
      },
      {
        "field": "Seniority",
        "status": "Inferred",
        "confidence": 70,
        "sourceType": "rolesignal_inference",
        "sourceName": "RoleSignal normalization",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Normalized from title and posting-level text. Verify with user reports when possible."
      },
      {
        "field": "Benefits",
        "status": "Partial",
        "confidence": 65,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://job-boards.greenhouse.io/chainguard/jobs/4689477006",
        "observedAt": "2026-06-22",
        "note": "Official posting benefits are listed as coverage signals. Benefit quality still needs employee reports."
      },
      {
        "field": "WLB",
        "status": "Needs user reports",
        "confidence": 10,
        "sourceType": "missing",
        "sourceName": "No verified source yet",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Needs verified user reports before showing a real WLB score."
      },
      {
        "field": "On-call",
        "status": "Needs user reports",
        "confidence": 10,
        "sourceType": "missing",
        "sourceName": "No verified source yet",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Official postings rarely disclose on-call cadence; needs user reports."
      }
    ],
    "decisionGaps": [
      {
        "label": "Full TC unclear",
        "detail": "Posting only confirms listed/base pay.",
        "severity": "high",
        "source": "rolesignal_rule"
      },
      {
        "label": "Equity/bonus unclear",
        "detail": "Eligibility is mentioned, but amount is not.",
        "severity": "high",
        "source": "official_posting"
      },
      {
        "label": "WLB uncertain",
        "detail": "No employee reports for hours, evenings, or weekends yet.",
        "severity": "high",
        "source": "missing_employee_reports"
      },
      {
        "label": "On-call uncertain",
        "detail": "Cadence and incident load are not verified.",
        "severity": "medium",
        "source": "missing_employee_reports"
      },
      {
        "label": "Level unclear",
        "detail": "Internal ladder level is not disclosed.",
        "severity": "medium",
        "source": "official_posting"
      },
      {
        "label": "Few employee reports",
        "detail": "Mostly posting-backed today.",
        "severity": "low",
        "source": "missing_employee_reports"
      }
    ],
    "upside": [
      "Remote senior technical leadership",
      "Stock options listed",
      "Strong benefits listed in posting"
    ],
    "watchouts": [
      "Base salary only; equity not quantified",
      "WLB and on-call not disclosed",
      "High responsibility scope"
    ]
  },
  {
    "slug": "klaviyo-senior-lead-software-engineer-dev-infra-sf",
    "company": "Klaviyo",
    "domain": "klaviyo.com",
    "role": "Senior Lead Software Engineer",
    "level": "Senior Lead",
    "companyLevel": "Not disclosed",
    "levelSystem": "Not disclosed",
    "seniorityBand": "Staff",
    "levelRank": 4,
    "levelNotes": "Inferred from Staff or Lead in the title or level.",
    "location": "San Francisco, CA",
    "team": "Developer Infrastructure",
    "employmentMode": "Hybrid",
    "verdict": "High intensity",
    "oneLine": "Official posting for a senior lead developer infrastructure role focused on backend architecture, dependencies, and platform upgrades.",
    "compensation": {
      "base": [
        216000,
        324000
      ],
      "bonus": [
        0,
        0
      ],
      "equity": [
        0,
        0
      ],
      "total": [
        216000,
        324000
      ]
    },
    "workLifeBalance": 0,
    "benefits": 0,
    "growth": 0,
    "confidence": 67,
    "sampleCount": 1,
    "verifiedCount": 1,
    "lastUpdated": "2026-06-22",
    "hoursPerWeek": [
      0,
      0
    ],
    "workplaceSignals": [
      "Work mode: Hybrid",
      "Location: San Francisco, CA",
      "Travel requirement mentioned"
    ],
    "oncall": "Not disclosed in the official posting; needs user reports.",
    "promotionSpeed": "Needs data",
    "negotiationRoom": "Needs data",
    "sourceSignals": [
      {
        "name": "Official job posting",
        "kind": "Job postings",
        "coverage": 95,
        "freshness": "Observed Jun 2026"
      },
      {
        "name": "Public wage data",
        "kind": "Compensation",
        "coverage": 45,
        "freshness": "Baseline only"
      },
      {
        "name": "Needs user reports",
        "kind": "User reports",
        "coverage": 10,
        "freshness": "No verified reports yet"
      }
    ],
    "benefitSignals": [
      "Bonus eligibility may apply",
      "Equity eligibility may apply",
      "Benefits listed in official posting; details need normalization"
    ],
    "evidence": [
      {
        "field": "Listed compensation",
        "status": "Available",
        "confidence": 95,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://www.klaviyo.com/careers/jobs/7664323003",
        "observedAt": "2026-06-22",
        "note": "Official posting discloses US base pay range of $216000-$324000; bonus/equity may apply but are not quantified."
      },
      {
        "field": "Company level",
        "status": "Needs data",
        "confidence": 20,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://www.klaviyo.com/careers/jobs/7664323003",
        "observedAt": "2026-06-22",
        "note": "The official posting does not disclose an internal company ladder level."
      },
      {
        "field": "Seniority",
        "status": "Inferred",
        "confidence": 70,
        "sourceType": "rolesignal_inference",
        "sourceName": "RoleSignal normalization",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Normalized from title and posting-level text. Verify with user reports when possible."
      },
      {
        "field": "Benefits",
        "status": "Partial",
        "confidence": 65,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://www.klaviyo.com/careers/jobs/7664323003",
        "observedAt": "2026-06-22",
        "note": "Official posting benefits are listed as coverage signals. Benefit quality still needs employee reports."
      },
      {
        "field": "WLB",
        "status": "Needs user reports",
        "confidence": 10,
        "sourceType": "missing",
        "sourceName": "No verified source yet",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Needs verified user reports before showing a real WLB score."
      },
      {
        "field": "On-call",
        "status": "Needs user reports",
        "confidence": 10,
        "sourceType": "missing",
        "sourceName": "No verified source yet",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Official postings rarely disclose on-call cadence; needs user reports."
      }
    ],
    "decisionGaps": [
      {
        "label": "Full TC unclear",
        "detail": "Posting only confirms listed/base pay.",
        "severity": "high",
        "source": "rolesignal_rule"
      },
      {
        "label": "Equity/bonus unclear",
        "detail": "Eligibility is mentioned, but amount is not.",
        "severity": "high",
        "source": "official_posting"
      },
      {
        "label": "WLB uncertain",
        "detail": "No employee reports for hours, evenings, or weekends yet.",
        "severity": "high",
        "source": "missing_employee_reports"
      },
      {
        "label": "On-call uncertain",
        "detail": "Cadence and incident load are not verified.",
        "severity": "medium",
        "source": "missing_employee_reports"
      },
      {
        "label": "Level unclear",
        "detail": "Internal ladder level is not disclosed.",
        "severity": "medium",
        "source": "official_posting"
      },
      {
        "label": "Few employee reports",
        "detail": "Mostly posting-backed today.",
        "severity": "low",
        "source": "missing_employee_reports"
      }
    ],
    "upside": [
      "High seniority platform scope",
      "Posting notes bonus/equity may be part of total package",
      "Clear technical leadership expectations"
    ],
    "watchouts": [
      "Base salary only; bonus/equity not quantified",
      "WLB and on-call not disclosed",
      "Up to 10% travel noted"
    ]
  },
  {
    "slug": "finch-senior-software-engineer-platform-sf",
    "company": "Finch",
    "domain": "tryfinch.com",
    "role": "Senior Software Engineer",
    "level": "Senior",
    "companyLevel": "Not disclosed",
    "levelSystem": "Not disclosed",
    "seniorityBand": "Senior",
    "levelRank": 3,
    "levelNotes": "Inferred from Senior, Sr., III, or IC4/IC5 in the title or level.",
    "location": "San Francisco, CA",
    "team": "Platform",
    "employmentMode": "Hybrid",
    "verdict": "Strong fit",
    "oneLine": "Official posting for a senior platform engineer role improving infrastructure stability, developer tooling, and security.",
    "compensation": {
      "base": [
        200000,
        220000
      ],
      "bonus": [
        0,
        0
      ],
      "equity": [
        0,
        0
      ],
      "total": [
        200000,
        220000
      ]
    },
    "workLifeBalance": 0,
    "benefits": 0,
    "growth": 0,
    "confidence": 63,
    "sampleCount": 1,
    "verifiedCount": 1,
    "lastUpdated": "2026-06-22",
    "hoursPerWeek": [
      0,
      0
    ],
    "workplaceSignals": [
      "Work mode: Hybrid",
      "Location: San Francisco, CA",
      "Hybrid collaboration signal found in official posting"
    ],
    "oncall": "Not disclosed in the official posting; needs user reports.",
    "promotionSpeed": "Needs data",
    "negotiationRoom": "Needs data",
    "sourceSignals": [
      {
        "name": "Official job posting",
        "kind": "Job postings",
        "coverage": 95,
        "freshness": "Observed Jun 2026"
      },
      {
        "name": "Public wage data",
        "kind": "Compensation",
        "coverage": 45,
        "freshness": "Baseline only"
      },
      {
        "name": "Needs user reports",
        "kind": "User reports",
        "coverage": 10,
        "freshness": "No verified reports yet"
      }
    ],
    "benefitSignals": [
      "Competitive equity",
      "10-year option exercise window",
      "Full medical coverage",
      "Dental coverage",
      "Vision coverage",
      "Unlimited PTO with 3-week minimum",
      "401(k)"
    ],
    "evidence": [
      {
        "field": "Listed compensation",
        "status": "Available",
        "confidence": 95,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://jobs.lever.co/finch/33d6699d-f841-4dd6-baa4-01faec0b8603",
        "observedAt": "2026-06-22",
        "note": "Official posting discloses minimum salary range of $200000-$220000; equity listed but not quantified."
      },
      {
        "field": "Company level",
        "status": "Needs data",
        "confidence": 20,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://jobs.lever.co/finch/33d6699d-f841-4dd6-baa4-01faec0b8603",
        "observedAt": "2026-06-22",
        "note": "The official posting does not disclose an internal company ladder level."
      },
      {
        "field": "Seniority",
        "status": "Inferred",
        "confidence": 70,
        "sourceType": "rolesignal_inference",
        "sourceName": "RoleSignal normalization",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Normalized from title and posting-level text. Verify with user reports when possible."
      },
      {
        "field": "Benefits",
        "status": "Partial",
        "confidence": 65,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://jobs.lever.co/finch/33d6699d-f841-4dd6-baa4-01faec0b8603",
        "observedAt": "2026-06-22",
        "note": "Official posting benefits are listed as coverage signals. Benefit quality still needs employee reports."
      },
      {
        "field": "WLB",
        "status": "Needs user reports",
        "confidence": 10,
        "sourceType": "missing",
        "sourceName": "No verified source yet",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Needs verified user reports before showing a real WLB score."
      },
      {
        "field": "On-call",
        "status": "Needs user reports",
        "confidence": 10,
        "sourceType": "missing",
        "sourceName": "No verified source yet",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Official postings rarely disclose on-call cadence; needs user reports."
      }
    ],
    "decisionGaps": [
      {
        "label": "Full TC unclear",
        "detail": "Posting only confirms listed/base pay.",
        "severity": "high",
        "source": "rolesignal_rule"
      },
      {
        "label": "Equity/bonus unclear",
        "detail": "Eligibility is mentioned, but amount is not.",
        "severity": "high",
        "source": "official_posting"
      },
      {
        "label": "WLB uncertain",
        "detail": "No employee reports for hours, evenings, or weekends yet.",
        "severity": "high",
        "source": "missing_employee_reports"
      },
      {
        "label": "On-call uncertain",
        "detail": "Cadence and incident load are not verified.",
        "severity": "medium",
        "source": "missing_employee_reports"
      },
      {
        "label": "Level unclear",
        "detail": "Internal ladder level is not disclosed.",
        "severity": "medium",
        "source": "official_posting"
      },
      {
        "label": "Few employee reports",
        "detail": "Mostly posting-backed today.",
        "severity": "low",
        "source": "missing_employee_reports"
      }
    ],
    "upside": [
      "Hybrid SF role",
      "Competitive equity listed",
      "Full medical coverage and unlimited PTO listed"
    ],
    "watchouts": [
      "Base salary only; equity not quantified",
      "WLB and on-call not disclosed",
      "Small platform team implies broad ownership"
    ]
  },
  {
    "slug": "applied-intuition-software-engineer-ai-sunnyvale",
    "company": "Applied Intuition",
    "domain": "applied.co",
    "role": "Software Engineer",
    "level": "Not disclosed",
    "companyLevel": "Not disclosed",
    "levelSystem": "Not disclosed",
    "seniorityBand": "Unspecified",
    "levelRank": 0,
    "levelNotes": "The official posting does not disclose a clear seniority band.",
    "location": "Sunnyvale, CA",
    "team": "AI Engineering",
    "employmentMode": "Onsite",
    "verdict": "High intensity",
    "oneLine": "Official posting for an AI engineering role building shared AI infrastructure, agent frameworks, and product capabilities.",
    "compensation": {
      "base": [
        126000,
        250000
      ],
      "bonus": [
        0,
        0
      ],
      "equity": [
        0,
        0
      ],
      "total": [
        126000,
        250000
      ]
    },
    "workLifeBalance": 0,
    "benefits": 0,
    "growth": 0,
    "confidence": 61,
    "sampleCount": 1,
    "verifiedCount": 1,
    "lastUpdated": "2026-06-22",
    "hoursPerWeek": [
      0,
      0
    ],
    "workplaceSignals": [
      "Work mode: Onsite",
      "Location: Sunnyvale, CA",
      "Onsite requirement found in official posting"
    ],
    "oncall": "Not disclosed in the official posting; needs user reports.",
    "promotionSpeed": "Needs data",
    "negotiationRoom": "Needs data",
    "sourceSignals": [
      {
        "name": "Official job posting",
        "kind": "Job postings",
        "coverage": 95,
        "freshness": "Observed Jun 2026"
      },
      {
        "name": "Public wage data",
        "kind": "Compensation",
        "coverage": 45,
        "freshness": "Baseline only"
      },
      {
        "name": "Needs user reports",
        "kind": "User reports",
        "coverage": 10,
        "freshness": "No verified reports yet"
      }
    ],
    "benefitSignals": [
      "Equity eligibility",
      "Benefits listed in official posting; details need normalization"
    ],
    "evidence": [
      {
        "field": "Listed compensation",
        "status": "Available",
        "confidence": 95,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://job-boards.greenhouse.io/appliedintuition/jobs/4677060005",
        "observedAt": "2026-06-22",
        "note": "Official posting discloses base salary range of $126000-$250000 USD; equity may apply but is not quantified."
      },
      {
        "field": "Company level",
        "status": "Needs data",
        "confidence": 20,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://job-boards.greenhouse.io/appliedintuition/jobs/4677060005",
        "observedAt": "2026-06-22",
        "note": "The official posting does not disclose an internal company ladder level."
      },
      {
        "field": "Seniority",
        "status": "Inferred",
        "confidence": 70,
        "sourceType": "rolesignal_inference",
        "sourceName": "RoleSignal normalization",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Normalized from title and posting-level text. Verify with user reports when possible."
      },
      {
        "field": "Benefits",
        "status": "Partial",
        "confidence": 65,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://job-boards.greenhouse.io/appliedintuition/jobs/4677060005",
        "observedAt": "2026-06-22",
        "note": "Official posting benefits are listed as coverage signals. Benefit quality still needs employee reports."
      },
      {
        "field": "WLB",
        "status": "Needs user reports",
        "confidence": 10,
        "sourceType": "missing",
        "sourceName": "No verified source yet",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Needs verified user reports before showing a real WLB score."
      },
      {
        "field": "On-call",
        "status": "Needs user reports",
        "confidence": 10,
        "sourceType": "missing",
        "sourceName": "No verified source yet",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Official postings rarely disclose on-call cadence; needs user reports."
      }
    ],
    "decisionGaps": [
      {
        "label": "Full TC unclear",
        "detail": "Posting only confirms listed/base pay.",
        "severity": "high",
        "source": "rolesignal_rule"
      },
      {
        "label": "Equity/bonus unclear",
        "detail": "Eligibility is mentioned, but amount is not.",
        "severity": "high",
        "source": "official_posting"
      },
      {
        "label": "WLB uncertain",
        "detail": "No employee reports for hours, evenings, or weekends yet.",
        "severity": "high",
        "source": "missing_employee_reports"
      },
      {
        "label": "On-call uncertain",
        "detail": "Cadence and incident load are not verified.",
        "severity": "medium",
        "source": "missing_employee_reports"
      },
      {
        "label": "Level unclear",
        "detail": "Internal ladder level is not disclosed.",
        "severity": "medium",
        "source": "official_posting"
      },
      {
        "label": "Seniority unclear",
        "detail": "Scope and promotion bar need confirmation.",
        "severity": "medium",
        "source": "rolesignal_rule"
      },
      {
        "label": "Few employee reports",
        "detail": "Mostly posting-backed today.",
        "severity": "low",
        "source": "missing_employee_reports"
      }
    ],
    "upside": [
      "AI infrastructure scope",
      "Equity and benefits are part of package per posting",
      "High-impact 0-to-1 product area"
    ],
    "watchouts": [
      "Base salary only; equity not quantified",
      "Posting expects primarily in-office work",
      "WLB and on-call not disclosed"
    ]
  },
  {
    "slug": "grid-senior-android-software-engineer-sf",
    "company": "Grid",
    "domain": "getgrid.app",
    "role": "Senior Android Software Engineer",
    "level": "Senior",
    "companyLevel": "Not disclosed",
    "levelSystem": "Not disclosed",
    "seniorityBand": "Senior",
    "levelRank": 3,
    "levelNotes": "Inferred from Senior, Sr., III, or IC4/IC5 in the title or level.",
    "location": "San Francisco, CA",
    "team": "Engineering",
    "employmentMode": "Onsite",
    "verdict": "Proceed carefully",
    "oneLine": "Official posting for a senior Android role building and scaling Grid's core financial products.",
    "compensation": {
      "base": [
        160000,
        200000
      ],
      "bonus": [
        0,
        0
      ],
      "equity": [
        0,
        0
      ],
      "total": [
        160000,
        200000
      ]
    },
    "workLifeBalance": 0,
    "benefits": 0,
    "growth": 0,
    "confidence": 58,
    "sampleCount": 1,
    "verifiedCount": 1,
    "lastUpdated": "2026-06-22",
    "hoursPerWeek": [
      0,
      0
    ],
    "workplaceSignals": [
      "Work mode: Onsite",
      "Location: San Francisco, CA",
      "Onsite requirement found in official posting"
    ],
    "oncall": "Not disclosed in the official posting; needs user reports.",
    "promotionSpeed": "Needs data",
    "negotiationRoom": "Needs data",
    "sourceSignals": [
      {
        "name": "Official job posting",
        "kind": "Job postings",
        "coverage": 95,
        "freshness": "Observed Jun 2026"
      },
      {
        "name": "Public wage data",
        "kind": "Compensation",
        "coverage": 45,
        "freshness": "Baseline only"
      },
      {
        "name": "Needs user reports",
        "kind": "User reports",
        "coverage": 10,
        "freshness": "No verified reports yet"
      }
    ],
    "benefitSignals": [
      "Medical insurance",
      "Dental insurance",
      "Vision insurance",
      "401(k)",
      "Life insurance"
    ],
    "evidence": [
      {
        "field": "Listed compensation",
        "status": "Available",
        "confidence": 95,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://jobs.lever.co/Grid/ba6b48d8-252f-44c5-96e1-09893a436b46",
        "observedAt": "2026-06-22",
        "note": "Official posting discloses salary range of $160000-$200000 per year."
      },
      {
        "field": "Company level",
        "status": "Needs data",
        "confidence": 20,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://jobs.lever.co/Grid/ba6b48d8-252f-44c5-96e1-09893a436b46",
        "observedAt": "2026-06-22",
        "note": "The official posting does not disclose an internal company ladder level."
      },
      {
        "field": "Seniority",
        "status": "Inferred",
        "confidence": 70,
        "sourceType": "rolesignal_inference",
        "sourceName": "RoleSignal normalization",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Normalized from title and posting-level text. Verify with user reports when possible."
      },
      {
        "field": "Benefits",
        "status": "Partial",
        "confidence": 65,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://jobs.lever.co/Grid/ba6b48d8-252f-44c5-96e1-09893a436b46",
        "observedAt": "2026-06-22",
        "note": "Official posting benefits are listed as coverage signals. Benefit quality still needs employee reports."
      },
      {
        "field": "WLB",
        "status": "Needs user reports",
        "confidence": 10,
        "sourceType": "missing",
        "sourceName": "No verified source yet",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Needs verified user reports before showing a real WLB score."
      },
      {
        "field": "On-call",
        "status": "Needs user reports",
        "confidence": 10,
        "sourceType": "missing",
        "sourceName": "No verified source yet",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Official postings rarely disclose on-call cadence; needs user reports."
      }
    ],
    "decisionGaps": [
      {
        "label": "Full TC unclear",
        "detail": "Posting only confirms listed/base pay.",
        "severity": "high",
        "source": "rolesignal_rule"
      },
      {
        "label": "Equity/bonus unclear",
        "detail": "Eligibility is mentioned, but amount is not.",
        "severity": "high",
        "source": "official_posting"
      },
      {
        "label": "WLB uncertain",
        "detail": "No employee reports for hours, evenings, or weekends yet.",
        "severity": "high",
        "source": "missing_employee_reports"
      },
      {
        "label": "On-call uncertain",
        "detail": "Cadence and incident load are not verified.",
        "severity": "medium",
        "source": "missing_employee_reports"
      },
      {
        "label": "Level unclear",
        "detail": "Internal ladder level is not disclosed.",
        "severity": "medium",
        "source": "official_posting"
      },
      {
        "label": "Few employee reports",
        "detail": "Mostly posting-backed today.",
        "severity": "low",
        "source": "missing_employee_reports"
      }
    ],
    "upside": [
      "Clear mobile ownership",
      "Benefits listed in posting",
      "Fintech product scope"
    ],
    "watchouts": [
      "Base salary only; equity not quantified",
      "Onsite SF role",
      "WLB and on-call not disclosed"
    ]
  },
  {
    "slug": "finix-senior-frontend-engineer-sf",
    "company": "Finix",
    "domain": "finix.com",
    "role": "Senior Frontend Engineer",
    "level": "IC4-IC5",
    "companyLevel": "IC4-IC5",
    "levelSystem": "Company IC ladder",
    "seniorityBand": "Senior",
    "levelRank": 3,
    "levelNotes": "Inferred from Senior, Sr., III, or IC4/IC5 in the title or level.",
    "location": "San Francisco, CA",
    "team": "Frontend Engineering",
    "employmentMode": "Onsite",
    "verdict": "Negotiate",
    "oneLine": "Official posting for a senior frontend engineer role building payment dashboards and embeddable merchant components.",
    "compensation": {
      "base": [
        160000,
        235000
      ],
      "bonus": [
        0,
        0
      ],
      "equity": [
        0,
        0
      ],
      "total": [
        160000,
        235000
      ]
    },
    "workLifeBalance": 0,
    "benefits": 0,
    "growth": 0,
    "confidence": 63,
    "sampleCount": 1,
    "verifiedCount": 1,
    "lastUpdated": "2026-06-22",
    "hoursPerWeek": [
      0,
      0
    ],
    "workplaceSignals": [
      "Work mode: Onsite",
      "Location: San Francisco, CA",
      "Onsite requirement found in official posting"
    ],
    "oncall": "Not disclosed in the official posting; needs user reports.",
    "promotionSpeed": "Needs data",
    "negotiationRoom": "Needs data",
    "sourceSignals": [
      {
        "name": "Official job posting",
        "kind": "Job postings",
        "coverage": 95,
        "freshness": "Observed Jun 2026"
      },
      {
        "name": "Public wage data",
        "kind": "Compensation",
        "coverage": 45,
        "freshness": "Baseline only"
      },
      {
        "name": "Needs user reports",
        "kind": "User reports",
        "coverage": 10,
        "freshness": "No verified reports yet"
      }
    ],
    "benefitSignals": [
      "Equity eligibility",
      "Benefits listed in official posting; details need normalization"
    ],
    "evidence": [
      {
        "field": "Listed compensation",
        "status": "Available",
        "confidence": 95,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://jobs.lever.co/finix/8447c745-3863-4b07-957e-50ad6a1b3f94",
        "observedAt": "2026-06-22",
        "note": "Official posting discloses base salary range of $160000-$235000 plus equity and benefits."
      },
      {
        "field": "Company level",
        "status": "Available",
        "confidence": 90,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://jobs.lever.co/finix/8447c745-3863-4b07-957e-50ad6a1b3f94",
        "observedAt": "2026-06-22",
        "note": "Company-specific level identified from official posting data."
      },
      {
        "field": "Seniority",
        "status": "Inferred",
        "confidence": 70,
        "sourceType": "rolesignal_inference",
        "sourceName": "RoleSignal normalization",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Normalized from title and posting-level text. Verify with user reports when possible."
      },
      {
        "field": "Benefits",
        "status": "Partial",
        "confidence": 65,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://jobs.lever.co/finix/8447c745-3863-4b07-957e-50ad6a1b3f94",
        "observedAt": "2026-06-22",
        "note": "Official posting benefits are listed as coverage signals. Benefit quality still needs employee reports."
      },
      {
        "field": "WLB",
        "status": "Needs user reports",
        "confidence": 10,
        "sourceType": "missing",
        "sourceName": "No verified source yet",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Needs verified user reports before showing a real WLB score."
      },
      {
        "field": "On-call",
        "status": "Needs user reports",
        "confidence": 10,
        "sourceType": "missing",
        "sourceName": "No verified source yet",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Official postings rarely disclose on-call cadence; needs user reports."
      }
    ],
    "decisionGaps": [
      {
        "label": "Full TC unclear",
        "detail": "Posting only confirms listed/base pay.",
        "severity": "high",
        "source": "rolesignal_rule"
      },
      {
        "label": "Equity/bonus unclear",
        "detail": "Eligibility is mentioned, but amount is not.",
        "severity": "high",
        "source": "official_posting"
      },
      {
        "label": "WLB uncertain",
        "detail": "No employee reports for hours, evenings, or weekends yet.",
        "severity": "high",
        "source": "missing_employee_reports"
      },
      {
        "label": "On-call uncertain",
        "detail": "Cadence and incident load are not verified.",
        "severity": "medium",
        "source": "missing_employee_reports"
      },
      {
        "label": "Few employee reports",
        "detail": "Mostly posting-backed today.",
        "severity": "low",
        "source": "missing_employee_reports"
      }
    ],
    "upside": [
      "Payment infrastructure product scope",
      "Equity and benefits listed",
      "Role level is disclosed as IC4-IC5"
    ],
    "watchouts": [
      "Base salary only; equity not quantified",
      "Onsite SF role",
      "WLB and on-call not disclosed"
    ]
  },
  {
    "slug": "swiftly-senior-software-engineer-iot-remote-us",
    "company": "Swiftly",
    "domain": "goswift.ly",
    "role": "Senior Software Engineer",
    "level": "Senior",
    "companyLevel": "Not disclosed",
    "levelSystem": "Not disclosed",
    "seniorityBand": "Senior",
    "levelRank": 3,
    "levelNotes": "Inferred from Senior, Sr., III, or IC4/IC5 in the title or level.",
    "location": "United States",
    "team": "IoT",
    "employmentMode": "Remote",
    "verdict": "Strong fit",
    "oneLine": "Official posting for a senior IoT software role connecting onboard transit hardware systems to cloud services.",
    "compensation": {
      "base": [
        140000,
        205000
      ],
      "bonus": [
        0,
        0
      ],
      "equity": [
        0,
        0
      ],
      "total": [
        140000,
        205000
      ]
    },
    "workLifeBalance": 0,
    "benefits": 0,
    "growth": 0,
    "confidence": 62,
    "sampleCount": 1,
    "verifiedCount": 1,
    "lastUpdated": "2026-06-22",
    "hoursPerWeek": [
      0,
      0
    ],
    "workplaceSignals": [
      "Work mode: Remote",
      "Location: United States",
      "Travel requirement mentioned"
    ],
    "oncall": "Not disclosed in the official posting; needs user reports.",
    "promotionSpeed": "Needs data",
    "negotiationRoom": "Needs data",
    "sourceSignals": [
      {
        "name": "Official job posting",
        "kind": "Job postings",
        "coverage": 95,
        "freshness": "Observed Jun 2026"
      },
      {
        "name": "Public wage data",
        "kind": "Compensation",
        "coverage": 45,
        "freshness": "Baseline only"
      },
      {
        "name": "Needs user reports",
        "kind": "User reports",
        "coverage": 10,
        "freshness": "No verified reports yet"
      }
    ],
    "benefitSignals": [
      "Equity compensation",
      "Medical insurance",
      "Dental insurance",
      "Vision insurance",
      "Flexible PTO",
      "Paid parental leave",
      "401(k) or RRSP matching"
    ],
    "evidence": [
      {
        "field": "Listed compensation",
        "status": "Available",
        "confidence": 95,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://jobs.lever.co/goswift/5e98cddf-65e5-427a-807b-bc604802eb86",
        "observedAt": "2026-06-22",
        "note": "Official posting discloses US salary range of $140000-$205000; equity listed but not quantified."
      },
      {
        "field": "Company level",
        "status": "Needs data",
        "confidence": 20,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://jobs.lever.co/goswift/5e98cddf-65e5-427a-807b-bc604802eb86",
        "observedAt": "2026-06-22",
        "note": "The official posting does not disclose an internal company ladder level."
      },
      {
        "field": "Seniority",
        "status": "Inferred",
        "confidence": 70,
        "sourceType": "rolesignal_inference",
        "sourceName": "RoleSignal normalization",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Normalized from title and posting-level text. Verify with user reports when possible."
      },
      {
        "field": "Benefits",
        "status": "Partial",
        "confidence": 65,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://jobs.lever.co/goswift/5e98cddf-65e5-427a-807b-bc604802eb86",
        "observedAt": "2026-06-22",
        "note": "Official posting benefits are listed as coverage signals. Benefit quality still needs employee reports."
      },
      {
        "field": "WLB",
        "status": "Needs user reports",
        "confidence": 10,
        "sourceType": "missing",
        "sourceName": "No verified source yet",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Needs verified user reports before showing a real WLB score."
      },
      {
        "field": "On-call",
        "status": "Needs user reports",
        "confidence": 10,
        "sourceType": "missing",
        "sourceName": "No verified source yet",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Official postings rarely disclose on-call cadence; needs user reports."
      }
    ],
    "decisionGaps": [
      {
        "label": "Full TC unclear",
        "detail": "Posting only confirms listed/base pay.",
        "severity": "high",
        "source": "rolesignal_rule"
      },
      {
        "label": "Equity/bonus unclear",
        "detail": "Eligibility is mentioned, but amount is not.",
        "severity": "high",
        "source": "official_posting"
      },
      {
        "label": "WLB uncertain",
        "detail": "No employee reports for hours, evenings, or weekends yet.",
        "severity": "high",
        "source": "missing_employee_reports"
      },
      {
        "label": "On-call uncertain",
        "detail": "Cadence and incident load are not verified.",
        "severity": "medium",
        "source": "missing_employee_reports"
      },
      {
        "label": "Level unclear",
        "detail": "Internal ladder level is not disclosed.",
        "severity": "medium",
        "source": "official_posting"
      },
      {
        "label": "Few employee reports",
        "detail": "Mostly posting-backed today.",
        "severity": "low",
        "source": "missing_employee_reports"
      }
    ],
    "upside": [
      "Remote-friendly role",
      "Equity and benefits listed",
      "Mission-driven transit infrastructure work"
    ],
    "watchouts": [
      "Base salary only; equity not quantified",
      "Some travel expected",
      "WLB and on-call not disclosed"
    ]
  },
  {
    "slug": "included-health-senior-software-engineer-fullstack-remote-us",
    "company": "Included Health",
    "domain": "includedhealth.com",
    "role": "Senior Software Engineer",
    "level": "Senior",
    "companyLevel": "Not disclosed",
    "levelSystem": "Not disclosed",
    "seniorityBand": "Senior",
    "levelRank": 3,
    "levelNotes": "Inferred from Senior, Sr., III, or IC4/IC5 in the title or level.",
    "location": "United States",
    "team": "Fullstack",
    "employmentMode": "Remote",
    "verdict": "Strong fit",
    "oneLine": "Official posting for a senior fullstack engineer building consumer-grade web applications and reliable services.",
    "compensation": {
      "base": [
        138380,
        254111
      ],
      "bonus": [
        0,
        0
      ],
      "equity": [
        0,
        0
      ],
      "total": [
        138380,
        254111
      ]
    },
    "workLifeBalance": 0,
    "benefits": 0,
    "growth": 0,
    "confidence": 66,
    "sampleCount": 1,
    "verifiedCount": 1,
    "lastUpdated": "2026-06-22",
    "hoursPerWeek": [
      0,
      0
    ],
    "workplaceSignals": [
      "Work mode: Remote",
      "Location: United States",
      "Remote signal found in official posting"
    ],
    "oncall": "Not disclosed in the official posting; needs user reports.",
    "promotionSpeed": "Needs data",
    "negotiationRoom": "Needs data",
    "sourceSignals": [
      {
        "name": "Official job posting",
        "kind": "Job postings",
        "coverage": 95,
        "freshness": "Observed Jun 2026"
      },
      {
        "name": "Public wage data",
        "kind": "Compensation",
        "coverage": 45,
        "freshness": "Baseline only"
      },
      {
        "name": "Needs user reports",
        "kind": "User reports",
        "coverage": 10,
        "freshness": "No verified reports yet"
      }
    ],
    "benefitSignals": [
      "Equity eligibility",
      "Benefits listed in official posting; details need normalization"
    ],
    "evidence": [
      {
        "field": "Listed compensation",
        "status": "Available",
        "confidence": 95,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://jobs.lever.co/includedhealth/c00ec43f-c773-4a99-80b7-ed26d485cd39",
        "observedAt": "2026-06-22",
        "note": "Official posting discloses US new-hire base target ranges across zones from $138380-$254111 plus equity and benefits."
      },
      {
        "field": "Company level",
        "status": "Needs data",
        "confidence": 20,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://jobs.lever.co/includedhealth/c00ec43f-c773-4a99-80b7-ed26d485cd39",
        "observedAt": "2026-06-22",
        "note": "The official posting does not disclose an internal company ladder level."
      },
      {
        "field": "Seniority",
        "status": "Inferred",
        "confidence": 70,
        "sourceType": "rolesignal_inference",
        "sourceName": "RoleSignal normalization",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Normalized from title and posting-level text. Verify with user reports when possible."
      },
      {
        "field": "Benefits",
        "status": "Partial",
        "confidence": 65,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://jobs.lever.co/includedhealth/c00ec43f-c773-4a99-80b7-ed26d485cd39",
        "observedAt": "2026-06-22",
        "note": "Official posting benefits are listed as coverage signals. Benefit quality still needs employee reports."
      },
      {
        "field": "WLB",
        "status": "Needs user reports",
        "confidence": 10,
        "sourceType": "missing",
        "sourceName": "No verified source yet",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Needs verified user reports before showing a real WLB score."
      },
      {
        "field": "On-call",
        "status": "Needs user reports",
        "confidence": 10,
        "sourceType": "missing",
        "sourceName": "No verified source yet",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Official postings rarely disclose on-call cadence; needs user reports."
      }
    ],
    "decisionGaps": [
      {
        "label": "Full TC unclear",
        "detail": "Posting only confirms listed/base pay.",
        "severity": "high",
        "source": "rolesignal_rule"
      },
      {
        "label": "Equity/bonus unclear",
        "detail": "Eligibility is mentioned, but amount is not.",
        "severity": "high",
        "source": "official_posting"
      },
      {
        "label": "WLB uncertain",
        "detail": "No employee reports for hours, evenings, or weekends yet.",
        "severity": "high",
        "source": "missing_employee_reports"
      },
      {
        "label": "On-call uncertain",
        "detail": "Cadence and incident load are not verified.",
        "severity": "medium",
        "source": "missing_employee_reports"
      },
      {
        "label": "Level unclear",
        "detail": "Internal ladder level is not disclosed.",
        "severity": "medium",
        "source": "official_posting"
      },
      {
        "label": "Few employee reports",
        "detail": "Mostly posting-backed today.",
        "severity": "low",
        "source": "missing_employee_reports"
      }
    ],
    "upside": [
      "Remote-first culture",
      "Equity and benefits listed",
      "Fullstack scope across React and backend services"
    ],
    "watchouts": [
      "Zone-based base salary only; equity not quantified",
      "WLB and on-call not disclosed",
      "Actual range depends on geographic zone"
    ]
  },
  {
    "slug": "included-health-senior-software-engineer-backend-remote-us",
    "company": "Included Health",
    "domain": "includedhealth.com",
    "role": "Senior Software Engineer",
    "level": "Senior",
    "companyLevel": "Not disclosed",
    "levelSystem": "Not disclosed",
    "seniorityBand": "Senior",
    "levelRank": 3,
    "levelNotes": "Inferred from Senior, Sr., III, or IC4/IC5 in the title or level.",
    "location": "United States",
    "team": "Backend",
    "employmentMode": "Remote",
    "verdict": "Strong fit",
    "oneLine": "Official posting for a senior backend engineer working on reliable services, microservices, and product-facing systems.",
    "compensation": {
      "base": [
        149450,
        274430
      ],
      "bonus": [
        0,
        0
      ],
      "equity": [
        0,
        0
      ],
      "total": [
        149450,
        274430
      ]
    },
    "workLifeBalance": 0,
    "benefits": 0,
    "growth": 0,
    "confidence": 67,
    "sampleCount": 1,
    "verifiedCount": 1,
    "lastUpdated": "2026-06-22",
    "hoursPerWeek": [
      0,
      0
    ],
    "workplaceSignals": [
      "Work mode: Remote",
      "Location: United States",
      "Remote signal found in official posting"
    ],
    "oncall": "Not disclosed in the official posting; needs user reports.",
    "promotionSpeed": "Needs data",
    "negotiationRoom": "Needs data",
    "sourceSignals": [
      {
        "name": "Official job posting",
        "kind": "Job postings",
        "coverage": 95,
        "freshness": "Observed Jun 2026"
      },
      {
        "name": "Public wage data",
        "kind": "Compensation",
        "coverage": 45,
        "freshness": "Baseline only"
      },
      {
        "name": "Needs user reports",
        "kind": "User reports",
        "coverage": 10,
        "freshness": "No verified reports yet"
      }
    ],
    "benefitSignals": [
      "Equity eligibility",
      "Benefits listed in official posting; details need normalization"
    ],
    "evidence": [
      {
        "field": "Listed compensation",
        "status": "Available",
        "confidence": 95,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://jobs.lever.co/includedhealth/6834927b-8527-4c2c-bc15-855a56f68765",
        "observedAt": "2026-06-22",
        "note": "Official posting discloses US new-hire base target ranges across zones from $149450-$274430 plus equity and benefits."
      },
      {
        "field": "Company level",
        "status": "Needs data",
        "confidence": 20,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://jobs.lever.co/includedhealth/6834927b-8527-4c2c-bc15-855a56f68765",
        "observedAt": "2026-06-22",
        "note": "The official posting does not disclose an internal company ladder level."
      },
      {
        "field": "Seniority",
        "status": "Inferred",
        "confidence": 70,
        "sourceType": "rolesignal_inference",
        "sourceName": "RoleSignal normalization",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Normalized from title and posting-level text. Verify with user reports when possible."
      },
      {
        "field": "Benefits",
        "status": "Partial",
        "confidence": 65,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://jobs.lever.co/includedhealth/6834927b-8527-4c2c-bc15-855a56f68765",
        "observedAt": "2026-06-22",
        "note": "Official posting benefits are listed as coverage signals. Benefit quality still needs employee reports."
      },
      {
        "field": "WLB",
        "status": "Needs user reports",
        "confidence": 10,
        "sourceType": "missing",
        "sourceName": "No verified source yet",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Needs verified user reports before showing a real WLB score."
      },
      {
        "field": "On-call",
        "status": "Needs user reports",
        "confidence": 10,
        "sourceType": "missing",
        "sourceName": "No verified source yet",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Official postings rarely disclose on-call cadence; needs user reports."
      }
    ],
    "decisionGaps": [
      {
        "label": "Full TC unclear",
        "detail": "Posting only confirms listed/base pay.",
        "severity": "high",
        "source": "rolesignal_rule"
      },
      {
        "label": "Equity/bonus unclear",
        "detail": "Eligibility is mentioned, but amount is not.",
        "severity": "high",
        "source": "official_posting"
      },
      {
        "label": "WLB uncertain",
        "detail": "No employee reports for hours, evenings, or weekends yet.",
        "severity": "high",
        "source": "missing_employee_reports"
      },
      {
        "label": "On-call uncertain",
        "detail": "Cadence and incident load are not verified.",
        "severity": "medium",
        "source": "missing_employee_reports"
      },
      {
        "label": "Level unclear",
        "detail": "Internal ladder level is not disclosed.",
        "severity": "medium",
        "source": "official_posting"
      },
      {
        "label": "Few employee reports",
        "detail": "Mostly posting-backed today.",
        "severity": "low",
        "source": "missing_employee_reports"
      }
    ],
    "upside": [
      "Remote-first culture",
      "Equity and benefits listed",
      "Backend service ownership"
    ],
    "watchouts": [
      "Zone-based base salary only; equity not quantified",
      "WLB and on-call not disclosed",
      "Actual range depends on geographic zone"
    ]
  },
  {
    "slug": "playlist-staff-software-engineer-us",
    "company": "Playlist",
    "domain": "playlist.com",
    "role": "Staff Software Engineer",
    "level": "Staff",
    "companyLevel": "Not disclosed",
    "levelSystem": "Not disclosed",
    "seniorityBand": "Staff",
    "levelRank": 4,
    "levelNotes": "Inferred from Staff or Lead in the title or level.",
    "location": "United States",
    "team": "Engineering",
    "employmentMode": "Hybrid",
    "verdict": "Strong fit",
    "oneLine": "Official posting for a staff engineer working across cloud infrastructure, application services, and product systems.",
    "compensation": {
      "base": [
        170000,
        250000
      ],
      "bonus": [
        0,
        0
      ],
      "equity": [
        0,
        0
      ],
      "total": [
        170000,
        250000
      ]
    },
    "workLifeBalance": 0,
    "benefits": 0,
    "growth": 0,
    "confidence": 64,
    "sampleCount": 1,
    "verifiedCount": 1,
    "lastUpdated": "2026-06-22",
    "hoursPerWeek": [
      0,
      0
    ],
    "workplaceSignals": [
      "Work mode: Hybrid",
      "Location: United States"
    ],
    "oncall": "Not disclosed in the official posting; needs user reports.",
    "promotionSpeed": "Needs data",
    "negotiationRoom": "Needs data",
    "sourceSignals": [
      {
        "name": "Official job posting",
        "kind": "Job postings",
        "coverage": 95,
        "freshness": "Observed Jun 2026"
      },
      {
        "name": "Public wage data",
        "kind": "Compensation",
        "coverage": 45,
        "freshness": "Baseline only"
      },
      {
        "name": "Needs user reports",
        "kind": "User reports",
        "coverage": 10,
        "freshness": "No verified reports yet"
      }
    ],
    "benefitSignals": [
      "Performance bonus or incentive compensation may apply",
      "Benefits listed in official posting; details need normalization"
    ],
    "evidence": [
      {
        "field": "Listed compensation",
        "status": "Available",
        "confidence": 95,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://www.playlist.com/careers/opportunities/4665213006?gh_jid=4665213006",
        "observedAt": "2026-06-22",
        "note": "Official posting discloses US base salary range of $170000-$250000; total package may include performance bonus and benefits."
      },
      {
        "field": "Company level",
        "status": "Needs data",
        "confidence": 20,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://www.playlist.com/careers/opportunities/4665213006?gh_jid=4665213006",
        "observedAt": "2026-06-22",
        "note": "The official posting does not disclose an internal company ladder level."
      },
      {
        "field": "Seniority",
        "status": "Inferred",
        "confidence": 70,
        "sourceType": "rolesignal_inference",
        "sourceName": "RoleSignal normalization",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Normalized from title and posting-level text. Verify with user reports when possible."
      },
      {
        "field": "Benefits",
        "status": "Partial",
        "confidence": 65,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://www.playlist.com/careers/opportunities/4665213006?gh_jid=4665213006",
        "observedAt": "2026-06-22",
        "note": "Official posting benefits are listed as coverage signals. Benefit quality still needs employee reports."
      },
      {
        "field": "WLB",
        "status": "Needs user reports",
        "confidence": 10,
        "sourceType": "missing",
        "sourceName": "No verified source yet",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Needs verified user reports before showing a real WLB score."
      },
      {
        "field": "On-call",
        "status": "Needs user reports",
        "confidence": 10,
        "sourceType": "missing",
        "sourceName": "No verified source yet",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Official postings rarely disclose on-call cadence; needs user reports."
      }
    ],
    "decisionGaps": [
      {
        "label": "Full TC unclear",
        "detail": "Posting only confirms listed/base pay.",
        "severity": "high",
        "source": "rolesignal_rule"
      },
      {
        "label": "Equity/bonus unclear",
        "detail": "Eligibility is mentioned, but amount is not.",
        "severity": "high",
        "source": "official_posting"
      },
      {
        "label": "WLB uncertain",
        "detail": "No employee reports for hours, evenings, or weekends yet.",
        "severity": "high",
        "source": "missing_employee_reports"
      },
      {
        "label": "On-call uncertain",
        "detail": "Cadence and incident load are not verified.",
        "severity": "medium",
        "source": "missing_employee_reports"
      },
      {
        "label": "Level unclear",
        "detail": "Internal ladder level is not disclosed.",
        "severity": "medium",
        "source": "official_posting"
      },
      {
        "label": "Few employee reports",
        "detail": "Mostly posting-backed today.",
        "severity": "low",
        "source": "missing_employee_reports"
      }
    ],
    "upside": [
      "Staff-level scope",
      "Performance bonus or incentive compensation may apply",
      "Broad cloud and application stack"
    ],
    "watchouts": [
      "Base salary only; bonus/equity not quantified",
      "WLB and on-call not disclosed",
      "Location-specific details need confirmation"
    ]
  },
  {
    "slug": "osmind-senior-software-engineer-product-remote-us",
    "company": "Osmind",
    "domain": "osmind.org",
    "role": "Senior Software Engineer",
    "level": "Senior",
    "companyLevel": "Not disclosed",
    "levelSystem": "Not disclosed",
    "seniorityBand": "Senior",
    "levelRank": 3,
    "levelNotes": "Inferred from Senior, Sr., III, or IC4/IC5 in the title or level.",
    "location": "United States",
    "team": "Product Engineering",
    "employmentMode": "Remote",
    "verdict": "Strong fit",
    "oneLine": "Official posting for a senior product engineer building mental healthcare software across TypeScript, Node, React, Postgres, and AWS.",
    "compensation": {
      "base": [
        150150,
        200000
      ],
      "bonus": [
        0,
        0
      ],
      "equity": [
        0,
        0
      ],
      "total": [
        150150,
        200000
      ]
    },
    "workLifeBalance": 0,
    "benefits": 0,
    "growth": 0,
    "confidence": 62,
    "sampleCount": 1,
    "verifiedCount": 1,
    "lastUpdated": "2026-06-22",
    "hoursPerWeek": [
      0,
      0
    ],
    "workplaceSignals": [
      "Work mode: Remote",
      "Location: United States",
      "Remote signal found in official posting"
    ],
    "oncall": "Not disclosed in the official posting; needs user reports.",
    "promotionSpeed": "Needs data",
    "negotiationRoom": "Needs data",
    "sourceSignals": [
      {
        "name": "Official job posting",
        "kind": "Job postings",
        "coverage": 95,
        "freshness": "Observed Jun 2026"
      },
      {
        "name": "Public wage data",
        "kind": "Compensation",
        "coverage": 45,
        "freshness": "Baseline only"
      },
      {
        "name": "Needs user reports",
        "kind": "User reports",
        "coverage": 10,
        "freshness": "No verified reports yet"
      }
    ],
    "benefitSignals": [
      "Equity package",
      "Healthcare benefits",
      "Dental insurance",
      "Vision insurance",
      "Generous family leave",
      "FSA or DCFSA",
      "Mental health benefits",
      "401(k)",
      "Flexible paid time off"
    ],
    "evidence": [
      {
        "field": "Listed compensation",
        "status": "Available",
        "confidence": 95,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://jobs.lever.co/Osmind/fd48580b-a887-4f0e-9335-374c2dbe6d70",
        "observedAt": "2026-06-22",
        "note": "Official posting discloses national salary range of $150150-$200000 plus equity package for eligible employees."
      },
      {
        "field": "Company level",
        "status": "Needs data",
        "confidence": 20,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://jobs.lever.co/Osmind/fd48580b-a887-4f0e-9335-374c2dbe6d70",
        "observedAt": "2026-06-22",
        "note": "The official posting does not disclose an internal company ladder level."
      },
      {
        "field": "Seniority",
        "status": "Inferred",
        "confidence": 70,
        "sourceType": "rolesignal_inference",
        "sourceName": "RoleSignal normalization",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Normalized from title and posting-level text. Verify with user reports when possible."
      },
      {
        "field": "Benefits",
        "status": "Partial",
        "confidence": 65,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://jobs.lever.co/Osmind/fd48580b-a887-4f0e-9335-374c2dbe6d70",
        "observedAt": "2026-06-22",
        "note": "Official posting benefits are listed as coverage signals. Benefit quality still needs employee reports."
      },
      {
        "field": "WLB",
        "status": "Needs user reports",
        "confidence": 10,
        "sourceType": "missing",
        "sourceName": "No verified source yet",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Needs verified user reports before showing a real WLB score."
      },
      {
        "field": "On-call",
        "status": "Needs user reports",
        "confidence": 10,
        "sourceType": "missing",
        "sourceName": "No verified source yet",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Official postings rarely disclose on-call cadence; needs user reports."
      }
    ],
    "decisionGaps": [
      {
        "label": "Full TC unclear",
        "detail": "Posting only confirms listed/base pay.",
        "severity": "high",
        "source": "rolesignal_rule"
      },
      {
        "label": "Equity/bonus unclear",
        "detail": "Eligibility is mentioned, but amount is not.",
        "severity": "high",
        "source": "official_posting"
      },
      {
        "label": "WLB uncertain",
        "detail": "No employee reports for hours, evenings, or weekends yet.",
        "severity": "high",
        "source": "missing_employee_reports"
      },
      {
        "label": "On-call uncertain",
        "detail": "Cadence and incident load are not verified.",
        "severity": "medium",
        "source": "missing_employee_reports"
      },
      {
        "label": "Level unclear",
        "detail": "Internal ladder level is not disclosed.",
        "severity": "medium",
        "source": "official_posting"
      },
      {
        "label": "Few employee reports",
        "detail": "Mostly posting-backed today.",
        "severity": "low",
        "source": "missing_employee_reports"
      }
    ],
    "upside": [
      "Remote role",
      "Equity package listed",
      "Healthcare product impact"
    ],
    "watchouts": [
      "Base salary only; equity not quantified",
      "WLB and on-call not disclosed",
      "HIPAA or healthcare context may add process overhead"
    ]
  },
  {
    "slug": "osmind-staff-software-engineer-product-remote-us",
    "company": "Osmind",
    "domain": "osmind.org",
    "role": "Staff Software Engineer",
    "level": "Staff",
    "companyLevel": "Not disclosed",
    "levelSystem": "Not disclosed",
    "seniorityBand": "Staff",
    "levelRank": 4,
    "levelNotes": "Inferred from Staff or Lead in the title or level.",
    "location": "United States",
    "team": "Product Engineering",
    "employmentMode": "Remote",
    "verdict": "Strong fit",
    "oneLine": "Official posting for a staff engineer leading architecture decisions and mentoring engineers on a new healthcare platform.",
    "compensation": {
      "base": [
        200000,
        240000
      ],
      "bonus": [
        0,
        0
      ],
      "equity": [
        0,
        0
      ],
      "total": [
        200000,
        240000
      ]
    },
    "workLifeBalance": 0,
    "benefits": 0,
    "growth": 0,
    "confidence": 65,
    "sampleCount": 1,
    "verifiedCount": 1,
    "lastUpdated": "2026-06-22",
    "hoursPerWeek": [
      0,
      0
    ],
    "workplaceSignals": [
      "Work mode: Remote",
      "Location: United States"
    ],
    "oncall": "Not disclosed in the official posting; needs user reports.",
    "promotionSpeed": "Needs data",
    "negotiationRoom": "Needs data",
    "sourceSignals": [
      {
        "name": "Official job posting",
        "kind": "Job postings",
        "coverage": 95,
        "freshness": "Observed Jun 2026"
      },
      {
        "name": "Public wage data",
        "kind": "Compensation",
        "coverage": 45,
        "freshness": "Baseline only"
      },
      {
        "name": "Needs user reports",
        "kind": "User reports",
        "coverage": 10,
        "freshness": "No verified reports yet"
      }
    ],
    "benefitSignals": [
      "Equity package",
      "Healthcare benefits",
      "Dental insurance",
      "Vision insurance",
      "Generous family leave",
      "FSA or DCFSA",
      "Mental health benefits",
      "401(k)",
      "Flexible paid time off"
    ],
    "evidence": [
      {
        "field": "Listed compensation",
        "status": "Available",
        "confidence": 95,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://jobs.lever.co/Osmind/4c26fbae-ebe2-46a4-a6ab-9e57aab72323",
        "observedAt": "2026-06-22",
        "note": "Official posting discloses national salary range of $200000-$240000 plus equity package for eligible employees."
      },
      {
        "field": "Company level",
        "status": "Needs data",
        "confidence": 20,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://jobs.lever.co/Osmind/4c26fbae-ebe2-46a4-a6ab-9e57aab72323",
        "observedAt": "2026-06-22",
        "note": "The official posting does not disclose an internal company ladder level."
      },
      {
        "field": "Seniority",
        "status": "Inferred",
        "confidence": 70,
        "sourceType": "rolesignal_inference",
        "sourceName": "RoleSignal normalization",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Normalized from title and posting-level text. Verify with user reports when possible."
      },
      {
        "field": "Benefits",
        "status": "Partial",
        "confidence": 65,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://jobs.lever.co/Osmind/4c26fbae-ebe2-46a4-a6ab-9e57aab72323",
        "observedAt": "2026-06-22",
        "note": "Official posting benefits are listed as coverage signals. Benefit quality still needs employee reports."
      },
      {
        "field": "WLB",
        "status": "Needs user reports",
        "confidence": 10,
        "sourceType": "missing",
        "sourceName": "No verified source yet",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Needs verified user reports before showing a real WLB score."
      },
      {
        "field": "On-call",
        "status": "Needs user reports",
        "confidence": 10,
        "sourceType": "missing",
        "sourceName": "No verified source yet",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Official postings rarely disclose on-call cadence; needs user reports."
      }
    ],
    "decisionGaps": [
      {
        "label": "Full TC unclear",
        "detail": "Posting only confirms listed/base pay.",
        "severity": "high",
        "source": "rolesignal_rule"
      },
      {
        "label": "Equity/bonus unclear",
        "detail": "Eligibility is mentioned, but amount is not.",
        "severity": "high",
        "source": "official_posting"
      },
      {
        "label": "WLB uncertain",
        "detail": "No employee reports for hours, evenings, or weekends yet.",
        "severity": "high",
        "source": "missing_employee_reports"
      },
      {
        "label": "On-call uncertain",
        "detail": "Cadence and incident load are not verified.",
        "severity": "medium",
        "source": "missing_employee_reports"
      },
      {
        "label": "Level unclear",
        "detail": "Internal ladder level is not disclosed.",
        "severity": "medium",
        "source": "official_posting"
      },
      {
        "label": "Few employee reports",
        "detail": "Mostly posting-backed today.",
        "severity": "low",
        "source": "missing_employee_reports"
      }
    ],
    "upside": [
      "Staff-level architecture scope",
      "Equity package listed",
      "Healthcare product impact"
    ],
    "watchouts": [
      "Base salary only; equity not quantified",
      "WLB and on-call not disclosed",
      "Posting mentions SF office preference as a nice-to-have"
    ]
  },
  {
    "slug": "ripple-staff-software-engineer-cloud-infrastructure-ny",
    "company": "Ripple",
    "domain": "ripple.com",
    "role": "Staff Software Engineer",
    "level": "Staff",
    "companyLevel": "Not disclosed",
    "levelSystem": "Not disclosed",
    "seniorityBand": "Staff",
    "levelRank": 4,
    "levelNotes": "Inferred from Staff or Lead in the title or level.",
    "location": "New York, NY",
    "team": "Cloud Infrastructure",
    "employmentMode": "Hybrid",
    "verdict": "High intensity",
    "oneLine": "Official posting for a staff cloud infrastructure engineer setting engineering standards for regulated financial systems.",
    "compensation": {
      "base": [
        196000,
        245000
      ],
      "bonus": [
        0,
        0
      ],
      "equity": [
        0,
        0
      ],
      "total": [
        196000,
        245000
      ]
    },
    "workLifeBalance": 0,
    "benefits": 0,
    "growth": 0,
    "confidence": 66,
    "sampleCount": 1,
    "verifiedCount": 1,
    "lastUpdated": "2026-06-22",
    "hoursPerWeek": [
      0,
      0
    ],
    "workplaceSignals": [
      "Work mode: Hybrid",
      "Location: New York, NY",
      "Hybrid collaboration signal found in official posting"
    ],
    "oncall": "Posting references on-call exposure, but cadence is not disclosed.",
    "promotionSpeed": "Needs data",
    "negotiationRoom": "Needs data",
    "sourceSignals": [
      {
        "name": "Official job posting",
        "kind": "Job postings",
        "coverage": 95,
        "freshness": "Observed Jun 2026"
      },
      {
        "name": "Public wage data",
        "kind": "Compensation",
        "coverage": 45,
        "freshness": "Baseline only"
      },
      {
        "name": "Needs user reports",
        "kind": "User reports",
        "coverage": 10,
        "freshness": "No verified reports yet"
      }
    ],
    "benefitSignals": [
      "Competitive salary",
      "Bonus eligibility",
      "Equity eligibility",
      "Benefits listed in official posting; details need normalization"
    ],
    "evidence": [
      {
        "field": "Listed compensation",
        "status": "Available",
        "confidence": 95,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://ripple.com/careers/all-jobs/job/7955314/?gh_jid=7955314",
        "observedAt": "2026-06-22",
        "note": "Official posting discloses NY annual base salary range of $196000-$245000 and excludes equity or additional compensation."
      },
      {
        "field": "Company level",
        "status": "Needs data",
        "confidence": 20,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://ripple.com/careers/all-jobs/job/7955314/?gh_jid=7955314",
        "observedAt": "2026-06-22",
        "note": "The official posting does not disclose an internal company ladder level."
      },
      {
        "field": "Seniority",
        "status": "Inferred",
        "confidence": 70,
        "sourceType": "rolesignal_inference",
        "sourceName": "RoleSignal normalization",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Normalized from title and posting-level text. Verify with user reports when possible."
      },
      {
        "field": "Benefits",
        "status": "Partial",
        "confidence": 65,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://ripple.com/careers/all-jobs/job/7955314/?gh_jid=7955314",
        "observedAt": "2026-06-22",
        "note": "Official posting benefits are listed as coverage signals. Benefit quality still needs employee reports."
      },
      {
        "field": "WLB",
        "status": "Needs user reports",
        "confidence": 10,
        "sourceType": "missing",
        "sourceName": "No verified source yet",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Needs verified user reports before showing a real WLB score."
      },
      {
        "field": "On-call",
        "status": "Needs user reports",
        "confidence": 10,
        "sourceType": "missing",
        "sourceName": "No verified source yet",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Official postings rarely disclose on-call cadence; needs user reports."
      }
    ],
    "decisionGaps": [
      {
        "label": "Full TC unclear",
        "detail": "Posting only confirms listed/base pay.",
        "severity": "high",
        "source": "rolesignal_rule"
      },
      {
        "label": "Equity/bonus unclear",
        "detail": "Eligibility is mentioned, but amount is not.",
        "severity": "high",
        "source": "official_posting"
      },
      {
        "label": "WLB uncertain",
        "detail": "No employee reports for hours, evenings, or weekends yet.",
        "severity": "high",
        "source": "missing_employee_reports"
      },
      {
        "label": "On-call uncertain",
        "detail": "Cadence and incident load are not verified.",
        "severity": "medium",
        "source": "missing_employee_reports"
      },
      {
        "label": "Level unclear",
        "detail": "Internal ladder level is not disclosed.",
        "severity": "medium",
        "source": "official_posting"
      },
      {
        "label": "Few employee reports",
        "detail": "Mostly posting-backed today.",
        "severity": "low",
        "source": "missing_employee_reports"
      }
    ],
    "upside": [
      "Staff-level platform authority",
      "Financial infrastructure domain",
      "Hybrid collaboration policy disclosed"
    ],
    "watchouts": [
      "NY base salary only; equity and additional compensation excluded",
      "On-call cadence not disclosed",
      "Regulated environment may increase process rigor"
    ]
  },
  {
    "slug": "upstart-software-engineer-lifecycle-remote-us",
    "company": "Upstart",
    "domain": "upstart.com",
    "role": "Software Engineer",
    "level": "Not disclosed",
    "companyLevel": "Not disclosed",
    "levelSystem": "Not disclosed",
    "seniorityBand": "Unspecified",
    "levelRank": 0,
    "levelNotes": "The official posting does not disclose a clear seniority band.",
    "location": "United States",
    "team": "Lifecycle",
    "employmentMode": "Remote",
    "verdict": "Strong fit",
    "oneLine": "Official posting for a remote lifecycle engineer building borrower-facing product capabilities at an AI lending company.",
    "compensation": {
      "base": [
        142000,
        196600
      ],
      "bonus": [
        0,
        0
      ],
      "equity": [
        0,
        0
      ],
      "total": [
        142000,
        196600
      ]
    },
    "workLifeBalance": 0,
    "benefits": 0,
    "growth": 0,
    "confidence": 63,
    "sampleCount": 1,
    "verifiedCount": 1,
    "lastUpdated": "2026-06-22",
    "hoursPerWeek": [
      0,
      0
    ],
    "workplaceSignals": [
      "Work mode: Remote",
      "Location: United States",
      "Remote signal found in official posting",
      "Onsite requirement found in official posting",
      "Periodic onsite collaboration noted"
    ],
    "oncall": "Not disclosed in the official posting; needs user reports.",
    "promotionSpeed": "Needs data",
    "negotiationRoom": "Needs data",
    "sourceSignals": [
      {
        "name": "Official job posting",
        "kind": "Job postings",
        "coverage": 95,
        "freshness": "Observed Jun 2026"
      },
      {
        "name": "Public wage data",
        "kind": "Compensation",
        "coverage": 45,
        "freshness": "Baseline only"
      },
      {
        "name": "Needs user reports",
        "kind": "User reports",
        "coverage": 10,
        "freshness": "No verified reports yet"
      }
    ],
    "benefitSignals": [
      "Target bonus opportunities",
      "Annual equity grants",
      "Medical insurance",
      "Dental insurance",
      "Vision insurance",
      "401(k) match",
      "ESPP for eligible US employees",
      "HSA contributions for eligible plans",
      "Life and disability insurance",
      "Paid time off and sick leave"
    ],
    "evidence": [
      {
        "field": "Listed compensation",
        "status": "Available",
        "confidence": 95,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://careers.upstart.com/jobs/software-engineer-lifecycle-fba7aee5-9dd3-4482-b3bd-91a9af881860?gh_jid=7913770",
        "observedAt": "2026-06-22",
        "note": "Official posting discloses US remote anticipated base salary range of $142000-$196600; bonus and equity are listed but not quantified."
      },
      {
        "field": "Company level",
        "status": "Needs data",
        "confidence": 20,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://careers.upstart.com/jobs/software-engineer-lifecycle-fba7aee5-9dd3-4482-b3bd-91a9af881860?gh_jid=7913770",
        "observedAt": "2026-06-22",
        "note": "The official posting does not disclose an internal company ladder level."
      },
      {
        "field": "Seniority",
        "status": "Inferred",
        "confidence": 70,
        "sourceType": "rolesignal_inference",
        "sourceName": "RoleSignal normalization",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Normalized from title and posting-level text. Verify with user reports when possible."
      },
      {
        "field": "Benefits",
        "status": "Partial",
        "confidence": 65,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://careers.upstart.com/jobs/software-engineer-lifecycle-fba7aee5-9dd3-4482-b3bd-91a9af881860?gh_jid=7913770",
        "observedAt": "2026-06-22",
        "note": "Official posting benefits are listed as coverage signals. Benefit quality still needs employee reports."
      },
      {
        "field": "WLB",
        "status": "Needs user reports",
        "confidence": 10,
        "sourceType": "missing",
        "sourceName": "No verified source yet",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Needs verified user reports before showing a real WLB score."
      },
      {
        "field": "On-call",
        "status": "Needs user reports",
        "confidence": 10,
        "sourceType": "missing",
        "sourceName": "No verified source yet",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Official postings rarely disclose on-call cadence; needs user reports."
      }
    ],
    "decisionGaps": [
      {
        "label": "Full TC unclear",
        "detail": "Posting only confirms listed/base pay.",
        "severity": "high",
        "source": "rolesignal_rule"
      },
      {
        "label": "Equity/bonus unclear",
        "detail": "Eligibility is mentioned, but amount is not.",
        "severity": "high",
        "source": "official_posting"
      },
      {
        "label": "WLB uncertain",
        "detail": "No employee reports for hours, evenings, or weekends yet.",
        "severity": "high",
        "source": "missing_employee_reports"
      },
      {
        "label": "On-call uncertain",
        "detail": "Cadence and incident load are not verified.",
        "severity": "medium",
        "source": "missing_employee_reports"
      },
      {
        "label": "Level unclear",
        "detail": "Internal ladder level is not disclosed.",
        "severity": "medium",
        "source": "official_posting"
      },
      {
        "label": "Seniority unclear",
        "detail": "Scope and promotion bar need confirmation.",
        "severity": "medium",
        "source": "rolesignal_rule"
      },
      {
        "label": "Few employee reports",
        "detail": "Mostly posting-backed today.",
        "severity": "low",
        "source": "missing_employee_reports"
      }
    ],
    "upside": [
      "Remote-first work model",
      "Bonus and equity compensation listed",
      "Strong benefits listed"
    ],
    "watchouts": [
      "Base salary only; bonus/equity not quantified",
      "WLB and on-call not disclosed",
      "Quarterly onsite collaboration may apply"
    ]
  },
  {
    "slug": "upstart-senior-software-engineer-site-reliability-remote-us",
    "company": "Upstart",
    "domain": "upstart.com",
    "role": "Senior Software Engineer",
    "level": "Senior",
    "companyLevel": "Not disclosed",
    "levelSystem": "Not disclosed",
    "seniorityBand": "Senior",
    "levelRank": 3,
    "levelNotes": "Inferred from Senior, Sr., III, or IC4/IC5 in the title or level.",
    "location": "United States",
    "team": "Site Reliability",
    "employmentMode": "Remote",
    "verdict": "High intensity",
    "oneLine": "Official posting for a senior engineer focused on site reliability tooling, observability, and internal platforms.",
    "compensation": {
      "base": [
        166900,
        230900
      ],
      "bonus": [
        0,
        0
      ],
      "equity": [
        0,
        0
      ],
      "total": [
        166900,
        230900
      ]
    },
    "workLifeBalance": 0,
    "benefits": 0,
    "growth": 0,
    "confidence": 65,
    "sampleCount": 1,
    "verifiedCount": 1,
    "lastUpdated": "2026-06-22",
    "hoursPerWeek": [
      0,
      0
    ],
    "workplaceSignals": [
      "Work mode: Remote",
      "Location: United States",
      "Remote signal found in official posting",
      "Onsite requirement found in official posting",
      "Periodic onsite collaboration noted"
    ],
    "oncall": "SRE role likely has operational exposure, but official on-call cadence is not disclosed.",
    "promotionSpeed": "Needs data",
    "negotiationRoom": "Needs data",
    "sourceSignals": [
      {
        "name": "Official job posting",
        "kind": "Job postings",
        "coverage": 95,
        "freshness": "Observed Jun 2026"
      },
      {
        "name": "Public wage data",
        "kind": "Compensation",
        "coverage": 45,
        "freshness": "Baseline only"
      },
      {
        "name": "Needs user reports",
        "kind": "User reports",
        "coverage": 10,
        "freshness": "No verified reports yet"
      }
    ],
    "benefitSignals": [
      "Target bonus opportunities",
      "Annual equity grants",
      "Medical insurance",
      "Dental insurance",
      "Vision insurance",
      "401(k) match",
      "ESPP for eligible US employees",
      "HSA contributions for eligible plans",
      "Life and disability insurance",
      "Paid time off and sick leave"
    ],
    "evidence": [
      {
        "field": "Listed compensation",
        "status": "Available",
        "confidence": 95,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://careers.upstart.com/jobs/senior-software-engineer-site-reliability?gh_jid=7727790",
        "observedAt": "2026-06-22",
        "note": "Official posting discloses US remote anticipated base salary range of $166900-$230900; bonus and equity are listed but not quantified."
      },
      {
        "field": "Company level",
        "status": "Needs data",
        "confidence": 20,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://careers.upstart.com/jobs/senior-software-engineer-site-reliability?gh_jid=7727790",
        "observedAt": "2026-06-22",
        "note": "The official posting does not disclose an internal company ladder level."
      },
      {
        "field": "Seniority",
        "status": "Inferred",
        "confidence": 70,
        "sourceType": "rolesignal_inference",
        "sourceName": "RoleSignal normalization",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Normalized from title and posting-level text. Verify with user reports when possible."
      },
      {
        "field": "Benefits",
        "status": "Partial",
        "confidence": 65,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://careers.upstart.com/jobs/senior-software-engineer-site-reliability?gh_jid=7727790",
        "observedAt": "2026-06-22",
        "note": "Official posting benefits are listed as coverage signals. Benefit quality still needs employee reports."
      },
      {
        "field": "WLB",
        "status": "Needs user reports",
        "confidence": 10,
        "sourceType": "missing",
        "sourceName": "No verified source yet",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Needs verified user reports before showing a real WLB score."
      },
      {
        "field": "On-call",
        "status": "Needs user reports",
        "confidence": 10,
        "sourceType": "missing",
        "sourceName": "No verified source yet",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Official postings rarely disclose on-call cadence; needs user reports."
      }
    ],
    "decisionGaps": [
      {
        "label": "Full TC unclear",
        "detail": "Posting only confirms listed/base pay.",
        "severity": "high",
        "source": "rolesignal_rule"
      },
      {
        "label": "Equity/bonus unclear",
        "detail": "Eligibility is mentioned, but amount is not.",
        "severity": "high",
        "source": "official_posting"
      },
      {
        "label": "WLB uncertain",
        "detail": "No employee reports for hours, evenings, or weekends yet.",
        "severity": "high",
        "source": "missing_employee_reports"
      },
      {
        "label": "On-call uncertain",
        "detail": "Cadence and incident load are not verified.",
        "severity": "medium",
        "source": "missing_employee_reports"
      },
      {
        "label": "Level unclear",
        "detail": "Internal ladder level is not disclosed.",
        "severity": "medium",
        "source": "official_posting"
      },
      {
        "label": "Few employee reports",
        "detail": "Mostly posting-backed today.",
        "severity": "low",
        "source": "missing_employee_reports"
      }
    ],
    "upside": [
      "Remote role",
      "Bonus and equity compensation listed",
      "Infrastructure and reliability scope"
    ],
    "watchouts": [
      "Base salary only; bonus/equity not quantified",
      "On-call cadence not disclosed",
      "Regular onsite collaboration sessions noted"
    ]
  },
  {
    "slug": "alluxio-senior-software-engineer-remote-us",
    "company": "Alluxio",
    "domain": "alluxio.com",
    "role": "Senior Software Engineer",
    "level": "Senior",
    "companyLevel": "Not disclosed",
    "levelSystem": "Not disclosed",
    "seniorityBand": "Senior",
    "levelRank": 3,
    "levelNotes": "Inferred from Senior, Sr., III, or IC4/IC5 in the title or level.",
    "location": "United States",
    "team": "Engineering",
    "employmentMode": "Remote",
    "verdict": "Strong fit",
    "oneLine": "Official posting for a senior engineer working on data infrastructure software with equity and benefits listed.",
    "compensation": {
      "base": [
        190000,
        260000
      ],
      "bonus": [
        0,
        0
      ],
      "equity": [
        0,
        0
      ],
      "total": [
        190000,
        260000
      ]
    },
    "workLifeBalance": 0,
    "benefits": 0,
    "growth": 0,
    "confidence": 65,
    "sampleCount": 1,
    "verifiedCount": 1,
    "lastUpdated": "2026-06-22",
    "hoursPerWeek": [
      0,
      0
    ],
    "workplaceSignals": [
      "Work mode: Remote",
      "Location: United States"
    ],
    "oncall": "Not disclosed in the official posting; needs user reports.",
    "promotionSpeed": "Needs data",
    "negotiationRoom": "Needs data",
    "sourceSignals": [
      {
        "name": "Official job posting",
        "kind": "Job postings",
        "coverage": 95,
        "freshness": "Observed Jun 2026"
      },
      {
        "name": "Public wage data",
        "kind": "Compensation",
        "coverage": 45,
        "freshness": "Baseline only"
      },
      {
        "name": "Needs user reports",
        "kind": "User reports",
        "coverage": 10,
        "freshness": "No verified reports yet"
      }
    ],
    "benefitSignals": [
      "Equity options",
      "Comprehensive benefits package"
    ],
    "evidence": [
      {
        "field": "Listed compensation",
        "status": "Available",
        "confidence": 95,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://jobs.lever.co/alluxio/1f58cf1a-9182-4f86-b51f-c5e7f3b9f938",
        "observedAt": "2026-06-22",
        "note": "Official posting discloses US base salary range of $190000-$260000; all candidates receive equity options and benefits."
      },
      {
        "field": "Company level",
        "status": "Needs data",
        "confidence": 20,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://jobs.lever.co/alluxio/1f58cf1a-9182-4f86-b51f-c5e7f3b9f938",
        "observedAt": "2026-06-22",
        "note": "The official posting does not disclose an internal company ladder level."
      },
      {
        "field": "Seniority",
        "status": "Inferred",
        "confidence": 70,
        "sourceType": "rolesignal_inference",
        "sourceName": "RoleSignal normalization",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Normalized from title and posting-level text. Verify with user reports when possible."
      },
      {
        "field": "Benefits",
        "status": "Partial",
        "confidence": 65,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://jobs.lever.co/alluxio/1f58cf1a-9182-4f86-b51f-c5e7f3b9f938",
        "observedAt": "2026-06-22",
        "note": "Official posting benefits are listed as coverage signals. Benefit quality still needs employee reports."
      },
      {
        "field": "WLB",
        "status": "Needs user reports",
        "confidence": 10,
        "sourceType": "missing",
        "sourceName": "No verified source yet",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Needs verified user reports before showing a real WLB score."
      },
      {
        "field": "On-call",
        "status": "Needs user reports",
        "confidence": 10,
        "sourceType": "missing",
        "sourceName": "No verified source yet",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Official postings rarely disclose on-call cadence; needs user reports."
      }
    ],
    "decisionGaps": [
      {
        "label": "Full TC unclear",
        "detail": "Posting only confirms listed/base pay.",
        "severity": "high",
        "source": "rolesignal_rule"
      },
      {
        "label": "Equity/bonus unclear",
        "detail": "Eligibility is mentioned, but amount is not.",
        "severity": "high",
        "source": "official_posting"
      },
      {
        "label": "WLB uncertain",
        "detail": "No employee reports for hours, evenings, or weekends yet.",
        "severity": "high",
        "source": "missing_employee_reports"
      },
      {
        "label": "On-call uncertain",
        "detail": "Cadence and incident load are not verified.",
        "severity": "medium",
        "source": "missing_employee_reports"
      },
      {
        "label": "Level unclear",
        "detail": "Internal ladder level is not disclosed.",
        "severity": "medium",
        "source": "official_posting"
      },
      {
        "label": "Few employee reports",
        "detail": "Mostly posting-backed today.",
        "severity": "low",
        "source": "missing_employee_reports"
      }
    ],
    "upside": [
      "Data infrastructure domain",
      "Equity options listed",
      "Broad US target range"
    ],
    "watchouts": [
      "Base salary only; equity not quantified",
      "WLB and on-call not disclosed",
      "Level may affect placement in range"
    ]
  },
  {
    "slug": "okta-staff-software-engineer-ai-agentic-auth0-us",
    "company": "Okta",
    "domain": "okta.com",
    "role": "Staff Software Engineer",
    "level": "Staff",
    "companyLevel": "Not disclosed",
    "levelSystem": "Not disclosed",
    "seniorityBand": "Staff",
    "levelRank": 4,
    "levelNotes": "Inferred from Staff or Lead in the title or level.",
    "location": "CA/CO/IL/NY/WA",
    "team": "AI Agentic Experience Auth0",
    "employmentMode": "Hybrid",
    "verdict": "Strong fit",
    "oneLine": "Official posting for a staff engineer building AI agentic developer experiences across Auth0 and related systems.",
    "compensation": {
      "base": [
        174000,
        238000
      ],
      "bonus": [
        0,
        0
      ],
      "equity": [
        0,
        0
      ],
      "total": [
        174000,
        238000
      ]
    },
    "workLifeBalance": 0,
    "benefits": 0,
    "growth": 0,
    "confidence": 66,
    "sampleCount": 1,
    "verifiedCount": 1,
    "lastUpdated": "2026-06-22",
    "hoursPerWeek": [
      0,
      0
    ],
    "workplaceSignals": [
      "Work mode: Hybrid",
      "Location: CA/CO/IL/NY/WA",
      "Hybrid collaboration signal found in official posting"
    ],
    "oncall": "Not disclosed in the official posting; needs user reports.",
    "promotionSpeed": "Needs data",
    "negotiationRoom": "Needs data",
    "sourceSignals": [
      {
        "name": "Official job posting",
        "kind": "Job postings",
        "coverage": 95,
        "freshness": "Observed Jun 2026"
      },
      {
        "name": "Public wage data",
        "kind": "Compensation",
        "coverage": 45,
        "freshness": "Baseline only"
      },
      {
        "name": "Needs user reports",
        "kind": "User reports",
        "coverage": 10,
        "freshness": "No verified reports yet"
      }
    ],
    "benefitSignals": [
      "Equity eligibility may apply",
      "Bonus eligibility may apply",
      "Benefits listed in official posting; details need normalization"
    ],
    "evidence": [
      {
        "field": "Listed compensation",
        "status": "Available",
        "confidence": 95,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://www.okta.com/company/careers/engineering/staff-software-engineer-ai-agentic-experience-auth0-8001068/",
        "observedAt": "2026-06-22",
        "note": "Official posting discloses annual base salary range of $174000-$238000 for specified US locations; equity and bonus may apply but are not quantified."
      },
      {
        "field": "Company level",
        "status": "Needs data",
        "confidence": 20,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://www.okta.com/company/careers/engineering/staff-software-engineer-ai-agentic-experience-auth0-8001068/",
        "observedAt": "2026-06-22",
        "note": "The official posting does not disclose an internal company ladder level."
      },
      {
        "field": "Seniority",
        "status": "Inferred",
        "confidence": 70,
        "sourceType": "rolesignal_inference",
        "sourceName": "RoleSignal normalization",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Normalized from title and posting-level text. Verify with user reports when possible."
      },
      {
        "field": "Benefits",
        "status": "Partial",
        "confidence": 65,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://www.okta.com/company/careers/engineering/staff-software-engineer-ai-agentic-experience-auth0-8001068/",
        "observedAt": "2026-06-22",
        "note": "Official posting benefits are listed as coverage signals. Benefit quality still needs employee reports."
      },
      {
        "field": "WLB",
        "status": "Needs user reports",
        "confidence": 10,
        "sourceType": "missing",
        "sourceName": "No verified source yet",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Needs verified user reports before showing a real WLB score."
      },
      {
        "field": "On-call",
        "status": "Needs user reports",
        "confidence": 10,
        "sourceType": "missing",
        "sourceName": "No verified source yet",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Official postings rarely disclose on-call cadence; needs user reports."
      }
    ],
    "decisionGaps": [
      {
        "label": "Full TC unclear",
        "detail": "Posting only confirms listed/base pay.",
        "severity": "high",
        "source": "rolesignal_rule"
      },
      {
        "label": "Equity/bonus unclear",
        "detail": "Eligibility is mentioned, but amount is not.",
        "severity": "high",
        "source": "official_posting"
      },
      {
        "label": "WLB uncertain",
        "detail": "No employee reports for hours, evenings, or weekends yet.",
        "severity": "high",
        "source": "missing_employee_reports"
      },
      {
        "label": "On-call uncertain",
        "detail": "Cadence and incident load are not verified.",
        "severity": "medium",
        "source": "missing_employee_reports"
      },
      {
        "label": "Level unclear",
        "detail": "Internal ladder level is not disclosed.",
        "severity": "medium",
        "source": "official_posting"
      },
      {
        "label": "Few employee reports",
        "detail": "Mostly posting-backed today.",
        "severity": "low",
        "source": "missing_employee_reports"
      }
    ],
    "upside": [
      "Staff-level AI developer experience scope",
      "Equity and bonus listed where applicable",
      "Hybrid collaboration signal"
    ],
    "watchouts": [
      "Base salary only; equity/bonus not quantified",
      "Salary range applies to listed states excluding SF Bay Area",
      "WLB and on-call not disclosed"
    ]
  },
  {
    "slug": "gopuff-senior-software-engineer-delivery-intelligence-remote-us",
    "company": "Gopuff",
    "domain": "gopuff.com",
    "role": "Senior Software Engineer",
    "level": "Senior",
    "companyLevel": "Not disclosed",
    "levelSystem": "Not disclosed",
    "seniorityBand": "Senior",
    "levelRank": 3,
    "levelNotes": "Inferred from Senior, Sr., III, or IC4/IC5 in the title or level.",
    "location": "United States",
    "team": "Delivery Intelligence",
    "employmentMode": "Remote",
    "verdict": "High intensity",
    "oneLine": "Official posting for a senior engineer owning AI-enabled logistics, driver incentives, routing, and delivery efficiency systems.",
    "compensation": {
      "base": [
        175000,
        195000
      ],
      "bonus": [
        0,
        0
      ],
      "equity": [
        0,
        0
      ],
      "total": [
        175000,
        195000
      ]
    },
    "workLifeBalance": 0,
    "benefits": 0,
    "growth": 0,
    "confidence": 64,
    "sampleCount": 1,
    "verifiedCount": 1,
    "lastUpdated": "2026-06-22",
    "hoursPerWeek": [
      0,
      0
    ],
    "workplaceSignals": [
      "Work mode: Remote",
      "Location: United States",
      "Remote signal found in official posting"
    ],
    "oncall": "Not disclosed in the official posting; needs user reports.",
    "promotionSpeed": "Needs data",
    "negotiationRoom": "Needs data",
    "sourceSignals": [
      {
        "name": "Official job posting",
        "kind": "Job postings",
        "coverage": 95,
        "freshness": "Observed Jun 2026"
      },
      {
        "name": "Public wage data",
        "kind": "Compensation",
        "coverage": 45,
        "freshness": "Baseline only"
      },
      {
        "name": "Needs user reports",
        "kind": "User reports",
        "coverage": 10,
        "freshness": "No verified reports yet"
      }
    ],
    "benefitSignals": [
      "Discretionary annual cash bonus eligibility",
      "Equity incentive plan eligibility",
      "Medical insurance",
      "Dental insurance",
      "Vision insurance",
      "401(k)",
      "HSA or FSA eligibility",
      "Disability insurance",
      "Mental health benefits",
      "Fitness reimbursement",
      "Employee discount and FAM Membership",
      "Flexible PTO",
      "Life insurance",
      "Employee assistance program"
    ],
    "evidence": [
      {
        "field": "Listed compensation",
        "status": "Available",
        "confidence": 95,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://jobs.lever.co/gopuff/64ed6492-7415-48ea-9491-44ec94600480",
        "observedAt": "2026-06-22",
        "note": "Official posting discloses base salary range of $175000-$195000; bonus and equity are listed but not quantified."
      },
      {
        "field": "Company level",
        "status": "Needs data",
        "confidence": 20,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://jobs.lever.co/gopuff/64ed6492-7415-48ea-9491-44ec94600480",
        "observedAt": "2026-06-22",
        "note": "The official posting does not disclose an internal company ladder level."
      },
      {
        "field": "Seniority",
        "status": "Inferred",
        "confidence": 70,
        "sourceType": "rolesignal_inference",
        "sourceName": "RoleSignal normalization",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Normalized from title and posting-level text. Verify with user reports when possible."
      },
      {
        "field": "Benefits",
        "status": "Partial",
        "confidence": 65,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://jobs.lever.co/gopuff/64ed6492-7415-48ea-9491-44ec94600480",
        "observedAt": "2026-06-22",
        "note": "Official posting benefits are listed as coverage signals. Benefit quality still needs employee reports."
      },
      {
        "field": "WLB",
        "status": "Needs user reports",
        "confidence": 10,
        "sourceType": "missing",
        "sourceName": "No verified source yet",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Needs verified user reports before showing a real WLB score."
      },
      {
        "field": "On-call",
        "status": "Needs user reports",
        "confidence": 10,
        "sourceType": "missing",
        "sourceName": "No verified source yet",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Official postings rarely disclose on-call cadence; needs user reports."
      }
    ],
    "decisionGaps": [
      {
        "label": "Full TC unclear",
        "detail": "Posting only confirms listed/base pay.",
        "severity": "high",
        "source": "rolesignal_rule"
      },
      {
        "label": "Equity/bonus unclear",
        "detail": "Eligibility is mentioned, but amount is not.",
        "severity": "high",
        "source": "official_posting"
      },
      {
        "label": "WLB uncertain",
        "detail": "No employee reports for hours, evenings, or weekends yet.",
        "severity": "high",
        "source": "missing_employee_reports"
      },
      {
        "label": "On-call uncertain",
        "detail": "Cadence and incident load are not verified.",
        "severity": "medium",
        "source": "missing_employee_reports"
      },
      {
        "label": "Level unclear",
        "detail": "Internal ladder level is not disclosed.",
        "severity": "medium",
        "source": "official_posting"
      },
      {
        "label": "Few employee reports",
        "detail": "Mostly posting-backed today.",
        "severity": "low",
        "source": "missing_employee_reports"
      }
    ],
    "upside": [
      "Remote US role",
      "Discretionary annual cash bonus eligibility listed",
      "Equity incentive plan eligibility listed"
    ],
    "watchouts": [
      "Base salary only; bonus/equity not quantified",
      "WLB and on-call not disclosed",
      "Posting emphasizes ambiguous real-time logistics ownership"
    ]
  },
  {
    "slug": "lyra-sr-software-engineer-engineering-tools-remote-us",
    "company": "Lyra Health",
    "domain": "lyrahealth.com",
    "role": "Sr. Software Engineer",
    "level": "Senior",
    "companyLevel": "Not disclosed",
    "levelSystem": "Not disclosed",
    "seniorityBand": "Senior",
    "levelRank": 3,
    "levelNotes": "Inferred from Senior, Sr., III, or IC4/IC5 in the title or level.",
    "location": "United States",
    "team": "Engineering Tools",
    "employmentMode": "Remote",
    "verdict": "Strong fit",
    "oneLine": "Official posting for a senior engineering tools role focused on automation frameworks, performance tests, CI/CD stability, and internal productivity tooling.",
    "compensation": {
      "base": [
        143000,
        219000
      ],
      "bonus": [
        0,
        0
      ],
      "equity": [
        0,
        0
      ],
      "total": [
        143000,
        219000
      ]
    },
    "workLifeBalance": 0,
    "benefits": 0,
    "growth": 0,
    "confidence": 64,
    "sampleCount": 1,
    "verifiedCount": 1,
    "lastUpdated": "2026-06-22",
    "hoursPerWeek": [
      0,
      0
    ],
    "workplaceSignals": [
      "Work mode: Remote",
      "Location: United States",
      "Remote signal found in official posting"
    ],
    "oncall": "Not disclosed in the official posting; needs user reports.",
    "promotionSpeed": "Needs data",
    "negotiationRoom": "Needs data",
    "sourceSignals": [
      {
        "name": "Official job posting",
        "kind": "Job postings",
        "coverage": 95,
        "freshness": "Observed Jun 2026"
      },
      {
        "name": "Public wage data",
        "kind": "Compensation",
        "coverage": 45,
        "freshness": "Baseline only"
      },
      {
        "name": "Needs user reports",
        "kind": "User reports",
        "coverage": 10,
        "freshness": "No verified reports yet"
      }
    ],
    "benefitSignals": [
      "Discretionary bonus eligibility",
      "Equity through discretionary RSUs",
      "Medical coverage",
      "Dental coverage",
      "Vision coverage",
      "FSA or HSA",
      "Life and disability insurance",
      "Lyra coaching and therapy services",
      "Paid time off",
      "Paid parental leave",
      "401(k) match up to 3%",
      "Monthly tech allowance"
    ],
    "evidence": [
      {
        "field": "Listed compensation",
        "status": "Available",
        "confidence": 95,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://jobs.lever.co/lyrahealth/d1247fef-2439-4a1e-ab89-2ff980b746cd",
        "observedAt": "2026-06-22",
        "note": "Official posting discloses annual base salary range of $143000-$219000; discretionary bonuses and equity are listed but not quantified."
      },
      {
        "field": "Company level",
        "status": "Needs data",
        "confidence": 20,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://jobs.lever.co/lyrahealth/d1247fef-2439-4a1e-ab89-2ff980b746cd",
        "observedAt": "2026-06-22",
        "note": "The official posting does not disclose an internal company ladder level."
      },
      {
        "field": "Seniority",
        "status": "Inferred",
        "confidence": 70,
        "sourceType": "rolesignal_inference",
        "sourceName": "RoleSignal normalization",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Normalized from title and posting-level text. Verify with user reports when possible."
      },
      {
        "field": "Benefits",
        "status": "Partial",
        "confidence": 65,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://jobs.lever.co/lyrahealth/d1247fef-2439-4a1e-ab89-2ff980b746cd",
        "observedAt": "2026-06-22",
        "note": "Official posting benefits are listed as coverage signals. Benefit quality still needs employee reports."
      },
      {
        "field": "WLB",
        "status": "Needs user reports",
        "confidence": 10,
        "sourceType": "missing",
        "sourceName": "No verified source yet",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Needs verified user reports before showing a real WLB score."
      },
      {
        "field": "On-call",
        "status": "Needs user reports",
        "confidence": 10,
        "sourceType": "missing",
        "sourceName": "No verified source yet",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Official postings rarely disclose on-call cadence; needs user reports."
      }
    ],
    "decisionGaps": [
      {
        "label": "Full TC unclear",
        "detail": "Posting only confirms listed/base pay.",
        "severity": "high",
        "source": "rolesignal_rule"
      },
      {
        "label": "Equity/bonus unclear",
        "detail": "Eligibility is mentioned, but amount is not.",
        "severity": "high",
        "source": "official_posting"
      },
      {
        "label": "WLB uncertain",
        "detail": "No employee reports for hours, evenings, or weekends yet.",
        "severity": "high",
        "source": "missing_employee_reports"
      },
      {
        "label": "On-call uncertain",
        "detail": "Cadence and incident load are not verified.",
        "severity": "medium",
        "source": "missing_employee_reports"
      },
      {
        "label": "Level unclear",
        "detail": "Internal ladder level is not disclosed.",
        "severity": "medium",
        "source": "official_posting"
      },
      {
        "label": "Few employee reports",
        "detail": "Mostly posting-backed today.",
        "severity": "low",
        "source": "missing_employee_reports"
      }
    ],
    "upside": [
      "Remote US role",
      "Discretionary bonus eligibility listed",
      "Equity through discretionary RSUs and broad benefits listed"
    ],
    "watchouts": [
      "Base salary only; bonus/equity not quantified",
      "WLB and on-call not disclosed",
      "Tooling role scope spans multiple engineering teams"
    ]
  },
  {
    "slug": "lyra-sr-software-engineer-fullstack-remote-us",
    "company": "Lyra Health",
    "domain": "lyrahealth.com",
    "role": "Sr. Software Engineer",
    "level": "Senior",
    "companyLevel": "Not disclosed",
    "levelSystem": "Not disclosed",
    "seniorityBand": "Senior",
    "levelRank": 3,
    "levelNotes": "Inferred from Senior, Sr., III, or IC4/IC5 in the title or level.",
    "location": "United States",
    "team": "In-Care Experience",
    "employmentMode": "Remote",
    "verdict": "Strong fit",
    "oneLine": "Official posting for a senior full-stack engineer building onboarding, notifications, and care-program infrastructure for Lyra members and providers.",
    "compensation": {
      "base": [
        128000,
        195000
      ],
      "bonus": [
        0,
        0
      ],
      "equity": [
        0,
        0
      ],
      "total": [
        128000,
        195000
      ]
    },
    "workLifeBalance": 0,
    "benefits": 0,
    "growth": 0,
    "confidence": 63,
    "sampleCount": 1,
    "verifiedCount": 1,
    "lastUpdated": "2026-06-22",
    "hoursPerWeek": [
      0,
      0
    ],
    "workplaceSignals": [
      "Work mode: Remote",
      "Location: United States",
      "Remote signal found in official posting"
    ],
    "oncall": "Not disclosed in the official posting; needs user reports.",
    "promotionSpeed": "Needs data",
    "negotiationRoom": "Needs data",
    "sourceSignals": [
      {
        "name": "Official job posting",
        "kind": "Job postings",
        "coverage": 95,
        "freshness": "Observed Jun 2026"
      },
      {
        "name": "Public wage data",
        "kind": "Compensation",
        "coverage": 45,
        "freshness": "Baseline only"
      },
      {
        "name": "Needs user reports",
        "kind": "User reports",
        "coverage": 10,
        "freshness": "No verified reports yet"
      }
    ],
    "benefitSignals": [
      "Discretionary bonus eligibility",
      "Equity through discretionary RSUs",
      "Medical coverage",
      "Dental coverage",
      "Vision coverage",
      "FSA or HSA",
      "Life and disability insurance",
      "Lyra coaching and therapy services",
      "Paid time off",
      "Paid parental leave",
      "401(k) retirement benefits",
      "Monthly tech allowance"
    ],
    "evidence": [
      {
        "field": "Listed compensation",
        "status": "Available",
        "confidence": 95,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://jobs.lever.co/lyrahealth/2c78a9be-7211-45e7-bb48-48471092e515",
        "observedAt": "2026-06-22",
        "note": "Official posting discloses annual base salary range of $128000-$195000; discretionary bonuses and equity are listed but not quantified."
      },
      {
        "field": "Company level",
        "status": "Needs data",
        "confidence": 20,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://jobs.lever.co/lyrahealth/2c78a9be-7211-45e7-bb48-48471092e515",
        "observedAt": "2026-06-22",
        "note": "The official posting does not disclose an internal company ladder level."
      },
      {
        "field": "Seniority",
        "status": "Inferred",
        "confidence": 70,
        "sourceType": "rolesignal_inference",
        "sourceName": "RoleSignal normalization",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Normalized from title and posting-level text. Verify with user reports when possible."
      },
      {
        "field": "Benefits",
        "status": "Partial",
        "confidence": 65,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://jobs.lever.co/lyrahealth/2c78a9be-7211-45e7-bb48-48471092e515",
        "observedAt": "2026-06-22",
        "note": "Official posting benefits are listed as coverage signals. Benefit quality still needs employee reports."
      },
      {
        "field": "WLB",
        "status": "Needs user reports",
        "confidence": 10,
        "sourceType": "missing",
        "sourceName": "No verified source yet",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Needs verified user reports before showing a real WLB score."
      },
      {
        "field": "On-call",
        "status": "Needs user reports",
        "confidence": 10,
        "sourceType": "missing",
        "sourceName": "No verified source yet",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Official postings rarely disclose on-call cadence; needs user reports."
      }
    ],
    "decisionGaps": [
      {
        "label": "Full TC unclear",
        "detail": "Posting only confirms listed/base pay.",
        "severity": "high",
        "source": "rolesignal_rule"
      },
      {
        "label": "Equity/bonus unclear",
        "detail": "Eligibility is mentioned, but amount is not.",
        "severity": "high",
        "source": "official_posting"
      },
      {
        "label": "WLB uncertain",
        "detail": "No employee reports for hours, evenings, or weekends yet.",
        "severity": "high",
        "source": "missing_employee_reports"
      },
      {
        "label": "On-call uncertain",
        "detail": "Cadence and incident load are not verified.",
        "severity": "medium",
        "source": "missing_employee_reports"
      },
      {
        "label": "Level unclear",
        "detail": "Internal ladder level is not disclosed.",
        "severity": "medium",
        "source": "official_posting"
      },
      {
        "label": "Few employee reports",
        "detail": "Mostly posting-backed today.",
        "severity": "low",
        "source": "missing_employee_reports"
      }
    ],
    "upside": [
      "Remote US role",
      "Discretionary bonus eligibility listed",
      "Equity through discretionary RSUs and benefits listed"
    ],
    "watchouts": [
      "Base salary only; bonus/equity not quantified",
      "WLB and on-call not disclosed",
      "Healthcare product context may add compliance overhead"
    ]
  },
  {
    "slug": "attentive-senior-software-engineer-identity-us",
    "company": "Attentive",
    "domain": "attentive.com",
    "role": "Senior Software Engineer",
    "level": "Senior",
    "companyLevel": "Not disclosed",
    "levelSystem": "Not disclosed",
    "seniorityBand": "Senior",
    "levelRank": 3,
    "levelNotes": "Inferred from Senior, Sr., III, or IC4/IC5 in the title or level.",
    "location": "United States",
    "team": "Identity",
    "employmentMode": "Unspecified",
    "verdict": "High intensity",
    "oneLine": "Official posting for a senior identity engineer working on high-scale identity resolution systems that process billions of events per day.",
    "compensation": {
      "base": [
        180000,
        210000
      ],
      "bonus": [
        0,
        0
      ],
      "equity": [
        0,
        0
      ],
      "total": [
        180000,
        210000
      ]
    },
    "workLifeBalance": 0,
    "benefits": 0,
    "growth": 0,
    "confidence": 62,
    "sampleCount": 1,
    "verifiedCount": 1,
    "lastUpdated": "2026-06-22",
    "hoursPerWeek": [
      0,
      0
    ],
    "workplaceSignals": [
      "Work mode: Unspecified",
      "Location: United States"
    ],
    "oncall": "Not disclosed in the official posting; needs user reports.",
    "promotionSpeed": "Needs data",
    "negotiationRoom": "Needs data",
    "sourceSignals": [
      {
        "name": "Official job posting",
        "kind": "Job postings",
        "coverage": 95,
        "freshness": "Observed Jun 2026"
      },
      {
        "name": "Public wage data",
        "kind": "Compensation",
        "coverage": 45,
        "freshness": "Baseline only"
      },
      {
        "name": "Needs user reports",
        "kind": "User reports",
        "coverage": 10,
        "freshness": "No verified reports yet"
      }
    ],
    "benefitSignals": [
      "Equity eligibility",
      "Health and wellness perks",
      "Benefits listed through official perks page"
    ],
    "evidence": [
      {
        "field": "Listed compensation",
        "status": "Available",
        "confidence": 95,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://job-boards.greenhouse.io/attentive/jobs/4240471009",
        "observedAt": "2026-06-22",
        "note": "Official posting discloses US base salary range of $180000-$210000 plus equity and benefits; equity is not quantified."
      },
      {
        "field": "Company level",
        "status": "Needs data",
        "confidence": 20,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://job-boards.greenhouse.io/attentive/jobs/4240471009",
        "observedAt": "2026-06-22",
        "note": "The official posting does not disclose an internal company ladder level."
      },
      {
        "field": "Seniority",
        "status": "Inferred",
        "confidence": 70,
        "sourceType": "rolesignal_inference",
        "sourceName": "RoleSignal normalization",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Normalized from title and posting-level text. Verify with user reports when possible."
      },
      {
        "field": "Benefits",
        "status": "Partial",
        "confidence": 65,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://job-boards.greenhouse.io/attentive/jobs/4240471009",
        "observedAt": "2026-06-22",
        "note": "Official posting benefits are listed as coverage signals. Benefit quality still needs employee reports."
      },
      {
        "field": "WLB",
        "status": "Needs user reports",
        "confidence": 10,
        "sourceType": "missing",
        "sourceName": "No verified source yet",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Needs verified user reports before showing a real WLB score."
      },
      {
        "field": "On-call",
        "status": "Needs user reports",
        "confidence": 10,
        "sourceType": "missing",
        "sourceName": "No verified source yet",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Official postings rarely disclose on-call cadence; needs user reports."
      }
    ],
    "decisionGaps": [
      {
        "label": "Full TC unclear",
        "detail": "Posting only confirms listed/base pay.",
        "severity": "high",
        "source": "rolesignal_rule"
      },
      {
        "label": "Equity/bonus unclear",
        "detail": "Eligibility is mentioned, but amount is not.",
        "severity": "high",
        "source": "official_posting"
      },
      {
        "label": "WLB uncertain",
        "detail": "No employee reports for hours, evenings, or weekends yet.",
        "severity": "high",
        "source": "missing_employee_reports"
      },
      {
        "label": "On-call uncertain",
        "detail": "Cadence and incident load are not verified.",
        "severity": "medium",
        "source": "missing_employee_reports"
      },
      {
        "label": "Level unclear",
        "detail": "Internal ladder level is not disclosed.",
        "severity": "medium",
        "source": "official_posting"
      },
      {
        "label": "Work mode unclear",
        "detail": "Remote, hybrid, timezone, or office expectations need confirmation.",
        "severity": "medium",
        "source": "official_posting"
      },
      {
        "label": "Few employee reports",
        "detail": "Mostly posting-backed today.",
        "severity": "low",
        "source": "missing_employee_reports"
      }
    ],
    "upside": [
      "Equity and benefits listed",
      "High-scale data system ownership",
      "Distributed workforce signal in posting"
    ],
    "watchouts": [
      "Base salary only; equity not quantified",
      "Workplace mode is not clearly disclosed",
      "WLB and on-call not disclosed"
    ]
  },
  {
    "slug": "lumafield-backend-software-engineer-sf",
    "company": "Lumafield",
    "domain": "lumafield.com",
    "role": "Backend Software Engineer",
    "level": "Not disclosed",
    "companyLevel": "Not disclosed",
    "levelSystem": "Not disclosed",
    "seniorityBand": "Unspecified",
    "levelRank": 0,
    "levelNotes": "The official posting does not disclose a clear seniority band.",
    "location": "San Francisco, CA",
    "team": "Software Engineering",
    "employmentMode": "Onsite",
    "verdict": "Proceed carefully",
    "oneLine": "Official posting for a backend engineer building cloud APIs and large dataset processing pipelines for industrial CT and manufacturing data.",
    "compensation": {
      "base": [
        125000,
        140000
      ],
      "bonus": [
        0,
        0
      ],
      "equity": [
        0,
        0
      ],
      "total": [
        125000,
        140000
      ]
    },
    "workLifeBalance": 0,
    "benefits": 0,
    "growth": 0,
    "confidence": 58,
    "sampleCount": 1,
    "verifiedCount": 1,
    "lastUpdated": "2026-06-22",
    "hoursPerWeek": [
      0,
      0
    ],
    "workplaceSignals": [
      "Work mode: Onsite",
      "Location: San Francisco, CA",
      "Onsite requirement found in official posting"
    ],
    "oncall": "Not disclosed in the official posting; needs user reports.",
    "promotionSpeed": "Needs data",
    "negotiationRoom": "Needs data",
    "sourceSignals": [
      {
        "name": "Official job posting",
        "kind": "Job postings",
        "coverage": 95,
        "freshness": "Observed Jun 2026"
      },
      {
        "name": "Public wage data",
        "kind": "Compensation",
        "coverage": 45,
        "freshness": "Baseline only"
      },
      {
        "name": "Needs user reports",
        "kind": "User reports",
        "coverage": 10,
        "freshness": "No verified reports yet"
      }
    ],
    "benefitSignals": [
      "Equity grant for full-time employees",
      "Health and wellness stipend",
      "401(k)",
      "Parental leave",
      "Flexible PTO",
      "Commuter benefits",
      "Company-wide events"
    ],
    "evidence": [
      {
        "field": "Listed compensation",
        "status": "Available",
        "confidence": 95,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://jobs.lever.co/lumafield/a162ca4e-4beb-4f6f-94ac-44e327e481b0",
        "observedAt": "2026-06-22",
        "note": "Official posting discloses base salary range of $125000-$140000; full-time employees receive equity but it is not quantified."
      },
      {
        "field": "Company level",
        "status": "Needs data",
        "confidence": 20,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://jobs.lever.co/lumafield/a162ca4e-4beb-4f6f-94ac-44e327e481b0",
        "observedAt": "2026-06-22",
        "note": "The official posting does not disclose an internal company ladder level."
      },
      {
        "field": "Seniority",
        "status": "Inferred",
        "confidence": 70,
        "sourceType": "rolesignal_inference",
        "sourceName": "RoleSignal normalization",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Normalized from title and posting-level text. Verify with user reports when possible."
      },
      {
        "field": "Benefits",
        "status": "Partial",
        "confidence": 65,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://jobs.lever.co/lumafield/a162ca4e-4beb-4f6f-94ac-44e327e481b0",
        "observedAt": "2026-06-22",
        "note": "Official posting benefits are listed as coverage signals. Benefit quality still needs employee reports."
      },
      {
        "field": "WLB",
        "status": "Needs user reports",
        "confidence": 10,
        "sourceType": "missing",
        "sourceName": "No verified source yet",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Needs verified user reports before showing a real WLB score."
      },
      {
        "field": "On-call",
        "status": "Needs user reports",
        "confidence": 10,
        "sourceType": "missing",
        "sourceName": "No verified source yet",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Official postings rarely disclose on-call cadence; needs user reports."
      }
    ],
    "decisionGaps": [
      {
        "label": "Full TC unclear",
        "detail": "Posting only confirms listed/base pay.",
        "severity": "high",
        "source": "rolesignal_rule"
      },
      {
        "label": "Equity/bonus unclear",
        "detail": "Eligibility is mentioned, but amount is not.",
        "severity": "high",
        "source": "official_posting"
      },
      {
        "label": "WLB uncertain",
        "detail": "No employee reports for hours, evenings, or weekends yet.",
        "severity": "high",
        "source": "missing_employee_reports"
      },
      {
        "label": "On-call uncertain",
        "detail": "Cadence and incident load are not verified.",
        "severity": "medium",
        "source": "missing_employee_reports"
      },
      {
        "label": "Level unclear",
        "detail": "Internal ladder level is not disclosed.",
        "severity": "medium",
        "source": "official_posting"
      },
      {
        "label": "Seniority unclear",
        "detail": "Scope and promotion bar need confirmation.",
        "severity": "medium",
        "source": "rolesignal_rule"
      },
      {
        "label": "Few employee reports",
        "detail": "Mostly posting-backed today.",
        "severity": "low",
        "source": "missing_employee_reports"
      }
    ],
    "upside": [
      "Equity grant listed for full-time employees",
      "Hands-on backend and data processing scope",
      "Manufacturing AI product domain"
    ],
    "watchouts": [
      "Base salary only; equity not quantified",
      "On-site San Francisco role",
      "Posting states no current or future visa sponsorship"
    ]
  },
  {
    "slug": "reddit-senior-software-engineer-ads-remote-us",
    "company": "Reddit",
    "domain": "redditinc.com",
    "role": "Senior Software Engineer",
    "level": "Senior",
    "companyLevel": "Not disclosed",
    "levelSystem": "Not disclosed",
    "seniorityBand": "Senior",
    "levelRank": 3,
    "levelNotes": "Inferred from Senior, Sr., III, or IC4/IC5 in the title or level.",
    "location": "Remote - United States",
    "team": "Ads",
    "employmentMode": "Remote",
    "verdict": "High intensity",
    "oneLine": "Official posting for a senior backend engineer building ads microservices, distributed systems, campaign measurement, and advertiser-facing products.",
    "compensation": {
      "base": [
        190800,
        267100
      ],
      "bonus": [
        0,
        0
      ],
      "equity": [
        0,
        0
      ],
      "total": [
        190800,
        267100
      ]
    },
    "workLifeBalance": 0,
    "benefits": 0,
    "growth": 0,
    "confidence": 67,
    "sampleCount": 1,
    "verifiedCount": 1,
    "lastUpdated": "2026-06-22",
    "hoursPerWeek": [
      0,
      0
    ],
    "workplaceSignals": [
      "Work mode: Remote",
      "Location: Remote - United States",
      "Remote signal found in official posting"
    ],
    "oncall": "Not disclosed in the official posting; needs user reports.",
    "promotionSpeed": "Needs data",
    "negotiationRoom": "Needs data",
    "sourceSignals": [
      {
        "name": "Official job posting",
        "kind": "Job postings",
        "coverage": 95,
        "freshness": "Observed Jun 2026"
      },
      {
        "name": "Public wage data",
        "kind": "Compensation",
        "coverage": 45,
        "freshness": "Baseline only"
      },
      {
        "name": "Needs user reports",
        "kind": "User reports",
        "coverage": 10,
        "freshness": "No verified reports yet"
      }
    ],
    "benefitSignals": [
      "RSU equity eligibility",
      "Comprehensive healthcare benefits",
      "Income replacement programs",
      "401(k) employer match",
      "Global lifestyle benefits",
      "Family planning support",
      "Gender-affirming care",
      "Mental health and coaching benefits",
      "Flexible vacation",
      "Paid volunteer time off",
      "Paid parental leave"
    ],
    "evidence": [
      {
        "field": "Listed compensation",
        "status": "Available",
        "confidence": 95,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://job-boards.greenhouse.io/reddit/jobs/6909091",
        "observedAt": "2026-06-22",
        "note": "Official posting discloses US base salary range of $190800-$267100; RSU equity and possible commission are listed but not quantified."
      },
      {
        "field": "Company level",
        "status": "Needs data",
        "confidence": 20,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://job-boards.greenhouse.io/reddit/jobs/6909091",
        "observedAt": "2026-06-22",
        "note": "The official posting does not disclose an internal company ladder level."
      },
      {
        "field": "Seniority",
        "status": "Inferred",
        "confidence": 70,
        "sourceType": "rolesignal_inference",
        "sourceName": "RoleSignal normalization",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Normalized from title and posting-level text. Verify with user reports when possible."
      },
      {
        "field": "Benefits",
        "status": "Partial",
        "confidence": 65,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://job-boards.greenhouse.io/reddit/jobs/6909091",
        "observedAt": "2026-06-22",
        "note": "Official posting benefits are listed as coverage signals. Benefit quality still needs employee reports."
      },
      {
        "field": "WLB",
        "status": "Needs user reports",
        "confidence": 10,
        "sourceType": "missing",
        "sourceName": "No verified source yet",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Needs verified user reports before showing a real WLB score."
      },
      {
        "field": "On-call",
        "status": "Needs user reports",
        "confidence": 10,
        "sourceType": "missing",
        "sourceName": "No verified source yet",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Official postings rarely disclose on-call cadence; needs user reports."
      }
    ],
    "decisionGaps": [
      {
        "label": "Full TC unclear",
        "detail": "Posting only confirms listed/base pay.",
        "severity": "high",
        "source": "rolesignal_rule"
      },
      {
        "label": "Equity/bonus unclear",
        "detail": "Eligibility is mentioned, but amount is not.",
        "severity": "high",
        "source": "official_posting"
      },
      {
        "label": "WLB uncertain",
        "detail": "No employee reports for hours, evenings, or weekends yet.",
        "severity": "high",
        "source": "missing_employee_reports"
      },
      {
        "label": "On-call uncertain",
        "detail": "Cadence and incident load are not verified.",
        "severity": "medium",
        "source": "missing_employee_reports"
      },
      {
        "label": "Level unclear",
        "detail": "Internal ladder level is not disclosed.",
        "severity": "medium",
        "source": "official_posting"
      },
      {
        "label": "Few employee reports",
        "detail": "Mostly posting-backed today.",
        "severity": "low",
        "source": "missing_employee_reports"
      }
    ],
    "upside": [
      "Remote US role",
      "RSU equity eligibility listed",
      "Large-scale ads infrastructure scope"
    ],
    "watchouts": [
      "Base salary only; equity and commission eligibility not quantified",
      "WLB and on-call not disclosed",
      "Ads systems may carry operational and revenue pressure"
    ]
  },
  {
    "slug": "upstart-senior-software-engineer-pricing-remote-us",
    "company": "Upstart",
    "domain": "upstart.com",
    "role": "Senior Software Engineer",
    "level": "Senior",
    "companyLevel": "Not disclosed",
    "levelSystem": "Not disclosed",
    "seniorityBand": "Senior",
    "levelRank": 3,
    "levelNotes": "Inferred from Senior, Sr., III, or IC4/IC5 in the title or level.",
    "location": "Remote US",
    "team": "Core Pricing",
    "employmentMode": "Remote",
    "verdict": "High intensity",
    "oneLine": "Official posting for a senior pricing engineer building real-time pricing services and model-backed risk and profitability systems.",
    "compensation": {
      "base": [
        166900,
        230900
      ],
      "bonus": [
        0,
        0
      ],
      "equity": [
        0,
        0
      ],
      "total": [
        166900,
        230900
      ]
    },
    "workLifeBalance": 0,
    "benefits": 0,
    "growth": 0,
    "confidence": 65,
    "sampleCount": 1,
    "verifiedCount": 1,
    "lastUpdated": "2026-06-22",
    "hoursPerWeek": [
      0,
      0
    ],
    "workplaceSignals": [
      "Work mode: Remote",
      "Location: Remote US",
      "Remote signal found in official posting",
      "Onsite requirement found in official posting",
      "Periodic onsite collaboration noted"
    ],
    "oncall": "Not disclosed in the official posting; needs user reports.",
    "promotionSpeed": "Needs data",
    "negotiationRoom": "Needs data",
    "sourceSignals": [
      {
        "name": "Official job posting",
        "kind": "Job postings",
        "coverage": 95,
        "freshness": "Observed Jun 2026"
      },
      {
        "name": "Public wage data",
        "kind": "Compensation",
        "coverage": 45,
        "freshness": "Baseline only"
      },
      {
        "name": "Needs user reports",
        "kind": "User reports",
        "coverage": 10,
        "freshness": "No verified reports yet"
      }
    ],
    "benefitSignals": [
      "Target bonus opportunities",
      "Annual equity grants",
      "Medical insurance",
      "Dental insurance",
      "Vision insurance",
      "401(k) match",
      "ESPP for eligible US employees",
      "HSA contributions for eligible plans",
      "Life and disability insurance",
      "Paid time off and sick leave"
    ],
    "evidence": [
      {
        "field": "Listed compensation",
        "status": "Available",
        "confidence": 95,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://careers.upstart.com/jobs/senior-software-engineer-pricing-4298d481-53af-433b-93bd-6c4d1b75d7e7?gh_jid=7875501",
        "observedAt": "2026-06-22",
        "note": "Official posting discloses US remote anticipated base salary range of $166900-$230900; bonus and equity are listed but not quantified."
      },
      {
        "field": "Company level",
        "status": "Needs data",
        "confidence": 20,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://careers.upstart.com/jobs/senior-software-engineer-pricing-4298d481-53af-433b-93bd-6c4d1b75d7e7?gh_jid=7875501",
        "observedAt": "2026-06-22",
        "note": "The official posting does not disclose an internal company ladder level."
      },
      {
        "field": "Seniority",
        "status": "Inferred",
        "confidence": 70,
        "sourceType": "rolesignal_inference",
        "sourceName": "RoleSignal normalization",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Normalized from title and posting-level text. Verify with user reports when possible."
      },
      {
        "field": "Benefits",
        "status": "Partial",
        "confidence": 65,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://careers.upstart.com/jobs/senior-software-engineer-pricing-4298d481-53af-433b-93bd-6c4d1b75d7e7?gh_jid=7875501",
        "observedAt": "2026-06-22",
        "note": "Official posting benefits are listed as coverage signals. Benefit quality still needs employee reports."
      },
      {
        "field": "WLB",
        "status": "Needs user reports",
        "confidence": 10,
        "sourceType": "missing",
        "sourceName": "No verified source yet",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Needs verified user reports before showing a real WLB score."
      },
      {
        "field": "On-call",
        "status": "Needs user reports",
        "confidence": 10,
        "sourceType": "missing",
        "sourceName": "No verified source yet",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Official postings rarely disclose on-call cadence; needs user reports."
      }
    ],
    "decisionGaps": [
      {
        "label": "Full TC unclear",
        "detail": "Posting only confirms listed/base pay.",
        "severity": "high",
        "source": "rolesignal_rule"
      },
      {
        "label": "Equity/bonus unclear",
        "detail": "Eligibility is mentioned, but amount is not.",
        "severity": "high",
        "source": "official_posting"
      },
      {
        "label": "WLB uncertain",
        "detail": "No employee reports for hours, evenings, or weekends yet.",
        "severity": "high",
        "source": "missing_employee_reports"
      },
      {
        "label": "On-call uncertain",
        "detail": "Cadence and incident load are not verified.",
        "severity": "medium",
        "source": "missing_employee_reports"
      },
      {
        "label": "Level unclear",
        "detail": "Internal ladder level is not disclosed.",
        "severity": "medium",
        "source": "official_posting"
      },
      {
        "label": "Few employee reports",
        "detail": "Mostly posting-backed today.",
        "severity": "low",
        "source": "missing_employee_reports"
      }
    ],
    "upside": [
      "Remote US role",
      "Target bonus and equity compensation listed",
      "Benefits and quarterly onsite collaboration covered in posting"
    ],
    "watchouts": [
      "Base salary only; bonus/equity not quantified",
      "WLB and on-call not disclosed",
      "Pricing systems are tied to financial risk and product revenue"
    ]
  },
  {
    "slug": "weavegrid-senior-software-engineer-backend-sf-remote",
    "company": "WeaveGrid",
    "domain": "weavegrid.com",
    "role": "Senior Software Engineer",
    "level": "Senior",
    "companyLevel": "Not disclosed",
    "levelSystem": "Not disclosed",
    "seniorityBand": "Senior",
    "levelRank": 3,
    "levelNotes": "Inferred from Senior, Sr., III, or IC4/IC5 in the title or level.",
    "location": "San Francisco, CA / Remote",
    "team": "Backend",
    "employmentMode": "Remote",
    "verdict": "High intensity",
    "oneLine": "Official posting for a senior backend engineer building DERMS software, partner integrations, reliability monitoring, and utility-scale distributed-energy systems.",
    "compensation": {
      "base": [
        130000,
        190000
      ],
      "bonus": [
        0,
        0
      ],
      "equity": [
        0,
        0
      ],
      "total": [
        130000,
        190000
      ]
    },
    "workLifeBalance": 0,
    "benefits": 0,
    "growth": 0,
    "confidence": 66,
    "sampleCount": 1,
    "verifiedCount": 1,
    "lastUpdated": "2026-06-22",
    "hoursPerWeek": [
      0,
      0
    ],
    "workplaceSignals": [
      "Work mode: Remote",
      "Location: San Francisco, CA / Remote",
      "Office attendance detail: 2 days/week"
    ],
    "oncall": "Official posting says this role participates in on-call rotations periodically, about once per quarter.",
    "promotionSpeed": "Needs data",
    "negotiationRoom": "Needs data",
    "sourceSignals": [
      {
        "name": "Official job posting",
        "kind": "Job postings",
        "coverage": 95,
        "freshness": "Observed Jun 2026"
      },
      {
        "name": "Public wage data",
        "kind": "Compensation",
        "coverage": 45,
        "freshness": "Baseline only"
      },
      {
        "name": "Needs user reports",
        "kind": "User reports",
        "coverage": 10,
        "freshness": "No verified reports yet"
      }
    ],
    "benefitSignals": [
      "Stock options",
      "Benefits listed in official posting; details need normalization"
    ],
    "evidence": [
      {
        "field": "Listed compensation",
        "status": "Available",
        "confidence": 95,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://jobs.ashbyhq.com/weave-grid/fe455659-d2b5-4440-8bca-53f0ce513994",
        "observedAt": "2026-06-22",
        "note": "Official posting discloses base salary range of $130000-$190000 plus equity and benefits; equity is not quantified."
      },
      {
        "field": "Company level",
        "status": "Needs data",
        "confidence": 20,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://jobs.ashbyhq.com/weave-grid/fe455659-d2b5-4440-8bca-53f0ce513994",
        "observedAt": "2026-06-22",
        "note": "The official posting does not disclose an internal company ladder level."
      },
      {
        "field": "Seniority",
        "status": "Inferred",
        "confidence": 70,
        "sourceType": "rolesignal_inference",
        "sourceName": "RoleSignal normalization",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Normalized from title and posting-level text. Verify with user reports when possible."
      },
      {
        "field": "Benefits",
        "status": "Partial",
        "confidence": 65,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://jobs.ashbyhq.com/weave-grid/fe455659-d2b5-4440-8bca-53f0ce513994",
        "observedAt": "2026-06-22",
        "note": "Official posting benefits are listed as coverage signals. Benefit quality still needs employee reports."
      },
      {
        "field": "WLB",
        "status": "Needs user reports",
        "confidence": 10,
        "sourceType": "missing",
        "sourceName": "No verified source yet",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Needs verified user reports before showing a real WLB score."
      },
      {
        "field": "On-call",
        "status": "Available",
        "confidence": 70,
        "sourceType": "user_reports",
        "sourceName": "Aggregated user reports",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "On-call cadence should be aggregated from user reports."
      }
    ],
    "decisionGaps": [
      {
        "label": "Full TC unclear",
        "detail": "Posting only confirms listed/base pay.",
        "severity": "high",
        "source": "rolesignal_rule"
      },
      {
        "label": "Equity/bonus unclear",
        "detail": "Eligibility is mentioned, but amount is not.",
        "severity": "high",
        "source": "official_posting"
      },
      {
        "label": "WLB uncertain",
        "detail": "No employee reports for hours, evenings, or weekends yet.",
        "severity": "high",
        "source": "missing_employee_reports"
      },
      {
        "label": "Level unclear",
        "detail": "Internal ladder level is not disclosed.",
        "severity": "medium",
        "source": "official_posting"
      },
      {
        "label": "Few employee reports",
        "detail": "Mostly posting-backed today.",
        "severity": "low",
        "source": "missing_employee_reports"
      }
    ],
    "upside": [
      "Remote-compatible role with SF office option",
      "Stock options and benefits listed",
      "On-call cadence disclosed in posting"
    ],
    "watchouts": [
      "Base salary only; equity not quantified",
      "SF Bay Area employees may work from office 2 days/week",
      "Utility reliability domain may require operational rigor"
    ]
  },
  {
    "slug": "qualified-senior-software-engineer-smts-foundations-remote-us",
    "company": "Qualified",
    "domain": "qualified.com",
    "role": "Senior Software Engineer",
    "level": "SMTS",
    "companyLevel": "Not disclosed",
    "levelSystem": "Not disclosed",
    "seniorityBand": "Senior",
    "levelRank": 3,
    "levelNotes": "Inferred from Senior, Sr., III, or IC4/IC5 in the title or level.",
    "location": "United States",
    "team": "Foundations",
    "employmentMode": "Remote",
    "verdict": "Strong fit",
    "oneLine": "Official posting for a senior member of technical staff role on the Foundations team, focused on shared systems and platform reliability for Qualified's product.",
    "compensation": {
      "base": [
        148500,
        223900
      ],
      "bonus": [
        0,
        0
      ],
      "equity": [
        0,
        0
      ],
      "total": [
        148500,
        223900
      ]
    },
    "workLifeBalance": 0,
    "benefits": 0,
    "growth": 0,
    "confidence": 64,
    "sampleCount": 1,
    "verifiedCount": 1,
    "lastUpdated": "2026-06-22",
    "hoursPerWeek": [
      0,
      0
    ],
    "workplaceSignals": [
      "Work mode: Remote",
      "Location: United States"
    ],
    "oncall": "Not disclosed in the official posting; needs user reports.",
    "promotionSpeed": "Needs data",
    "negotiationRoom": "Needs data",
    "sourceSignals": [
      {
        "name": "Official job posting",
        "kind": "Job postings",
        "coverage": 95,
        "freshness": "Observed Jun 2026"
      },
      {
        "name": "Public wage data",
        "kind": "Compensation",
        "coverage": 45,
        "freshness": "Baseline only"
      },
      {
        "name": "Needs user reports",
        "kind": "User reports",
        "coverage": 10,
        "freshness": "No verified reports yet"
      }
    ],
    "benefitSignals": [
      "Bonus or incentive eligibility may apply",
      "Equity eligibility may apply",
      "Medical insurance",
      "Dental insurance",
      "Vision insurance",
      "Mental health support",
      "Paid parental leave",
      "Life and disability insurance",
      "401(k)",
      "Employee stock purchase program"
    ],
    "evidence": [
      {
        "field": "Listed compensation",
        "status": "Available",
        "confidence": 95,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://jobs.ashbyhq.com/qualified/15bdc5e4-8249-4777-92a2-c25a82ea2f1f",
        "observedAt": "2026-06-22",
        "note": "Official posting discloses base salary range of $148500-$223900 and a higher SF/NY metro range; bonus/equity are not quantified."
      },
      {
        "field": "Company level",
        "status": "Needs data",
        "confidence": 20,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://jobs.ashbyhq.com/qualified/15bdc5e4-8249-4777-92a2-c25a82ea2f1f",
        "observedAt": "2026-06-22",
        "note": "The official posting does not disclose an internal company ladder level."
      },
      {
        "field": "Seniority",
        "status": "Inferred",
        "confidence": 70,
        "sourceType": "rolesignal_inference",
        "sourceName": "RoleSignal normalization",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Normalized from title and posting-level text. Verify with user reports when possible."
      },
      {
        "field": "Benefits",
        "status": "Partial",
        "confidence": 65,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://jobs.ashbyhq.com/qualified/15bdc5e4-8249-4777-92a2-c25a82ea2f1f",
        "observedAt": "2026-06-22",
        "note": "Official posting benefits are listed as coverage signals. Benefit quality still needs employee reports."
      },
      {
        "field": "WLB",
        "status": "Needs user reports",
        "confidence": 10,
        "sourceType": "missing",
        "sourceName": "No verified source yet",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Needs verified user reports before showing a real WLB score."
      },
      {
        "field": "On-call",
        "status": "Needs user reports",
        "confidence": 10,
        "sourceType": "missing",
        "sourceName": "No verified source yet",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Official postings rarely disclose on-call cadence; needs user reports."
      }
    ],
    "decisionGaps": [
      {
        "label": "Full TC unclear",
        "detail": "Posting only confirms listed/base pay.",
        "severity": "high",
        "source": "rolesignal_rule"
      },
      {
        "label": "Equity/bonus unclear",
        "detail": "Eligibility is mentioned, but amount is not.",
        "severity": "high",
        "source": "official_posting"
      },
      {
        "label": "WLB uncertain",
        "detail": "No employee reports for hours, evenings, or weekends yet.",
        "severity": "high",
        "source": "missing_employee_reports"
      },
      {
        "label": "On-call uncertain",
        "detail": "Cadence and incident load are not verified.",
        "severity": "medium",
        "source": "missing_employee_reports"
      },
      {
        "label": "Level unclear",
        "detail": "Internal ladder level is not disclosed.",
        "severity": "medium",
        "source": "official_posting"
      },
      {
        "label": "Few employee reports",
        "detail": "Mostly posting-backed today.",
        "severity": "low",
        "source": "missing_employee_reports"
      }
    ],
    "upside": [
      "Remote posting via official Ashby job board",
      "SMTS title gives clearer seniority signal",
      "Higher location band disclosed for SF/NY metro"
    ],
    "watchouts": [
      "Base salary only; bonus/equity not quantified",
      "WLB and on-call not disclosed",
      "Location-specific salary bands are not separately modeled yet"
    ]
  },
  {
    "slug": "category-labs-senior-software-engineer-formal-verification-remote-us",
    "company": "Category Labs",
    "domain": "category.xyz",
    "role": "Senior Software Engineer",
    "level": "Senior",
    "companyLevel": "Not disclosed",
    "levelSystem": "Not disclosed",
    "seniorityBand": "Senior",
    "levelRank": 3,
    "levelNotes": "Inferred from Senior, Sr., III, or IC4/IC5 in the title or level.",
    "location": "United States",
    "team": "Formal Verification",
    "employmentMode": "Remote",
    "verdict": "High intensity",
    "oneLine": "Official posting for a senior formal verification engineer working on correctness and safety of distributed systems and protocol software.",
    "compensation": {
      "base": [
        180000,
        250000
      ],
      "bonus": [
        0,
        0
      ],
      "equity": [
        0,
        0
      ],
      "total": [
        180000,
        250000
      ]
    },
    "workLifeBalance": 0,
    "benefits": 0,
    "growth": 0,
    "confidence": 64,
    "sampleCount": 1,
    "verifiedCount": 1,
    "lastUpdated": "2026-06-22",
    "hoursPerWeek": [
      0,
      0
    ],
    "workplaceSignals": [
      "Work mode: Remote",
      "Location: United States",
      "Remote signal found in official posting"
    ],
    "oncall": "Not disclosed in the official posting; needs user reports.",
    "promotionSpeed": "Needs data",
    "negotiationRoom": "Needs data",
    "sourceSignals": [
      {
        "name": "Official job posting",
        "kind": "Job postings",
        "coverage": 95,
        "freshness": "Observed Jun 2026"
      },
      {
        "name": "Public wage data",
        "kind": "Compensation",
        "coverage": 45,
        "freshness": "Baseline only"
      },
      {
        "name": "Needs user reports",
        "kind": "User reports",
        "coverage": 10,
        "freshness": "No verified reports yet"
      }
    ],
    "benefitSignals": [
      "Equity package",
      "Token incentive eligibility",
      "Private health insurance options",
      "Paid parental leave",
      "100% paid medical insurance for US employees",
      "Dental insurance",
      "Vision insurance",
      "Dependent coverage support",
      "HSA or FSA options",
      "401(k) company match"
    ],
    "evidence": [
      {
        "field": "Listed compensation",
        "status": "Available",
        "confidence": 95,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://jobs.ashbyhq.com/category-labs/4717412e-8243-4eb9-bed1-4c585d7ff977",
        "observedAt": "2026-06-22",
        "note": "Official posting discloses US base salary range of $180000-$250000; benefits, token, and equity incentives are not included in the base range."
      },
      {
        "field": "Company level",
        "status": "Needs data",
        "confidence": 20,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://jobs.ashbyhq.com/category-labs/4717412e-8243-4eb9-bed1-4c585d7ff977",
        "observedAt": "2026-06-22",
        "note": "The official posting does not disclose an internal company ladder level."
      },
      {
        "field": "Seniority",
        "status": "Inferred",
        "confidence": 70,
        "sourceType": "rolesignal_inference",
        "sourceName": "RoleSignal normalization",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Normalized from title and posting-level text. Verify with user reports when possible."
      },
      {
        "field": "Benefits",
        "status": "Partial",
        "confidence": 65,
        "sourceType": "official_job_posting",
        "sourceName": "Official job posting",
        "sourceUrl": "https://jobs.ashbyhq.com/category-labs/4717412e-8243-4eb9-bed1-4c585d7ff977",
        "observedAt": "2026-06-22",
        "note": "Official posting benefits are listed as coverage signals. Benefit quality still needs employee reports."
      },
      {
        "field": "WLB",
        "status": "Needs user reports",
        "confidence": 10,
        "sourceType": "missing",
        "sourceName": "No verified source yet",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Needs verified user reports before showing a real WLB score."
      },
      {
        "field": "On-call",
        "status": "Needs user reports",
        "confidence": 10,
        "sourceType": "missing",
        "sourceName": "No verified source yet",
        "sourceUrl": "",
        "observedAt": "2026-06-22",
        "note": "Official postings rarely disclose on-call cadence; needs user reports."
      }
    ],
    "decisionGaps": [
      {
        "label": "Full TC unclear",
        "detail": "Posting only confirms listed/base pay.",
        "severity": "high",
        "source": "rolesignal_rule"
      },
      {
        "label": "Equity/bonus unclear",
        "detail": "Eligibility is mentioned, but amount is not.",
        "severity": "high",
        "source": "official_posting"
      },
      {
        "label": "WLB uncertain",
        "detail": "No employee reports for hours, evenings, or weekends yet.",
        "severity": "high",
        "source": "missing_employee_reports"
      },
      {
        "label": "On-call uncertain",
        "detail": "Cadence and incident load are not verified.",
        "severity": "medium",
        "source": "missing_employee_reports"
      },
      {
        "label": "Level unclear",
        "detail": "Internal ladder level is not disclosed.",
        "severity": "medium",
        "source": "official_posting"
      },
      {
        "label": "Few employee reports",
        "detail": "Mostly posting-backed today.",
        "severity": "low",
        "source": "missing_employee_reports"
      }
    ],
    "upside": [
      "Remote US range disclosed",
      "Formal verification scope is highly specialized",
      "Posting references additional incentives outside base pay"
    ],
    "watchouts": [
      "Base salary only; benefits, token, or equity incentives are not included",
      "WLB and on-call not disclosed",
      "Protocol correctness work may have high technical intensity"
    ]
  }
];

export const roles = Array.from(new Set(roleProfiles.map((profile) => profile.role)));
export const levels = Array.from(new Set(roleProfiles.map((profile) => profile.level)));
export const seniorityBands = ["Entry","Mid","Senior","Staff","Principal","Leadership","Unspecified"].filter((band) =>
  roleProfiles.some((profile) => profile.seniorityBand === band),
);
export const locations = Array.from(new Set(roleProfiles.map((profile) => profile.location)));

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatCompactCurrency(value: number) {
  return `$${Math.round(value / 1000)}k`;
}

export function getRoleBySlug(slug: string) {
  return roleProfiles.find((profile) => profile.slug === slug);
}
