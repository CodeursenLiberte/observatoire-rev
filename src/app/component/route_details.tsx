import Link from "next/link"
import { RouteStats } from "../types"

export default function RouteDetails({route}: {route: RouteStats}) {
  return <section className="section has-text-centered main-content">
    <nav className="level is-mobile main-content-header px-4">
        <div className="level-item"><h3 className="title is-1">{route.code}</h3></div>
        <div className="level-right">
          <div className="level-item"><Link href="/">X</Link></div>
        </div>
    </nav>

    <div className="mx-4 mb-6">
      Au 26 mai 2023
    </div>

  </section>
}
