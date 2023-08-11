import Link from "next/link";
import { RoutesMap } from "../types";

export default function RouteList({
  routes,
  setHash,
}: {
  routes: RoutesMap;
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
            >
              {route}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
