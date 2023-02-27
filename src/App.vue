<script setup lang="ts">
const drawerOpener = ref(false)
const cityOptions = reactive<CityOption[]>([])
const historySearchList = useLocalStorage<RouteInfo[]>('history', [])

provide('drawerOpener', drawerOpener)
provide('cityOptions', cityOptions)
provide('historySearchList', historySearchList)

const params = new URLSearchParams()
params.append('grant_type', 'client_credentials')
params.append('client_id', import.meta.env.VITE_CLIENT_ID)
params.append('client_secret', import.meta.env.VITE_CLIENT_SECRET)

onBeforeMount(async () => {
  cityOptions.splice(0, cityOptions.length)
  const { data } = await useMyFetch(
    '/auth/realms/TDXConnect/protocol/openid-connect/token'
  )
    .post(params)
    .json()
  localStorage.setItem('token', data.value.access_token)

  const { data: cityData } = await useMyFetch(
    '/api/basic/v2/Basic/City?$format=JSON'
  )
    .get()
    .json()
  cityOptions.push(
    ...cityData.value
      .sort((a: CityResponse, b: CityResponse) => a.CityID > b.CityID)
      .map((el: CityResponse) => ({
        label: `${el.CityName.slice(0, 2)}公車`,
        value: el.City,
      }))
  )
})
</script>

<template>
  <main pt="130px" px="5" pb="72px">
    <Suspense>
      <template #fallback>
        <div flex items="center" justify="center">
          <div i-mdi-light-loading animate-spin text="primary xl" />
        </div>
      </template>
      <template #default>
        <RouterView />
      </template>
    </Suspense>
  </main>
  <Footer />
  <Header />
  <Drawer />
</template>
