import Link from "next/link";

export default function About() {
  return (
    <section className="section">
      <div className="vif-container vif-container--about">
        <h2 className="title is-size-4 has-text-centered">À propos</h2>
        <p className="block has-text-centered">
          Cet observatoire est proposé et maintenu par le{" "}
          <Link href="https://velo-iledefrance.fr/">
            Collectif Vélo Île-de-France
          </Link>
          . L’association est à l’origine du projet de réseau VIF, initialement
          appelé RER V.
        </p>

        <p className="block has-text-centered">
          Les données affichées sont mises à la disposition du public par la
          région Île-de-France et régulièrement mises à jour.
        </p>
      </div>
    </section>
  );
}
