

<template>
  <article class="add-card-component">
    <div class="add-card-component_block">
      <div class="add-card-component_block_item add-card-component_block_item_name">
        <div class="add-card-component_block_item_label">
          {{ 'Имя кондитерского изделия' }}
        </div>
        <input 
          v-model.trim="store.addCardForm.name"
          class="add-card-component_block_item_value"
          type="text"
        >
      </div> 
      <div class="add-card-component_block_item  add-card-component_block_item_price">
        <div class="add-card-component_block_item_label">
          {{ 'Цена (р/кг)' }}
        </div>
        <input 
          v-model.trim="store.addCardForm.price"
          class="add-card-component_block_item_value"
          type="text"
        >
      </div>  
      <div class="add-card-component_block_item add-card-component_block_item_shortDes">
        <div class="add-card-component_block_item_label">
          {{ 'Короткое описание (для каталога)' }}
        </div>
        <textarea 
          v-model.trim="store.addCardForm.shortDescription"
          class="add-card-component_block_item_value add-card-component_block_item_value_textarea"
          rows="2"
        />
      </div>  
    </div>
    <div class="add-card-component_btn_row">
      <button 
        class="add-card-component_btn_row_button"
        @click="store.changeCard()"
      >
        {{ 'Создать' }}
      </button> 
    </div> 
    
    <!-- <div class="auth-component_row">
      <input 
        v-model.trim="store.authForm.pass"
        class="auth-component_item"
        placeholder="Пароль"
        :type="store.authForm.type"
        @keyup.enter="store.checkAuth()"
      >
      <div 
        class="auth-component_img"
        :class="{'auth-component_img__show': store.authForm.type == 'text'}" 
        @click="handleToogleShowPass"
      />
    </div>
    <div class="auth-component_warn">
      <div 
        class="auth-component_warn_preloader"
        :class="{'auth-component_warn_preloader__show': store.authForm.preloader}" 
      />
      <div 
        class="auth-component_warn_text"
        :class="{'auth-component_warn_text__show': !store.authForm.preloader}"
      >
        {{ store.authForm.warning }} 
      </div>
    </div>
    <button 
      class="auth-component_button"
      @click="store.checkAuth()"
    >
      {{ 'Войти' }}
    </button> -->
  </article>
</template>

<script setup lang="ts">

// import { onMounted } from 'vue'
import { adminStore } from '@/store/StoreAdmin'


const store = adminStore()



</script>

<style src="./AddCardComponent.sass" lang="sass"></style>