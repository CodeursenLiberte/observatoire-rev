import Link from "next/link";

export default function Departement({ params }: { params: { code: string } }) {
  return <section className="section has-text-centered">
    <div className="content">
      <h2 className="title is-3">Département du {params.code}</h2>
      <Link href="/">retour</Link>
    </div>
  </section>
}
