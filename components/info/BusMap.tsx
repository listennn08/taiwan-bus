import { LatLngTuple } from 'leaflet'
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from 'react-leaflet'
import BaseMarkerIcon from './BaseMarkerIcon'

const MapController = ({ currentStopId, routeInfo, direction }: IMapProp) => {
  const map = useMap()
  const [pos, setPos] = useState<LatLngTuple>([0, 0])

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(function(position) {
  //     setPos([position.coords.latitude, position.coords.longitude] as LatLngTuple)
  //   })
  // }, [])

  useEffect(() => {
    const { StopPosition } = routeInfo[direction].Stops[0]
    setPos([StopPosition.PositionLat!, StopPosition.PositionLon!])
  }, [routeInfo, direction])

  useEffect(() => {
    if (currentStopId && currentStopId !== '') {
      const current = routeInfo[direction]?.Stops.find((el) => el.StopUID === currentStopId)
      if (current) {
        map?.flyTo([current.StopPosition.PositionLat!, current.StopPosition.PositionLon!], 16)
      }
    }
  }, [currentStopId, direction, map, routeInfo])

  useEffect(() => {
    map.setView(pos, 16)
  }, [map, pos])

  return (<></>)
}

const BusMap = (props: IMapProp) => {
  const { shape, direction, routeInfo } = props

  return (
    <MapContainer className={props.className} style={{ width: '100%', height: '100%' }} zoomControl={false}>
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