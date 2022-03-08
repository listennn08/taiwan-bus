import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from 'react-leaflet'
import BaseMarkerIcon from './BaseMarkerIcon'

const MapController = ({ currentStopId, routeInfo, direction }: IMapProp) => {
  const map = useMap()

  useEffect(() => {
    if (currentStopId && currentStopId !== '') {
      const current = routeInfo[direction]?.Stops.find((el) => el.StopUID === currentStopId)
      if (current) {
        map?.flyTo([current.StopPosition.PositionLat!, current.StopPosition.PositionLon!], 16)
      }
    }
  }, [currentStopId, direction, map, routeInfo])

  return (<></>)
}

const BusMap = (props: IMapProp) => {
  const { shape, direction, routeInfo } = props

  return (
    <MapContainer style={{ width: '100%', height: '100%' }} center={[0,0]} zoom={16} zoomControl={false}>
      <MapController {...props} />
      <TileLayer 
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
      />
      {routeInfo[direction]?.Stops.map((el, i) => (
        <Marker
          key={`${el.StationID}${el.StopUID}`}
          position={[el.StopPosition.PositionLat!, el.StopPosition.PositionLon!]}
          icon={BaseMarkerIcon({ el })}
        >
          <Popup className="bg-transparent" closeButton={false} autoClose={false} closeOnClick={false} maxWidth={500}>
            <div className="px-3 py-1.5 bg-[#1A2E35B2] text-white whitespace-nowrap text-center text-sm mb-1.5 rounded-md">
              {i + 1}. {el.StopName.Zh_tw}
            </div>
          </Popup>
        </Marker>
      ))}
      {shape?.[direction]?.geo?.length && <Polyline color="#0B6987" positions={shape[direction].geo!}></Polyline>}
    </MapContainer>
  )
}

export default BusMap