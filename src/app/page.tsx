import prepared_tronçons from '@/utils/prepared_tronçons'
import { TronçonStatus } from '@/app/types';
import _ from 'lodash'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Observatoire Vélo Île-de-France',
}

function Stat({label, length, total}: {label: string, length: number, total: number}) {
  return <tr>
    <td><span className="icon"><i className="fa fa-eye"></i></span></td>
    <td><span>{label}</span></td>
    <td><span className="tag">{Math.round(length * 100 / total)}%</span></td>
  </tr>
}

export default function GlobalStats() {
  const stats = _(prepared_tronçons())
    .map('properties')
    .reject(feature => feature.variant)
    .groupBy('status')
    .mapValues(features => _.sumBy(features, 'length'))
    .value();
  const total = _(stats).values().sum();

  return (
    <section className="section">
      <div className="container">
        <progress className="progress" value="15" max="100">15%</progress>
        <h3 className="subtitle is-5">au 22 juin 2023</h3>
        <h1 className="title is-3">Observatoire du Réseau Vélo Île-de-France</h1>
        <table className="table is-rounded is-bordered is-fullwidth">
          <tbody>
            <Stat label="aménagements livrés" length={stats[TronçonStatus.Built]} total={total} />
            <Stat label="en cours d’aménagement" length={stats[TronçonStatus.Building]} total={total} />
            <Stat label="validé" length={stats[TronçonStatus.Planned]} total={total} />
            <Stat label="état inconnu" length={stats[TronçonStatus.Unknown]} total={total} />
          </tbody>
        </table>
      </div>
    </section>
  )
}
