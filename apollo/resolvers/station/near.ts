import { getNearStations } from '../../services'

export const nearStations = async (_parent: undefined, _args: { latlng: [number, number] }, ctx: any) => {
  const { latlng } = _args
  const resp  = (await getNearStations({
    select: 'StationUID,StationName,StationPosition,StationAddress,StationGroupID,Stops,Bearing',
    spatialFilter: `nearby(${latlng[0]}, ${latlng[1]}, 1000)`
  })).data

  return resp
}