import { statusColor, statusLabel, moaLabel } from "@/utils/constants";
import { TronçonProperties } from "../types";

export default function ({
  segment,
  setHash,
}: {
  segment: TronçonProperties;
  setHash: (hash: string) => void;
}) {
  return (
    <>
      <div className="vif-detail-header vif-detail-header--segment">
        <h3
          className="route-code route-code--small"
          style={
            {
              "--route-color": `var(--route-color-${segment.route})`,
            } as React.CSSProperties
          }
        >
          {segment.route}
        </h3>
        <h3 className="is-size-4">{segment.commune}</h3>
        <a
          className="vif-detail--close-button"
          onClick={() => setHash("region")}
        ></a>
      </div>

      <div className="vif-detail-content">
        <div className="segment--block">
          <label className="has-text-weight-normal has-text-grey">
            Avancement
          </label>
          <p className="is-size-4 has-text-weight-semibold">
            {statusLabel[segment.status]}
          </p>
          <div
            className="segment--status-ruler"
            style={{ background: statusColor[segment.status] }}
          ></div>
        </div>

        <div className="segment--block">
          <label className="has-text-weight-normal has-text-grey">
            Collectivité responsable
          </label>
          <p className="is-size-5 has-text-weight-semibold">
            {moaLabel[segment.typeMOA]} {segment.moa}
          </p>
        </div>
      </div>
    </>
  );
}
