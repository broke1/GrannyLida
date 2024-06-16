import { defineStore } from 'pinia'
import State from './Store.types'

export const mainStore = defineStore('main', {
  state: (): State => {
    return {
      showLogo: false,
      showMenu: false,
      menuList: ['Вкус и польза','Доставка','Каталог','Контакты'],
      showAboutGranny: false,
      aboutGrannyText: `
      <div class="about-granny-container_block_text_item about-granny-container_block_text_item__center">Здравствуйте мои дорогие. Я <span class="about-granny-container_block_text_item__orange">Бабушка Лида</span>.</div>  
      <div class="about-granny-container_block_text_item about-granny-container_block_text_item__intent"> Я пеку самые вкусные и самые полезные торты и пироженные, из всех, что Вы пробовали. </div> 
      <div class="about-granny-container_block_text_item about-granny-container_block_text_item__intent"> А о том на сколько красивые и уникальные торты у меня получаются уже ходят сказки и легенды. </div> 
      <div class="about-granny-container_block_text_item about-granny-container_block_text_item__intent"> Просто попробуйте, и Вы всё чаще будете возвращаться ко мне в гости.</div>`
    }
  },
})

