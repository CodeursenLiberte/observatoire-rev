import { GlobalStats } from "../types";
import ProgressBar from "./progress_bar";

export default function GlobalStats({
  globalStats,
}: {
  globalStats: GlobalStats;
}) {
  return (
    <section className="section has-text-centered region-stats pb-0">
      <div className="container cocarto-container--narrow">
        <ProgressBar stats={globalStats.stats} total={globalStats.total} />
        <h1 className="title is-3">
          Observatoire du Réseau Vélo Île-de-France
        </h1>
      </div>
    </section>
  );
}
