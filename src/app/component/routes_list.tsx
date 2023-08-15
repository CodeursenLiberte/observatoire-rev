import Link from "next/link";
import { RoutesMap } from "../types";

export default function RouteList({
  routes,
  level,
  setHash,
}: {
  routes: RoutesMap;
  level: Level;
  setHash: (hash: string) => void;
}) {
  return (
    <section className="section route-list">
      <div className="vif-container">
        <h2 className="title is-4 has-text-centered has-text-weight-bold">Informations par&nbsp;ligne</h2>
        <div className="route-list-icons">
          {Object.keys(routes).map((route) => (
            <button
              key={route}
              className="button route-button"
              onClick={() => setHash(`route/${route}`)}
              aria-pressed={level.level === "route" && level.props.code === route}
            >
              {route}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
