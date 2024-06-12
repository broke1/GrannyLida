

<template>
  <section 
    class="mainPage-page" 
    data-testid="MainPage"
  >
    <div class="mainPage-page_container">
      <HeaderComponents />
    </div>
  </section>
</template>

<script  lang="ts">

import HeaderComponents from '@/components/HeaderComponent/HeaderComponent.vue'

export default {
  name: 'MainPage',
  components: {
    HeaderComponents
  },
  data(){
    return {
    
    }
  }
}

</script>

<style src="./MainPage.sass" lang="sass"></style>