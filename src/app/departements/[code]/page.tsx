import Link from "next/link";
import departements from "@/utils/prepared_departements"
import { GetStaticProps } from "next";
import { Departement } from "@/app/types";

export async function generateStaticParams() {
  return departements().map((departement) => ({
    code: departement.code,
  }))
}

export default function DepartementDetail({ params }: { params: { code: string } }) {
  const departement = departements().find(dep => dep.code === params.code)!;
  return <section className="section has-text-centered">
    <div className="content">
      <h2 className="title is-3">Département {departement.name} ({params.code})</h2>
      <p> {Math.round(departement.stats.built/1000)} km de voies construites sur {Math.round(departement.stats.total/1000)}</p>
      <Link href="/">retour</Link>
    </div>
  </section>
}
