'use client'
import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import styles from './page.module.css'
import troncons from '../../data/vif.json'

export default function Map() {
    const mapContainer = useRef<null | HTMLElement>(null);
    const map = useRef<null | maplibregl.Map>(null);
    const [lng] = useState(2.3717);
    const [lat] = useState(48.8512);
    const [zoom] = useState(10);

    useEffect(() => {
      if (map.current) return;

      const newMap = new maplibregl.Map({
          container: mapContainer.current || '',
          style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`,
          center: [lng, lat],
          zoom: zoom
        }).on('load', () => {
            console.log(troncons)
          newMap.addSource('vif', {type: 'geojson', data: troncons})
          .addLayer({id: 'base', source: 'vif', 'type': 'line'});
      })

      map.current = newMap;
    });

    return (
        <div ref={(el) => (mapContainer.current = el)} className={styles.map} />
    );
}

