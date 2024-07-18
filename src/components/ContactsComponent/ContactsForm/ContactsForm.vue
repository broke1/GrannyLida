<template>
  <article 
    class="contacts-form_block"
    :class="{ 'contacts-form_block__show': store.showContacts }"
    :style="{ animationDelay: '1s' }"
    data-testid="ContactsFormTestId"
  >
    <div 
      class="contacts-form_block_title"
      v-html="store.contactsForm.title"
    />
    <input 
      v-model.trim="store.contactsForm.name"
      class="contacts-form_block_item"
      placeholder="Имя"
      type="text"
    >
    <MaskInput 
      v-model="store.contactsForm.phone" 
      class="contacts-form_block_item"
      placeholder="Телефон"
      type="text"
      mask="+7 (###) ###-##-##" 
    />
    <textarea 
      v-model="store.contactsForm.comments" 
      class="contacts-form_block_item contacts-form_block_item_textarea"
      placeholder="Комментарий"
      rows="5"
    />
    <div class="contacts-form_block_agrement">
      <input 
        id="aggrement"
        v-model="store.contactsForm.aggrement"  
        class="contacts-form_block_agrement_checkbox"
        type="checkbox"  
      >
      <label 
        for="aggrement"
        class="contacts-form_block_agrement_text"
      >
        Я согласен на обработку моих персональных данных и ознакомлен с <a href="/Пользовательское соглашение.docx">пользовательским соглашением</a>
      </label>
    </div>
    <div 
      class="contacts-form_block_warning"
      :class="{ 'contacts-form_block_warning__show': store.contactsForm.warning.show, 'contacts-form_block_warning__success': store.contactsForm.warning.success }"
    >
      {{ store.contactsForm.warning.text }}
    </div>
    <button 
      class="contacts-form_block_order_btn"
      @click="store.sendOrder()"
    >
      Заказать торт
    </button>
  </article>
</template>

<script setup lang="ts">

import { MaskInput } from 'vue-3-mask'
import { mainStore } from '@/store/Store'

const store = mainStore()

</script>

<style src="./ContactsForm.sass" lang="sass"></style>
