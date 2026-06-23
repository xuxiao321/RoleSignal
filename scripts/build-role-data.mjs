import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "..");
const inputPath = resolve(projectRoot, "data", "role-seeds.csv");
const outputPath = resolve(projectRoot, "src", "lib", "roleData.ts");
const benefitsPath = resolve(projectRoot, "data", "benefit-signals.json");

const sourceKinds = new Set([
  "Compensation",
  "Employee reviews",
  "User reports",
  "Job postings",
]);

const employmentModes = new Set(["Remote", "Hybrid", "Onsite", "Unspecified"]);
const verdicts = new Set(["Strong fit", "Proceed carefully", "Negotiate", "High intensity"]);
const promotionSpeeds = new Set(["Fast", "Moderate", "Slow", "Needs data"]);
const negotiationRooms = new Set(["Low", "Medium", "High", "Needs data"]);
const seniorityOrder = ["Entry", "Mid", "Senior", "Staff", "Principal", "Leadership", "Unspecified"];

const csv = readFileSync(inputPath, "utf8");
const benefitSignalsBySlug = loadBenefitSignals();
const rows = parseCsv(csv);

if (rows.length < 2) {
  throw new Error(`No data rows found in ${inputPath}`);
}

const [headers, ...records] = rows;
const profiles = records
  .filter((record) => record.some((cell) => cell.trim()))
  .map((record, index) => buildProfile(headers, record, index + 2));

const output = renderTypeScript(profiles);
writeFileSync(outputPath, output, "utf8");

console.log(`Generated ${profiles.length} role profiles at ${outputPath}`);

function buildProfile(headers, record, lineNumber) {
  const row = Object.fromEntries(headers.map((header, index) => [header, record[index] ?? ""]));
  const requiredFields = [
    "slug",
    "company",
    "domain",
    "role",
    "level",
    "location",
    "team",
    "employmentMode",
    "verdict",
    "oneLine",
    "lastUpdated",
    "oncall",
    "promotionSpeed",
    "negotiationRoom",
  ];

  for (const field of requiredFields) {
    if (!row[field]?.trim()) {
      throw new Error(`Line ${lineNumber}: missing required field "${field}"`);
    }
  }

  assertEnum(row.employmentMode, employmentModes, "employmentMode", lineNumber);
  assertEnum(row.verdict, verdicts, "verdict", lineNumber);
  assertEnum(row.promotionSpeed, promotionSpeeds, "promotionSpeed", lineNumber);
  assertEnum(row.negotiationRoom, negotiationRooms, "negotiationRoom", lineNumber);

  const postingLevel = normalizePostingLevel(row.role, row.level, row.team);
  const seniority = inferSeniority(row.role, postingLevel);
  const companyLevel = normalizeCompanyLevel(row.companyLevel || inferCompanyLevel(postingLevel));
  const sourceUrl = String(row.sourceUrl ?? "").trim();
  const observedAt = row.lastUpdated || row.observedAt || "";
  const benefitSignals = buildBenefitSignals(row, benefitSignalsBySlug[row.slug]);
  const workplaceSignals = buildWorkplaceSignals(row);
  const evidence = buildEvidence(row, {
    companyLevel,
    observedAt,
    sourceUrl,
    benefitSignals,
  });

  return {
    slug: row.slug,
    company: row.company,
    domain: row.domain,
    role: row.role,
    level: postingLevel,
    companyLevel,
    levelSystem: row.levelSystem || inferLevelSystem(row.company, companyLevel),
    seniorityBand: seniority.band,
    levelRank: seniority.rank,
    levelNotes: seniority.notes,
    location: row.location,
    team: row.team,
    employmentMode: row.employmentMode,
    verdict: row.verdict,
    oneLine: row.oneLine,
    compensation: {
      base: [num(row.baseMin, "baseMin", lineNumber), num(row.baseMax, "baseMax", lineNumber)],
      bonus: [num(row.bonusMin, "bonusMin", lineNumber), num(row.bonusMax, "bonusMax", lineNumber)],
      equity: [
        num(row.equityMin, "equityMin", lineNumber),
        num(row.equityMax, "equityMax", lineNumber),
      ],
      total: [num(row.totalMin, "totalMin", lineNumber), num(row.totalMax, "totalMax", lineNumber)],
    },
    workLifeBalance: num(row.wlb, "wlb", lineNumber),
    benefits: num(row.benefits, "benefits", lineNumber),
    growth: num(row.growth, "growth", lineNumber),
    confidence: num(row.confidence, "confidence", lineNumber),
    sampleCount: num(row.sampleCount, "sampleCount", lineNumber),
    verifiedCount: num(row.verifiedCount, "verifiedCount", lineNumber),
    lastUpdated: row.lastUpdated,
    hoursPerWeek: [
      num(row.hoursMin, "hoursMin", lineNumber),
      num(row.hoursMax, "hoursMax", lineNumber),
    ],
    workplaceSignals,
    oncall: row.oncall,
    promotionSpeed: row.promotionSpeed,
    negotiationRoom: row.negotiationRoom,
    sourceSignals: parseSources(row.sources, lineNumber),
    benefitSignals,
    evidence,
    decisionGaps: buildDecisionGaps(row, {
      companyLevel,
      postingLevel,
      seniorityBand: seniority.band,
      evidence,
    }),
    upside: splitList(row.upside),
    watchouts: splitList(row.watchouts),
  };
}

