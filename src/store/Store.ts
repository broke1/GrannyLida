import { defineStore } from 'pinia'
import State from './Store.types'

export const mainStore = defineStore('main', {
  state: (): State => {
    return {
      showLogo: false,
      showMenu: false,
      menuList: ['Вкус и польза','Доставка','Каталог','Контакты'],
      isMenuScroll: false,
      showAboutGranny: false,
      aboutGrannyText: `
      <div class="about-granny-container_block_text_item about-granny-container_block_text_item__center">Здравствуйте мои дорогие. Я <span class="about-granny-container_block_text_item__orange">Бабушка Лида</span>.</div>  
      <div class="about-granny-container_block_text_item about-granny-container_block_text_item__intent"> Я пеку самые вкусные и самые полезные торты и пироженные, из всех, что Вы пробовали. </div> 
      <div class="about-granny-container_block_text_item about-granny-container_block_text_item__intent"> А о том на сколько красивые и уникальные торты у меня получаются уже ходят сказки и легенды. </div> 
      <div class="about-granny-container_block_text_item about-granny-container_block_text_item__intent"> Просто попробуйте, и Вы всё чаще будете возвращаться ко мне в гости.</div>`,
      showWhySoHealthy: false,
      whySoHealthyTitle: `
      <div class="why-so-healthy-container_block_title_text">Почему мои торты такие <span class="why-so-healthy-container_block_title_text__orange">вкусные</span>
      и такие <span class="why-so-healthy-container_block_title_text__orange">полезные</span>?
      </div>`,
      healthyText: {
        previewHealthy: `<div class="why-so-healthy-container_block_body_left_part_text_item"> Мои торты такие 
        <span class="why-so-healthy-container_block_body_left_part_text_item__orange">полезные</span>, потому что я всегда использую только самые качественные и свежие ингридиенты.
        </div>
        <div class="why-so-healthy-container_block_body_left_part_text_item why-so-healthy-container_block_body_left_part_text_item__center">Но есть кое-что что я не использую:</div>`,
        list: ['лактозу','глютен','красители','консерванты'],
        endingHealthy: `<div class="why-so-healthy-container_block_body_left_part_text_item"> Мои торты такие 
        <span class="why-so-healthy-container_block_body_left_part_text_item__orange">вкусные</span>, потому что я делаю их с любовью и заботой о каждом покупателе.
        </div>`
      }
    }
  },
})

