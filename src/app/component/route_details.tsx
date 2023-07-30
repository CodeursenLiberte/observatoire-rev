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
    <section className="section has-text-centered">
      <div className="container cocarto-container--narrow cocarto-detail-container">
        <nav className="level is-mobile cocarto-detail-header px-4">
          <div className="level-left"></div>
          <div className="level-item">
            <h3 className="title is-1 route-code">{route.code}</h3>
          </div>
          <div className="level-right">
            <div className="level-item">
              <span
                className="icon is-large rounded-border is-clickable"
                onClick={() => setHash("region")}
              >
                <i className="fas fa-thin fa-2x fa-close"></i>
              </span>
            </div>
          </div>
        </nav>
        <div className="mx-4 mb-2">au 12 juillet 2022</div>

        <ProgressBar stats={route.stats} total={route.total} />
      </div>
    </section>
  );
}
