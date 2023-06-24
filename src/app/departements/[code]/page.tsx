import Link from "next/link";
import departements from "@/utils/prepared_departements"

export async function generateStaticParams() {
  return departements().map((departement) => ({
    code: departement.code,
  }))
}

export default function Departement({ params }: { params: { code: string } }) {
  return <section className="section has-text-centered">
    <div className="content">
      <h2 className="title is-3">Département du {params.code}</h2>
      <Link href="/">retour</Link>
    </div>
  </section>
}
