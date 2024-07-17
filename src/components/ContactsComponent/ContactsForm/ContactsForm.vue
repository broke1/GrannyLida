<template>
  <article 
    class="contacts-form_block"
    :class="{ 'contacts-form_block__show': store.showContacts }"
    :style="{ animationDelay: '1s' }"
    data-testid="ContactsFormTestId"
  >
    <div 
      class="contacts-form_block_title"
      v-html="title"
    />
    <input 
      v-model.trim="name"
      class="contacts-form_block_item"
      placeholder="Имя"
      type="text"
    >
    <MaskInput 
      v-model="phone" 
      class="contacts-form_block_item"
      placeholder="Телефон"
      type="text"
      mask="+7 (###) ###-##-##" 
    />
    <textarea 
      v-model="comments" 
      class="contacts-form_block_item contacts-form_block_item_textarea"
      placeholder="Комментарий"
      rows="5"
    />
    <div class="contacts-form_block_agrement">
      <input 
        id="aggrement"
        v-model="aggrement"  
        class="contacts-form_block_agrement_checkbox"
        type="checkbox"  
      >
      <label 
        for="aggrement"
        class="contacts-form_block_agrement_text"
      >
        Я согласен на обработку моих персональных данных и ознакомлен с <span>пользовательским соглашением</span>
      </label>
    </div>
  </article>
</template>

<script setup lang="ts">

import { MaskInput } from 'vue-3-mask'
import { mainStore } from '@/store/Store'



const store = mainStore()

const { title, name, phone, comments, aggrement } = store.contactsForm


</script>

<style src="./ContactsForm.sass" lang="sass"></style>
