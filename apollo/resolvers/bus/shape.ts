import { getRouteShape } from '../../services'
import { generateGeoStringToLatLngArray } from '../utils'

export const shape = async (
  _parent: undefined,
  _arg: { city: string, routeName: string, routeUID: string }
) => {
  const { city, routeName, routeUID } = _arg
  const resp: IBusShape[] = (await getRouteShape({
    city,
    routeName,
    filter: `RouteUID eq '${routeUID}'`
  })).data

  return generateGeoStringToLatLngArray(resp)
}