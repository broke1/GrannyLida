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
        <div class="gallery-container_block_body_img_block" v-for="(_image, i) in [0,1,2,3,4,5,6]" :key="i">
          <img 
            class="gallery-container_block_body_img_block_img"
            :src="pathImg(i)"
          >
        </div>
      </div>
    </article>
  </section>
</template>

<script setup lang="ts">

import {  ref, onMounted, onBeforeUnmount  } from 'vue'
import { mainStore } from '@/store/Store'


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

const pathImg = (index: number) => {
  return `${ import.meta.env.VITE_BASEPATH}/gallery-img-${index}.jpg`
}

</script>

<style src="./GalleryComponent.sass" lang="sass"></style>
