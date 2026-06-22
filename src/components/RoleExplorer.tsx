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
import {
  formatCompactCurrency,
  formatCurrency,
  levels,
  locations,
  RoleProfile,
  roles,
} from "@/lib/roleData";

type PendingReport = {
  company: string;
  role: string;
  level: string;
  total: string;
};

type RoleExplorerProps = {
  profiles: RoleProfile[];
};

const verdictClass: Record<RoleProfile["verdict"], string> = {
  "Strong fit": "tone-positive",
  "Proceed carefully": "tone-warning",
  Negotiate: "tone-info",
  "High intensity": "tone-intense",
};

const allRoles = "All roles";
const allLevels = "All levels";
const allLocations = "All locations";

export function RoleExplorer({ profiles }: RoleExplorerProps) {
  const [query, setQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState(allRoles);
  const [selectedLevel, setSelectedLevel] = useState(allLevels);
  const [selectedLocation, setSelectedLocation] = useState(allLocations);
  const [minimumWlb, setMinimumWlb] = useState(0);
  const [selectedSlug, setSelectedSlug] = useState(profiles[0]?.slug ?? "");
  const [compareSlugs, setCompareSlugs] = useState<string[]>([]);
  const [isContributionOpen, setContributionOpen] = useState(false);
  const [pendingReports, setPendingReports] = useState<PendingReport[]>([]);

  const filteredProfiles = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return profiles.filter((profile) => {
      const searchable = [
        profile.company,
        profile.role,
        profile.level,
        profile.location,
        profile.team,
      ]
        .join(" ")
        .toLowerCase();

      const queryMatch = !normalizedQuery || searchable.includes(normalizedQuery);
      const roleMatch = selectedRole === allRoles || profile.role === selectedRole;
      const levelMatch = selectedLevel === allLevels || profile.level === selectedLevel;
      const locationMatch =
        selectedLocation === allLocations || profile.location === selectedLocation;
      const wlbMatch = profile.workLifeBalance >= minimumWlb;

      return queryMatch && roleMatch && levelMatch && locationMatch && wlbMatch;
    });
  }, [minimumWlb, profiles, query, selectedLevel, selectedLocation, selectedRole]);

  const selectedProfile =
    profiles.find((profile) => profile.slug === selectedSlug) ??
    filteredProfiles[0] ??
    profiles[0];

  const compareProfiles = compareSlugs
    .map((slug) => profiles.find((profile) => profile.slug === slug))
    .filter((profile): profile is RoleProfile => Boolean(profile));

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
      total: String(formData.get("total") ?? ""),
    };

    if (report.company && report.role && report.level && report.total) {
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
          Submit sample
        </button>
      </section>

      <section className="status-strip" aria-label="MVP status">
        <div>
          <span className="eyebrow">MVP Seed</span>
          <h1>Company Role Decision Intelligence</h1>
        </div>
        <div className="status-metrics" aria-label="Dataset status">
          <Metric label="Demo roles" value={profiles.length.toString()} />
          <Metric label="Avg confidence" value="78%" />
          <Metric label="Verified seeds" value="76" />
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
                placeholder="Company, role, team"
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
            Demo data is only used to validate the product structure. It does not represent
            verified conclusions about real companies, roles, or compensation.
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
              const active = profile.slug === selectedProfile.slug;
              const compared = compareSlugs.includes(profile.slug);

              return (
                <article
                  className={`role-card ${active ? "is-active" : ""}`}
                  key={profile.slug}
                  onClick={() => setSelectedSlug(profile.slug)}
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
                      <p>
                        {profile.level} {profile.role}
                      </p>
                    </div>
                    <span className={`verdict ${verdictClass[profile.verdict]}`}>
                      {profile.verdict}
                    </span>
                  </div>
                  <div className="role-meta">
                    <span>{profile.location}</span>
                    <span>{profile.team}</span>
                  </div>
                  <div className="signal-row">
                    <Signal label="TC" value={formatCompactCurrency(profile.compensation.total[0])} />
                    <Signal label="WLB" value={profile.workLifeBalance.toFixed(1)} />
                    <Signal
                      label="Hours"
                      value={`${profile.hoursPerWeek[0]}-${profile.hoursPerWeek[1]}`}
                    />
                    <Signal label="Conf." value={`${profile.confidence}%`} />
                  </div>
                  <div className="card-actions">
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
              <span role="columnheader">TC</span>
              <span role="columnheader">WLB</span>
              <span role="columnheader">On-call</span>
              <span role="columnheader">Promotion</span>
              <span role="columnheader">Confidence</span>
            </div>
            {compareProfiles.map((profile) => (
              <div className="compare-row" role="row" key={profile.slug}>
                <span role="cell">
                  {profile.company} {profile.level}
                </span>
                <span role="cell">
                  {formatCompactCurrency(profile.compensation.total[0])}-
                  {formatCompactCurrency(profile.compensation.total[1])}
                </span>
                <span role="cell">{profile.workLifeBalance.toFixed(1)}</span>
                <span role="cell">{profile.oncall}</span>
                <span role="cell">{profile.promotionSpeed}</span>
                <span role="cell">{profile.confidence}%</span>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="contribution-band" id="contribute" aria-label="Contribution pipeline">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Contribution loop</span>
            <h2>Contributions</h2>
          </div>
          <button className="primary-action compact" type="button" onClick={() => setContributionOpen(true)}>
            <Send size={16} aria-hidden="true" />
            Record
          </button>
        </div>
        <div className="pipeline-grid">
          <PipelineItem
            icon={<BriefcaseBusiness size={18} />}
            title="Structured fields"
            value="Compensation, hours, on-call, promotion"
          />
          <PipelineItem
            icon={<ShieldCheck size={18} />}
            title="Confidence model"
            value="Sample count, freshness, verification"
          />
          <PipelineItem
            icon={<LineChart size={18} />}
            title="SEO surfaces"
            value="Company, role, and location pages"
          />
        </div>
        {pendingReports.length > 0 ? (
          <div className="pending-list" aria-label="Pending reports">
            {pendingReports.map((report, index) => (
              <div className="pending-item" key={`${report.company}-${index}`}>
                <Check size={16} aria-hidden="true" />
                {report.company} / {report.level} {report.role} / {report.total}
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
                <span className="eyebrow">New sample</span>
                <h2 id="contribution-title">Submit Role Data</h2>
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
          <h2>
            {profile.company} {profile.level}
          </h2>
          <p>{profile.role}</p>
        </div>
      </div>
      <p className="one-line">{profile.oneLine}</p>
      <div className="tc-block">
        <span>Total compensation</span>
        <strong>
          {formatCurrency(profile.compensation.total[0])} -{" "}
          {formatCurrency(profile.compensation.total[1])}
        </strong>
      </div>
      <div className="detail-metrics">
        <Meter
          label="WLB"
          value={profile.workLifeBalance * 20}
          display={profile.workLifeBalance.toFixed(1)}
        />
        <Meter label="Benefits" value={profile.benefits * 20} display={profile.benefits.toFixed(1)} />
        <Meter label="Growth" value={profile.growth * 20} display={profile.growth.toFixed(1)} />
        <Meter label="Confidence" value={profile.confidence} display={`${profile.confidence}%`} />
      </div>
      <div className="fact-grid">
        <Fact
          icon={<Clock3 size={16} />}
          label="Hours"
          value={`${profile.hoursPerWeek[0]}-${profile.hoursPerWeek[1]} hrs/wk`}
        />
        <Fact icon={<HeartHandshake size={16} />} label="On-call" value={profile.oncall} />
        <Fact icon={<LineChart size={16} />} label="Promotion" value={profile.promotionSpeed} />
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
          <input name="level" required placeholder="L5" />
        </label>
      </div>
      <div className="form-grid">
        <label className="field">
          <span>TC range</span>
          <input name="total" required placeholder="$320k-$430k" />
        </label>
        <label className="field">
          <span>Weekly hours</span>
          <input name="hours" placeholder="42-50" />
        </label>
      </div>
      <label className="field">
        <span>On-call</span>
        <input name="oncall" placeholder="One rotation every 6-8 weeks" />
      </label>
      <label className="field">
        <span>Notes</span>
        <textarea name="notes" rows={4} placeholder="Team, promotion, benefits, negotiation room" />
      </label>
      <button className="primary-action wide" type="submit">
        <Send size={16} aria-hidden="true" />
        Save to local queue
      </button>
    </form>
  );
}
