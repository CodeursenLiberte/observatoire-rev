import Link from 'next/link'
import { RoutesMap, Level } from '../types'

export default function RouteList({routes}: {routes: RoutesMap}) {
  return <section className="section has-text-centered">
    <div className="container">
      <h2 className="title is-3">Informations par&nbsp;ligne</h2>
        {Object.keys(routes).map(route =>
            <Link key={route} href={`?level=route&id=${route}`}>
              <button className="button">{route}</button>
            </Link>
        )}
    </div>
  </section>
}
