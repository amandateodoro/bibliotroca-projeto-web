<template>
  <SideNavbar />

  <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
    <NavBar />

    <div class="container-fluid py-2">
      <RouterView />

    </div>

  </main>

  <SettingsPlugin />
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import SideNavbar from './components/SideNavbar.vue';
import NavBar from './components/NavBar.vue';
import SettingsPlugin from './components/SettingsPlugin.vue';
</script>
