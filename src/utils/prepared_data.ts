// Try to build outlines from individual segments
// We must do that do avoid cap that are ugly

import departementsGeojson from '../../data/departements-ile-de-france.geo.json'
import distance from '@turf/distance'
import { Position, Feature, multiLineString, MultiLineString, FeatureCollection, featureCollection, lineString, LineString } from '@turf/helpers'
import _ from 'lodash';
import { TronçonStatus, TronçonProperties, RoutesMap, Bounds, RouteStats, GlobalStats,  DepartementsMap, Departement, TypeMOA, LengthStats} from '@/app/types';
import bbox from '@turf/bbox';
import booleanWithin from '@turf/boolean-within'
import troncons from '../../data/vif.json'
import communes from '../../data/communes-ile-de-france.geo.json'

function closeEnough(a: Position, b: Position): boolean {
    return distance(a, b, {units: 'meters'}) < 10
}

function groupLineStrings(coords: Array<Array<Position>>, route: string): Feature<MultiLineString> {
    let result: Array<Array<Position>> = [];
    for (const linestring of coords) {
        let found = false;
        for (let i = 0; i < result.length; i++ ){
            let concatenated = result[i]
            if (closeEnough(concatenated[concatenated.length - 1], linestring[0])) {
                found = true
                result[i] = concatenated.concat(linestring)
            } else if (closeEnough(concatenated[0], linestring[linestring.length - 1])) {
                found = true
                result[i] = linestring.concat(concatenated)
            } else if (closeEnough(concatenated[0], linestring[0])) {
                found = true
                result[i] = linestring.reverse().concat(concatenated)
            } else if (closeEnough(concatenated[concatenated.length - 1], linestring[linestring.length -1])) {
                found = true
                result[i] = concatenated.concat(linestring.reverse())
            }
        }
        if (!found) {
            result.push(linestring)
        }
    }
    return multiLineString(result, {route});
}

function status(niveau_validation: string, apport_rerv: string) : TronçonStatus {
    if (apport_rerv === 'Aménagement prééxistant') {
        return TronçonStatus.PreExisting
    } else {
        return {
            "A l'étude": TronçonStatus.Planned,
            "En travaux": TronçonStatus.Building,
            "Mis en service": TronçonStatus.Built,
        }[niveau_validation] || TronçonStatus.Unknown
    }
}

const moaTypeMapping = {
    Commune: TypeMOA.Commune,
    Département: TypeMOA.Departement,
    'EPCI/EPT': TypeMOA.EPCI
}

const tronçonsArray: Feature<LineString, TronçonProperties>[] = troncons.features.map( (feature) => {
        // booleanWithin doesn’t support MultiLineString
        const simpleLineString = lineString(feature.geometry.coordinates[0])
        const dep = departementsGeojson.features.find((dep) => booleanWithin(simpleLineString, dep.geometry))
        const commune = communes.features.find((commune) => booleanWithin(simpleLineString, commune.geometry))
        const properties: TronçonProperties = {
            // A single tronçon can be used by many lines, the concatenation allows to deduplicate
            id: feature.properties.CODE_TRONCON + feature.properties.NUM_LIGNE,
            // When it is a "Variante" don’t count its length for any statistic, while "Variante initiale" means we DO use it for lengths stats
            length: feature.properties.NIVEAU_VALID_SUPPORT_VIAIRE === "Variante" ? 0 : feature.properties.LONGUEUR,
            commune: commune?.properties.nom.replace(' Arrondissement', ''),
            departement: dep?.properties.code,
            route: feature.properties.NUM_LIGNE,
            variant: feature.properties.NIVEAU_VALID_SUPPORT_VIAIRE === "Variante" || feature.properties.NIVEAU_VALID_SUPPORT_VIAIRE === "Variante initiale",
            status: status(feature.properties.NIVEAU_VALID_AMENAG || "", feature.properties.APPORT_RERV || ""),
            typeMOA: moaTypeMapping[feature.properties.TYPE_MOA] || TypeMOA.Unknown,
            moa: feature.properties.NOM_MOA || ''
        }

        return lineString(feature.geometry.coordinates[0], properties, {bbox: bbox(simpleLineString)})
    })

