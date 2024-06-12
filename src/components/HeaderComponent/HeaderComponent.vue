<template>
  <section class="header-container">
    <artical 
      class="header-container_logo"
      :class="{ 'header-container_logo__show': showLogo }"
    >
      <img 
        class="header-container_logo_img"
        src="@/assets/logo.jpg"
      >
    </artical>
  </section>
</template>

<script lang="ts">

import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HeaderContainer',
  data(){
    return {
      showLogo: false
    }
  },
  mounted() {
    setTimeout( () => {
      this.showLogo = true
    },1000)
  }
})

</script>

<style src="./HeaderComponent.sass" lang="sass"></style>
