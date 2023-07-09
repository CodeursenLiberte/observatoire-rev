import { statusColor, statusLabel, moaLabel } from "@/utils/constants";
import Link from "next/link";
import { TronçonProperties } from "../types";

export default function({segment}: {segment: TronçonProperties}) {
  return (
    <section className="section main-content">
      <nav className="level is-mobile main-content-header px-4">
        <div className="level-left">
          <div className="level-item"><h3 className="title is-4">{segment.route}</h3></div>
        </div>
        <div className="level-item"><h3 className="title is-4">{segment.commune}</h3></div>
        <div className="level-right">
          <div className="level-item"><Link href="/">X</Link></div>
        </div>
      </nav>

      <div className="mx-4 mb-6">
        <div className="block">
          <label className="label has-text-weight-light">Avancement</label>
          <p className="title is-3">{statusLabel[segment.status]}</p>
          <div className="segment-status-ruler" style={{background: statusColor[segment.status]}}></div>
        </div>

        <div className="block">
          <label className="label has-text-weight-light">Collectivité responsable</label>
          <p>{moaLabel[segment.typeMOA]} {segment.moa}</p>
        </div>
      </div>
    </section>
  )
}
