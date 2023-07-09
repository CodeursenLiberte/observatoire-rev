import { GlobalStats, TronçonStatus } from "../types"

export default function GlobalStats({globalStats, totalLength}: {globalStats: GlobalStats, totalLength: number}) {
  return (
    <section className="section">
      <div className="container">
        <progress className="progress" value="15" max="100">15%</progress>
        <h1 className="title is-3">Observatoire du Réseau Vélo Île-de-France</h1>
      </div>
    </section>
  )
}
