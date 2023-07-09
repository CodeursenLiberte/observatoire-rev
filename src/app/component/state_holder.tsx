'use client'
import Map from './map'
import RouteList from './routes_list'
import { useEffect, useState } from 'react'
import { Level, GlobalData } from '../types'
import RouteDetails from './route_details'
import { globalStats, totalLength } from '@/utils/prepared_data'
import GlobalStats from './global_stats'
import { useSearchParams } from 'next/navigation'

export default function({data} : {data: GlobalData}) {
  const [bounds, setBounds] = useState(data.globalBounds)
  const [level, setLevel] = useState<Level>({ level: 'region' })
  const searchParams = useSearchParams()

  useEffect( () => {
    console.log('search params changed')
    window.scrollTo({top: 0, behavior: 'smooth'});
    const level = searchParams.get('level')
    const id = searchParams.get('id')
    if(level === null) {
      setBounds(data.globalBounds)
      setLevel({level: 'region'})
    } else {
      if(level === 'route' && id !== null) {
        const props = data.routes[id];
        setBounds(props.bounds)
        setLevel({level: 'route', props})
      } else if (level === 'segment') {
        const tronçon = data.tronçons.features.find(f => f.properties.id ===id)
        if (tronçon !== undefined && tronçon.bbox !== undefined){
          const [xmin, ymin, xmax, ymax] = tronçon.bbox
          setBounds([xmin, ymin, xmax, ymax])
          setLevel({level: 'segment', props: tronçon.properties})
        } else {
          console.warn('something weird', tronçon)
        }
      }
    }
  }, [searchParams])


  let current;
  switch (level.level) {
    case 'region': current = <GlobalStats globalStats={globalStats} totalLength={totalLength} />; break;
    case 'route': current = <RouteDetails route={level.props}/>; break;
    case 'segment': current = <p>segment</p>; break;
  }
  console.log(data.tronçons)
  return <>
    <section className="hero">
      <Map outlines={data.outlines} variantOutlines={data.variantOutlines} bounds={bounds} segments={data.tronçons} level={level} setLevel={setLevel} />
    </section>
    {current}
    <RouteList routes={data.routes} />
  </>
}
