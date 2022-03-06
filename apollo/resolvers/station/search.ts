import { getStationsByKeyword } from '../../services'

export const stationsByKetword = async (_parent: undefined, _args: { city: string, keyword: string }, ctx: any) => {
  const { city, keyword } = _args
  let filter
  if (keyword) {
    filter = `contains(StationName/Zh_tw, '${keyword}')`
  }
  const resp  = (await getStationsByKeyword({
    city,
    filter,
    select: 'StationUID,StationName,StationPosition,StationAddress,StationGroupID,Stops,Bearing',
  })).data

  return resp
}
