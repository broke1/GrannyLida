<template>
  <section class="header-container">
    <artical 
      class="header-container_logo"
      :class="{ 'header-container_logo__show': store.showLogo }"
      data-testid="logoTestId"
    >
      <img 
        class="header-container_logo_img"
        src="@/assets/logo.jpg"
      >
    </artical>
    <artical 
      class="header-container_menu"
      :class="{ 'header-container_menu__show': store.showMenu }"
      data-testid="menuTestId"
    >
      <ul class="header-container_menu_list">
        <li 
          v-for="item in store.menuList"
          :key="item"
          class="header-container_menu_list_item"
        >
          {{ item }}
        </li>
      </ul>
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
  setTimeout( () => {
    store.showMenu = true
  },1500)

  
})

</script>

<style src="./HeaderComponent.sass" lang="sass"></style>
