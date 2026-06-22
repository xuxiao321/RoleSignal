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

export type RoleProfile = {
  slug: string;
  company: string;
  domain: string;
  role: string;
  level: string;
  location: string;
  team: string;
  employmentMode: "Remote" | "Hybrid" | "Onsite";
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
  oncall: string;
  promotionSpeed: "Fast" | "Moderate" | "Slow";
  negotiationRoom: "Low" | "Medium" | "High";
  sourceSignals: SourceSignal[];
  upside: string[];
  watchouts: string[];
};

export const roleProfiles: RoleProfile[] = [
  {
    slug: "google-l5-swe-mountain-view-platform",
    company: "Google",
    domain: "google.com",
    role: "Software Engineer",
    level: "L5",
    location: "Mountain View, CA",
    team: "Platform Infrastructure",
    employmentMode: "Hybrid",
    verdict: "Strong fit",
    oneLine:
      "Stable platform work, strong benefits, and a measured promotion pace for engineers who want long-term systems depth.",
    compensation: {
      base: [178000, 218000],
      bonus: [25000, 48000],
      equity: [98000, 168000],
      total: [320000, 430000],
    },
    workLifeBalance: 4.1,
    benefits: 4.7,
    growth: 3.8,
    confidence: 86,
    sampleCount: 47,
    verifiedCount: 18,
    lastUpdated: "2026-05-28",
    hoursPerWeek: [42, 50],
    oncall: "One rotation every 6-8 weeks; occasional night incidents on platform teams.",
    promotionSpeed: "Moderate",
    negotiationRoom: "Medium",
    sourceSignals: [
      { name: "Levels.fyi", kind: "Compensation", coverage: 92, freshness: "Last 90 days" },
      { name: "Glassdoor", kind: "Employee reviews", coverage: 73, freshness: "Last 12 months" },
      { name: "User reports", kind: "User reports", coverage: 68, freshness: "Last 60 days" },
    ],
    upside: [
      "Strong brand and internal mobility",
      "Excellent benefits and wellness resources",
      "Platform projects build durable systems experience",
    ],
    watchouts: [
      "Promotion requires cross-team influence",
      "On-call quality varies meaningfully by team",
    ],
  },
  {
    slug: "meta-e5-product-engineer-menlo-park-feed",
    company: "Meta",
    domain: "meta.com",
    role: "Product Engineer",
    level: "E5",
    location: "Menlo Park, CA",
    team: "Feed Ranking",
    employmentMode: "Hybrid",
    verdict: "High intensity",
    oneLine:
      "Compensation and growth can be very attractive, but performance pressure and operating pace run above average.",
    compensation: {
      base: [185000, 235000],
      bonus: [32000, 62000],
      equity: [140000, 230000],
      total: [370000, 520000],
    },
    workLifeBalance: 3.2,
    benefits: 4.4,
    growth: 4.5,
    confidence: 82,
    sampleCount: 39,
    verifiedCount: 14,
    lastUpdated: "2026-05-19",
    hoursPerWeek: [48, 58],
    oncall: "One rotation every 5-7 weeks; launch windows can increase peak hours.",
    promotionSpeed: "Fast",
    negotiationRoom: "Medium",
    sourceSignals: [
      { name: "Levels.fyi", kind: "Compensation", coverage: 89, freshness: "Last 90 days" },
      { name: "Glassdoor", kind: "Employee reviews", coverage: 65, freshness: "Last 12 months" },
      { name: "User reports", kind: "User reports", coverage: 60, freshness: "Last 45 days" },
    ],
    upside: [
      "Broad product surface with high impact",
      "Relatively fast promotion cadence",
      "Equity upside can materially change TC",
    ],
    watchouts: [
      "Performance calibration can be intense",
      "Team pace may swing with metrics cycles",
    ],
  },
  {
    slug: "amazon-sde-ii-seattle-aws-storage",
    company: "Amazon",
    domain: "amazon.com",
    role: "SDE II",
    level: "L5",
    location: "Seattle, WA",
    team: "AWS Storage",
    employmentMode: "Hybrid",
    verdict: "Proceed carefully",
    oneLine:
      "High learning density and ownership, but on-call load and operational pressure should be clarified early.",
    compensation: {
      base: [150000, 178000],
      bonus: [0, 28000],
      equity: [85000, 145000],
      total: [250000, 345000],
    },
    workLifeBalance: 2.8,
    benefits: 3.8,
    growth: 4.1,
    confidence: 78,
    sampleCount: 52,
    verifiedCount: 16,
    lastUpdated: "2026-04-30",
    hoursPerWeek: [50, 62],
    oncall: "One rotation every 4-6 weeks; service teams may receive night pages.",
    promotionSpeed: "Moderate",
    negotiationRoom: "High",
    sourceSignals: [
      { name: "Levels.fyi", kind: "Compensation", coverage: 86, freshness: "Last 120 days" },
      { name: "Glassdoor", kind: "Employee reviews", coverage: 70, freshness: "Last 12 months" },
      { name: "User reports", kind: "User reports", coverage: 54, freshness: "Last 90 days" },
    ],
    upside: [
      "Clear service ownership",
      "Cloud infrastructure experience is highly portable",
      "Negotiation room often exceeds peer-level averages",
    ],
    watchouts: [
      "On-call experience varies heavily by team",
      "Operational load can crowd out deep build time",
    ],
  },
  {
    slug: "stripe-l4-backend-engineer-san-francisco-payments",
    company: "Stripe",
    domain: "stripe.com",
    role: "Backend Engineer",
    level: "L4",
    location: "San Francisco, CA",
    team: "Payments Core",
    employmentMode: "Hybrid",
    verdict: "Negotiate",
    oneLine:
      "High engineering quality and business density for payment infrastructure work; offer structure is worth modeling carefully.",
    compensation: {
      base: [170000, 205000],
      bonus: [0, 18000],
      equity: [90000, 165000],
      total: [275000, 385000],
    },
    workLifeBalance: 3.6,
    benefits: 4.2,
    growth: 4.2,
    confidence: 74,
    sampleCount: 23,
    verifiedCount: 9,
    lastUpdated: "2026-05-06",
    hoursPerWeek: [45, 54],
    oncall: "One rotation every 7-9 weeks; core payment incidents can have broad impact.",
    promotionSpeed: "Moderate",
    negotiationRoom: "High",
    sourceSignals: [
      { name: "Levels.fyi", kind: "Compensation", coverage: 75, freshness: "Last 180 days" },
      { name: "Glassdoor", kind: "Employee reviews", coverage: 58, freshness: "Last 12 months" },
      { name: "User reports", kind: "User reports", coverage: 49, freshness: "Last 60 days" },
    ],
    upside: [
      "Strong engineering culture",
      "Deep specialization in payments",
      "Scope ties closely to business outcomes",
    ],
    watchouts: [
      "Private equity liquidity needs separate evaluation",
      "Core payment paths demand high stability",
    ],
  },
  {
    slug: "microsoft-63-pm-redmond-copilot",
    company: "Microsoft",
    domain: "microsoft.com",
    role: "Product Manager",
    level: "63",
    location: "Redmond, WA",
    team: "Copilot",
    employmentMode: "Hybrid",
    verdict: "Strong fit",
    oneLine:
      "A strong AI product surface inside a stable organization, best for PMs who value platform resources and cross-team work.",
    compensation: {
      base: [158000, 192000],
      bonus: [25000, 45000],
      equity: [55000, 105000],
      total: [245000, 335000],
    },
    workLifeBalance: 4.0,
    benefits: 4.5,
    growth: 3.9,
    confidence: 80,
    sampleCount: 34,
    verifiedCount: 12,
    lastUpdated: "2026-05-12",
    hoursPerWeek: [42, 51],
    oncall: "No fixed PM on-call; launch periods may require cross-time-zone coordination.",
    promotionSpeed: "Moderate",
    negotiationRoom: "Medium",
    sourceSignals: [
      { name: "Levels.fyi", kind: "Compensation", coverage: 82, freshness: "Last 120 days" },
      { name: "Glassdoor", kind: "Employee reviews", coverage: 78, freshness: "Last 12 months" },
      { name: "User reports", kind: "User reports", coverage: 52, freshness: "Last 75 days" },
    ],
    upside: [
      "Deep resources behind AI product work",
      "Cross-team experience carries career value",
      "Stable benefits system",
    ],
    watchouts: [
      "Promotion depends on organizational visibility",
      "Large-company decision chains can be slow",
    ],
  },
  {
    slug: "databricks-l5-data-engineer-san-francisco-lakehouse",
    company: "Databricks",
    domain: "databricks.com",
    role: "Data Engineer",
    level: "L5",
    location: "San Francisco, CA",
    team: "Lakehouse Platform",
    employmentMode: "Hybrid",
    verdict: "High intensity",
    oneLine:
      "A steep growth curve and strong data infrastructure work for people comfortable with high ownership and organizational change.",
    compensation: {
      base: [176000, 215000],
      bonus: [0, 25000],
      equity: [130000, 260000],
      total: [330000, 500000],
    },
    workLifeBalance: 3.3,
    benefits: 4.0,
    growth: 4.6,
    confidence: 69,
    sampleCount: 18,
    verifiedCount: 7,
    lastUpdated: "2026-05-02",
    hoursPerWeek: [47, 58],
    oncall: "Platform rotation around every 6-8 weeks; customer-impacting issues get high priority.",
    promotionSpeed: "Fast",
    negotiationRoom: "High",
    sourceSignals: [
      { name: "Levels.fyi", kind: "Compensation", coverage: 70, freshness: "Last 180 days" },
      { name: "Glassdoor", kind: "Employee reviews", coverage: 54, freshness: "Last 12 months" },
      { name: "User reports", kind: "User reports", coverage: 42, freshness: "Last 90 days" },
    ],
    upside: [
      "Strong data infrastructure direction",
      "Fast growth trajectory",
      "Equity upside deserves separate modeling",
    ],
    watchouts: [
      "Sample size is lower than big-tech peers",
      "Organizational change may affect expectations",
    ],
  },
];

export const roles = Array.from(new Set(roleProfiles.map((profile) => profile.role)));
export const levels = Array.from(new Set(roleProfiles.map((profile) => profile.level)));
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
