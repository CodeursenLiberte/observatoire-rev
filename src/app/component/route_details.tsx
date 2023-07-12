import Link from "next/link";
import { RouteStats } from "../types";
import ProgressBar from "./progress_bar";

export default function RouteDetails({ route }: { route: RouteStats }) {
  return (
    <section className="section has-text-centered">
      <div className="container cocarto-container--narrow cocarto-detail-container">
        <nav className="level is-mobile cocarto-detail-header px-4">
          <div className="level-left">
          </div>
          <div className="level-item">
            <h3 className="title is-1 route-code">{route.code}</h3>
          </div>
          <div className="level-right">
            <div className="level-item">
              <Link href="/" className="close-button">
                <span className="icon is-large rounded-border">
                  <i className="fas fa-thin fa-2x fa-close"></i>
                </span>
              </Link>
            </div>
          </div>
        </nav>
        <div className="mx-4 mb-2">au 12 juillet 2022</div>
        
        <ProgressBar stats={route.stats} total={route.total} />
      </div>
    </section>
  );
}
