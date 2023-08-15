import Link from "next/link";
import { RouteStats } from "../types";
import ProgressBar from "./progress_bar";

export default function RouteDetails({
  route,
  setHash,
}: {
  route: RouteStats;
  setHash: (hash: string) => void;
}) {
  return (
    <>
      <div className="vif-detail-header vif-detail-header--route">
        <h3
          className="route-code route-code--large"
          style={
            {
              "--route-color": `var(--route-color-${route.code})`,
            } as React.CSSProperties
          }
        >
          {route.code}
        </h3>
        <a
          className="vif-detail--close-button"
          onClick={() => setHash("region")}
        ></a>
      </div>
      <div className="vif-detail-content">
        <ProgressBar stats={route.stats} total={route.total} />
      </div>
    </>
  );
}