function loadBenefitSignals() {
  if (!existsSync(benefitsPath)) {
    return {};
  }

  const parsed = JSON.parse(readFileSync(benefitsPath, "utf8"));

  return Object.fromEntries(
    Object.entries(parsed).map(([slug, signals]) => [
      slug,
      Array.isArray(signals)
        ? signals.map((signal) => String(signal).trim()).filter(Boolean)
        : [],
    ]),
  );
}

function buildBenefitSignals(row, explicitSignals = []) {
  if (explicitSignals.length > 0) {
    return explicitSignals;
  }

  const text = [row.upside, row.watchouts, row.sourceNotes].join(" ").toLowerCase();
  const signals = [];

  if (text.includes("equity") || text.includes("stock option") || text.includes("rsu")) {
    signals.push("Equity or stock eligibility listed");
  }

  if (text.includes("bonus") || text.includes("incentive")) {
    signals.push("Bonus or incentive eligibility listed");
  }

  if (text.includes("benefit")) {
    signals.push("Benefits mentioned in official posting");
  }

  return signals.length > 0 ? signals : ["No benefit details disclosed in structured seed data"];
}

function buildWorkplaceSignals(row) {
  const signals = [`Work mode: ${row.employmentMode}`, `Location: ${row.location}`];
  const text = [row.oneLine, row.upside, row.watchouts].join(" ").toLowerCase();

  if (text.includes("remote us") || text.includes("remote role") || text.includes("remote-first")) {
    signals.push("Remote signal found in official posting");
  }

  if (text.includes("hybrid")) {
    signals.push("Hybrid collaboration signal found in official posting");
  }

  if (text.includes("onsite") || text.includes("in-office") || text.includes("on-site")) {
    signals.push("Onsite requirement found in official posting");
  }

  if (text.includes("2 days/week")) {
    signals.push("Office attendance detail: 2 days/week");
  }

  if (text.includes("quarterly onsite") || text.includes("onsite collaboration")) {
    signals.push("Periodic onsite collaboration noted");
  }

  if (text.includes("travel")) {
    signals.push("Travel requirement mentioned");
  }

  if (text.includes("outside the us") || text.includes("must be physically located within the united states")) {
    signals.push("US location restriction mentioned");
  }

  return Array.from(new Set(signals));
}

