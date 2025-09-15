<template>
  <article 
    class="gallery-modal" 
    :class="{ 'gallery-modal__show': store.galleryModal.show }"
  >
    <div class="gallery-modal_overlay"  @click="handleCloseModal" />
    <div class="gallery-modal_content">
      <div 
        class="gallery-modal_content_btn__close"
        @click="handleCloseModal" 
      >
        <img 
          class="gallery-modal_content_btn__close_img"
          src="@/assets/close.jpg"
        >
      </div>
      <div class="gallery-modal_content_img">
        <img :src="pathImg(store.galleryModal.imgId)">
      </div>
      <div 
        class="gallery-modal_content_arrow_img gallery-modal_content_arrow_img_right" 
        @click="handleMoveForward"
      >
        <img src="@/assets/arrow-modal-gallery.jpg">
      </div>
      <div 
        class="gallery-modal_content_arrow_img gallery-modal_content_arrow_img_left" 
        @click="handleMoveBack"
      >
        <img src="@/assets/arrow-modal-gallery.jpg">
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">

import { mainStore } from '@/store/Store'

const store = mainStore()

const pathImg = (index: number) => {
  return `${ import.meta.env.VITE_BASEPATH}/gallery-img-${index}.jpg`
}


// const imageExists = (url: string) => {

//   const image = new Image()

//   image.src = url

//   if (!image.complete) {
//     return false
//   }

//   return true
// }

const maxImgId = 15

const handleMoveForward = () => {
  store.galleryModal.imgId + 1 > maxImgId ? store.galleryModal.imgId = 0 : store.galleryModal.imgId++
}

const handleMoveBack = () => {
  store.galleryModal.imgId -1 < 0 ? store.galleryModal.imgId = maxImgId : store.galleryModal.imgId--
}

const handleCloseModal = () => {
  store.galleryModal = {show: false, imgId: -1}
}

</script>

<style src="./GalleryModal.sass" lang="sass"></style>
