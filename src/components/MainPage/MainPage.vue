

<template>
  <section class="mainPage-container">
    Hello Kitty
  </section>
  <!-- <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p> -->
</template>

<script  lang="ts">

  export default {
    name: 'MainPage',
    data(){
      return {
       
      }
    },
    mounted() {
      console.log('dfsdf')
      // let observer = new IntersectionObserver(this.handleIntersection,{
      //   threshold: [0.5],
      // })
      // for (let el of Object.values(this.$refs)) {
      //   observer.observe(el)
      // }

      // this.observer = observer

    },
    // beforeUnmount() {
    //   this.observer.disconnect()
    // },
    methods: {
    //   handleIntersection(entries) {
    //     entries.forEach(  (entry) => {
    //       if (entry.isIntersecting) {
    //         this.isRowShow[entry.target.dataset.id] = entry.isIntersecting
    //       }
    //     })
    //   }
    }
  }
  
// import { ref } from 'vue'

// defineProps<{ 
//   // msg: string 
// }>()

// const count = ref(0)


</script>

<!-- <style scoped>
.read-the-docs {
  color: #888;
}
</style> -->

<style src="./MainPage.sass" lang="sass"></style>