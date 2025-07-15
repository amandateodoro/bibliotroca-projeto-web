<template>
  <div v-if="layoutPadrao">
    <SideNavbar />

    <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
      <NavBar />
      <div class="container-fluid py-2">
        <RouterView />
      </div>
    </main>

  </div>

  <div v-else>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import { computed } from 'vue'
import SideNavbar from './components/SideNavbar.vue'
import NavBar from './components/NavBar.vue'

const route = useRoute()

const layoutPadrao = computed(() => {
  return route.meta.layout !== 'login'
});
</script>
