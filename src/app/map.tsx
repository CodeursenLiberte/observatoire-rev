'use client'
import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import styles from './page.module.css'
import troncons from '../../data/vif.json'
import {featureCollection, lineString, multiLineString} from '@turf/helpers'
import _ from 'lodash'

export default function Map() {
    const mapContainer = useRef<null | HTMLElement>(null);
    const map = useRef<null | maplibregl.Map>(null);
    const [lng] = useState(2.3717);
    const [lat] = useState(48.8512);
    const [zoom] = useState(10);

    useEffect(() => {
        if (map.current) return;


        // This is a failed attempt to see if creating a single multiLineString per line
        // we could avoid having line-caps between successive tronçons of the same line
        const outlineGeojson = featureCollection(_(troncons.features)
            .reject(['properties.NIVEAU_VALID_SUPPORT_VIAIRE', 'Variante'])
            .groupBy('properties.NUM_LIGNE')
            .values()
            .map(e => multiLineString(_.flatMap(e, 'geometry.coordinates')))
            .value())

      const newMap = new maplibregl.Map({
          container: mapContainer.current || '',
          style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`,
          center: [lng, lat],
          zoom: zoom
        }).on('load', () => {
          newMap.addSource('vif', {type: 'geojson', data: troncons})
                .addSource('outline', {type: 'geojson', data: outlineGeojson})
          .addLayer({
            id: 'base',
            source: 'vif',
            type: 'line',
            paint: {
                'line-width': ["interpolate", ["linear"], ["zoom"], 10, 1, 15, 3],
                'line-gap-width': ["interpolate", ["linear"], ["zoom"], 10, 3, 15, 10],
                'line-opacity': 0.5,
            },
            layout: {
                'line-join': 'round',
                'line-cap': 'round',
            },
            filter: ['!=', ['get', 'NIVEAU_VALID_SUPPORT_VIAIRE'], 'Variante']
        })
        .addLayer({
            id: 'couleur',
            source: 'vif',
            type: 'line',
            paint: {
                'line-width': ["interpolate", ["linear"], ["zoom"], 10, 2, 15, 6],
                'line-color': ['match', ['get', 'NIVEAU_VALID_AMENAG'],
                    'Mis en service', '#3A3',
                    'En travaux', '#33A',
                    '#A33'
                ]
            },
            layout: {
                'line-cap': 'round',
            },
            filter: ['!=', ['get', 'NIVEAU_VALID_SUPPORT_VIAIRE'], 'Variante']
        })
        .addLayer({
            id: 'variantes',
            source: 'vif',
            type: 'line',
            paint: {
                'line-width': ["interpolate", ["linear"], ["zoom"], 10, 1, 15, 3],
                'line-dasharray': [2, 1],
            },
            filter: ['==', ['get', 'NIVEAU_VALID_SUPPORT_VIAIRE'], 'Variante'],
        });
      })

      map.current = newMap;
    });

    return (
        <div ref={(el) => (mapContainer.current = el)} className={styles.map} />
    );
}

