<script setup lang="ts">
import { estimateTimeFields, stopStatusMap } from '@/constants'

const favoriteStops = useLocalStorage<FavStop[]>('favoriteStops', [])
const favoriteRoutes = useLocalStorage<RouteInfo[]>('favoriteRoutes', [])
const tabs = [
  {
    label: '公車站',
    value: 'stop',
  },
  {
    label: '公車路線',
    value: 'route',
  },
]
const currentTab = ref('stop')
const countdown = ref(0)
const removeArray = reactive(
  Array.from({ length: favoriteStops.value.length }).fill(false)
)

const { pause, resume, isActive } = useIntervalFn(() => {
  if (currentTab.value === 'stop') {
    countdown.value += 5
    if (countdown.value === 20) {
      favoriteStops.value.forEach((stop) => {
        fetchStopStatus(stop)
      })
      countdown.value = 0
    }
  }
}, 5000)
const changeTab = (tab: string) => {
  removeArray.splice(0, removeArray.length)
  currentTab.value = tab

  if (tab === 'stop') {
    if (!isActive.value) resume()
    removeArray.push(
      ...Array.from({ length: favoriteStops.value.length }).fill(false)
    )
    return
  }
  removeArray.push(
    ...Array.from({ length: favoriteRoutes.value.length }).fill(false)
  )
  if (isActive) pause()
}
const getActiveClass = (tabName: string) => {
  if (currentTab.value === tabName) {
    return 'text-white bg-primary'
  }
  return 'text-primary bg-white'
}

const fetchStopStatus = async (stop: FavStop) => {
  const { data } = await useMyFetch<EstimatedTimeOfArrival>(
    `/api/basic/v2/Bus/EstimatedTimeOfArrival/City/${stop.city}/${stop.routeName}?$select=${estimateTimeFields}&$filter=StopUID eq '${stop.StopUID}' and Direction eq ${stop.direction}&$format=JSON`
  )
    .get()
    .json()
  const resp = data.value[0]
  for (let i = 0; i < favoriteStops.value.length; i++) {
    const { StopUID, routeUID } = favoriteStops.value[i]
    if (stop.StopUID === StopUID && stop.routeUID === routeUID) {
      const busStatus = resp?.NextBusTime
        ? dayjs(resp.NextBusTime).format('HH:mm')
        : stopStatusMap[resp.StopStatus - 1]
      favoriteStops.value[i].estimateTime = resp.StopStatus
        ? busStatus
        : `${Math.ceil(resp.EstimateTime / 60)} 分`
      break
    }
  }
}

onBeforeMount(() => {
  favoriteStops.value.forEach((stop) => {
    fetchStopStatus(stop)
  })
})

const swipeLeft = (event: string, idx: number) => {
  if (event === 'left') {
    removeArray[idx] = true
  } else if (event === 'right') {
    removeArray[idx] = false
  }
}

const remove = (type: string, idx: number) => {
  if (type === 'stop') favoriteStops.value.splice(idx, 1)
  if (type === 'route') favoriteRoutes.value.splice(idx, 1)
  removeArray[idx] = false
}
</script>
<template>
  <section relative>
    <div py="14">
      <ClientOnly>
        <TransitionGroup name="list" tag="ul">
          <template v-if="currentTab === 'stop'">
            <li
              v-for="(stop, idx) in favoriteStops"
              :key="stop.StopUID"
              relative
              bg="primary-light"
              rounded="lg"
              class="shadow-default"
              v-touch:swipe="(event: string) => swipeLeft(event, idx)"
            >
              <button
                pos="absolute top-0 right-0 bottom-0"
                px="8.5"
                py="5"
                rounded="lg"
                bg="transparent"
                text="white"
                border="none"
                focus:outline="none"
                @click.prevent="remove('stop', idx)"
              >
                刪除
              </button>
              <div
                grid="~ cols-[0.5fr_1fr_0.5fr]"
                rounded="lg"
                bg="white"
                text="primary"
                py="3"
                px="5"
                mb="4"
                relative
                transition="opacity-300 transform-300 ease-out"
                :translate-x="removeArray[idx] ? '-23' : '0'"
              >
                <div>
                  <span text="sm" lh="20px">
                    {{ stop.routeName }}
                  </span>
                  <br />
                  <span text="xs" lh="14px"> 往{{ stop.endStop }} </span>
                </div>
                <div flex items="center" justify="center">
                  {{ stop.StopName.Zh_tw }}
                </div>
                <div text="end">
                  <span text="sm" lh="20px"> {{ stop.estimateTime }} </span>
                  <br />
                  <span text="xs" lh="14px"> {{ countdown }} 秒前更新 </span>
                </div>
              </div>
            </li>
          </template>
          <template v-else>
            <RouteCard
              v-for="routeInfo in favoriteRoutes"
              :key="routeInfo.RouteUID"
              :showFavBtn="false"
              :routeInfo="routeInfo"
            />
          </template>
        </TransitionGroup>
      </ClientOnly>
    </div>
    <div
      absolute
      top="0"
      inset-x-0
      grid="~ cols-2"
      w="full"
      bg="white"
      rounded="lg"
    >
      <button
        v-for="tab in tabs"
        :key="tab.value"
        py="2"
        rounded="lg"
        border="none"
        focus:outline="none"
        lh="24px"
        :class="getActiveClass(tab.value)"
        @click="changeTab(tab.value)"
      >
        {{ tab.label }}
      </button>
    </div>
  </section>
</template>
<style scope>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
</style>
