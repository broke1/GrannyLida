

<template>
  <section class="adminPage-page">
    <AuthComponent 
      v-show="store.needAuth"
    />
    <div class="adminPage-page_container">
      <div class="adminPage-page_container_left">

      </div>
      <AddCardComponent />
    </div>
  </section>
</template>

<script setup lang="ts">

import { useCookies } from 'vue3-cookies'
import AddCardComponent from './AddCardComponent/AddCardComponent.vue'
import AuthComponent from './AuthComponent/AuthComponent.vue'
import { adminStore } from '@/store/StoreAdmin'


const store = adminStore()


if(useCookies().cookies.get('user')){
  store.needAuth = false
}

</script>

<style src="./AdminPage.sass" lang="sass"></style>