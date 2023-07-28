import Link from "next/link";
import { RoutesMap } from "../types";

export default function RouteList({ routes, setHash }: { routes: RoutesMap, setHash: (hash: string) => void }) {
  return (
    <section className="section has-text-centered route-list">
      <div className="container cocarto-container--narrow">
        <h2 className="title is-3">Informations par&nbsp;ligne</h2>
        <div className="route-list-icons">
          {Object.keys(routes).map((route) => (
            <button key={route} className="button route-button" onClick={() => setHash(`route/${route}`)}>{route}</button>
          ))}
        </div>
      </div>
    </section>
  );
}
