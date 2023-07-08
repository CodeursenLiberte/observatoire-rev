import Link from "next/link"
import { RouteStats } from "../types"

export default function RouteDetails({route }: {route: RouteStats}) {
  return <section className="section has-text-centered">
    <div className="content">
      <h2 className="title is-3">Voie {route.code} </h2>
      <p> {Math.round(route.built/1000)} km de voies construites sur {Math.round(route.total/1000)}</p>
      <Link href="?">retour</Link>
    </div>
  </section>
}
