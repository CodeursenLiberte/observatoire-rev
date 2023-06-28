import Link from "next/link";
import routeStats, {routeList} from "@/utils/routes_stats"

export let generateStaticParams = async () => routeList

export default function VoieDetail({ params }: { params: { route: string } }) {
  let {built, total} = routeStats(params.route)

  return <section className="section has-text-centered">
    <div className="content">
      <h2 className="title is-3">Voie {params.route} </h2>
      <p> {Math.round(built/1000)} km de voies construites sur {Math.round(total/1000)}</p>
      <Link href="/">retour</Link>
    </div>
  </section>
}
