import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Observatoire Vélo Île-de-France",
};

export default function GlobalStats() {
  return (
    <section className="section">
      <div className="container">
        <progress className="progress" value="15" max="100">
          15%
        </progress>
        <h3 className="subtitle is-5">au 22 juin 2023</h3>
        <h1 className="title is-3">
          Observatoire du Réseau Vélo Île-de-France
        </h1>
      </div>
    </section>
  );
}
