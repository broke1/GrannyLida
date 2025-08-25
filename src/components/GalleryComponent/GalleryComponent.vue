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
        <div class="gallery-container_block_body_img_block">
          <div 
            v-for="item in items" 
            :key="item.id"
            class="gallery-container_block_body_img_block_img"
            :class="{ 'gallery-container_block_body_img_block_img_fix_height': item.columns }"
            :style="{
              'grid-row': `span ${item.rows || 1}`,
              'grid-column': `span ${item.columns || 1}`,
            }"
            @click="store.galleryModal = {show: true, imgId: item.id}"
          >
            <img :src="item.src">
          </div>
        </div>
      </div>
    </article>
  </section>
  <GalleryModal v-if="windowWidth > 500" />
</template>

<script setup lang="ts">

import {  ref, onMounted, onBeforeUnmount  } from 'vue'
import type { GalleryItemType } from './GalleryComponent.types.ts'
import  GalleryModal  from './GalleryModal/GalleryModal.vue'
import { galleryItems } from './assets/galleryItems.ts'
import { mainStore } from '@/store/Store'


const items = ref<GalleryItemType[]>(galleryItems)

const store = mainStore()

const windowWidth = ref(window.screen.width)

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
    threshold: [0],
  })

  target.value && observer.observe(target.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
})

</script>

<style src="./GalleryComponent.sass" lang="sass"></style>
