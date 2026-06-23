import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BarChart3,
  BriefcaseBusiness,
  Clock3,
  HeartHandshake,
  LineChart,
  ShieldCheck,
} from "lucide-react";
import {
  getRoleBySlug,
  RoleProfile,
  roleProfiles,
} from "@/lib/roleData";
import { CompensationSummary } from "@/components/CompensationSummary";

type RolePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return roleProfiles.map((profile) => ({
    slug: profile.slug,
  }));
}

export async function generateMetadata({ params }: RolePageProps): Promise<Metadata> {
  const { slug } = await params;
  const profile = getRoleBySlug(slug);

  if (!profile) {
    return {
      title: "Role not found | RoleSignal",
    };
  }

  return {
    title: `${profile.company} ${profile.role} in ${profile.location} | RoleSignal`,
    description: `${profile.company} ${profile.role} profile comparing official posting disclosures, decision gaps, and employee-reported fields such as WLB, hours, on-call, and actual offer data.`,
    alternates: {
      canonical: `/roles/${profile.slug}`,
    },
    openGraph: {
      title: `${profile.company} ${profile.role}`,
      description: profile.oneLine,
      type: "article",
    },
  };
}

export default async function RolePage({ params }: RolePageProps) {
  const { slug } = await params;
  const profile = getRoleBySlug(slug);

  if (!profile) {
    notFound();
  }

  const jsonLd = buildDatasetSchema(profile);
  const recommendationDescription = getRecommendationDescription(profile.verdict);

  return (
    <main className="role-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="detail-hero">
        <Link className="back-link" href="/">
          <ArrowLeft size={16} aria-hidden="true" />
          Back to role library
        </Link>
        <div className="detail-hero-grid">
          <div className="detail-hero-copy">
            <Image
              className="company-logo xlarge"
              src={`https://www.google.com/s2/favicons?sz=64&domain=${profile.domain}`}
              width={56}
              height={56}
              alt={`${profile.company} logo`}
              priority
            />
            <span className="eyebrow">Seed role profile</span>
            <h1>
              {profile.company} {profile.role}
            </h1>
            <p>{profile.oneLine}</p>
            <div className="role-tags" aria-label="Role tags">
              <span>{profile.verdict}</span>
              <span>{profile.location}</span>
              <span>Area: {profile.team}</span>
              <span>Company level: {formatUncertain(profile.companyLevel)}</span>
              <span>Seniority: {formatUncertain(profile.seniorityBand)}</span>
              <span>{profile.employmentMode}</span>
            </div>
          </div>
          <CompensationSummary profile={profile} />
        </div>
      </section>

      <section className="role-content-grid">
        <article className="content-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Decision signals</span>
              <h2>Role Decision</h2>
            </div>
          </div>
          <div className="recommendation-note">
            <span className="eyebrow">Recommendation</span>
            <p>{recommendationDescription}</p>
          </div>
          <div className="fact-grid wide">
            <Fact
              icon={<BriefcaseBusiness size={16} />}
              label="Seniority"
              value={formatUncertain(profile.seniorityBand)}
            />
            <Fact icon={<BriefcaseBusiness size={16} />} label="Area" value={profile.team} />
            <Fact icon={<BarChart3 size={16} />} label="Company level" value={formatUncertain(profile.companyLevel)} />
            <Fact icon={<BarChart3 size={16} />} label="Level system" value={formatUncertain(profile.levelSystem)} />
            <Fact icon={<BriefcaseBusiness size={16} />} label="Posting level" value={formatUncertain(profile.level)} />
            <Fact
              icon={<Clock3 size={16} />}
              label="Real hours"
              value={formatHours(profile)}
            />
            <Fact icon={<HeartHandshake size={16} />} label="On-call" value={formatUncertain(profile.oncall)} />
            <Fact icon={<LineChart size={16} />} label="Promotion speed" value={formatUncertain(profile.promotionSpeed)} />
            <Fact
              icon={<ShieldCheck size={16} />}
              label="Confidence"
              value={`${profile.confidence}% / ${profile.sampleCount} samples`}
            />
          </div>
          <p className="section-note">
            Area is the team, product area, or engineering domain named in the posting. It is not
            a job level.
          </p>
        </article>

        <article className="content-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">What posting does not answer</span>
              <h2>Decision Gaps</h2>
            </div>
          </div>
          <ul className="gap-list roomy">
            {profile.decisionGaps.map((gap) => (
              <li className={`gap-${gap.severity}`} key={gap.label}>
                {gap.label}
                <span>{gap.detail}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="content-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Posting coverage</span>
              <h2>Benefits Listed</h2>
            </div>
          </div>
          <ul className="signal-chip-list roomy">
            {profile.benefitSignals.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="section-note">
            These are benefits mentioned by the official posting. Benefit quality still needs
            employee reports.
          </p>
        </article>

        <article className="content-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Location / work mode</span>
              <h2>Workplace Signals</h2>
            </div>
          </div>
          <ul className="signal-chip-list roomy">
            {profile.workplaceSignals.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="content-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Source mix</span>
              <h2>Source Signals</h2>
            </div>
          </div>
          <div className="source-list roomy">
            {profile.sourceSignals.map((source) => (
              <div className="source-item" key={source.name}>
                <span>
                  {source.name} - {source.kind} - {source.freshness}
                </span>
                <strong>{source.coverage}%</strong>
                <div className="mini-bar" aria-hidden="true">
                  <span style={{ width: `${source.coverage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="content-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Field coverage</span>
              <h2>What Each Source Supports</h2>
            </div>
          </div>
          <div className="evidence-list">
            {profile.evidence.map((item) => (
              <div className="evidence-item" key={item.field}>
                <div>
                  <strong>{item.field}</strong>
                  <span>
                    {item.sourceName}
                    {item.observedAt ? ` - ${item.observedAt}` : ""}
                  </span>
                  {item.sourceUrl ? (
                    <a href={item.sourceUrl} target="_blank" rel="noreferrer">
                      Source
                    </a>
                  ) : null}
                  <p>{item.note}</p>
                </div>
                <span className={`evidence-status ${getEvidenceTone(item.status)}`}>
                  {formatEvidenceStatus(item.status)}
                </span>
              </div>
            ))}
          </div>
        </article>

        <article className="content-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Positive signals</span>
              <h2>Upside</h2>
            </div>
          </div>
          <ul className="insight-list">
            {profile.upside.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="content-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Decision caveats</span>
              <h2>Watchouts</h2>
            </div>
          </div>
          <ul className="insight-list warning">
            {profile.watchouts.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>
    </main>
  );
}

function Fact({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="fact">
      <span className="fact-icon">{icon}</span>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function formatHours(profile: RoleProfile) {
  const [min, max] = profile.hoursPerWeek;

  if (min <= 0 || max <= 0) {
    return "Uncertain";
  }

  return `${min}-${max} hrs/wk`;
}

function formatUncertain(value: string) {
  const normalized = value.trim().toLowerCase();

  if (
    !normalized ||
    normalized === "n/a" ||
    normalized === "needs data" ||
    normalized === "needs user reports" ||
    normalized === "not disclosed" ||
    normalized === "unspecified" ||
    normalized.includes("not disclosed") ||
    normalized.includes("needs user")
  ) {
    return "Uncertain";
  }

  return value;
}

function formatEvidenceStatus(status: string) {
  return status === "Needs data" || status === "Needs user reports" ? "Uncertain" : status;
}

function getRecommendationDescription(verdict: RoleProfile["verdict"]) {
  switch (verdict) {
    case "Strong fit":
      return "Generally attractive based on listed pay, role scope, and source confidence.";
    case "Proceed carefully":
      return "Potentially useful, but key decision signals are missing or role risk is higher.";
    case "Negotiate":
      return "Worth pursuing, with extra attention on offer structure or missing compensation pieces.";
    case "High intensity":
      return "Strong pay or scope signal, but likely higher pressure, ambiguity, or workload risk.";
  }
}

function getEvidenceTone(status: string) {
  if (status === "Available") {
    return "tone-positive";
  }

  if (status === "Partial" || status === "Inferred") {
    return "tone-info";
  }

  return "tone-warning";
}

function buildDatasetSchema(profile: RoleProfile) {
  return {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: `${profile.company} ${profile.role} role profile`,
    description: profile.oneLine,
    keywords: [
      profile.company,
      profile.role,
      profile.level,
      profile.seniorityBand,
      profile.location,
      "compensation",
      "decision gaps",
      "employee reports",
      "work life balance",
      "on call",
    ],
    dateModified: profile.lastUpdated,
    creator: {
      "@type": "Organization",
      name: "RoleSignal",
    },
    measurementTechnique:
      "Field-level comparison of official posting disclosures, missing decision signals, and employee-report fields",
  };
}
