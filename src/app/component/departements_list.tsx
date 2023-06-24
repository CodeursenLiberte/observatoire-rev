import { Departement } from "../types";
import DepartementStats from "./departement_stats";
import departements from "@/utils/prepared_departements"

export default function DepartementList() {
  return <section className="section has-text-centered">
    <div className="container">
      <h2 className="title is-3">Informations par département</h2>
      {departements().map(d => <DepartementStats
        name={d.name}
        code={d.code}
        progress={100 * d.stats.built / d.stats.total}
        key={d.code} />)}
    </div>
  </section>
}