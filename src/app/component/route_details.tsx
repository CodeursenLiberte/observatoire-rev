import Link from "next/link"
import { RouteStats } from "../types"
import ProgressBar from "./progress_bar"

export default function RouteDetails({route}: {route: RouteStats}) {
  return <section className="section has-text-centered main-content">
    <nav className="level is-mobile main-content-header px-4">
      <div className="level-left"></div>
      <div className="level-item"><h3 className="title is-1">{route.code}</h3></div>
      <div className="level-right">
      <Link href="/">
        <span className="icon is-large rounded-border"><i className="fas fa-2x fa-close"></i></span>
      </Link>
      </div>
    </nav>

    <div className="mx-4 mb-2">
      Au 26 mai 2023
    </div>

    <ProgressBar stats={route.stats} total={route.total} />

  </section>
}
