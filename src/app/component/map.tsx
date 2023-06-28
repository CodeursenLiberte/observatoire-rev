'use client'
import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import styles from '../page.module.css'
import troncons from '../../../data/vif.json'
import { featureCollection, lineString, multiLineString } from '@turf/helpers'
import _ from 'lodash'
import outlines from '../../utils/outlines'
import { usePathname } from 'next/navigation'
import { statsPerDepartement } from '@/utils/prepared_departements';

export default function Map({fullHeight=false}: {fullHeight?: boolean}) {
    const mapContainer = useRef<null | HTMLElement>(null);
    const map = useRef<null | maplibregl.Map>(null);
    const [lng] = useState(2.3717);
    const [lat] = useState(48.8512);
    const [zoom] = useState(10);

    useEffect(() => {
        if (map.current) return;

        const outlineGeojson = featureCollection(outlines())

        const newMap = new maplibregl.Map({
            container: mapContainer.current || '',
            style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`,
            center: [lng, lat],
            zoom: zoom
        }).on('load', () => {
            newMap.addSource('vif', { type: 'geojson', data: troncons })
                .addSource('outline', { type: 'geojson', data: outlineGeojson })
                .addLayer({
                    id: 'base',
                    source: 'outline',
                    type: 'line',
                    paint: {
                        'line-width': ["interpolate", ["linear"], ["zoom"], 10, 1, 15, 3],
                        'line-gap-width': ["interpolate", ["linear"], ["zoom"], 10, 3, 15, 10],
                        'line-opacity': 1,
                        'line-color': '#555'
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
                        'line-join': 'round',
                    },
                    filter: ['match', ['get', 'NIVEAU_VALID_SUPPORT_VIAIRE'], ['Variante', 'Variante initiale'], false, true],
                })
                .addLayer({
                    id: 'variantes',
                    source: 'vif',
                    type: 'line',
                    paint: {
                        'line-width': ["interpolate", ["linear"], ["zoom"], 10, 1, 15, 3],
                        'line-dasharray': [2, 1],
                    },
                    filter: ['match', ['get', 'NIVEAU_VALID_SUPPORT_VIAIRE'], ['Variante', 'Variante initiale'], true, false],
                });
        })

        map.current = newMap;
    });

    const pathname = usePathname()

    useEffect( () => {
        const [, object, id] = pathname.split("/")
        if(object === 'departements') {
            let bbox = statsPerDepartement(id)?.bbox
            if (bbox !== undefined) {
                map.current?.fitBounds(bbox)
            }
        }
    }, [pathname])


    const style = fullHeight ? styles.mapfullheight : styles.map ;

    return (
        <div ref={(el) => (mapContainer.current = el)} className={style} />
    );
}

