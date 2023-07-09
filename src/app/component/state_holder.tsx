'use client'
import Map from './map'
import RouteList from './routes_list'
import { useEffect, useState } from 'react'
import { Level, GlobalData, TronçonStatus } from '../types'
import RouteDetails from './route_details'
import GlobalStats from './global_stats'
import { useSearchParams } from 'next/navigation'
import Segment from './segment'
import { statusColor, statusLabel } from '@/utils/constants'

function Legend({status}: {status: TronçonStatus}) {
  return <div>
    <span style={{background: statusColor[status]}} className="legend-color"/>
    <span>{statusLabel[status]}</span>
  </div>
}

export default function({data} : {data: GlobalData}) {
  const [bounds, setBounds] = useState(data.globalBounds)
  const [level, setLevel] = useState<Level>({ level: 'region' })
  const searchParams = useSearchParams()

  useEffect( () => {
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
    case 'region': current = <GlobalStats globalStats={data.globalStats} />; break;
    case 'route': current = <RouteDetails route={level.props}/>; break;
    case 'segment': current = <Segment segment={level.props} />; break;
  }
  return <>
    <section className="hero">
      <Map outlines={data.outlines} variantOutlines={data.variantOutlines} bounds={bounds} segments={data.tronçons} level={level} setLevel={setLevel} />
    </section>
    {current}
    <section className="section legend-section">
      <Legend status={TronçonStatus.PreExisting} />
      <Legend status={TronçonStatus.Built} />
      <Legend status={TronçonStatus.Building} />
      <Legend status={TronçonStatus.Planned} />
      <Legend status={TronçonStatus.Blocked} />
      <Legend status={TronçonStatus.Unknown} />
    </section>
    <RouteList routes={data.routes} />
  </>
}
