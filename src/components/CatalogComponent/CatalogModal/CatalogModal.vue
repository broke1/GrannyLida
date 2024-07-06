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
      />
      <div class="catalog-modal-container_block_title catalog-modal-container_block_border__bottom">
        {{ dataModal?.name }}
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
  composition: [] as string[]
})

watch([CatalogIndex, CatalogList], () => {
  dataModal.value = CatalogList.value[CatalogIndex.value]
  console.log('some changed', CatalogIndex.value, CatalogList.value, dataModal.value)
})

const handleCloseModal = () => {
  store.catalogModal.index = -1
  store.catalogModal.show = false
}


</script>

<style src="./CatalogModal.sass" lang="sass"></style>
