

<template>
  <section class="adminPage-page">
    <AuthComponent 
      v-show="store.needAuth"
    />
    <div 
      v-show="!store.needAuth"
      class="adminPage-page_container"
    >
      <CardsComponent />
      <AddCardComponent />
    </div>
  </section>
</template>

<script setup lang="ts">

import { useCookies } from 'vue3-cookies'
import AddCardComponent from './AddCardComponent/AddCardComponent.vue'
import AuthComponent from './AuthComponent/AuthComponent.vue'
import CardsComponent from './CardsComponent/CardsComponent.vue'
import { adminStore } from '@/store/StoreAdmin'


const store = adminStore()


if(useCookies().cookies.get('user')){
  store.needAuth = false
}

</script>

<style src="./AdminPage.sass" lang="sass"></style>