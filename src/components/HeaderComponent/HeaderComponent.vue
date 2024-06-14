<template>
  <section class="header-container">
    <artical 
      class="header-container_logo"
      :class="{ 'header-container_logo__show': store.showLogo }"
    >
      <img 
        class="header-container_logo_img"
        src="@/assets/logo.jpg"
      >
    </artical>
  </section>
</template>

<script setup lang="ts">

import {  onMounted  } from 'vue'
import { mainStore } from '@/store/Store'

const store = mainStore()

onMounted(() => {
  setTimeout( () => {
    store.showLogo = true
  },1000)
})

</script>

<style src="./HeaderComponent.sass" lang="sass"></style>
