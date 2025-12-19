import { Level, PhaseStats, PhasesMap } from "../types";
import ProgressBar from "./progress_bar";
import Legend from "./legend";
import { phaseName } from "@/utils/constants";
import _ from "lodash";

export default function PhaseInfo({
  phases,
  level,
  setHash,
}: {
  phases: PhasesMap;
  level: Level;
  setHash: (hash: string) => void;
}) {
  return (
    <section className="section vif-phases-stats">
      <div className="vif-container">
        {
          _(phases).map((stats, phase) => (
            <button key={phase} 
              className="vif-phase" 
              onClick={() => setHash(`phase/${phase}`)}
              aria-pressed={
                level.level === "phase" && level.props.phase === phase
              }
            >
              <div className="is-size-6 has-text-grey">
                {phaseName[phase]}
              </div>
              <ProgressBar
                stats={stats.stats}
                total={stats.total}
                global={false}
              />
            </button>
          )).value()
        }
      </div>
    </section>
  );
}
