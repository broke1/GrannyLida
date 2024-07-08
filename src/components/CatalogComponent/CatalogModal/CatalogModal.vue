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
      <div 
        v-if="dataModal?.gallery.length == 0"
        class="catalog-modal-container_block_gallery"
      >
        <img 
          class="catalog-modal-container_block_gallery_img"
          :src="`${dataModal?.imgPath}main-image.jpg`"
        >
      </div>
      <div 
        v-else
        class="catalog-modal-container_block_gallery"
      >
        <img 
          class="catalog-modal-container_block_gallery_img"
          :src="`${dataModal?.imgPath}${dataModal?.gallery[indexGallery]}`"
        >
        <button 
          class="catalog-modal-container_block_gallery_btn catalog-modal-container_block_gallery_btn__forward" 
          @click="slideGallery('forward')"
        >
          <img 
            class="catalog-modal-container_block_gallery_btn_img"
            src="@/assets/arrow-right.svg"
          >
        </button>
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
  imgPath: '',
  composition: [] as string[],
  gallery: [] as string[]
})

const indexGallery = ref(0)

watch([CatalogIndex, CatalogList], () => {
  dataModal.value = CatalogList.value[CatalogIndex.value]
})


const handleCloseModal = () => { // закрыть модальное окно
  store.catalogModal.index = -1 
  store.catalogModal.show = false
}

const slideGallery = (direction: string) => { // перелестнуть картинку в галлерее
  if (direction == 'forward'){ // если вперед то 
    indexGallery.value = indexGallery.value == dataModal.value.gallery.length-1 ? 0 : indexGallery.value+1 // смотрим если уже шел до конца то возвращаем в начало
  } else {
    indexGallery.value = indexGallery.value == 0 ? dataModal.value.gallery.length-1 : indexGallery.value-1 // смотрим если уже дошел до начала то возвращаем в конец
  }
  
}


</script>

<style src="./CatalogModal.sass" lang="sass"></style>
