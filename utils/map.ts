import { LatLngTuple } from 'leaflet'

export function generateGeoStringToLatLngArray(data: IBusShape[]) {
  return data?.map((el) => {
    const geometry = el.Geometry?.match(/(\d+.\d+) (\d+.\d+)/g)
    if (geometry) {
      el.geo = geometry.map((g) => g.split(' ').map((d) => parseFloat(d)).reverse() as LatLngTuple)
    }
    return el
  })
}