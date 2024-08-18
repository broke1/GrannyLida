<template>
  <section 
    id="contacts" 
    class="contacts-container" 
  >
    <article 
      ref="target"
      class="contacts-container_block"
      :class="{ 'contacts-container_block__show': store.showContacts }"
      data-testid="ContactsComponentTestId"
    >
      <div 
        class="contacts-container_block_title"
        v-html="store.contactsTitle"
      />
      <div class="contacts-container_block_body">
        <div class="contacts-container_block_body_left_part">
          <div 
            class="contacts-container_block_body_left_part_messengers"
          >
            <a 
              v-for="(item, index) in store.contactsList"
              :key="item.text"
              :href="item.link"
              target="_blank"
              class="contacts-container_block_body_left_part_messengers_row"
              :style="{ animationDelay: (0.3 * index + 0.5) + 's' }"
              :class="{'contacts-container_block_body_left_part_messengers_row__show': store.showContacts}"
            >
              <div 
                class="contacts-container_block_body_left_part_messengers_row_img"
              >
                <img 
                  v-show="item.img != ''"
                  :src="chooseImgContact(item.img)" 
                >
              </div>
              <div class="contacts-container_block_body_left_part_messengers_row_text">
                {{ item.text }}
              </div>
            </a>
          </div>
          <div 
            class="contacts-container_block_body_left_part_img"
            :class="{'contacts-container_block_body_left_part_img__show': store.showContacts}"
          >
            <img 
              class="contacts-container_block_body_left_part_img_in"
              src="@/assets/contacts.jpg"
            >
          </div>
        </div>
        <div class="contacts-container_block_body_right_part">
          <ContactsForm />
        </div>
      </div>
    </article>
    <article class="contacts-container_signature">
      <div class="contacts-container_signature_copyright">
        {{ "GrannyLida.ru (c)  2024 г" }}
      </div>
      <div class="contacts-container_signature_autor">
        {{ "made by fred_apriori" }}
      </div>
    </article>
  </section>
</template>

<script setup lang="ts">

import {  ref, onMounted, onBeforeUnmount  } from 'vue'
import ContactsForm from './ContactsForm/ContactsForm.vue'
import { mainStore } from '@/store/Store'


const store = mainStore()

const handleIntersection = () => {
  store.showContacts = true
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
})

onBeforeUnmount(() => {
  observer?.disconnect()
})

const chooseImgContact = (nameImg: string) => {
  return new URL(`/src/assets/${nameImg}`, import.meta.url).pathname
}

</script>

<style src="./ContactsComponent.sass" lang="sass"></style>
