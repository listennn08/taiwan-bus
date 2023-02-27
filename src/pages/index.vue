<script setup lang="ts"></script>

<template>
  <section>
    <ul>
      <li card>
        <router-link to="/search" class="text-primary decoration-none">
          <h2 lh="23px">公車查詢</h2>
          <span text="xs">查詢指定公車路線及其停靠站</span>
        </router-link>
      </li>
      <li card>
        <router-link to="/near" class="text-primary decoration-none">
          <h2 lh="23px">附近公車</h2>
          <span text="xs">查詢附近公車站及其路線</span>
        </router-link>
      </li>
      <li card>
        <router-link to="/favorite" class="text-primary decoration-none">
          <h2 lh="23px">我的收藏</h2>
          <span text="xs">收藏的公車站及路線</span>
        </router-link>
      </li>
    </ul>

    <!-- Todo near bus -->
  </section>
</template>
