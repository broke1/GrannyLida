

<template>
  <section 
    class="mainPage-page" 
    data-testid="MainPage"
  >
    <div class="mainPage-page_container">
      <HeaderComponent />
      <AboutGranny />
      <WhySoHealthy />
    </div>
  </section>
</template>

<script setup lang="ts">

import AboutGranny from '@/components/AboutGranny/AboutGranny.vue'
import HeaderComponent from '@/components/HeaderComponent/HeaderComponent.vue'
import WhySoHealthy from '@/components/WhySoHealthy/WhySoHealthy.vue'

</script>

<style src="./MainPage.sass" lang="sass"></style>