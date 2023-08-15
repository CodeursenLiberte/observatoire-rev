"use client";
import Map from "./map";
import RouteList from "./routes_list";
import { useEffect, useState } from "react";
import { Level, GlobalData } from "../types";
import RouteDetails from "./route_details";
import GlobalStats from "./global_stats";
import Segment from "./segment";
import About from "./about";


function currentDetail(level: Level, data: GlobalData, setHash) {
  let current;
  switch (level.level) {
    case "route":
      current = <RouteDetails route={level.props} setHash={setHash} />;
      break;
    case "segment":
      current = <Segment segment={level.props} setHash={setHash} />;
      break;
  }
  return current;
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
          (f) => f.properties.id === id,
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
  
  return (
    <>
      <Map
        bounds={bounds}
        segments={data.tronçons}
        level={level}
        setHash={setHash}
      />
      <div className="vif-panel">
        <GlobalStats globalStats={data.globalStats} />
        <RouteList routes={data.routes} level={level} setHash={setHash} />
        <About />
        <div className="vif-detail">
          {currentDetail(level, data, setHash)}
        </div>
      </div>
    </>
  );
}
