import { statusColor, statusLabel, moaLabel } from "@/utils/constants";
import { TronçonProperties } from "../types";

export default function ({ segment, setHash }: { segment: TronçonProperties, setHash: (hash: string) => void  }) {
  return (
    <section className="section">
      <div className="container cocarto-container--narrow cocarto-detail-container">
        <nav className="level is-mobile cocarto-detail-header px-4">
          <div className="level-left">
            <div className="level-item">
              <h3 className="title is-4">{segment.routes.join(', ')}</h3>
            </div>
          </div>
          <div className="level-item">
            <h3 className="title is-4">{segment.commune}</h3>
          </div>
          <div className="level-right">
            <span className="icon is-large rounded-border is-clickable" onClick={() => setHash("region")}>
              <i className="fas fa-2x fa-close"></i>
            </span>
          </div>
        </nav>

        <div className="mx-4 mb-6">
          <div className="block">
            <label className="label has-text-weight-light">Avancement</label>
            <p className="title is-3">{statusLabel[segment.status]}</p>
            <div
              className="segment-status-ruler"
              style={{ background: statusColor[segment.status] }}
            ></div>
          </div>

          <div className="block">
            <label className="label has-text-weight-light">
              Collectivité responsable
            </label>
            <p className="title is-4">
              {moaLabel[segment.typeMOA]} {segment.moa}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
