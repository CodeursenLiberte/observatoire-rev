// Try to build outlines from individual segments
// We must do that do avoid cap that are ugly

import {preparedAndCached} from '@/utils/prepared_tronçons'
import distance from '@turf/distance'
import { Position, Feature, multiLineString, MultiLineString } from '@turf/helpers'
import _ from 'lodash';

function closeEnough(a: Position, b: Position): boolean {
    return distance(a, b, {units: 'meters'}) < 10
}

function groupLineStrings(coords: Array<Array<Position>>): Feature<MultiLineString> {
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
    return multiLineString(result);
}

export default function outlines() : Array<Feature<MultiLineString>> {
    return _(preparedAndCached())
            .reject('variante')
            .groupBy('voie')
            .values()
            .map(features => groupLineStrings(features.map(f => f.geometry.coordinates.flat())))
            .value()
}
