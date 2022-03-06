import L, { Map, Marker, Polyline } from 'leaflet'

interface IProp {
  shape: IBusShape[]
  direction: number
  routeInfo: IBusStopOfRoute[]
  currentStopId: string
}

const timeConverter = (t: number) => t ? Math.floor(t / 60) : 0

const BusMap = ({ shape, direction, routeInfo, currentStopId }: IProp) => {
  const [map, setMap] = useState<Map>()
  const [markers, setMarkers] = useState<Marker[]>([])
  const [polyLine, setPolyLine] = useState<Polyline>()

  useEffect(() => {
    if (!map) {
      if (typeof window !== 'undefined') {
        setMap(L.map('map-container', {
          zoomControl: false
        }))
      }
    }
  }, [map])

  useEffect(() => {
    if (shape?.[direction]?.geo?.length) {
      setPolyLine(L.polyline(shape[direction].geo!, {
        color: '#0B6987'
      }))
    }
  }, [shape, direction])

  useEffect(() => {
    if (routeInfo[direction]?.Stops) {
      setMarkers(routeInfo[direction].Stops.map((el, i) => {
        const time = timeConverter(el?.TimeInfo?.EstimateTime!)!
        return new L.Marker({
            lat: el.StopPosition.PositionLat!,
            lng: el.StopPosition.PositionLon!,
          },
          {
            icon: L.divIcon({
              html: `
                <div class="flex items-center justify-center flex-col">
                  ${el?.TimeInfo?.EstimateTime && time < 1
                    ? `
                      <svg width="38" height="25" viewBox="0 0 38 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M37.3711 14.293V6.06927C37.3723 5.27168 37.2196 4.48167 36.9218 3.7444C36.624 3.00714 36.1869 2.33708 35.6355 1.77254C35.0841 1.20799 34.4292 0.760021 33.7083 0.454245C32.9873 0.148468 32.2145 -0.00912595 31.4339 -0.00952148H12.4974C9.3387 -0.00952148 6.30938 1.27263 4.07585 3.55489C1.84232 5.83714 0.58753 8.93254 0.58753 12.1601V14.3352C0.58932 14.4643 0.545254 14.5897 0.463518 14.6882C0.303567 14.87 0.1805 15.0825 0.101427 15.3133C0.0223531 15.544 -0.0111448 15.7885 0.00285796 16.0326C0.0168607 16.2767 0.0781018 16.5155 0.18302 16.7352C0.287939 16.955 0.434443 17.1513 0.614091 17.3128C0.69716 17.3844 0.756918 17.4801 0.785352 17.5873C0.990936 18.3745 1.35039 19.1109 1.84207 19.7523C2.33375 20.3937 2.94746 20.9266 3.64618 21.3191C3.98437 21.5136 4.36526 21.6174 4.75332 21.6207H4.79171C4.91708 21.6142 5.04076 21.6525 5.14151 21.729C5.24226 21.8055 5.31378 21.9155 5.3438 22.0401C5.51146 22.8442 5.93333 23.5697 6.54439 24.1047C7.15545 24.6397 7.92174 24.9544 8.72515 25.0004C9.52856 25.0463 10.3245 24.821 10.9902 24.3591C11.6559 23.8972 12.1544 23.2243 12.4088 22.4443C12.4472 22.3192 12.5273 22.2117 12.6352 22.1406C12.743 22.0695 12.8719 22.0393 12.9993 22.0552C13.0807 22.0648 13.1625 22.0698 13.2444 22.0702H24.8797C24.9625 22.0697 25.0453 22.0647 25.1277 22.0552C25.255 22.0399 25.3836 22.0704 25.4913 22.1414C25.599 22.2124 25.6792 22.3195 25.7181 22.4443C25.9651 23.1995 26.441 23.8547 27.0769 24.3148C27.7129 24.7749 28.4757 25.0161 29.2549 25.0033C30.034 24.9906 30.7888 24.7245 31.41 24.2437C32.0311 23.763 32.4863 23.0926 32.7094 22.3297C32.746 22.2024 32.8251 22.0922 32.933 22.0183C33.0408 21.9445 33.1707 21.9116 33.2998 21.9254H33.4652C33.6585 21.9258 33.851 21.9005 34.0379 21.85C36.1666 21.2768 37.3859 19.7383 37.3859 17.6265V17.3249C37.5714 17.1616 37.7226 16.9615 37.8303 16.7368C37.938 16.5121 37.9999 16.2674 38.0123 16.0175C38.0247 15.7676 37.9874 15.5177 37.9025 15.283C37.8177 15.0483 37.6871 14.8337 37.5188 14.652C37.4278 14.5551 37.3752 14.4272 37.3711 14.293Z" fill="white"/>
                        <path d="M11.9542 1.17676H31.9742C33.0924 1.17676 34.1647 1.63063 34.9553 2.43853C35.746 3.24643 36.1902 4.34217 36.1902 5.48471V17.6152C36.1902 19.6123 34.7848 20.3695 33.722 20.6561C33.5849 20.6924 33.4422 20.7007 33.302 20.6807C33.1618 20.6606 33.0268 20.6125 32.9048 20.5391C32.7828 20.4657 32.6761 20.3684 32.5909 20.2529C32.5057 20.1373 32.4436 20.0057 32.4082 19.8657C32.1395 18.846 31.3749 17.3919 29.1842 17.3919C28.4381 17.3958 27.7145 17.6527 27.1267 18.1223C26.5389 18.5918 26.1203 19.2475 25.9366 19.9863C25.8792 20.2265 25.7449 20.4401 25.555 20.5932C25.365 20.7463 25.1304 20.83 24.8885 20.831H13.2502C13.0086 20.8304 12.7741 20.7467 12.5846 20.5935C12.395 20.4403 12.2614 20.2265 12.2051 19.9863C12.0269 19.2718 11.6288 18.6347 11.0693 18.169C10.5098 17.7033 9.81874 17.4337 9.0979 17.3999C8.37706 17.3661 7.66465 17.5699 7.0658 17.9813C6.46695 18.3927 6.01335 18.9898 5.7719 19.6847C5.71523 19.8328 5.62796 19.9668 5.51606 20.0774C5.40415 20.188 5.27025 20.2727 5.12344 20.3257C4.97663 20.3786 4.82036 20.3986 4.6653 20.3843C4.51024 20.37 4.36002 20.3217 4.22486 20.2428C3.48323 19.8286 2.86468 19.2177 2.43444 18.4744C2.00421 17.731 1.77822 16.8829 1.78029 16.0193V11.5876C1.78028 8.82912 2.85171 6.18336 4.75926 4.23137C6.66681 2.27938 9.25452 1.18075 11.9542 1.17676V1.17676Z" fill="#FF7A50"/>
                        <path d="M11.3902 11.5513H6.07597C5.8254 11.5513 5.58508 11.4496 5.4079 11.2685C5.23072 11.0875 5.13119 10.8419 5.13119 10.5859V10.0037C5.13119 8.46268 5.73027 6.9848 6.79666 5.89516C7.86304 4.80552 9.30937 4.19336 10.8175 4.19336H11.3873C11.6379 4.19336 11.8781 4.29506 12.0553 4.4761C12.2325 4.65715 12.332 4.9027 12.332 5.15873V10.5889C12.3313 10.8439 12.2318 11.0882 12.0553 11.2685C11.8789 11.4488 11.6398 11.5505 11.3902 11.5513V11.5513Z" fill="#E9F2F2"/>
                        <path d="M22.1753 11.5513H24.9771C25.688 11.5513 26.2643 10.9624 26.2643 10.236V5.50867C26.2643 4.78225 25.688 4.19336 24.9771 4.19336L22.1753 4.19336C21.4643 4.19336 20.888 4.78225 20.888 5.50867V10.236C20.888 10.9624 21.4643 11.5513 22.1753 11.5513Z" fill="#E9F2F2"/>
                        <path d="M18.7299 15.5969H14.4903C14.3399 15.5969 14.1957 15.5359 14.0894 15.4273C13.9831 15.3187 13.9234 15.1713 13.9234 15.0177V5.83163C13.9234 5.39798 14.092 4.98209 14.3921 4.67545C14.6922 4.36881 15.0992 4.19654 15.5236 4.19654H17.6965C17.9067 4.19654 18.1147 4.23883 18.3089 4.321C18.503 4.40317 18.6794 4.52362 18.828 4.67545C18.9766 4.82728 19.0945 5.00753 19.1749 5.20591C19.2553 5.40428 19.2967 5.61691 19.2967 5.83163V15.0177C19.2967 15.1713 19.237 15.3187 19.1307 15.4273C19.0244 15.5359 18.8802 15.5969 18.7299 15.5969V15.5969Z" fill="#FFA394"/>
                        <path d="M29.1399 11.5513H31.9418C32.6527 11.5513 33.229 10.9624 33.229 10.236V5.50867C33.229 4.78225 32.6527 4.19336 31.9418 4.19336L29.1399 4.19336C28.429 4.19336 27.8527 4.78225 27.8527 5.50867V10.236C27.8527 10.9624 28.429 11.5513 29.1399 11.5513Z" fill="#E9F2F2"/>
                        <path d="M1.81863 16.55L36.1813 16.55C36.5335 16.55 36.819 16.2583 36.819 15.8984V15.8954C36.819 15.5355 36.5335 15.2438 36.1813 15.2438L1.81863 15.2438C1.46643 15.2438 1.18095 15.5355 1.18095 15.8954V15.8984C1.18095 16.2583 1.46643 16.55 1.81863 16.55Z" fill="#FFD952"/>
                        <path d="M8.92799 20.4871C9.07072 20.4865 9.21041 20.5292 9.32933 20.6099C9.44824 20.6905 9.54102 20.8054 9.59591 20.9401C9.6508 21.0747 9.66531 21.2229 9.63761 21.366C9.60991 21.5091 9.54125 21.6405 9.44033 21.7436C9.33941 21.8468 9.21076 21.9169 9.07074 21.9453C8.93073 21.9736 8.78566 21.9587 8.65391 21.9026C8.52216 21.8465 8.40967 21.7517 8.33074 21.6302C8.25181 21.5087 8.21 21.366 8.21058 21.2201C8.21058 21.0257 8.28615 20.8393 8.42069 20.7018C8.55524 20.5643 8.73772 20.4871 8.92799 20.4871V20.4871ZM8.92799 18.677C8.43491 18.6764 7.95274 18.8253 7.54252 19.1048C7.13229 19.3844 6.81243 19.782 6.62347 20.2474C6.4345 20.7128 6.38491 21.225 6.48097 21.7192C6.57702 22.2133 6.81443 22.6673 7.16309 23.0236C7.51175 23.3798 7.95601 23.6224 8.43965 23.7205C8.92329 23.8187 9.42454 23.768 9.87998 23.5749C10.3354 23.3818 10.7246 23.055 10.9981 22.6358C11.2717 22.2167 11.4174 21.724 11.4169 21.2201C11.4169 20.5457 11.1546 19.8988 10.6879 19.4219C10.2211 18.9449 9.58807 18.677 8.92799 18.677V18.677Z" fill="#1E373F"/>
                        <path d="M29.1931 20.4871C29.3358 20.4865 29.4755 20.5292 29.5944 20.6099C29.7133 20.6905 29.8061 20.8054 29.861 20.9401C29.9159 21.0747 29.9304 21.2229 29.9027 21.366C29.875 21.5091 29.8063 21.6405 29.7054 21.7436C29.6045 21.8468 29.4758 21.9169 29.3358 21.9453C29.1958 21.9736 29.0507 21.9587 28.919 21.9026C28.7872 21.8465 28.6747 21.7517 28.5958 21.6302C28.5169 21.5087 28.475 21.366 28.4756 21.2201C28.4756 21.1239 28.4942 21.0286 28.5303 20.9396C28.5663 20.8507 28.6192 20.7699 28.6858 20.7018C28.7524 20.6337 28.8315 20.5797 28.9185 20.5429C29.0056 20.506 29.0989 20.4871 29.1931 20.4871V20.4871ZM29.1931 18.677C28.7 18.6764 28.2178 18.8253 27.8076 19.1048C27.3974 19.3844 27.0775 19.782 26.8885 20.2474C26.6996 20.7128 26.65 21.225 26.746 21.7192C26.8421 22.2133 27.0795 22.6673 27.4281 23.0236C27.7768 23.3798 28.2211 23.6224 28.7047 23.7205C29.1884 23.8187 29.6896 23.768 30.1451 23.5749C30.6005 23.3818 30.9896 23.055 31.2632 22.6358C31.5368 22.2167 31.6825 21.724 31.6819 21.2201C31.6819 20.5457 31.4197 19.8988 30.953 19.4219C30.4862 18.9449 29.8531 18.677 29.1931 18.677V18.677Z" fill="#1E373F"/>
                      </svg>
                    `
                    : ''
                  }
                  <div class="
                    w-3 h-3
                    border-2 border-white
                    ${el?.TimeInfo?.EstimateTime && time < 1 ? 'bg-danger' : 'bg-primary' }
                    rounded-full
                  "></div>
                </div>`,
              className: '',
              popupAnchor: el?.TimeInfo?.EstimateTime && time < 1 ? [-20, -8] : [0, 15],
              iconAnchor: el?.TimeInfo?.EstimateTime && time < 1 ? [40, 35] : [10, 10], 
              iconSize: el?.TimeInfo?.EstimateTime && time < 1 ? [40, 40] : [20, 20]
            }) 
          }
        ).bindPopup(`
          <div class="px-3 py-1.5 bg-[#1A2E35B2] text-white whitespace-nowrap text-center text-sm mb-1.5 rounded-md">
            ${i + 1}. ${el.StopName.Zh_tw}
          </div>
        `, {
          maxWidth: 500,
          className: 'bg-transparent',
          closeButton: false,
          autoClose: false,
          closeOnClick: false
        })
      }))
    }
  }, [routeInfo, direction])

  useEffect(() => {
    if (map) {
      const position = routeInfo[direction]?.Stops?.[0].StopPosition
      if (position && position.PositionLat && position.PositionLon) {
        // map.setView([position.PositionLat, position.PositionLon], 13)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map)

        polyLine?.addTo(map)
        markers.map((el) => el.addTo(map).openPopup())
        if (shape[direction]?.geo!) {
          // map.flyTo(shape[direction].geo![0], 16)
        }
      }
    }
  }, [markers, polyLine])

  useEffect(() => {
    if (currentStopId && currentStopId !== '') {
      const current = routeInfo[direction]?.Stops.find((el) => el.StopUID === currentStopId)
      if (current) {
        map?.flyTo([current.StopPosition.PositionLat!, current.StopPosition.PositionLon!], 16)
      }
    }
  }, [currentStopId])
  return (
    <div id="map-container" style={{ width: '100%', height: '100%' }}></div>
  )
}

export default BusMap