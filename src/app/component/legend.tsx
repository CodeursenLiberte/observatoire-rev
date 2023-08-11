import { TronçonStatus } from "../types";
import { statusColor, statusLabel } from "@/utils/constants";

function LegendItem({ status }: { status: TronçonStatus }) {
  const style = {
    background: statusColor[status],
    border: "none",
  };
  if (status === TronçonStatus.SecondPhase) {
    style.border = "solid 1px #7f7f7f";
  }
  return (
    <div>
      <span style={style} className="legend-color" />
      <span>{statusLabel[status]}</span>
    </div>
  );
}

export default function Legend() {
  return (
    <div className="container cocarto-container cocarto-container--narrow cocarto-border-top">
      <LegendItem status={TronçonStatus.PreExisting} />
      <LegendItem status={TronçonStatus.Built} />
      <LegendItem status={TronçonStatus.Building} />
      <LegendItem status={TronçonStatus.Planned} />
      <LegendItem status={TronçonStatus.Blocked} />
      <LegendItem status={TronçonStatus.SecondPhase} />
      <LegendItem status={TronçonStatus.Unknown} />
    </div>
  );
}
