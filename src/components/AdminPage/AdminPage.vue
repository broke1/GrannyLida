

<template>
  <section class="adminPage-page">
    <AuthComponent 
      v-if="store.needAuth"
    />
    <div class="adminPage-page_container">
      
    </div>
  </section>
</template>

<script setup lang="ts">

import AuthComponent from './AuthComponent/AuthComponent.vue'
import { adminStore } from '@/store/StoreAdmin'

const store = adminStore()

</script>

<style src="./AdminPage.sass" lang="sass"></style>