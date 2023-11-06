import { TronçonStatus, LengthStats } from "../types";
import { statusColor, statusLabel, statusTooltip } from "@/utils/constants";

function LegendItem({
  stats,
  total,
  status,
}: {
  stats: LengthStats;
  total: number;
  status: TronçonStatus;
}) {
  const style = {
    background: statusColor[status],
    border: "none",
  };
  if (status === TronçonStatus.SecondPhase) {
    style.border = "solid 1px #7f7f7f";
  }
  return (
    <div className="legend__item">
      <span className="legend__item-value">
        {status !== TronçonStatus.SecondPhase
          ? Math.round((100 * stats[status]) / total) + "%"
          : ""}
      </span>
      <span style={style} className="legend__item-color" />
      <span>{statusLabel[status]}</span>
      <LegendTooltip text={statusTooltip[status]} />
    </div>
  );
}

function SecondPhaseLegendItem() {
  const style = {
    background: statusColor[TronçonStatus.SecondPhase],
    outline: "solid .5px #7f7f7f",
  };

  return (
    <div className="legend__item">
      <span className="legend__item-value"></span>
      <span style={style} className="legend__item-color" />
      <span>{statusLabel[TronçonStatus.SecondPhase]}</span>
      <LegendTooltip text={statusTooltip[TronçonStatus.SecondPhase]} />
    </div>
  );
}

function VariantLegenditem() {
  const style = {
    background:
      "repeating-linear-gradient(90deg, lightgray, lightgray 3px, white 3px, white 6px)",
    border: "solid 1px white",
    outline: "solid .5px #7f7f7f",
  };

  return (
    <div className="legend__item">
      <span className="legend__item-value"></span>
      <span style={style} className="legend__item-color" />
      <span>{statusLabel["variant"]}</span>
      <LegendTooltip text={statusTooltip["variant"]} />
    </div>
  );
}

function LegendTooltip({ text }: { text: String }) {
  if (text === undefined || text === "") {
    return <></>;
  }
  return (
    <div className="legend__tooltip">
      <div className="legend__tooltip-arrow"></div>
      <div className="legend__tooltip-bubble">{text}</div>
    </div>
  );
}

export default function Legend({
  stats,
  total,
}: {
  stats: LengthStats;
  total: number;
}) {
  return (
    <>
      <div className="legend__group">
        <LegendItem
          stats={stats}
          total={total}
          status={TronçonStatus.PreExisting}
        />
        <LegendItem stats={stats} total={total} status={TronçonStatus.Built} />
        <LegendItem
          stats={stats}
          total={total}
          status={TronçonStatus.Building}
        />
        <LegendItem
          stats={stats}
          total={total}
          status={TronçonStatus.Planned}
        />
        <LegendItem
          stats={stats}
          total={total}
          status={TronçonStatus.Blocked}
        />
        <LegendItem
          stats={stats}
          total={total}
          status={TronçonStatus.Unknown}
        />
      </div>
      <div className="legend__group">
        <SecondPhaseLegendItem />
        <VariantLegenditem />
      </div>
    </>
  );
}
