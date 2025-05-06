<template>
  <section 
    id="why-so-healthy" 
    class="why-so-healthy-container" 
  >
    <article 
      ref="target"
      class="why-so-healthy-container_block"
      :class="{ 'why-so-healthy-container_block__show': store.showWhySoHealthy }"
      data-testid="whySoHealthyTestId"
    >
      <div 
        class="why-so-healthy-container_block_title"
        v-html="store.whySoHealthyTitle"
      />
      <div class="why-so-healthy-container_block_body">
        <div class="why-so-healthy-container_block_body_row">
          <div class="why-so-healthy-container_block_body_left_part">
            <div 
              class="why-so-healthy-container_block_body_left_part_text"
              v-html="store.healthyText.firstRowHealthy"
            />
            <ul class="why-so-healthy-container_block_body_left_part_text why-so-healthy-container_block_body_left_part_text_list">
              <li 
                v-for="item in store.healthyText.list"
                :key="item"
                class="why-so-healthy-container_block_body_left_part_text_item why-so-healthy-container_block_body_left_part_text_list_item"
              >
                {{ item }}
              </li>
            </ul>
          </div>
          <div class="why-so-healthy-container_block_body_right_part">
            <img 
              class="why-so-healthy-container_block_body_right_part_img"
              src="@/assets/why-so-healthy.jpg"
            >
          </div>
        </div>
        <div class="why-so-healthy-container_block_body_row why-so-healthy-container_block_body_row_second">
          <div class="why-so-healthy-container_block_body_right_part why-so-healthy-container_block_body_right_part_second">
            <img 
              class="why-so-healthy-container_block_body_right_part_img"
              src="@/assets/why-so-healthy.jpg"
            >
          </div>
          <div class="why-so-healthy-container_block_body_left_part why-so-healthy-container_block_body_left_part_second">
            <div 
              class="why-so-healthy-container_block_body_left_part_text"
              v-html="store.healthyText.secondRowHealthy"
            />
          </div>
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
  store.showWhySoHealthy = true
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

<style src="./WhySoHealthy.sass" lang="sass"></style>
