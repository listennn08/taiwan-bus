<script setup lang="ts">
import { infoFields } from '@/constants'

const clickSelect = ref(false)
const selectedCity = reactive({
  label: '',
  value: '',
})
const cityOptions = inject('cityOptions') as CityOption[]
const selectCity = (city: CityOption) => {
  selectedCity.label = city.label
  selectedCity.value = city.value
  clickSelect.value = false
}
const searchType = ref('')
const searchNum = ref('')
const searchText = ref('')
const searchString = computed(() => searchType.value + searchNum.value)
const historySearchList = useLocalStorage<RouteInfo[]>('history', [])

const routeResult = reactive<RouteInfo[]>([])
const displayList = computed<RouteInfo[]>(() => {
  if (selectedCity.value) {
    if (searchString.value) {
      return routeResult.filter(({ RouteName }) =>
        RouteName.Zh_tw.includes(searchString.value)
      )
    }
    if (searchText.value) {
      return routeResult.filter(({ RouteName }) =>
        RouteName.Zh_tw.includes(searchText.value)
      )
    }

    return routeResult
  }

  return historySearchList.value
})

const getRoutesByCity = async () => {
  routeResult.splice(0, routeResult.length)
  const { data } = await useMyFetch(
    `/api/basic/v2/Bus/Route/City/${selectedCity.value}?$select=${infoFields}&$format=JSON`
  )
    .get()
    .json()
  routeResult.push(...(data.value as RouteInfo[]))
}

watch(
  () => selectedCity.value,
  (value) => {
    if (value) {
      getRoutesByCity()
    }
  }
)
</script>
<template>
  <section relative text="primary" pt="15">
    <div v-if="!selectedCity.value" text="xs" lh="17px" mb="2.5">查詢歷史</div>
    <ul pb="214px">
      <li v-for="routeInfo in displayList" :key="routeInfo.RouteUID">
        <RouteCard :routeInfo="routeInfo" />
      </li>
    </ul>
    <div absolute inset-x-0 top="0" mb="5" text="primary">
      <ul
        bg="white"
        rounded="b-lg"
        class="shadow-default"
        v-show="clickSelect"
        absolute
        inset-x-0
        top="10"
        max-h="80"
        overflow-y="scroll"
      >
        <li
          v-for="city in cityOptions"
          :key="city.value"
          p="4"
          text="center"
          @click="selectCity(city)"
        >
          {{ city.label }}
        </li>
      </ul>
      <div
        flex
        items="center"
        justify="center"
        bg="white"
        :rounded="clickSelect ? 't-lg' : 'lg'"
        p="2"
        lh="24px"
        pl="10"
        relative
        @click="clickSelect = !clickSelect"
      >
        {{ selectedCity.label || '選擇縣市' }}
        <div
          i-fa-angle-down
          ml="4"
          w="4"
          h="4"
          :rotate="clickSelect ? -180 : 0"
          transition="200 transform"
        />
      </div>
    </div>
    <Keyboard
      v-if="selectedCity.value"
      v-model:type="searchType"
      v-model:num="searchNum"
      v-model="searchText"
    />
  </section>
</template>
