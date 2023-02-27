<script setup lang="ts">
const drawerRef = ref(null)
const drawerOpener = inject('drawerOpener') as { value: boolean }

const closeDrawer = () => (drawerOpener.value = false)

onClickOutside(drawerRef, closeDrawer)
</script>

<template>
  <aside
    ref="drawerRef"
    fixed
    right="0"
    inset-y-0
    rounded="l-lg"
    bg="white"
    text="primary"
    w="265px"
    px="6.5"
    py="8"
    transition="transform-500"
    :translate-x="drawerOpener ? 0 : 300"
    class="shadow-default"
    z="3"
  >
    <div flex justify="end" mb="15">
      <button i-ic-outline-close text="lg" @click="closeDrawer" />
    </div>
    <Logo mb="15" />
    <ul text="center">
      <li mb="15">
        <router-link
          to="/search"
          class="text-primary decoration-none"
          @click="closeDrawer"
        >
          <h2 lh="23px">公車查詢</h2>
          <span text="xs">查詢指定公車路線及其停靠站</span>
        </router-link>
      </li>
      <li mb="15">
        <router-link
          to="/near"
          class="text-primary decoration-none"
          @click="closeDrawer"
        >
          <h2 lh="23px">附近公車</h2>
          <span text="xs">查詢附近公車站及其路線</span>
        </router-link>
      </li>
      <li mb="15">
        <router-link
          to="/favorite"
          class="text-primary decoration-none"
          @click="closeDrawer"
        >
          <h2 lh="23px">我的收藏</h2>
          <span text="xs">收藏的公車站及路線</span>
        </router-link>
      </li>
    </ul>
  </aside>
</template>
