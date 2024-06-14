import { defineStore } from 'pinia'

interface State {
  showLogo: boolean
}


export const mainStore = defineStore('main', {
  state: (): State => {
    return {
      showLogo: false
    }
  },
})

