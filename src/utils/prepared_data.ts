import departementsGeojson from "../../data/departements-ile-de-france.geo.json";
import {
  Feature,
  FeatureCollection,
  featureCollection,
  lineString,
  LineString,
} from "@turf/helpers";
import _ from "lodash";
import {
  TronçonStatus,
  TronçonProperties,
  RoutesMap,
  Bounds,
  RouteStats,
  GlobalStats,
  TypeMOA,
  LengthStats,
  GlobalData,
  OriginalProperties
} from "@/app/types";
import bbox from "@turf/bbox";
import booleanWithin from "@turf/boolean-within";
import communes from "../../data/communes-ile-de-france.geo.json";


function status(niveau_validation: string, apport_rerv: string, phase: string): TronçonStatus {
  if (apport_rerv === "Aménagement prééxistant") {
    return TronçonStatus.PreExisting;
  } else if (phase === "2 - 2030") {
    return TronçonStatus.SecondPhase;
  } else {
    return (
      {
        "A l'étude": TronçonStatus.Planned,
        "En travaux": TronçonStatus.Building,
        "Mis en service": TronçonStatus.Built,
      }[niveau_validation] || TronçonStatus.Unknown
    );
  }
}

function moaType(type: string): TypeMOA {
  switch (type) {
    case "Commune":
      return TypeMOA.Commune;
    case "Département":
      return TypeMOA.Departement;
    case "EPCI/EPT":
      return TypeMOA.EPCI;
    default:
      return TypeMOA.Unknown;
  }
}

async function fetchFromCocarto(): Promise<FeatureCollection<LineString, OriginalProperties>> {
  const res = await fetch(`https://cocarto.com/fr/layers/4b724a41-d283-496b-b783-1fc8960a860e.geojson?token=${process.env.COCARTO_TOKEN}`)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export async function prepareData(): Promise<GlobalData> {
  const troncons = await fetchFromCocarto()
  const tronçonsArray: Feature<LineString, TronçonProperties>[] = // This will activate the closest `error.js` Error Boundary
    troncons.features.map((feature) => {
      const dep = departementsGeojson.features.find((dep) =>
        booleanWithin(feature.geometry, dep.geometry)
      );
      const commune = communes.features.find((commune) =>
        booleanWithin(feature.geometry, commune.geometry)
      );
      const properties: TronçonProperties = {
        // A single tronçon can be used by many lines, the concatenation allows to deduplicate
        id: feature.properties.CODE_TRONCON,
        // When it is a "Variante" don’t count its length for any statistic, while "Variante initiale" means we DO use it for lengths stats
        length:
          feature.properties.NIVEAU_VALID_SUPPORT_VIAIRE === "Variante"
            ? 0
            : feature.properties.LONGUEUR,
        commune: commune?.properties.nom.replace(" Arrondissement", ""),
        departement: dep?.properties.code,
        route: feature.properties.NUM_LIGNE,
        variant:
          feature.properties.NIVEAU_VALID_SUPPORT_VIAIRE === "Variante" ||
          feature.properties.NIVEAU_VALID_SUPPORT_VIAIRE ===
            "Variante initiale",
        status: status(
          feature.properties.NIVEAU_VALID_AMENAG || "",
          feature.properties.APPORT_RERV || "",
          feature.properties.PHASE
        ),
        typeMOA: moaType(feature.properties.TYPE_MOA || "autre"),
        moa: feature.properties.NOM_MOA || "",
      };

      return lineString(feature.geometry.coordinates, properties, {
        bbox: bbox(feature.geometry),
      });
    });

 /* const routesId = _(tronçonsArray)
    .map((t) => ({ id: t.properties.id, route: t.properties.routes[0] }))
    .groupBy("id")
    .mapValues((x) => _.map(x, "route"))
    .value();

  const uniqueTronçons = _.uniqBy(tronçonsArray, (f) => f.properties.id);
  uniqueTronçons.forEach(
    (t) => (t.properties.routes = routesId[t.properties.id])
  );*/
  const tronçons = featureCollection(tronçonsArray);
  const [xmin, ymin, xmax, ymax] = bbox(tronçons);
  const globalBounds: Bounds = [xmin, ymin, xmax, ymax];

  const routeList = [
    "V1",
    "V2",
    "V3",
    "V4",
    "V5",
    "V6",
    "V7",
    "V8",
    "V9",
    "V10",
    "V20",
  ];

  const routes: RoutesMap = _.fromPairs(
    routeList.map((route) => [route, routeStats(route)])
  );

  function routeStats(code: string): RouteStats {
    const t = _.filter(tronçonsArray, (feature) =>
      feature.properties.route === code
    );
    function length(status: TronçonStatus): number {
      return _(t)
        .filter((f) => f.properties.status === status)
        .sumBy("properties.length");
    }
    const total = _(t).map("properties.length").sum();
    const stats: LengthStats = {
      [TronçonStatus.PreExisting]: length(TronçonStatus.PreExisting),
      [TronçonStatus.Built]: length(TronçonStatus.Built),
      [TronçonStatus.Building]: length(TronçonStatus.Building),
      [TronçonStatus.Planned]: length(TronçonStatus.Planned),
      [TronçonStatus.Blocked]: length(TronçonStatus.Blocked),
      [TronçonStatus.Unknown]: length(TronçonStatus.Unknown),
    };
    const [xmin, ymin, xmax, ymax] = bbox({
      type: "FeatureCollection",
      features: t,
    });
    return { code, stats, total, bounds: [xmin, ymin, xmax, ymax] };
  }

  function length(status: TronçonStatus): number {
    return _(tronçonsArray)
      .filter((f) => f.properties.status === status)
      .sumBy("properties.length");
  }
  const total = _(tronçonsArray).map("properties.length").sum();
  const stats: LengthStats = {
    [TronçonStatus.PreExisting]: length(TronçonStatus.PreExisting),
    [TronçonStatus.Built]: length(TronçonStatus.Built),
    [TronçonStatus.Building]: length(TronçonStatus.Building),
    [TronçonStatus.Planned]: length(TronçonStatus.Planned),
    [TronçonStatus.Blocked]: length(TronçonStatus.Blocked),
    [TronçonStatus.Unknown]: length(TronçonStatus.Unknown),
  };

  const globalStats: GlobalStats = {
    stats,
    total,
  };

  return {
    globalStats,
    routes,
    tronçons,
    globalBounds,
  };
}
