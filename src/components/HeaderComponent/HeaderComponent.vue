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
      v-if="!store.isMobile"
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
        <router-link 
          class="header-container_menu_button_item"
          :to="{ name: 'MainPage', hash: '#contacts' }"
        >
          {{ "Заказать торт" }}
        </router-link>
      </button>
    </article>
    <article 
      v-if="store.isMobile"
      class="header-container_menu"
      :class="{ 'header-container_menu__show': store.showMenu, 'header-container_menu__scroll': store.isMenuScroll }"
      data-testid="menuTestIdMobile"
    >
      <button class="header-container_menu_button">
        <router-link 
          class="header-container_menu_button_item"
          :to="{ name: 'MainPage', hash: '#contacts' }"
        >
          {{ "Заказать торт" }}
        </router-link>
      </button> 
      <div 
        class="header-container_menu_button_mobile"
        @click="handleToggleMenu" 
      >
        <img 
          class="header-container_menu_button_mobile_img"
          src="@/assets/menu-mobile.png"
        >
      </div> 
      <div 
        class="header-container_menu_list"
        :class="{ 'header-container_menu_list__show': isOpenMenu}"
      >
        <router-link 
          v-for="item in store.menuList"
          :key="item.name"
          class="header-container_menu_list_item"
          :to="{ name: 'MainPage', hash: item.url }"
          @click="handleToggleMenu" 
        >
          {{ item.name }}
        </router-link>
        <div 
          class="header-container_menu_list_btn__close"
          @click="handleToggleMenu" 
        >
          <img 
            class="header-container_menu_list_btn__close_img"
            src="@/assets/close.jpg"
          >
        </div>
      </div>
    </article>
  </section>
</template>

<script setup lang="ts">

import {  onMounted, ref  } from 'vue'
import { mainStore } from '@/store/Store'

const store = mainStore()

const isOpenMenu = ref(false)

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

  store.isMobile = window.screen.width < 500
  
})

const handleToggleMenu = () => {
  isOpenMenu.value = !isOpenMenu.value
}

</script>

<style src="./HeaderComponent.sass" lang="sass"></style>
