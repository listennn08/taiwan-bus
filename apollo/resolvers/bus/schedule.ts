import { getRouteSchedule } from '../../services'

export const schedule = async (_praent: undefined, _args: { city: string, routeName: string, routeUID: string }) => {
  const { city, routeName, routeUID } = _args
  const resp: IBusSchedule[] = (await getRouteSchedule({
    city,
    routeName,
    filter: `RouteUID eq '${routeUID}'`
  })).data
  
  let ServiceDay: string[] = []
  if (resp[0]?.Frequencys) {
    ServiceDay = Array.from(new Set(resp[0].Frequencys.flatMap((el) => {
      return Object.keys(el.ServiceDay || {}).filter((key) => el.ServiceDay?.[key] === 1)
    })))
  } else if (resp[0]?.Timetables) {
    ServiceDay = Array.from(new Set(resp[0].Timetables.flatMap((el) => {
      return Object.keys(el.ServiceDay || {}).filter((key) => el.ServiceDay?.[key] === 1)
    })))
  }

  return {
    RouteUID: resp[0].RouteUID,
    ServiceDay,
  }
}