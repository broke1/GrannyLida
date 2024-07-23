

<template>
  <article 
    class="auth-component"
    :class="{ 'auth-component__show': store.authForm.show }"
  >
    <input 
      v-model.trim="store.authForm.login"
      class="auth-component_item"
      placeholder="Логин"
      type="text"
    >
    <div class="auth-component_row">
      <input 
        v-model.trim="store.authForm.pass"
        class="auth-component_item"
        placeholder="Пароль"
        :type="store.authForm.type"
      >
      <div 
        class="auth-component_img" 
        @click="handleToogleShowPass"
      />
    </div>
    <button 
      class="auth-component_button"
      @click="store.checkAuth()"
    >
      {{ 'Войти' }}
    </button>
  </article>
</template>

<script setup lang="ts">

import { onMounted } from 'vue'
import { adminStore } from '@/store/StoreAdmin'

const store = adminStore()

onMounted(() => {
  setTimeout( () => {
    store.authForm.show = true
  },1000)
  
})

const handleToogleShowPass = () => {
  store.authForm.type == 'password' ? store.authForm.type = 'text' : store.authForm.type = 'password'
}

</script>

<style src="./AuthComponent.sass" lang="sass"></style>