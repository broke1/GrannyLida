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
          <div class="delivery-container_block_body_left_part_img">
            <img 
              class="delivery-container_block_body_left_part_img_inside"
              src="@/assets/delivery.jpg"
            >
          </div>
          <div class="delivery-container_block_body_left_part_adress">
            <a 
              class="delivery-container_block_body_left_part_adress_block" 
              href="https://yandex.ru/maps/213/moscow/house/ulitsa_narodnogo_opolcheniya_48k1/Z04Ycg5lSUIPQFtvfXt4dXxgZg==/?ll=37.495149%2C55.793992&z=17" 
              target="_blank"
            >
              <span class="delivery-container_block_body_left_part_adress_block_img"> 
                <img 
                  src="@/assets/map.png" 
                >
              </span>
              <span class="delivery-container_block_body_left_part_adress_block_text">{{ store.deliveryAddres }}</span>
            </a>
          </div>
        </div>
        <div class="delivery-container_block_body_right_part">
          <div 
            class="delivery-container_block_body_right_part_text"
            v-html="store.deliveryText"
          />
          <div 
            id="map" 
            class="delivery-container_block_body_right_part_map" 
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


  window.ymaps.ready(() => {
    const map = new window.ymaps.Map('map', {
      center: [55.793532, 37.495099], 
      zoom: 17
    })

    const myPlacemark = new window.ymaps.Placemark([55.794032, 37.495578], {
      balloonContent: 'Ул. Народного ополчения д. 48 к1'
    }, {
      iconLayout: 'default#image',
      iconImageHref: 'src/assets/delivery.jpg',
      iconImageSize: [30, 30],
      iconImageOffset: [-15, -15]
    });

    map.geoObjects.add(myPlacemark)

  })

  
  

})

onBeforeUnmount(() => {
  observer?.disconnect()
})

</script>

<style src="./DeliveryComponent.sass" lang="sass"></style>
