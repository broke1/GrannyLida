

<template>
  <section 
    class="mainPage-page" 
    data-testid="MainPage"
  >
    <div class="mainPage-page_container">
      <HeaderComponent />
      <AboutGranny />
    </div>
  </section>
</template>

<script  lang="ts">

import AboutGranny from '@/components/AboutGranny/AboutGranny.vue'
import HeaderComponent from '@/components/HeaderComponent/HeaderComponent.vue'


export default {
  name: 'MainPage',
  components: {
    HeaderComponent,
    AboutGranny
  },
  data(){
    return {
    
    }
  }
}

</script>

<style src="./MainPage.sass" lang="sass"></style>