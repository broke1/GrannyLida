<template>
  <section 
    id="catalog" 
    class="catalog-container" 
  >
    <artical 
      ref="target"
      class="catalog-container_block"
      :class="{ 'catalog-container_block__show': store.showCatalog }"
      data-testid="catalogTestId"
    >
      <div 
        class="catalog-container_block_title"
        v-html="store.catalogTitle"
      />
      <div class="catalog-container_block_body">
        <div 
          v-for="(item, index) in store.catalogList"
          :key="item.name"
          class="catalog-container_block_body_item"
          data-testid="catalogTestItemId"
          @click="handleOpenModal(index)"
        >
          <div class="catalog-container_block_body_item_name_block">
            <div class="catalog-container_block_body_item_name_block_text">
              {{ item.name }}
            </div>
          </div>
          <div class="catalog-container_block_body_item_img_block">
            <img 
              class="catalog-container_block_body_item_img_block_img"
              :src="`${item.imgPath}main-image.jpg`"
            >
          </div>
          <div class="catalog-container_block_body_item_description_block">
            <div class="catalog-container_block_body_item_description_block_text">
              {{ item.shortDescription }}
            </div>
          </div>
          <div class="catalog-container_block_body_item_price_block">
            <div class="catalog-container_block_body_item_price_block_price">
              {{ `${item.price} руб/кг` }}
            </div>
          </div>
        </div>
      </div>
    </artical>
    <CatalogModal />
  </section>
</template>

<script setup lang="ts">

import {  ref, onMounted, onBeforeUnmount  } from 'vue'
import CatalogModal from '@/components/CatalogComponent/CatalogModal/CatalogModal.vue'
import { mainStore } from '@/store/Store'

const store = mainStore()

const handleIntersection = () => {
  store.showCatalog = true
}

let observer: IntersectionObserver | null = null
const target = ref(null)

onMounted(() => {
  
  observer = new IntersectionObserver(([entry]) => {
    if (entry && entry.isIntersecting) {
      handleIntersection()
    }
  }, {
    threshold: [0.1],
  })

  target.value && observer.observe(target.value)

  store.getCatalogList()
})

onBeforeUnmount(() => {
  observer?.disconnect()
})

const handleOpenModal = (index: number) => {
  store.catalogModal.index = index
  store.catalogModal.show = true
}
</script>

<style src="./CatalogComponent.sass" lang="sass"></style>
