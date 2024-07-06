<template>
  <artical 
    class="catalog-modal-container"
    :class="{ 'catalog-modal-container__show': store.catalogModal.show }"
    data-testid="catalogModalTestId"
  >
    <div class="catalog-modal-container_overlay" />
    <div class="catalog-modal-container_block">
      <div 
        class="catalog-modal-container_block_btn__close"
        @click="handleCloseModal" 
      >
        <img 
          class="catalog-modal-container_block_btn__close_img"
          src="@/assets/close.jpg"
        >
      </div>
      <div class="catalog-modal-container_block_title">
        {{ dataModal?.name }}
      </div>
      <div class="catalog-modal-container_block_gallery">
        <img 
          v-if="dataModal?.gallery.length == 0"
          class="catalog-modal-container_block_gallery_img"
          :src="dataModal?.mainImg"
        >
      </div>
    </div>
  </artical>
</template>

<script setup lang="ts">

import { storeToRefs } from 'pinia'
import {  ref, watch } from 'vue'
import { mainStore } from '@/store/Store'

const store = mainStore()

const { CatalogList, CatalogIndex } = storeToRefs(store)

const dataModal = ref({
  name: '',
  price: 0,
  shortDescription: '',
  description: '',
  mainImg: '',
  composition: [] as string[],
  gallery: [] as string[]
})

watch([CatalogIndex, CatalogList], () => {
  dataModal.value = CatalogList.value[CatalogIndex.value]
})

const handleCloseModal = () => {
  store.catalogModal.index = -1
  store.catalogModal.show = false
}


</script>

<style src="./CatalogModal.sass" lang="sass"></style>
