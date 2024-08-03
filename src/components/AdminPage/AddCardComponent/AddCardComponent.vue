

<template>
  <article 
    class="add-card-component"
    :class="{ 'add-card-component__show': store.cardForm.show }"
  >
    <div class="add-card-component_block">
      <div class="add-card-component_block_item add-card-component_block_item_name">
        <div class="add-card-component_block_item_label">
          {{ 'Имя кондитерского изделия' }}
        </div>
        <input 
          v-model.trim="store.cardForm.name"
          class="add-card-component_block_item_value"
          type="text"
        >
      </div> 
      <div class="add-card-component_block_item  add-card-component_block_item_price">
        <div class="add-card-component_block_item_label">
          {{ 'Цена (р/кг)' }}
        </div>
        <input 
          v-model.trim="store.cardForm.price"
          class="add-card-component_block_item_value"
          type="text"
        >
      </div>  
      <div class="add-card-component_block_item add-card-component_block_item_shortDes">
        <div class="add-card-component_block_item_label">
          {{ 'Короткое описание (для каталога)' }}
        </div>
        <textarea 
          v-model.trim="store.cardForm.shortDescription"
          class="add-card-component_block_item_value add-card-component_block_item_value_textarea"
          rows="2"
        />
      </div>  
      <div class="add-card-component_block_item add-card-component_block_item_fullDes">
        <div class="add-card-component_block_item_label">
          {{ 'Полное описание (для карточки товара)' }}
        </div>
        <textarea 
          v-model.trim="store.cardForm.description"
          class="add-card-component_block_item_value add-card-component_block_item_value_textarea"
          rows="5"
        />
      </div> 
      <div class="add-card-component_block_item add-card-component_block_item_composition">
        <div class="add-card-component_block_item_label">
          {{ 'Состав (перечислить ингридиенты через , )' }}
        </div>
        <textarea 
          v-model.trim="store.cardForm.composition"
          class="add-card-component_block_item_value add-card-component_block_item_value_textarea"
          rows="2"
          placeholder="безглютеновая мука, сахар, детский смех"
        />
      </div> 
      <div class="add-card-component_block_item add-card-component_block_item_gallery">
        <div class="add-card-component_block_item_label">
          {{ 'Фото кондитерского изделия' }}
        </div>
        <div class="add-card-component_block_item_value add-card-component_block_item_files">
          <label class="add-card-component_block_item_file_upload">
            <input 
              type="file" 
              name="filesImgs"
              multiple
              @change="addPhoto"
            >
            <span class="add-card-component_block_item_file_upload_btn">
              {{ 'Выберите файл' }}
            </span>
          </label>
          <div 
            class="add-card-component_block_item_files_images"
            :class="{ 'add-card-component_block_item_files_images__with_margin': previewsImgs.length > 0 }"
          >
            <div 
              v-for="(item, index) in previewsImgs"
              :key="item"
              class="add-card-component_block_item_files_images_img"
            >
              <img :src="item">
              <span 
                class="add-card-component_block_item_files_images_img_btn__close"
                @click="deletePreviwImg(index)"
              >
                {{ 'x' }}
              </span>
            </div>
          </div>
        </div>
      </div> 
      <div class="add-card-component_block_item add-card-component_block_item_calories">
        <div class="add-card-component_block_item_label">
          {{ 'КБЖУ' }}
        </div>
        <div class="add-card-component_block_item_value add-card-component_block_item_calories_block">
          <div class="add-card-component_block_item add-card-component_block_item_small">
            <div class="add-card-component_block_item_label">
              {{ 'Белки' }}
            </div>
            <input 
              v-model.trim="store.cardForm.calories.protein"
              class="add-card-component_block_item_value"
              type="text"
            >
          </div>
          <div class="add-card-component_block_item add-card-component_block_item_small">
            <div class="add-card-component_block_item_label">
              {{ 'Жиры' }}
            </div>
            <input 
              v-model.trim="store.cardForm.calories.fats"
              class="add-card-component_block_item_value"
              type="text"
            >
          </div>
          <div class="add-card-component_block_item add-card-component_block_item_small">
            <div class="add-card-component_block_item_label">
              {{ 'Углеводы' }}
            </div>
            <input 
              v-model.trim="store.cardForm.calories.carbo"
              class="add-card-component_block_item_value"
              type="text"
            >
          </div>
          <div class="add-card-component_block_item add-card-component_block_item_small">
            <div class="add-card-component_block_item_label">
              {{ 'Калорий' }}
            </div>
            <input 
              v-model.trim="store.cardForm.calories.calorie"
              class="add-card-component_block_item_value"
              type="text"
            >
          </div>
        </div>
      </div> 
    </div>
    <div class="add-card-component_btn_row">
      <div class="add-card-component_btn_row_warning">
        <div 
          class="add-card-component_btn_row_warning_preloader"
          :class="{'add-card-component_btn_row_warning_preloader__show': store.cardForm.preloader}" 
        />
        <div 
          class="add-card-component_btn_row_warning_text"
          :class="{'add-card-component_btn_row_warning_text__show': store.cardForm.warning.show,
                   'add-card-component_btn_row_warning_text__success': store.cardForm.warning.success
          }" 
        >
          {{ store.cardForm.warning.text }}
        </div>
      </div>
      <button 
        class="add-card-component_btn_row_button"
        @click="store.changeCard()"
      >
        {{ store.cardForm.btnText }}
      </button> 
    </div> 
  </article>
</template>

<script setup lang="ts">

import { ref, watch } from 'vue'
import { adminStore } from '@/store/StoreAdmin'


const store = adminStore()

const previewsImgs = ref([] as string[])

const addPhoto = (event: Event) => {
  const imgs = [...(event.target as HTMLInputElement).files as FileList]
  store.cardForm.gallery = imgs
}

const deletePreviwImg = (index: number) => {
  store.cardForm.gallery.splice(index,1)
  previewsImgs.value.splice(index,1)
}

watch(() => store.cardForm.gallery, () => {
  previewsImgs.value = store.cardForm.gallery.map( item => {
    if (typeof item == 'string'){
      return `${import.meta.env.VITE_BASEPATH}${item}`
    } else {
      return window.URL.createObjectURL(item)
    }
  })
})

</script>

<style src="./AddCardComponent.sass" lang="sass"></style>