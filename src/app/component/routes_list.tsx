import {routeList} from '@/utils/routes_stats'
import Link from 'next/link'

export default function RouteList() {
  return <section className="section has-text-centered">
    <div className="container">
      <h2 className="title is-3">Informations par ligne</h2>
        {routeList.map(route => <Link href={`/voies/${route}`}>
          <button className="button" key={route}>{route}</button>
        </Link>)}
    </div>
  </section>
}
