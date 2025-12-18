import { PhaseStats, PhasesMap } from "../types";
import ProgressBar from "./progress_bar";
import Legend from "./legend";
import _ from "lodash";

export default function PhaseInfo({
  phases,
}: {
  phases: PhasesMap;
}) {
  return (
    <section className="section vif-phases-stats">
      <div className="vif-container">
        {
          _(phases).map((phase, name) => (
            <div key={name} className="vif-phase">
              <div className="is-size-6 has-text-grey">
                Phase {name}
              </div>
              <ProgressBar
                stats={phase.stats}
                total={phase.total}
                global={false}
              />
            </div>
          )).value()
        }
      </div>
    </section>
  );
}