function buildDecisionGaps(row, context) {
  const gaps = [];
  const bonusMax = Number(row.bonusMax);
  const equityMax = Number(row.equityMax);
  const totalMin = Number(row.totalMin);
  const baseMin = Number(row.baseMin);
  const mentionsVariableComp = [row.upside, row.watchouts, row.sourceNotes]
    .join(" ")
    .toLowerCase()
    .match(/\b(equity|stock|rsu|bonus|incentive|commission)\b/);

  if (totalMin === baseMin && bonusMax === 0 && equityMax === 0) {
    gaps.push({
      label: "Full TC unclear",
      detail: "Posting only confirms listed/base pay.",
      severity: "high",
      source: "rolesignal_rule",
    });
  }

  if (mentionsVariableComp && bonusMax === 0 && equityMax === 0) {
    gaps.push({
      label: "Equity/bonus unclear",
      detail: "Eligibility is mentioned, but amount is not.",
      severity: "high",
      source: "official_posting",
    });
  }

  if (Number(row.wlb) <= 0) {
    gaps.push({
      label: "WLB uncertain",
      detail: "No employee reports for hours, evenings, or weekends yet.",
      severity: "high",
      source: "missing_employee_reports",
    });
  }

  if (!hasConcreteOncall(row.oncall)) {
    gaps.push({
      label: "On-call uncertain",
      detail: "Cadence and incident load are not verified.",
      severity: "medium",
      source: "missing_employee_reports",
    });
  }

  if (context.companyLevel === "Not disclosed") {
    gaps.push({
      label: "Level unclear",
      detail: "Internal ladder level is not disclosed.",
      severity: "medium",
      source: "official_posting",
    });
  }

  if (context.seniorityBand === "Unspecified" || context.postingLevel === "Not disclosed") {
    gaps.push({
      label: "Seniority unclear",
      detail: "Scope and promotion bar need confirmation.",
      severity: "medium",
      source: "rolesignal_rule",
    });
  }

  if (row.employmentMode === "Unspecified") {
    gaps.push({
      label: "Work mode unclear",
      detail: "Remote, hybrid, timezone, or office expectations need confirmation.",
      severity: "medium",
      source: "official_posting",
    });
  }

  if (Number(row.sampleCount) <= 1) {
    gaps.push({
      label: "Few employee reports",
      detail: "Mostly posting-backed today.",
      severity: "low",
      source: "missing_employee_reports",
    });
  }

  return dedupeGaps(gaps).slice(0, 7);
}

function dedupeGaps(gaps) {
  const seen = new Set();

  return gaps.filter((gap) => {
    if (seen.has(gap.label)) {
      return false;
    }

    seen.add(gap.label);
    return true;
  });
}

function buildEvidence(row, context) {
  const hasBenefitSignals = context.benefitSignals.some(
    (signal) => !signal.toLowerCase().startsWith("no benefit details"),
  );
  const officialSource = {
    sourceType: row.sourceType || "official_job_posting",
    sourceName: "Official job posting",
    sourceUrl: context.sourceUrl,
    observedAt: context.observedAt,
  };

  return [
    {
      field: "Listed compensation",
      status: "Available",
      confidence: 95,
      ...officialSource,
      note:
        row.sourceNotes ||
        "Official posting salary range. Bonus and equity are included only when quantified.",
    },
    {
      field: "Company level",
      status: context.companyLevel === "Not disclosed" ? "Needs data" : "Available",
      confidence: context.companyLevel === "Not disclosed" ? 20 : 90,
      ...officialSource,
      note:
        context.companyLevel === "Not disclosed"
          ? "The official posting does not disclose an internal company ladder level."
          : "Company-specific level identified from official posting data.",
    },
    {
      field: "Seniority",
      status: "Inferred",
      confidence: 70,
      sourceType: "rolesignal_inference",
      sourceName: "RoleSignal normalization",
      sourceUrl: "",
      observedAt: context.observedAt,
      note: "Normalized from title and posting-level text. Verify with user reports when possible.",
    },
    {
      field: "Benefits",
      status: hasBenefitSignals ? "Partial" : "Needs data",
      confidence: hasBenefitSignals ? 65 : 20,
      ...officialSource,
      note:
        hasBenefitSignals
          ? "Official posting benefits are listed as coverage signals. Benefit quality still needs employee reports."
          : "No structured benefits details are available yet.",
    },
    {
      field: "WLB",
      status: row.wlb && Number(row.wlb) > 0 ? "Available" : "Needs user reports",
      confidence: row.wlb && Number(row.wlb) > 0 ? 70 : 10,
      sourceType: row.wlb && Number(row.wlb) > 0 ? "user_reports" : "missing",
      sourceName: row.wlb && Number(row.wlb) > 0 ? "Aggregated user reports" : "No verified source yet",
      sourceUrl: "",
      observedAt: context.observedAt,
      note:
        row.wlb && Number(row.wlb) > 0
          ? "WLB score should come from aggregated user reports."
          : "Needs verified user reports before showing a real WLB score.",
    },
    {
      field: "On-call",
      status: hasConcreteOncall(row.oncall) ? "Available" : "Needs user reports",
      confidence: hasConcreteOncall(row.oncall) ? 70 : 10,
      sourceType: hasConcreteOncall(row.oncall) ? "user_reports" : "missing",
      sourceName: hasConcreteOncall(row.oncall) ? "Aggregated user reports" : "No verified source yet",
      sourceUrl: "",
      observedAt: context.observedAt,
      note: hasConcreteOncall(row.oncall)
        ? "On-call cadence should be aggregated from user reports."
        : "Official postings rarely disclose on-call cadence; needs user reports.",
    },
  ];
}

