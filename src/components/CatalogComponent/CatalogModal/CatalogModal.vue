<template>
  <artical 
    class="catalog-modal-container"
    :class="{ 'catalog-modal-container__show': store.showCatalogModal.show }"
    data-testid="catalogModalTestId"
  >
    <div class="catalog-modal-container_overlay" />
  </artical>
</template>

<script setup lang="ts">

import {   onMounted  } from 'vue'
import { mainStore } from '@/store/Store'

const store = mainStore()



onMounted(() => {
  
  
})


</script>

<style src="./CatalogModal.sass" lang="sass"></style>