export const tronçons = featureCollection(_.uniqBy(tronçonsArray, (f) => f.properties.id))

const departementsList: [string, Departement][] = _(departementsGeojson.features)
    .map(d => {
        const t = _.filter(tronçonsArray, feature => feature.properties.departement === d.properties.code)
        const total = _(t).map('properties.length').sum()
        const built = _(t).filter(feature => feature.properties.status === TronçonStatus.Built).map('properties.length').sum()
        const [xmin, ymin, xmax, ymax] = bbox(d)
        const result: Departement = {
            name: d.properties.nom,
            code: d.properties.code,
            bounds: [xmin, ymin, xmax, ymax],
            stats: {built, total}
        }
        return result
    })
    .sortBy('code')
    .map(dep => [dep.code, dep] as [string, Departement])
    .value()

export const departements: DepartementsMap = _.fromPairs(departementsList)

const [xmin, ymin, xmax, ymax] = bbox(tronçons)
export const globalBounds: Bounds = [xmin, ymin, xmax, ymax]

const outlineFeatures: Feature<MultiLineString>[] = _(tronçonsArray)
    .reject('properties.variant')
    .orderBy(['properties.status'])
    .groupBy('properties.route')
    .map((features, route) => groupLineStrings(features.map(f => f.geometry.coordinates), route))
    .value()
export const outlines: FeatureCollection<MultiLineString> = featureCollection(outlineFeatures)

const variantOutlinesFeatures: Feature<MultiLineString>[] = _(tronçonsArray)
    .filter('properties.variant')
    .orderBy(['properties.status'])
    .groupBy('properties.route')
    .map((features, route) => groupLineStrings(features.map(f => f.geometry.coordinates), route))
    .value()

export const variantOutlines: FeatureCollection<MultiLineString> = featureCollection(variantOutlinesFeatures)

const routeList = ['V1', 'V2', 'V3', 'V4', 'V5', 'V6', 'V7', 'V8', 'V9', 'V10', 'V20'];
export const routes: RoutesMap = _.fromPairs(routeList.map((route) => [route, routeStats(route)]));

function routeStats(code: string): RouteStats {
    const t = _.filter(tronçonsArray, feature => feature.properties.route === code)
    function length(status: TronçonStatus): number {
        return _(t).filter(f => f.properties.status === status).sumBy('properties.length')
    }
    const total = _(t).map('properties.length').sum()
    const stats: LengthStats = {
    [TronçonStatus.PreExisting]: length(TronçonStatus.PreExisting),
    [TronçonStatus.Built]: length(TronçonStatus.Built),
    [TronçonStatus.Building]: length(TronçonStatus.Building),
    [TronçonStatus.Planned]: length(TronçonStatus.Planned),
    [TronçonStatus.Blocked]: length(TronçonStatus.Blocked),
    [TronçonStatus.Unknown]: length(TronçonStatus.Unknown),
  }
  const [xmin, ymin, xmax, ymax] = bbox({type: 'FeatureCollection', features: t})
  return {code, stats, total, bounds: [xmin, ymin, xmax, ymax]}
}

function length(status: TronçonStatus): number {
    return _(tronçonsArray).filter(f => f.properties.status === status).sumBy('properties.length')
}
const total = _(tronçonsArray).map('properties.length').sum()
const stats: LengthStats = {
    [TronçonStatus.PreExisting]: length(TronçonStatus.PreExisting),
    [TronçonStatus.Built]: length(TronçonStatus.Built),
    [TronçonStatus.Building]: length(TronçonStatus.Building),
    [TronçonStatus.Planned]: length(TronçonStatus.Planned),
    [TronçonStatus.Blocked]: length(TronçonStatus.Blocked),
    [TronçonStatus.Unknown]: length(TronçonStatus.Unknown),
}
export const globalStats: GlobalStats = {
    stats,
    total
}

export const totalLength: number = _(globalStats).values().sum();
