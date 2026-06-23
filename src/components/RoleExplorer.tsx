"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  Check,
  Clock3,
  Filter,
  HeartHandshake,
  LineChart,
  Plus,
  Radar,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { CompensationSummary } from "@/components/CompensationSummary";
import {
  formatCompactCurrency,
  levels,
  locations,
  RoleProfile,
  roles,
  seniorityBands,
} from "@/lib/roleData";

type PendingReport = {
  company: string;
  role: string;
  level: string;
  relationship: string;
  wlb: string;
  hours: string;
  offer: string;
};

type RoleExplorerProps = {
  profiles: RoleProfile[];
  initialSelectedSlug?: string;
};

const verdictClass: Record<RoleProfile["verdict"], string> = {
  "Strong fit": "tone-positive",
  "Proceed carefully": "tone-warning",
  Negotiate: "tone-info",
  "High intensity": "tone-intense",
};

const recommendationDescriptions: Record<RoleProfile["verdict"], string> = {
  "Strong fit": "Generally attractive based on listed pay, role scope, and source confidence.",
  "Proceed carefully": "Potentially useful, but key decision signals are missing or role risk is higher.",
  Negotiate: "Worth pursuing, with extra attention on offer structure or missing compensation pieces.",
  "High intensity": "Strong pay or scope signal, but likely higher pressure, ambiguity, or workload risk.",
};

const allRoles = "All roles";
const allLevels = "All levels";
const allSeniorities = "All seniority";
const allLocations = "All locations";

