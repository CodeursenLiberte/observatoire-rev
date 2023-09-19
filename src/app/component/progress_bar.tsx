import { statusColor, globalBarColor } from "@/utils/constants";
import { LengthStats, TronçonStatus } from "../types";

type Props = { stats: LengthStats; total: number; global: Boolean };
const Part = ({
  props,
  status,
  color,
}: {
  props: Props;
  status: TronçonStatus;
  color: { [index: string]: string };
}) => {
  let className = "progress-bar-part";
  const width = (100 * props.stats[status]) / props.total;
  return (
    <div
      style={{
        width: `${width}%`,
        flexGrow: `${width}`,
        background: color[status],
      }}
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
  const color = props.global ? globalBarColor : statusColor;
  return (
    <>
      <div className="progress-bar">
        <div className="progress-bar--parts">
          <Part
            props={props}
            color={color}
            status={TronçonStatus.PreExisting}
          />
          <Part props={props} color={color} status={TronçonStatus.Built} />
          <Part props={props} color={color} status={TronçonStatus.Building} />
          <Part props={props} color={color} status={TronçonStatus.Planned} />
          <Part props={props} color={color} status={TronçonStatus.Blocked} />
          <Part props={props} color={color} status={TronçonStatus.Unknown} />
        </div>
      </div>
      <div className="progress-bar--pointer">
        <div
          className="progress-bar--arrow"
          style={{ marginLeft: `${part_ok}%` }}
        ></div>
        <div
          className="progress-bar--percent is-size-4 has-text-weight-bold has-text-centered"
          style={{ marginLeft: `${part_ok}%` }}
        >
          {Math.round(part_ok)}%
        </div>
      </div>
      {props.global && (
        <div className="title is-size-5 has-text-centered">
          État d’avancement du réseau VIF
        </div>
      )}
    </>
  );
}
