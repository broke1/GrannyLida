import { defineStore } from 'pinia'
import { useCookies } from 'vue3-cookies'
import { AdminState } from './Store.types'



export const adminStore = defineStore('main', {
  state: (): AdminState => {
    return {
      needAuth: true,
      authForm: {
        show: false,
        login: '',
        pass: '',
        type: 'password',
        warning: '',
        preloader: false
      },
      addCardForm: {
        name: '',
        price: null,
        shortDescription: '',
        // description: `Красный торт на самом деле красно-белый. Красный слой клубника, белый ваниль. Украшен заварными цветочками, карамельными ягодами. 
        // Подойдет и на день рождение и на свадьбу.`,
        // imgPath: '/Catalog/redCake/',
        // composition: ['безглютеновая мука','тростниковый сахар','банановое молоко','детский смех', 'красный аплеьсин'],
        // gallery: [] as string[],
        // calories: {
        //   protein: '120',
        //   fats: '250',
        //   carbo: '50',
        //   calorie: '300'
        // }
      }
    }
  },
  getters: {

  },
  actions: {
    async checkAuth() {

      this.authForm.preloader = true
      
      const {  login, pass } = this.authForm

      await fetch('/api/checkAuth',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login,
          pass,
        }),
      })
        .then( response => {
          if ([200,204].includes(response.status)){
            response.json().then( () => {
              this.authForm.warning = ''
              this.needAuth = false
              useCookies().cookies.set('user',login,'1d')
            })
          } else {
            this.authForm.warning = 'Введенный логин или пароль не верны'
          }
          
        })
        .catch(() => {
          this.authForm.warning = 'Введенный логин или пароль не верны'
        })
        .finally(() => {
          this.authForm.preloader = false
        })

    },
    async changeCard() {
      
      console.log(this.addCardForm)

    }
    
  }
})


