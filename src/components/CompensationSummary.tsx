import { formatCurrency, RoleProfile } from "@/lib/roleData";

type CompensationSummaryProps = {
  profile: RoleProfile;
};

export function CompensationSummary({ profile }: CompensationSummaryProps) {
  const { base, bonus, equity, total } = profile.compensation;
  const variablePayKnown = hasAmount(bonus) || hasAmount(equity);
  const listedRangeIsBaseOnly = rangesMatch(base, total) && !variablePayKnown;
  const equityEligibilityListed = hasSignal(profile.benefitSignals, [
    "equity",
    "stock",
    "rsu",
    "option",
  ]);
  const bonusEligibilityListed = hasSignal(profile.benefitSignals, [
    "bonus",
    "incentive",
    "commission",
  ]);

  return (
    <section className="comp-summary" aria-label="Listed compensation summary">
      <div className="comp-heading">
        <span className="comp-eyebrow">
          {listedRangeIsBaseOnly ? "Listed base pay" : "Listed compensation"}
        </span>
        <span className="comp-source-pill">Posting-backed</span>
      </div>
      <div className="comp-range">
        <span>{listedRangeIsBaseOnly ? "Base pay range" : "Listed range"}</span>
        <strong>{formatRange(total)}</strong>
      </div>
      <div className="comp-breakdown" aria-label="Compensation breakdown">
        <CompRow label="Base range" value={formatRange(base)} note="Confirmed in posting" />
        <CompRow
          label="Equity"
          value={formatRangeOrUncertain(equity)}
          note={equityEligibilityListed ? "Eligibility listed; amount unclear" : "Amount not disclosed"}
          uncertain={!hasAmount(equity)}
        />
        <CompRow
          label="Bonus"
          value={formatRangeOrUncertain(bonus)}
          note={bonusEligibilityListed ? "Eligibility listed; amount unclear" : "Amount not disclosed"}
          uncertain={!hasAmount(bonus)}
        />
      </div>
      <p className="comp-note">Employee reports are needed to verify actual TC.</p>
    </section>
  );
}

function CompRow({
  label,
  value,
  note,
  uncertain = false,
}: {
  label: string;
  value: string;
  note: string;
  uncertain?: boolean;
}) {
  return (
    <div className={`comp-row ${uncertain ? "is-uncertain" : ""}`}>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{note}</small>
    </div>
  );
}

function formatRange(range: [number, number]) {
  const [min, max] = range;

  if (min === max) {
    return formatCurrency(min);
  }

  return `${formatCurrency(min)} - ${formatCurrency(max)}`;
}

function formatRangeOrUncertain(range: [number, number]) {
  return hasAmount(range) ? formatRange(range) : "Uncertain";
}

function hasAmount(range: [number, number]) {
  return range[0] > 0 || range[1] > 0;
}

function rangesMatch(first: [number, number], second: [number, number]) {
  return first[0] === second[0] && first[1] === second[1];
}

function hasSignal(signals: string[], needles: string[]) {
  const joinedSignals = signals.join(" ").toLowerCase();

  return needles.some((needle) => joinedSignals.includes(needle));
}
