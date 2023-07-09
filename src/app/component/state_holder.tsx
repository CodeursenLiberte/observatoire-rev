'use client'
import Map from './map'
import RouteList from './routes_list'
import { useEffect, useState } from 'react'
import { Feature, FeatureCollection, MultiLineString } from '@turf/helpers'
import { RoutesMap, Level, GlobalData } from '../types'
import RouteDetails from './route_details'
import { globalStats, totalLength, tronçons } from '@/utils/prepared_data'
import GlobalStats from './global_stats'
import { useSearchParams } from 'next/navigation'

export default function({data} : {data: GlobalData}) {
  const [bounds, setBounds] = useState(data.globalBounds)
  const [level, setLevel] = useState<Level>({ level: 'region' })
  const searchParams = useSearchParams()

  useEffect( () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
    const level = searchParams.get('level')
    const id = searchParams.get('id')
    console.log('searchParams changed', level, id)
    if(level === null) {
      setBounds(data.globalBounds)
      setLevel({level: 'region'})
    } else {
      if(level === 'route' && id !== null) {
        const props = data.routes[id];
        setBounds(props.bounds)
        setLevel({level: 'route', props})
      } else if (level === 'segment') {
        //setBounds(data.routes[found?.groups?.level === 'route'])
      }
    }
  }, [searchParams])


  let current;
  switch (level.level) {
    case 'region': current = <GlobalStats globalStats={globalStats} totalLength={totalLength} />; break;
    case 'route': current = <RouteDetails route={level.props}/>; break;
    case 'segment': current = <p>segment</p>; break;
  }
  return <>
    <section className="hero">
      <Map outlines={data.outlines} variantOutlines={data.variantOutlines} bounds={bounds} segments={tronçons} level={level} />
    </section>
    {current}
    <RouteList routes={data.routes} />
  </>
}
