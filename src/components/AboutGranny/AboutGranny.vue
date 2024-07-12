<template>
  <section class="about-granny-container">
    <article 
      class="about-granny-container_block"
      :class="{ 'about-granny-container_block__show': store.showAboutGranny }"
      data-testid="aboutGrannyTestId"
    >
      <div 
        class="about-granny-container_block_text"
        v-html="store.aboutGrannyText"
      />
    </article>
  </section>
</template>

<script setup lang="ts">

import {  onMounted  } from 'vue'
import { mainStore } from '@/store/Store'

const store = mainStore()

onMounted(() => {
  setTimeout( () => {
    store.showAboutGranny = true
  },2000)
})

</script>

<style src="./AboutGranny.sass" lang="sass"></style>
