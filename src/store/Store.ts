import { defineStore } from 'pinia'
import State from './Store.types'

export const mainStore = defineStore('main', {
  state: (): State => {
    return {
      showLogo: false,
      showMenu: false,
      menuList: ['Вкус и польза','Доставка','Каталог','Контакты']
    }
  },
})

