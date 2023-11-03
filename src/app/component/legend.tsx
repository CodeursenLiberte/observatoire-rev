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
    <div>
      <span className="legend-value">
        {status !== TronçonStatus.SecondPhase
          ? Math.round((100 * stats[status]) / total) + "%"
          : ""}
      </span>
      <span style={style} className="legend-color" />
      <span title={statusTooltip[status]}>{statusLabel[status]}</span>
    </div>
  );
}

function SecondPhaseLegendItem() {
  const style = {
    background: statusColor[TronçonStatus.SecondPhase],
    border: "solid .5px #7f7f7f",
  };

  return (
    <div>
      <span className="legend-value"></span>
      <span style={style} className="legend-color" />
      <span title={statusTooltip[TronçonStatus.SecondPhase]}>{statusLabel[TronçonStatus.SecondPhase]}</span>
    </div>
  );
}

function VariantLegenditem() {
  const style = {
    background: "repeating-linear-gradient(90deg, lightgray, lightgray 3px, white 3px, white 6px)",
    border: "solid .5px #7f7f7f",
  };

  return (
    <div>
      <span className="legend-value"></span>
      <span style={style} className="legend-color" />
      <span title='Variant de tracé'>Variante</span>
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
      <div className="legend-group">
        <LegendItem
          stats={stats}
          total={total}
          status={TronçonStatus.PreExisting}
        />
        <LegendItem stats={stats} total={total} status={TronçonStatus.Built} />
        <LegendItem stats={stats} total={total} status={TronçonStatus.Building} />
        <LegendItem stats={stats} total={total} status={TronçonStatus.Planned} />
        <LegendItem stats={stats} total={total} status={TronçonStatus.Blocked} />
        <LegendItem stats={stats} total={total} status={TronçonStatus.Unknown} />
      </div>
      <div className="legend-group">
        <SecondPhaseLegendItem />
        <VariantLegenditem />
      </div>
    </>
  );
}
