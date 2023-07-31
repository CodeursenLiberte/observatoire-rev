"use client";
import Map from "./map";
import RouteList from "./routes_list";
import { useEffect, useState } from "react";
import { Level, GlobalData, TronçonStatus } from "../types";
import RouteDetails from "./route_details";
import GlobalStats from "./global_stats";
import Segment from "./segment";
import { statusColor, statusLabel } from "@/utils/constants";
import About from "./about";

function Legend({ status }: { status: TronçonStatus }) {
  const style = {
    background: statusColor[status],
    border: 'none'
  };
  if (status === TronçonStatus.SecondPhase) {
    style.border = 'solid 1px #7f7f7f'
  }
  return (
    <div>
      <span
        style={style}
        className="legend-color"
      />
      <span>{statusLabel[status]}</span>
    </div>
  );
}

export default function ({ data }: { data: GlobalData }) {
  const [bounds, setBounds] = useState(data.globalBounds);
  const [hash, setHash] = useState("");
  const [level, setLevel] = useState<Level>({ level: "region" });

  useEffect(() => setHash(window.location.hash), []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.location.hash = hash;
    const [level, id] = hash.replace("#", "").split("/");

    if (level === "" || level === "region") {
      setBounds(data.globalBounds);
      setLevel({ level: "region" });
    } else {
      if (level === "route" && id !== null) {
        const props = data.routes[id];
        setBounds(props.bounds);
        setLevel({ level: "route", props });
      } else if (level === "segment") {
        const tronçon = data.tronçons.features.find(
          (f) => f.properties.id === id
        );
        if (tronçon !== undefined && tronçon.bbox !== undefined) {
          const [xmin, ymin, xmax, ymax] = tronçon.bbox;
          setBounds([xmin, ymin, xmax, ymax]);
          setLevel({ level: "segment", props: tronçon.properties });
        } else {
          console.warn("something weird", tronçon);
        }
      }
    }
  }, [hash]);

  let current;
  switch (level.level) {
    case "region":
      current = <GlobalStats globalStats={data.globalStats} />;
      break;
    case "route":
      current = <RouteDetails route={level.props} setHash={setHash} />;
      break;
    case "segment":
      current = <Segment segment={level.props} setHash={setHash} />;
      break;
  }
  return (
    <>
      <section className="hero cocarto-map">
        <Map
          bounds={bounds}
          segments={data.tronçons}
          level={level}
          setHash={setHash}
        />
      </section>
      <div className="cocarto-panel">
        {current}
        <section className="section">
          <div className="container cocarto-container--narrow cocarto-legends-container">
            <Legend status={TronçonStatus.PreExisting} />
            <Legend status={TronçonStatus.Built} />
            <Legend status={TronçonStatus.Building} />
            <Legend status={TronçonStatus.Planned} />
            <Legend status={TronçonStatus.Blocked} />
            <Legend status={TronçonStatus.SecondPhase} />
            <Legend status={TronçonStatus.Unknown} />
          </div>
        </section>
        <RouteList routes={data.routes} setHash={setHash} />
        <About />
      </div>
    </>
  );
}
