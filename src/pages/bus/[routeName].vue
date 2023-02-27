<script setup lang="ts">
import { estimateTimeFields, realTimeFields, infoFields } from '@/constants'

const route = useRoute()
const { routeName } = route.params
const { city } = route.query

const direction = ref(0)
const switchDirection = () => (direction.value = direction.value > 0 ? 0 : 1)
watch(direction, () => {
  countdown.value = 15
  fetchArriveInfo()
})

const routeInfo = reactive<Partial<RouteInfo>>({})

const endStopOfDirection = computed(
  () =>
    routeInfo[
      direction.value ? 'DepartureStopNameZh' : 'DestinationStopNameZh'
    ] || ''
)

const stopOfRoute = reactive<StopOfRoute[]>([])
const estimatedTime = reactive<EstimatedTimeOfArrival[]>([])
const busInfo = reactive<RealTimeNearStop[]>([])

provide('estimatedTime', estimatedTime)
provide('busInfo', busInfo)

const fetchRouteInfo = async () => {
  stopOfRoute.splice(0, stopOfRoute.length)
  const { data } = await useMyFetch<StopOfRoute[]>(
    `/api/basic/v2/Bus/StopOfRoute/City/${city}/${routeName}?$format=JSON`
  )
    .get()
    .json()

  stopOfRoute.push(...data.value)

  const { data: routeInfoResp } = await useMyFetch<RouteInfo[]>(
    `/api/basic/v2/Bus/Route/City/${city}/${routeName}?$select=${infoFields}&$format=JSON`
  )
    .get()
    .json()
  Object.keys(routeInfoResp.value[0]).forEach((key) => {
    routeInfo[key] = routeInfoResp.value[0][key]
  })
}

const fetchArriveInfo = async () => {
  estimatedTime.splice(0, estimatedTime.length)
  busInfo.splice(0, busInfo.length)
  useMyFetch<EstimatedTimeOfArrival[]>(
    `/api/basic/v2/Bus/EstimatedTimeOfArrival/City/${city}/${routeName}?$select=${estimateTimeFields}&$filter=Direction eq ${direction.value}&$format=JSON`
  )
    .get()
    .json()
    .then(({ data }) => {
      estimatedTime.push(...data.value)
    })

  useMyFetch<RealTimeNearStop[]>(
    `/api/basic/v2/Bus/RealTimeNearStop/City/${city}/${routeName}?$select=${realTimeFields}&$filter=Direction eq ${direction.value}&$format=JSON`
  )
    .get()
    .json()
    .then(({ data }) => {
      busInfo.push(...data.value)
    })
}

const stops = computed(() => stopOfRoute[direction.value]?.Stops)

onBeforeMount(async () => {
  await fetchRouteInfo()
  fetchArriveInfo()
})

const countdown = ref(0)
useIntervalFn(() => {
  countdown.value += 5
  if (countdown.value === 20) {
    fetchArriveInfo()
    countdown.value = 0
  }
}, 5000)
</script>
<template>
  <section relative py="20">
    <ul px="5">
      <li
        v-for="stop in stops"
        :key="stop.StopUID"
        flex
        items="center"
        justify="between"
        mb="2.5"
        text="primary"
      >
        <StopCard
          :stop="stop"
          :endStop="endStopOfDirection"
          :direction="direction"
          :city="city"
          :routeName="routeName"
        />
      </li>
    </ul>
    <div
      absolute
      top="0"
      inset-x-0
      text="primary"
      bg="white"
      py="2.5"
      px="5"
      rounded="lg"
      flex
      items="center"
      justify="between"
    >
      <div text="14px" lh="20px">
        {{ routeName }}
        <br />
        往{{ endStopOfDirection }}
      </div>
      <div text="end">
        <button
          bg="transparent"
          border="none"
          mx="0"
          py="0"
          @click="switchDirection"
        >
          <IconSwitch />
        </button>
        <br />
        <span text="primary-light xs"> {{ countdown }} 秒前更新 </span>
      </div>
    </div>
  </section>
</template>
