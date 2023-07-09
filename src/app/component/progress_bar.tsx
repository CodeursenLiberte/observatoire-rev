import { statusColor } from "@/utils/constants";
import { LengthStats, TronçonStatus } from "../types";

type Props = { stats: LengthStats; total: number };
const Part = ({
  props,
  status,
  left,
  right,
}: {
  props: Props;
  status: TronçonStatus;
  left?: boolean;
  right?: boolean;
}) => {
  let className = "progress-bar-part";
  if (left) {
    className += " progress-bar-part-left";
  }
  if (right) {
    className += " progress-bar-part-right";
  }
  const width = (100 * props.stats[status]) / props.total;
  return (
    <div
      style={{ width: `${width}%`, background: statusColor[status] }}
      className={className}
    />
  );
};

export default function ProgressBar(props: Props) {
  const part_ok =
    (100 *
      (props.stats[TronçonStatus.PreExisting] +
        props.stats[TronçonStatus.Built] +
        props.stats[TronçonStatus.Building])) /
    props.total;
  return (
    <div className="pb-4">
      <div className="progress-bar">
        <Part props={props} status={TronçonStatus.PreExisting} left />
        <Part props={props} status={TronçonStatus.Built} />
        <Part props={props} status={TronçonStatus.Building} />
        <Part props={props} status={TronçonStatus.Planned} />
        <Part props={props} status={TronçonStatus.Blocked} />
        <Part props={props} status={TronçonStatus.Unknown} right />
      </div>
      <div
        className="progress-bar-percent is-size-4 has-text-weight-bold has-text-centered"
        style={{ marginLeft: `${part_ok}%` }}
      >
        {Math.round(part_ok)}%
      </div>
    </div>
  );
}
