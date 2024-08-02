

<template>
  <article class="cards-component">
    <div 
      class="cards-component_preloader" 
      :class="{'cards-component_preloader__show': store.cards.preloader}"
    >
      <div class="cards-component_preloader_img" />
    </div>
    <div class="cards-component_list">
      <div
        v-for="item in store.cards.body"
        :key="item.name"
        class="cards-component_list_item"
        @click="store.chooseCard(item.id)"
      >
        <div class="cards-component_list_item_img">
          <img :src="pathImg(item.gallery)">
        </div>
        <div class="cards-component_list_item_text">
          {{ item.name }}
        </div>
        <span 
          class="cards-component_list_item_btn__close"
          @click="store.deleteCard(item.id)"
        >
          {{ 'x' }}
        </span>
      </div>
    </div>
    <div class="cards-component_footer">
      <div 
        class="cards-component_footer_warning_text"
        :class="{'cards-component_footer_warning_text__show': store.cards.warning.show,
                 'cards-component_footer_warning_text__success': store.cards.warning.success
        }" 
      >
        {{ store.cards.warning.text }}
      </div>
      <button 
        class="cards-component_footer_btn"
        @click="store.newCard()"
      >
        {{ 'Новое кондитерское изделие' }}
      </button>
    </div>
  </article>
</template>

<script setup lang="ts">

import { onMounted } from 'vue'
import { adminStore } from '@/store/StoreAdmin'

const store = adminStore()

onMounted(() => {
  store.getCards()
})

const pathImg = (gallery: string) => {
  return `\\public\\Catalog\\${gallery.split(';')[0].trim()}`
}

</script>

<style src="./CardsComponent.sass" lang="sass"></style>