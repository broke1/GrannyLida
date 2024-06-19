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
      :class="{ 'header-container_menu__show': store.showMenu, 'header-container_menu__scroll': store.isMenuScroll }"
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
      <button class="header-container_menu_button">
        {{ "Заказать торт" }}
      </button>
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

  window.addEventListener('scroll', () => {
    window.scrollY > 100 ? store.isMenuScroll = true : store.isMenuScroll = false
  })
  
})

</script>

<style src="./HeaderComponent.sass" lang="sass"></style>
