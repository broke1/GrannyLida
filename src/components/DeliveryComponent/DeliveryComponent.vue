<template>
  <section 
    id="delivery" 
    class="delivery-container" 
  >
    <article 
      ref="target"
      class="delivery-container_block"
      :class="{ 'delivery-container_block__show': store.showDelivery }"
      data-testid="deliveryTestId"
    >
      <div 
        class="delivery-container_block_title"
        v-html="store.deliveryTitle"
      />
      <div class="delivery-container_block_body">
        <div class="delivery-container_block_body_left_part">
          <img 
            class="delivery-container_block_body_left_part_img"
            src="@/assets/delivery.jpg"
          >
        </div>
        <div class="delivery-container_block_body_right_part">
          <div 
            class="delivery-container_block_body_right_part_text"
            v-html="store.deliveryText"
          />
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
  store.showDelivery = true
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

<style src="./DeliveryComponent.sass" lang="sass"></style>