export function RoleExplorer({ profiles, initialSelectedSlug }: RoleExplorerProps) {
  const [query, setQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState(allRoles);
  const [selectedLevel, setSelectedLevel] = useState(allLevels);
  const [selectedSeniority, setSelectedSeniority] = useState(allSeniorities);
  const [selectedLocation, setSelectedLocation] = useState(allLocations);
  const [minimumWlb, setMinimumWlb] = useState(0);
  const [selectedSlug, setSelectedSlug] = useState(initialSelectedSlug ?? profiles[0]?.slug ?? "");
  const [compareSlugs, setCompareSlugs] = useState<string[]>([]);
  const [isContributionOpen, setContributionOpen] = useState(false);
  const [pendingReports, setPendingReports] = useState<PendingReport[]>([]);
  const averageConfidence =
    profiles.length > 0
      ? Math.round(
          profiles.reduce((total, profile) => total + profile.confidence, 0) / profiles.length,
        )
      : 0;
  const openGapCount = profiles.reduce((total, profile) => total + profile.decisionGaps.length, 0);

  const filteredProfiles = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return profiles.filter((profile) => {
      const searchable = [
        profile.company,
        profile.role,
        profile.level,
        profile.seniorityBand,
        profile.location,
        profile.team,
      ]
        .join(" ")
        .toLowerCase();

      const queryMatch = !normalizedQuery || searchable.includes(normalizedQuery);
      const roleMatch = selectedRole === allRoles || profile.role === selectedRole;
      const levelMatch = selectedLevel === allLevels || profile.level === selectedLevel;
      const seniorityMatch =
        selectedSeniority === allSeniorities || profile.seniorityBand === selectedSeniority;
      const locationMatch =
        selectedLocation === allLocations || profile.location === selectedLocation;
      const wlbMatch = profile.workLifeBalance >= minimumWlb;

      return queryMatch && roleMatch && levelMatch && seniorityMatch && locationMatch && wlbMatch;
    });
  }, [
    minimumWlb,
    profiles,
    query,
    selectedLevel,
    selectedLocation,
    selectedRole,
    selectedSeniority,
  ]);

  const selectedProfile =
    filteredProfiles.find((profile) => profile.slug === selectedSlug) ?? filteredProfiles[0];

  const compareProfiles = compareSlugs
    .map((slug) => profiles.find((profile) => profile.slug === slug))
    .filter((profile): profile is RoleProfile => Boolean(profile));

  function selectProfile(slug: string) {
    setSelectedSlug(slug);
    window.history.replaceState(null, "", `/?selected=${slug}#roles`);
  }

  function toggleCompare(slug: string) {
    setCompareSlugs((current) => {
      if (current.includes(slug)) {
        return current.filter((item) => item !== slug);
      }

      return [...current.slice(-2), slug];
    });
  }

  function handleContribution(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const report = {
      company: String(formData.get("company") ?? ""),
      role: String(formData.get("role") ?? ""),
      level: String(formData.get("level") ?? ""),
      relationship: String(formData.get("relationship") ?? ""),
      wlb: String(formData.get("wlb") ?? ""),
      hours: String(formData.get("hours") ?? ""),
      offer: String(formData.get("offer") ?? ""),
    };

    if (report.company && report.role && report.relationship) {
      setPendingReports((current) => [report, ...current].slice(0, 3));
      event.currentTarget.reset();
    }
  }

  return (
    <main className="app-shell">
      <section className="topbar" aria-label="Product navigation">
        <Link href="/" className="brand" aria-label="RoleSignal home">
          <span className="brand-mark">
            <Radar size={18} aria-hidden="true" />
          </span>
          <span>RoleSignal</span>
        </Link>
        <nav className="nav-pills" aria-label="Primary">
          <a href="#roles">Role library</a>
          <a href="#compare">Compare</a>
          <a href="#contribute">Contribute</a>
        </nav>
        <button className="primary-action" type="button" onClick={() => setContributionOpen(true)}>
          <Plus size={16} aria-hidden="true" />
          Share report
        </button>
      </section>

      <section className="status-strip" aria-label="MVP status">
        <div>
          <span className="eyebrow">Role decision intelligence</span>
          <h1>Compare what postings disclose and what employees report</h1>
          <p className="status-copy">
            RoleSignal turns official job postings into comparable role profiles, highlights
            missing decision fields, and routes employee reports into WLB, hours, on-call, and
            actual offer data.
          </p>
          <div className="layer-strip" aria-label="Data layers">
            <span>Official posting</span>
            <span>Decision gaps</span>
            <span>Employee reports</span>
          </div>
        </div>
        <div className="status-metrics" aria-label="Dataset status">
          <Metric label="Seed profiles" value={profiles.length.toString()} />
          <Metric label="Open gaps" value={openGapCount.toString()} />
          <Metric label="Avg confidence" value={`${averageConfidence}%`} />
        </div>
      </section>

      <section className="workspace-grid" id="roles">
        <aside className="filter-panel" aria-label="Role filters">
          <div className="panel-heading">
            <Filter size={18} aria-hidden="true" />
            <h2>Filters</h2>
          </div>
          <label className="field">
            <span>Search</span>
            <div className="search-field">
              <Search size={16} aria-hidden="true" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Company, role, area"
                type="search"
              />
            </div>
          </label>
          <label className="field">
            <span>Role</span>
            <select value={selectedRole} onChange={(event) => setSelectedRole(event.target.value)}>
              <option>{allRoles}</option>
              {roles.map((role) => (
                <option key={role}>{role}</option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>Level</span>
            <select value={selectedLevel} onChange={(event) => setSelectedLevel(event.target.value)}>
              <option>{allLevels}</option>
              {levels.map((level) => (
                <option key={level}>{level}</option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>Seniority</span>
            <select
              value={selectedSeniority}
              onChange={(event) => setSelectedSeniority(event.target.value)}
            >
              <option>{allSeniorities}</option>
              {seniorityBands.map((band) => (
                <option key={band}>{band}</option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>Location</span>
            <select
              value={selectedLocation}
              onChange={(event) => setSelectedLocation(event.target.value)}
            >
              <option>{allLocations}</option>
              {locations.map((location) => (
                <option key={location}>{location}</option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>Minimum WLB {minimumWlb.toFixed(1)}</span>
            <input
              aria-label="Minimum work life balance"
              min="0"
              max="5"
              step="0.5"
              type="range"
              value={minimumWlb}
              onChange={(event) => setMinimumWlb(Number(event.target.value))}
            />
          </label>
          <div className="data-note">
            Current seed profiles are posting-backed. The valuable layer is the gap list: real WLB,
            hours, on-call load, promotion speed, and actual offer structure need employee reports.
          </div>
          <div className="legend-block" aria-label="Recommendation legend">
            <span className="legend-title">Recommendation labels</span>
            {Object.entries(recommendationDescriptions).map(([label, description]) => (
              <div className="legend-item" key={label}>
                <span className={`verdict ${verdictClass[label as RoleProfile["verdict"]]}`}>
                  {label}
                </span>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </aside>

        <section className="results-panel" aria-label="Role results">
          <div className="section-heading">
            <div>
              <span className="eyebrow">{filteredProfiles.length} results</span>
              <h2>Role Profiles</h2>
            </div>
            <span className="freshness">Updated Jun 2026</span>
          </div>

          <div className="role-list">
            {filteredProfiles.map((profile) => {
              const active = profile.slug === selectedProfile?.slug;
              const compared = compareSlugs.includes(profile.slug);

              return (
                <article
                  className={`role-card ${active ? "is-active" : ""}`}
                  key={profile.slug}
                  onClick={() => selectProfile(profile.slug)}
                  aria-label={`Preview ${profile.company} ${profile.role}`}
                >
                  <div className="role-card-top">
                    <Image
                      className="company-logo"
                      src={`https://www.google.com/s2/favicons?sz=64&domain=${profile.domain}`}
                      width={40}
                      height={40}
                      alt={`${profile.company} logo`}
                    />
                    <div>
                      <h3>{profile.company}</h3>
                      <p>{profile.role}</p>
                    </div>
                    <span
                      className={`verdict ${verdictClass[profile.verdict]}`}
                      title={recommendationDescriptions[profile.verdict]}
                    >
                      {profile.verdict}
                    </span>
                  </div>
                  <div className="role-meta">
                    <span>Seniority: {formatUncertain(profile.seniorityBand)}</span>
                    <span>Company level: {formatUncertain(profile.companyLevel)}</span>
                    <span>{profile.location}</span>
                    <span title="Team, product area, or engineering domain named in the posting.">
                      Area: {profile.team}
                    </span>
                  </div>
                  <div className="signal-row">
                    <Signal label="Level" value={formatCardLevel(profile)} />
                    <Signal label="Pay" value={formatCompactCurrency(profile.compensation.total[0])} />
                    <Signal label="WLB" value={formatScore(profile.workLifeBalance)} />
                    <Signal label="Conf." value={`${profile.confidence}%`} />
                  </div>
                  <div className="card-actions">
                    <div className="card-tools">
                      <button
                        className="icon-button"
                        type="button"
                        aria-label={compared ? "Remove from comparison" : "Add to comparison"}
                        title={compared ? "Remove from comparison" : "Add to comparison"}
                        onClick={(event) => {
                          event.stopPropagation();
                          toggleCompare(profile.slug);
                        }}
                      >
                        {compared ? <Check size={16} /> : <BarChart3 size={16} />}
                      </button>
                      <Link
                        className={`preview-button ${active ? "is-selected" : ""}`}
                        href={`/?selected=${profile.slug}#roles`}
                        aria-current={active ? "true" : undefined}
                        onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                          selectProfile(profile.slug);
                        }}
                      >
                        {active ? "Selected" : "Preview"}
                      </Link>
                    </div>
                    <Link
                      className="text-link"
                      href={`/roles/${profile.slug}`}
                      onClick={(event) => event.stopPropagation()}
                    >
                      Details <ArrowRight size={15} aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <aside className="detail-panel" aria-label="Selected role detail">
          <div className="selected-panel-heading">
            <span className="eyebrow">Selected Role</span>
            <p>Click Preview on any card to update this panel.</p>
          </div>
          {selectedProfile ? <RoleDetail profile={selectedProfile} /> : null}
        </aside>
      </section>

      <section className="compare-band" id="compare" aria-label="Comparison">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Decision table</span>
            <h2>Comparison Pool</h2>
          </div>
          {compareSlugs.length > 0 ? (
            <button className="ghost-button" type="button" onClick={() => setCompareSlugs([])}>
              <X size={16} aria-hidden="true" />
              Clear
            </button>
          ) : null}
        </div>
        {compareProfiles.length === 0 ? (
          <div className="empty-state">
            <Sparkles size={18} aria-hidden="true" />
            Select comparison icons on role cards to generate a decision table.
          </div>
        ) : (
          <div className="compare-table" role="table" aria-label="Compared roles">
            <div className="compare-row compare-head" role="row">
              <span role="columnheader">Role</span>
              <span role="columnheader">Company level</span>
              <span role="columnheader">Seniority</span>
              <span role="columnheader">Listed comp.</span>
              <span role="columnheader">WLB</span>
              <span role="columnheader">On-call</span>
              <span role="columnheader">Promotion</span>
              <span role="columnheader">Confidence</span>
            </div>
            {compareProfiles.map((profile) => (
              <div className="compare-row" role="row" key={profile.slug}>
                <span role="cell">
                  {profile.company} {profile.role}
                </span>
                <span role="cell">{formatUncertain(profile.companyLevel)}</span>
                <span role="cell">{formatUncertain(profile.seniorityBand)}</span>
                <span role="cell">
                  {formatCompactCurrency(profile.compensation.total[0])}-
                  {formatCompactCurrency(profile.compensation.total[1])}
                </span>
                <span role="cell">{formatScore(profile.workLifeBalance)}</span>
                <span role="cell">{formatUncertain(profile.oncall)}</span>
                <span role="cell">{formatUncertain(profile.promotionSpeed)}</span>
                <span role="cell">{profile.confidence}%</span>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="contribution-band" id="contribute" aria-label="Contribution pipeline">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Employee report loop</span>
            <h2>Turn gaps into real role signals</h2>
          </div>
          <button className="primary-action compact" type="button" onClick={() => setContributionOpen(true)}>
            <Send size={16} aria-hidden="true" />
            Share report
          </button>
        </div>
        <div className="pipeline-grid">
          <PipelineItem
            icon={<BriefcaseBusiness size={18} />}
            title="Actual offer data"
            value="Base, bonus, equity, level, location, negotiation room"
          />
          <PipelineItem
            icon={<ShieldCheck size={18} />}
            title="WLB reality"
            value="Weekly hours, evenings, weekends, on-call, team pace"
          />
          <PipelineItem
            icon={<LineChart size={18} />}
            title="Field confidence"
            value="Separate official posting facts from employee-reported truth"
          />
        </div>
        {pendingReports.length > 0 ? (
          <div className="pending-list" aria-label="Pending reports">
            {pendingReports.map((report, index) => (
              <div className="pending-item" key={`${report.company}-${index}`}>
                <Check size={16} aria-hidden="true" />
                {report.company} / {report.role} / {report.relationship} / WLB{" "}
                {report.wlb || "Uncertain"}
              </div>
            ))}
          </div>
        ) : null}
      </section>

      {isContributionOpen ? (
        <div className="modal-backdrop" role="presentation" onClick={() => setContributionOpen(false)}>
          <section
            className="contribution-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contribution-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <span className="eyebrow">Employee report</span>
                <h2 id="contribution-title">Share Role Reality</h2>
              </div>
              <button
                className="icon-button"
                type="button"
                aria-label="Close contribution form"
                title="Close"
                onClick={() => setContributionOpen(false)}
              >
                <X size={16} />
              </button>
            </div>
            <ContributionForm onSubmit={handleContribution} />
          </section>
        </div>
      ) : null}
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="metric">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function Signal({ label, value }: { label: string; value: string }) {
  return (
    <div className="signal">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function RoleDetail({ profile }: { profile: RoleProfile }) {
  return (
    <div className="detail-stack">
      <div className="detail-title">
        <Image
          className="company-logo large"
          src={`https://www.google.com/s2/favicons?sz=64&domain=${profile.domain}`}
          width={48}
          height={48}
          alt={`${profile.company} logo`}
        />
        <div>
          <span className="eyebrow">{profile.location}</span>
          <h2>{profile.company}</h2>
          <p>{profile.role}</p>
        </div>
      </div>
      <p className="one-line">{profile.oneLine}</p>
      <div className="recommendation-note">
        <span className={`verdict ${verdictClass[profile.verdict]}`}>{profile.verdict}</span>
        <p>{recommendationDescriptions[profile.verdict]}</p>
      </div>
      <CompensationSummary profile={profile} />
      <DecisionGapCard gaps={profile.decisionGaps} compact />
      <SignalListCard
        eyebrow="Posting coverage"
        title="Benefits Listed"
        items={profile.benefitSignals}
        compact
      />
      <SignalListCard
        eyebrow="Location / work mode"
        title="Workplace Signals"
        items={profile.workplaceSignals}
        compact
      />
      <div className="detail-metrics">
        <Meter
          label="WLB"
          value={scoreToMeterValue(profile.workLifeBalance)}
          display={formatScore(profile.workLifeBalance)}
        />
        <Meter
          label="Benefit quality"
          value={scoreToMeterValue(profile.benefits)}
          display={formatScore(profile.benefits)}
        />
        <Meter
          label="Growth"
          value={scoreToMeterValue(profile.growth)}
          display={formatScore(profile.growth)}
        />
        <Meter label="Confidence" value={profile.confidence} display={`${profile.confidence}%`} />
      </div>
      <div className="fact-grid">
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
          label="Hours"
          value={formatHours(profile)}
        />
        <Fact icon={<HeartHandshake size={16} />} label="On-call" value={formatUncertain(profile.oncall)} />
        <Fact icon={<LineChart size={16} />} label="Promotion" value={formatUncertain(profile.promotionSpeed)} />
        <Fact
          icon={<ShieldCheck size={16} />}
          label="Verification"
          value={`${profile.verifiedCount}/${profile.sampleCount} samples`}
        />
      </div>
      <div className="source-list">
        {profile.sourceSignals.map((source) => (
          <div className="source-item" key={source.name}>
            <span>{source.name}</span>
            <strong>{source.coverage}%</strong>
            <div className="mini-bar" aria-hidden="true">
              <span style={{ width: `${source.coverage}%` }} />
            </div>
          </div>
        ))}
      </div>
      <div className="evidence-list">
        <span className="eyebrow">Field coverage</span>
        {profile.evidence.map((item) => (
          <div className="evidence-item" key={item.field}>
            <div>
              <strong>{item.field}</strong>
              <span>{item.sourceName}</span>
              {item.sourceUrl ? (
                <a href={item.sourceUrl} target="_blank" rel="noreferrer">
                  Source
                </a>
              ) : null}
            </div>
            <span className={`evidence-status ${getEvidenceTone(item.status)}`}>
              {formatEvidenceStatus(item.status)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DecisionGapCard({
  gaps,
  compact = false,
}: {
  gaps: RoleProfile["decisionGaps"];
  compact?: boolean;
}) {
  const visibleGaps = compact ? gaps.slice(0, 4) : gaps;
  const hiddenCount = Math.max(gaps.length - visibleGaps.length, 0);

  return (
    <div className="decision-gap-card">
      <div>
        <span className="eyebrow">What posting does not answer</span>
        <h3>Decision Gaps</h3>
      </div>
      <ul className="gap-list">
        {visibleGaps.map((gap) => (
          <li className={`gap-${gap.severity}`} key={gap.label}>
            {gap.label}
            {!compact ? <span>{gap.detail}</span> : null}
          </li>
        ))}
        {hiddenCount > 0 ? <li>+{hiddenCount} more gaps on the detail page</li> : null}
      </ul>
    </div>
  );
}

function SignalListCard({
  eyebrow,
  title,
  items,
  compact = false,
}: {
  eyebrow: string;
  title: string;
  items: string[];
  compact?: boolean;
}) {
  const visibleItems = compact ? items.slice(0, 5) : items;
  const hiddenCount = Math.max(items.length - visibleItems.length, 0);

  return (
    <div className="signal-list-card">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h3>{title}</h3>
      </div>
      <ul className="signal-chip-list">
        {visibleItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
        {hiddenCount > 0 ? <li>+{hiddenCount} more</li> : null}
      </ul>
      {title === "Benefits Listed" ? (
        <p>Coverage comes from official postings. Quality still needs employee reports.</p>
      ) : null}
    </div>
  );
}

function Meter({ label, value, display }: { label: string; value: number; display: string }) {
  return (
    <div className="meter">
      <div>
        <span>{label}</span>
        <strong>{display}</strong>
      </div>
      <div className="meter-bar" aria-hidden="true">
        <span style={{ width: `${Math.min(value, 100)}%` }} />
      </div>
    </div>
  );
}

function formatScore(value: number) {
  return value > 0 ? value.toFixed(1) : "Uncertain";
}

function formatCardLevel(profile: RoleProfile) {
  if (profile.companyLevel === "Not disclosed" && profile.seniorityBand === "Unspecified") {
    return "Uncertain";
  }

  return profile.companyLevel !== "Not disclosed"
    ? formatUncertain(profile.companyLevel)
    : formatUncertain(profile.seniorityBand);
}

function scoreToMeterValue(value: number) {
  return value > 0 ? value * 20 : 0;
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

function getEvidenceTone(status: string) {
  if (status === "Available") {
    return "tone-positive";
  }

  if (status === "Partial" || status === "Inferred") {
    return "tone-info";
  }

  return "tone-warning";
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

function PipelineItem({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
  return (
    <div className="pipeline-item">
      <span className="fact-icon">{icon}</span>
      <div>
        <h3>{title}</h3>
        <p>{value}</p>
      </div>
    </div>
  );
}

function ContributionForm({ onSubmit }: { onSubmit: (event: FormEvent<HTMLFormElement>) => void }) {
  return (
    <form className="contribution-form" onSubmit={onSubmit}>
      <label className="field">
        <span>Company</span>
        <input name="company" required placeholder="Example: Google" />
      </label>
      <div className="form-grid">
        <label className="field">
          <span>Role</span>
          <input name="role" required placeholder="Software Engineer" />
        </label>
        <label className="field">
          <span>Level</span>
          <input name="level" placeholder="L5, E5, Senior, Staff" />
        </label>
      </div>
      <label className="field">
        <span>Your relationship to this role</span>
        <select name="relationship" required defaultValue="">
          <option value="" disabled>
            Select one
          </option>
          <option>Current employee</option>
          <option>Former employee</option>
          <option>Received offer</option>
          <option>Interviewed</option>
        </select>
      </label>
      <div className="form-grid">
        <label className="field">
          <span>Actual offer / TC</span>
          <input name="offer" placeholder="$320k-$430k, or base/equity split" />
        </label>
        <label className="field">
          <span>Typical weekly hours</span>
          <input name="hours" placeholder="42-50" />
        </label>
      </div>
      <div className="form-grid">
        <label className="field">
          <span>WLB rating</span>
          <select name="wlb" defaultValue="">
            <option value="" disabled>
              Select 1-5
            </option>
            <option>5 - Very sustainable</option>
            <option>4 - Mostly healthy</option>
            <option>3 - Mixed</option>
            <option>2 - Often intense</option>
            <option>1 - Unsustainable</option>
          </select>
        </label>
        <label className="field">
          <span>Promotion speed</span>
          <select name="promotion" defaultValue="">
            <option value="" disabled>
              Unknown
            </option>
            <option>Fast</option>
            <option>Moderate</option>
            <option>Slow</option>
            <option>Manager dependent</option>
          </select>
        </label>
      </div>
      <label className="field">
        <span>On-call</span>
        <input name="oncall" placeholder="None, light, one week every 6-8 weeks, heavy incidents" />
      </label>
      <label className="field">
        <span>Benefit quality</span>
        <input name="benefits" placeholder="Premiums, deductible, PTO reality, parental leave, 401(k)" />
      </label>
      <label className="field">
        <span>Context notes</span>
        <textarea
          name="notes"
          rows={4}
          placeholder="Team pace, manager variance, weekend work, negotiation room, caveats"
        />
      </label>
      <button className="primary-action wide" type="submit">
        <Send size={16} aria-hidden="true" />
        Save report to local queue
      </button>
    </form>
  );
}
