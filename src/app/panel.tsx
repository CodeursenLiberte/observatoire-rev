import {Departement} from "./types"
import _ from "lodash"
import DepartementStats from "./component/departement_stats"

export default function Panel({
  departements,
}: {departements: Departement[]}) {

  return (
    <section className="section has-text-centered">
      <div className="container">
        <h2 className="title is-3">Informations par ligne</h2>
        <button className="button">V1</button>
        <button className="button">V2</button>
        <button className="button">V3</button>
        <button className="button">V4</button>
        <button className="button">V5</button>
        <button className="button">V6</button>
        <button className="button">V7</button>
        <button className="button">V8</button>
        <button className="button">V9</button>
        <button className="button">V10</button>
        <button className="button">V20</button>
      </div>
      <div className="container">
        <h2 className="title is-3">Informations par département</h2>
        {departements.map(d => <DepartementStats
          name={d.name}
          code={d.code}
          progress={100 * d.stats.built / d.stats.total}
          key={d.code} />)}
      </div>
    </section>
  )
}
