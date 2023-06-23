import {Departement} from "./types"
import _ from "lodash"
import DepartementStats from "./component/departement_stats"

export default function Panel({
  departements,
}: {departements: Departement[]}) {

  return (
    <section className="section has-text-centered">
      <div className="container">
        <progress className="progress" value="15" max="100">15%</progress>
        <h3 className="subtitle is-5">au 22 juin 2023</h3>
        <h1 className="title is-3">Observatoire du Réseau Vélo Île-de-France</h1>
        <table className="table is-rounded is-bordered is-fullwidth">
          <tbody>
            <tr>
              <td><span className="icon"><i className="fa fa-eye"></i></span></td>
              <td><span>aménagements livrés</span></td>
              <td><span className="tag">12%</span></td>
            </tr>
            <tr>
              <td><span className="icon"><i className="fa fa-eye"></i></span></td>
              <td><span>validés</span></td>
              <td><span className="tag">12%</span></td>
            </tr>
            <tr>
              <td><span className="icon"><i className="fa fa-eye"></i></span></td>
              <td><span>blocages</span></td>
              <td><span className="tag">12%</span></td>
            </tr>
          </tbody>
        </table>
      </div>
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
        {departements.map(d => <DepartementStats name={d.name} code={d.code} progress={30} key={d.code} />)}
      </div>
    </section>
  )
}