function hasConcreteOncall(value) {
  const normalized = String(value ?? "").toLowerCase();

  return Boolean(normalized) && !normalized.includes("not disclosed") && !normalized.includes("needs user");
}

function normalizeCompanyLevel(value) {
  const normalized = String(value ?? "").trim();

  return normalized || "Not disclosed";
}

function inferCompanyLevel(level) {
  const normalized = String(level ?? "").trim();

  if (/^(L\d+[A-Z]?|E\d+|IC\d+(?:-IC\d+)?|\d{2})$/i.test(normalized)) {
    return normalized.toUpperCase();
  }

  return "Not disclosed";
}

function inferLevelSystem(company, companyLevel) {
  if (companyLevel === "Not disclosed") {
    return "Not disclosed";
  }

  const normalizedCompany = String(company ?? "").toLowerCase();

  if (normalizedCompany.includes("google")) {
    return "Google L ladder";
  }

  if (normalizedCompany.includes("meta")) {
    return "Meta E ladder";
  }

  if (normalizedCompany.includes("amazon")) {
    return "Amazon L ladder";
  }

  if (normalizedCompany.includes("microsoft")) {
    return "Microsoft numeric level";
  }

  if (/^IC/i.test(companyLevel)) {
    return "Company IC ladder";
  }

  return "Company-specific ladder";
}

function normalizePostingLevel(role, level, team) {
  const rawLevel = String(level ?? "").trim();
  const normalizedLevel = rawLevel.toLowerCase();
  const normalizedTeam = String(team ?? "").trim().toLowerCase();
  const normalizedRole = String(role ?? "").trim().toLowerCase();

  if (!rawLevel) {
    return "Not disclosed";
  }

  const looksLikeTeam =
    normalizedLevel === normalizedTeam ||
    (normalizedLevel.includes("engineering") && !hasLevelSignal(normalizedLevel));

  if (looksLikeTeam || normalizedLevel === normalizedRole) {
    return inferPostingLevelFromTitle(role) || "Not disclosed";
  }

  return rawLevel;
}

function inferPostingLevelFromTitle(role) {
  const normalized = String(role ?? "").toLowerCase();

  if (/\bprincipal\b/.test(normalized)) {
    return "Principal";
  }

  if (/\b(staff|senior lead|sr\.? lead)\b/.test(normalized)) {
    return normalized.includes("senior lead") || normalized.includes("sr")
      ? "Senior Lead"
      : "Staff";
  }

  if (/\b(senior|sr\.?)\b/.test(normalized)) {
    return "Senior";
  }

  return "";
}

function hasLevelSignal(value) {
  return /\b(principal|staff|senior|sr\.?|lead|manager|director|vp|l\d+[a-z]?|e\d+|ic\d+(?:-ic\d+)?|\d{2})\b/i.test(
    value,
  );
}

