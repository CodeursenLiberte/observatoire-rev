import { GlobalStats } from "../types";
import ProgressBar from "./progress_bar";
import Legend from "./legend";

export default function GlobalStats({
  globalStats,
}: {
  globalStats: GlobalStats;
}) {
  return (
    <section className="section vif-global-stats">
      <div className="vif-container">
        <ProgressBar stats={globalStats.stats} total={globalStats.total} />
      </div>
      <div className="vif-container vif-container--narrow">
        <h1 className="title is-size-3 has-text-centered has-text-weight-bold">
          Observatoire du Réseau Vélo Île-de-France
        </h1>
      </div>
      <div className="vif-container vif-container--narrow vif-border-top">
        <Legend />
      </div>
    </section>
  );
}
