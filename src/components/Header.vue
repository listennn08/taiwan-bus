<script setup lang="ts">
const router = useRouter()
const route = useRoute()

const inRoot = computed(() => route.path === '/')
const drawerOpener = inject('drawerOpener')
</script>

<template>
  <header
    min-h="60px"
    bg="white"
    pos="fixed top-0 inset-x-0"
    rounded="b-lg"
    flex
    items="end"
    :justify="inRoot ? 'center' : 'between'"
    color="primary-light"
    class="shadow-default"
    py="3"
    px="5.25"
  >
    <button
      v-if="!inRoot"
      i-typcn-arrow-back
      text="lg"
      @click="router.go(-1)"
    />
    <Logo />
    <button
      v-if="!inRoot"
      i-material-symbols-menu
      text="lg"
      @click="drawerOpener = true"
    />
  </header>
</template>
