import { PhaseStats, PhasesMap } from "../types";
import ProgressBar from "./progress_bar";
import Legend from "./legend";
import _ from "lodash";

export default function PhaseInfo({
  phases,
  setHash,
}: {
  phases: PhasesMap;
  setHash: (hash: string) => void;
}) {
  return (
    <section className="section vif-phases-stats">
      <div className="vif-container">
        {
          _(phases).map((phase, name) => (
            <a key={name} className="vif-phase" onClick={() => setHash(`phase/${name}`)}>
              <div className="is-size-6 has-text-grey">
                Phase {name}
              </div>
              <ProgressBar
                stats={phase.stats}
                total={phase.total}
                global={false}
              />
            </a>
          )).value()
        }
      </div>
    </section>
  );
}
