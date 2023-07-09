import { GlobalStats, TronçonStatus } from "../types"

function Stat({label, length, total}: {label: string, length: number, total: number}) {
  return <tr>
    <td><span className="icon"><i className="fa fa-eye"></i></span></td>
    <td><span>{label}</span></td>
    <td><span className="tag">{Math.round(length * 100 / total)}%</span></td>
  </tr>
}

export default function GlobalStats({globalStats, totalLength}: {globalStats: GlobalStats, totalLength: number}) {
  return (
    <section className="section">
      <div className="container">
        <progress className="progress" value="15" max="100">15%</progress>
        <h3 className="subtitle is-5">au 22 juin 2023</h3>
        <h1 className="title is-3">Observatoire du Réseau Vélo Île-de-France</h1>
      </div>
    </section>
  )
}
