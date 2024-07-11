<template>
  <artical 
    class="catalog-modal-container"
    :class="{ 'catalog-modal-container__show': store.catalogModal.show }"
    data-testid="catalogModalTestId"
  >
    <div 
      class="catalog-modal-container_overlay" 
      @click="handleCloseModal"
    />
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
        <Carousel
          v-model="currentSlide"
          class="carousel_galery"
        >
          <Slide 
            v-for="(slide, index) in dataModal?.gallery" 
            :key="index"
          >
            <div class="carousel_item">
              <img 
                class="carousel_item_img"
                :src="`${dataModal?.imgPath}${slide}`"
              >
            </div>
          </Slide>
        </Carousel>

        <Carousel
          v-model="currentSlide"
          class="carousel_thumbnails"
          :items-to-show="3"
          :wrap-around="true"
        >
          <Slide 
            v-for="(slide, index) in dataModal?.gallery" 
            :key="index"
          >
            <div 
              class="carousel_item carousel_item__tumbnail" 
              :class="{'carousel_item__tumbnail__active': currentSlide == index}"
              @click="slideTo(index)"
            >
              <img 
                class="carousel_item_img"
                :src="`${dataModal?.imgPath}${slide}`"
              >
            </div>
          </Slide>
        </Carousel>
      </div>
      <div class="catalog-modal-container_block_description">
        {{ dataModal?.description }}
      </div>
      <div class="catalog-modal-container_block_inside">
        <ul class="catalog-modal-container_block_inside_colories">
          <li class="catalog-modal-container_block_inside_colories_item">
            {{ `Б:  ${dataModal?.calories.protein} гр.` }}
          </li>
          <li class="catalog-modal-container_block_inside_colories_item">
            {{ `Ж:  ${dataModal?.calories.fats} гр.` }}
          </li>
          <li class="catalog-modal-container_block_inside_colories_item">
            {{ `У:  ${dataModal?.calories.carbo} гр.` }}
          </li>
          <li class="catalog-modal-container_block_inside_colories_item catalog-modal-container_block_inside_colories_item__last">
            {{ `К:  ${dataModal?.calories.calorie} ккал` }}
          </li>
        </ul>
        <div class="catalog-modal-container_block_inside_block">
          {{ `Состав:  ${dataModal?.composition.join(', ')}` }}
        </div>
      </div>
      <div class="catalog-modal-container_block_footer">
        <button 
          class="catalog-modal-container_block_footer__close"
          @click="handleCloseModal"
        >
          {{ 'Закрыть' }}
        </button>
        <button 
          class="catalog-modal-container_block_footer__order"
          @click="handleOrderModal"
        >
          {{ 'Заказать торт' }}
        </button>
      </div>
    </div>
  </artical>
</template>

<script setup lang="ts">

import { storeToRefs } from 'pinia'
import {  ref, watch } from 'vue'
import { Carousel, Slide } from 'vue3-carousel'
import { mainStore } from '@/store/Store'
import 'vue3-carousel/dist/carousel.css'


const store = mainStore()

const { CatalogList, CatalogIndex } = storeToRefs(store)

const dataModal = ref({
  name: '',
  price: 0,
  shortDescription: '',
  description: '',
  imgPath: '',
  composition: [] as string[],
  gallery: [] as string[],
  calories: {} as {
    protein: string,
    fats: string,
    carbo: string,
    calorie: string
  }
})

const currentSlide = ref(0)

watch([CatalogIndex, CatalogList], () => {
  dataModal.value = CatalogList.value[CatalogIndex.value]
})


const handleCloseModal = () => { // закрыть модальное окно
  store.catalogModal.show = false
  setTimeout(() => { // даем время закрыться а потом меняем индекс потому что иначе инфа пропадает на модалке
    store.catalogModal.index = -1 
  },500)
}

const handleOrderModal = () => {
  handleCloseModal()
}

const slideTo = (val: number) => { // перелестнуть слайд
  currentSlide.value = val // присваиваем переменной выбранное пользователем значение
}

</script>

<style src="./CatalogModal.sass" lang="sass"></style>
