<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    routeInfo: RouteInfo
    showFavBtn?: boolean
  }>(),
  {
    showFavBtn: true,
  }
)

const historySearchList = useLocalStorage<RouteInfo[]>('history', [])
const favoriteRoutes = useLocalStorage<RouteInfo[]>('favoriteRoutes', [])

const saveHistory = (route: RouteInfo) => {
  const idx = historySearchList.value.findIndex(
    ({ RouteUID }) => RouteUID === route.RouteUID
  )

  if (idx > -1) {
    historySearchList.value.splice(idx, 1)
  } else if (historySearchList.value.length > 9) {
    historySearchList.value.pop()
  }

  historySearchList.value.unshift(route)
}

const collectRoute = () => {
  const idx = favoriteRoutes.value.findIndex(
    ({ RouteUID }) => RouteUID === props.routeInfo.RouteUID
  )
  if (idx === -1) {
    favoriteRoutes.value.push(props.routeInfo)
  } else {
    favoriteRoutes.value.splice(idx, 1)
  }
}

const isFavorite = computed(() =>
  favoriteRoutes.value.find(
    ({ RouteUID }) => RouteUID === props.routeInfo.RouteUID
  )
)
</script>
<template>
  <router-link
    :to="`/bus/${routeInfo.RouteUID}?city=${routeInfo.City}`"
    grid="~ cols-[0.5fr_1.4fr_0.1fr] gap-2"
    px="5"
    py="2.5"
    bg="white"
    rounded="lg"
    mb="4"
    class="shadow-default text-primary"
    @click="saveHistory(routeInfo)"
    decoration-none
  >
    <div flex items="center">{{ routeInfo.RouteName?.Zh_tw }}</div>
    <div flex items="center" justify="center" text="center">
      <span flex="1">{{ routeInfo.DepartureStopNameZh }}</span>
      <IconSwitch mx-3 />
      <span flex="1">{{ routeInfo.DestinationStopNameZh }}</span>
    </div>
    <div v-if="showFavBtn" flex items="center">
      <button
        :class="`i-clarity-favorite-${isFavorite ? 'solid' : 'line'}`"
        @click.prevent="collectRoute"
      />
    </div>
  </router-link>
</template>
