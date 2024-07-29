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
        description: ``,
        // imgPath: '/Catalog/redCake/',
        composition: [],   
        gallery: [],
        calories: {
          protein: '',
          fats: '',
          carbo: '',
          calorie: ''
        },
        preloader: false,
        warning: {
          show: false,
          text: ''
        }
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

      const { name, 
        // price, shortDescription, description, composition,  calories, 
        // gallery, 
        warning } = this.addCardForm

      if (name == ''){
        warning.text = 'Пожалуйста заполните Имя'
        warning.show = true
        setTimeout(() => {
          warning.show = false
        }, 3000)
        return
      }
      
      this.addCardForm.preloader = true

      // const formData = new FormData()
      // formData.append('name', name)
      // gallery.forEach( item => {
      //   formData.append('images', item)
      // })

      // formData.append('images', gallery[0])
      
      

      await fetch('/api/addCard',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:  JSON.stringify({ name })
        // body: JSON.stringify({
        //   name,
        //   price,
        //   shortDescription,
        //   description,
        //   composition,
        //   gallery,
        //   calories
        // }),
      })
        .then( () => {
          // if ([200,204].includes(response.status)){
          //   response.json().then( () => {
              
          //   })
          // } else {
          //   this.authForm.warning = 'Введенный логин или пароль не верны'
          // }
          
        })
        .catch(() => {
          warning.text = 'Не удалось сохранить торт. Попробуйте еще'
          warning.show = true
        })
        .finally(() => {
          // this.addCardForm.preloader = false
        })

    }
    
  }
})


