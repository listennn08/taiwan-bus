import { nearStations } from './near'
import { stationsByKetword } from './search'

export const stationQueries = {
  Query: {
    nearStations,
    stationsByKetword,
  }
}