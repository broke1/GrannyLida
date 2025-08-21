<template>
  <section 
    id="gallery" 
    class="gallery-container" 
  >
    <article 
      ref="target"
      class="gallery-container_block"
      :class="{ 'gallery-container_block__show': store.showGallery }"
      data-testid="GalleryComponentTestId"
    >
      <div 
        class="gallery-container_block_title"
        v-html="store.galleryTitle"
      />
      <div class="gallery-container_block_body">
        <!-- <div class="gallery-container_block_body_img_block" v-for="(_image, i) in [0,1,2,3,4,5,6]" :key="i">
          <img 
            class="gallery-container_block_body_img_block_img"
            :src="pathImg(i)"
          >
        </div> -->
        
        <div class="gallery-container_block_body_img_block">
          <div 
            v-for="item in items" 
            :key="item.id"
            class="gallery-container_block_body_img_block_img"
            :style="{
              'grid-row': `span ${item.rows || 1}`,
              'grid-column': `span ${item.columns || 1}`,
            }"
          >
            <img :src="item.src">
          </div>
        </div>
      </div>
    </article>
  </section>
</template>

<script setup lang="ts">

import {  ref, onMounted, onBeforeUnmount  } from 'vue'
import type { GalleryItemType } from './GalleryComponent.types.ts'
import { galleryItems } from './assets/galleryItems.ts'
import { mainStore } from '@/store/Store'


const items = ref<GalleryItemType[]>(galleryItems)

// const getGridRowEnd = (item: GalleryItemType) => {
//   const rowHeight = 20 // Высота одной строки в px
//   const rowSpan = Math.ceil((item.height / item.width) * 200 / rowHeight)
//   return `span ${rowSpan}`
// }

const store = mainStore()

const handleIntersection = () => {
  store.showGallery = true
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
})

onBeforeUnmount(() => {
  observer?.disconnect()
})

</script>

<style src="./GalleryComponent.sass" lang="sass"></style>