function parseSources(value, lineNumber) {
  return splitList(value, ";").map((source) => {
    const [name, kind, coverage, freshness] = source.split("|").map((item) => item.trim());

    if (!name || !kind || !coverage || !freshness) {
      throw new Error(
        `Line ${lineNumber}: source "${source}" must use name|kind|coverage|freshness`,
      );
    }

    assertEnum(kind, sourceKinds, "source kind", lineNumber);

    return {
      name,
      kind,
      coverage: num(coverage, "source coverage", lineNumber),
      freshness,
    };
  });
}

function splitList(value, separator = "|") {
  return String(value ?? "")
    .split(separator)
    .map((item) => item.trim())
    .filter(Boolean);
}

function inferSeniority(role, level) {
  const combined = `${role} ${level}`.toLowerCase();

  if (/\b(vp|head|director|manager|leadership)\b/.test(combined)) {
    return {
      band: "Leadership",
      rank: 6,
      notes: "Inferred from leadership keywords in the title or level.",
    };
  }

  if (/\bprincipal\b/.test(combined)) {
    return {
      band: "Principal",
      rank: 5,
      notes: "Inferred from Principal in the title or level.",
    };
  }

  if (/\b(staff|senior lead|sr\.? lead|lead)\b/.test(combined)) {
    return {
      band: "Staff",
      rank: 4,
      notes: "Inferred from Staff or Lead in the title or level.",
    };
  }

  if (/\b(senior|sr\.?|sde iii|software engineer iii|ic4|ic5)\b/.test(combined)) {
    return {
      band: "Senior",
      rank: 3,
      notes: "Inferred from Senior, Sr., III, or IC4/IC5 in the title or level.",
    };
  }

  if (/\b(ii|software engineer ii|sde ii|mid)\b/.test(combined)) {
    return {
      band: "Mid",
      rank: 2,
      notes: "Inferred from II, SDE II, or Mid in the title or level.",
    };
  }

  if (/\b(junior|entry|new grad|i)\b/.test(combined)) {
    return {
      band: "Entry",
      rank: 1,
      notes: "Inferred from entry-level keywords in the title or level.",
    };
  }

  return {
    band: "Unspecified",
    rank: 0,
    notes: "The official posting does not disclose a clear seniority band.",
  };
}

function num(value, field, lineNumber) {
  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    throw new Error(`Line ${lineNumber}: "${field}" must be a number, received "${value}"`);
  }

  return parsed;
}

function assertEnum(value, allowed, field, lineNumber) {
  if (!allowed.has(value)) {
    throw new Error(
      `Line ${lineNumber}: "${field}" must be one of ${Array.from(allowed).join(", ")}; received "${value}"`,
    );
  }
}

function parseCsv(input) {
  const rows = [];
  let row = [];
  let cell = "";
  let insideQuotes = false;

  for (let index = 0; index < input.length; index += 1) {
    const char = input[index];
    const next = input[index + 1];

    if (insideQuotes && char === '"' && next === '"') {
      cell += '"';
      index += 1;
      continue;
    }

    if (char === '"') {
      insideQuotes = !insideQuotes;
      continue;
    }

    if (!insideQuotes && char === ",") {
      row.push(cell);
      cell = "";
      continue;
    }

    if (!insideQuotes && (char === "\n" || char === "\r")) {
      if (char === "\r" && next === "\n") {
        index += 1;
      }
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
      continue;
    }

    cell += char;
  }

  if (cell.length > 0 || row.length > 0) {
    row.push(cell);
    rows.push(row);
  }

  return rows.filter((candidate) => candidate.some((cellValue) => cellValue.trim()));
}

function renderTypeScript(profiles) {
  return `export type CompensationRange = {
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

export const roleProfiles: RoleProfile[] = ${JSON.stringify(profiles, null, 2)};

export const roles = Array.from(new Set(roleProfiles.map((profile) => profile.role)));
export const levels = Array.from(new Set(roleProfiles.map((profile) => profile.level)));
export const seniorityBands = ${JSON.stringify(seniorityOrder)}.filter((band) =>
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
  return \`$\${Math.round(value / 1000)}k\`;
}

export function getRoleBySlug(slug: string) {
  return roleProfiles.find((profile) => profile.slug === slug);
}
`;
}
