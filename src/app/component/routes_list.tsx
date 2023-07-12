import Link from "next/link";
import { RoutesMap } from "../types";

export default function RouteList({ routes }: { routes: RoutesMap }) {
  return (
    <section className="section has-text-centered route-list">
      <div className="container">
        <h2 className="title is-3">Informations par&nbsp;ligne</h2>
        <div className="route-list-icons">
          {Object.keys(routes).map((route) => (
            <Link key={route} href={`./?level=route&id=${route}`}>
              <button className="button route-button">{route}</button>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
