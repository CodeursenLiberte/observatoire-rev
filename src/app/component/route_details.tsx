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
      <nav className="level is-mobile vif-detail-header px-4">
        <div className="level-left"></div>
        <div className="level-item">
          <h3 className="title is-1 route-code">{route.code}</h3>
        </div>
        <div className="level-right">
          <div className="level-item">
            <a className="close-button" onClick={() => setHash("region")}></a>
          </div>
        </div>
      </nav>
      <div className="vif-detail-content">
        <ProgressBar stats={route.stats} total={route.total} />
      </div>
    </>
  );
}
