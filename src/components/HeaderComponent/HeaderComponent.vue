<template>
  <section class="header-container">
    <article 
      class="header-container_logo"
      :class="{ 'header-container_logo__show': store.showLogo }"
      data-testid="logoTestId"
    >
      <img 
        class="header-container_logo_img"
        src="@/assets/logo.jpg"
      >
    </article>
    <article 
      class="header-container_menu"
      :class="{ 'header-container_menu__show': store.showMenu, 'header-container_menu__scroll': store.isMenuScroll }"
      data-testid="menuTestId"
    >
      <div class="header-container_menu_list">
        <router-link 
          v-for="item in store.menuList"
          :key="item.name"
          class="header-container_menu_list_item"
          :to="{ name: 'MainPage', hash: item.url }"
        >
          {{ item.name }}
        </router-link>
      </div>
      <button class="header-container_menu_button">
        {{ "Заказать торт" }}
      </button>
    </article>
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
