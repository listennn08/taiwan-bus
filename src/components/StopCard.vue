<script setup lang="ts">
import { stopStatusMap } from '@/constants'

const props = withDefaults(
  defineProps<{
    stop: Stop
    endStop: string
    city: string
    routeName: string
    direction: number
    showFavBtn?: boolean
  }>(),
  {
    showFavBtn: true,
  }
)

const estimatedTime = inject('estimatedTime') as EstimatedTimeOfArrival[]
const busInfo = inject('busInfo') as RealTimeNearStop[]
const getClass = (t: number) => {
  if (t < 1) return 'yellow'
  if (t <= 3) return 'yellow-light'
  return 'primary'
}

const getEstimatedTime = (stopUID: string) => {
  const stopItem: EstimatedTimeOfArrival | undefined = estimatedTime.find(
    (el: EstimatedTimeOfArrival) => el.StopUID === stopUID
  )

  if (stopItem) {
    if (stopItem.StopStatus) {
      return {
        value: stopStatusMap[stopItem.StopStatus - 1],
        bg: 'primary-light',
      }
    } else {
      const estimateTime = Math.floor(stopItem.EstimateTime / 60)
      const displayTime = estimateTime < 1 ? '即將進站' : `${estimateTime} 分`

      return {
        value:
          typeof stopItem.EstimateTime === 'number'
            ? displayTime
            : stopItem.NextBusTime,
        bg: getClass(estimateTime),
      }
    }
  }
  return {
    value: '',
    bg: '',
  }
}

const getBusPlateNumb = (stopUID: string) => {
  return busInfo.find((el: RealTimeNearStop) => {
    return el.StopUID === stopUID
  })?.PlateNumb
}

const favoriteStops = useLocalStorage<FavStop[]>('favoriteStops', [])
const collectStop = () => {
  const idx = favoriteStops.value.findIndex(
    ({ StopUID }) => StopUID === props.stop.StopUID
  )
  if (idx > -1) {
    favoriteStops.value.splice(idx, 1)
  } else {
    favoriteStops.value.push({
      ...omitBy(props, ['stop', 'showFavBtn']),
      ...get(props, 'stop'),
    })
  }
}

const isFavorite = computed(() =>
  favoriteStops.value.find(({ StopUID }) => StopUID === props.stop.StopUID)
)
</script>
<template>
  <div flex items="center">
    <div
      w="12"
      :class="`bg-${getEstimatedTime(stop.StopUID).bg}`"
      text="white xs center"
      px="3"
      py="2"
      rounded="lg"
      lh="18px"
    >
      {{ getEstimatedTime(stop.StopUID).value }}
    </div>
    <span text="sm primary" lh="20px" mx="2.5">
      {{ stop.StopName.Zh_tw }}
    </span>
    <div
      v-if="getBusPlateNumb(stop.StopUID)"
      text="xs white"
      bg="yellow"
      rounded="lg"
      px="2.5"
      py="1"
    >
      {{ getBusPlateNumb(stop.StopUID) }}
    </div>
  </div>
  <button
    v-if="showFavBtn"
    :class="`i-clarity-favorite-${isFavorite ? 'solid' : 'line'}`"
    @click="collectStop"
  />
</template>
