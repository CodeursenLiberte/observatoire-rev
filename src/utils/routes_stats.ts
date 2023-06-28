import { TronçonStatus } from "@/app/types"
import {preparedAndCached} from "./prepared_tronçons"
import _ from "lodash"

export let routeList = ['V1', 'V2', 'V3', 'V4', 'V5', 'V6', 'V7', 'V8', 'V9', 'V10', 'V20'];

export default function routeStats(route: string): {built: number, total: number} {
  const t = _.filter(preparedAndCached(), feature => feature.properties.route === route)
  const total = _(t).map('properties.length').sum()
  const built = _(t).filter(feature => feature.properties.status === TronçonStatus.Built).map('properties.length').sum()
  return {built, total}
}

