import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock3, HeartHandshake, LineChart, ShieldCheck } from "lucide-react";
import {
  formatCurrency,
  getRoleBySlug,
  RoleProfile,
  roleProfiles,
} from "@/lib/roleData";

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
    title: `${profile.company} ${profile.level} ${profile.role} in ${profile.location} | RoleSignal`,
    description: `${profile.company} ${profile.level} ${profile.role} demo profile with compensation range, WLB, on-call, benefits, promotion speed, and confidence signals.`,
    alternates: {
      canonical: `/roles/${profile.slug}`,
    },
    openGraph: {
      title: `${profile.company} ${profile.level} ${profile.role}`,
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
            <span className="eyebrow">Demo role profile</span>
            <h1>
              {profile.company} {profile.level} {profile.role}
            </h1>
            <p>{profile.oneLine}</p>
            <div className="role-tags" aria-label="Role tags">
              <span>{profile.location}</span>
              <span>{profile.team}</span>
              <span>{profile.employmentMode}</span>
            </div>
          </div>
          <div className="summary-panel">
            <span>Total compensation</span>
            <strong>
              {formatCurrency(profile.compensation.total[0])} -{" "}
              {formatCurrency(profile.compensation.total[1])}
            </strong>
            <div className="summary-split">
              <span>Base {formatCurrency(profile.compensation.base[0])}</span>
              <span>Equity {formatCurrency(profile.compensation.equity[0])}</span>
              <span>Bonus {formatCurrency(profile.compensation.bonus[0])}</span>
            </div>
          </div>
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
          <div className="fact-grid wide">
            <Fact
              icon={<Clock3 size={16} />}
              label="Real hours"
              value={`${profile.hoursPerWeek[0]}-${profile.hoursPerWeek[1]} hrs/wk`}
            />
            <Fact icon={<HeartHandshake size={16} />} label="On-call" value={profile.oncall} />
            <Fact icon={<LineChart size={16} />} label="Promotion speed" value={profile.promotionSpeed} />
            <Fact
              icon={<ShieldCheck size={16} />}
              label="Confidence"
              value={`${profile.confidence}% / ${profile.sampleCount} samples`}
            />
          </div>
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
              <span className="eyebrow">Upside</span>
              <h2>Worth Noting</h2>
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
              <span className="eyebrow">Watchouts</span>
              <h2>Questions To Ask</h2>
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

function buildDatasetSchema(profile: RoleProfile) {
  return {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: `${profile.company} ${profile.level} ${profile.role} role profile`,
    description: profile.oneLine,
    keywords: [
      profile.company,
      profile.role,
      profile.level,
      profile.location,
      "compensation",
      "work life balance",
      "on call",
    ],
    dateModified: profile.lastUpdated,
    creator: {
      "@type": "Organization",
      name: "RoleSignal",
    },
    measurementTechnique:
      "Demo aggregation of compensation, employee review, and user contribution signals",
  };
}
