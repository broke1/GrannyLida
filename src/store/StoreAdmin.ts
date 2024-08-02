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
      cards: {
        preloader: false,
        body: [],
        warning: {
          show: false,
          text: '',
          success: false
        }
      },
      addCardForm: {
        name: '',
        price: null,
        shortDescription: '',
        description: ``,
        // imgPath: '/Catalog/redCake/',
        composition: '',   
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
          text: '',
          success: false
        },
        show: false
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
    async getCards() {
      
      this.cards.preloader = true

      await fetch('/api/getCards')
        .then( response => {
          if ([200,204].includes(response.status)){
            response.json().then( result => {
              this.cards.body = result
            })
          }
          
        })
        .catch(() => {
          
        })
        .finally(() => {
          this.cards.preloader = false
        })

    },
    async changeCard() {

      const { name, price, shortDescription, description, composition,  calories, gallery, warning } = this.addCardForm

      if (name == ''){
        warning.success = false
        warning.text = 'Пожалуйста заполните Имя'
        warning.show = true
        setTimeout(() => {
          warning.show = false
        }, 3000)
        return
      }
      
      this.addCardForm.preloader = true
      
      const formData = new FormData()

      formData.append('name', name)
      gallery.forEach( img => {
        formData.append('images', img)
      })
      formData.append('price', String(price))
      formData.append('shortDescription', shortDescription)
      formData.append('description', description)
      formData.append('composition', composition)
      formData.append('protein', calories.protein)
      formData.append('fats', calories.fats)
      formData.append('carbo', calories.carbo)
      formData.append('calorie', calories.calorie)
      
      await fetch('/api/addCard',{
        method: 'POST',
        body: formData
      })
        .then( response => {
          if ([200,204].includes(response.status)){
            response.json().then( () => {
              warning.success = true
              warning.text = 'Кондитерское изделие успешно сохраненно'
              warning.show = true
            })
          } else {
            warning.success = false
            warning.text = 'Не удалось сохранить кондитерское изделие. Попробуйте еще'
            warning.show = true
          }
          
        })
        .catch(() => {
          warning.success = false
          warning.text = 'Не удалось сохранить кондитерское изделие. Попробуйте еще'
          warning.show = true
        })
        .finally(() => {
          this.addCardForm.preloader = false
          setTimeout(() => {
            warning.show = false
          }, 3000)
          this.getCards()
        })

    },
    chooseCard(id: number) {
      
      const { name, price, shortDescription, description, composition,  protein, fats, carbo, calorie, gallery } = this.cards.body.filter( item => item.id == id)[0]

      this.addCardForm = {
        ...this.addCardForm,
        name,
        price,
        shortDescription,
        description,
        composition,
        calories: {
          protein,
          fats,
          carbo,
          calorie
        },
        gallery: gallery.split('; '),
        show: true
      }

    },
    async deleteCard(id: number) {
      
      this.cards.preloader = true

      const { warning } = this.cards

      await fetch('/api/deleteCards',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id
        })
      })
        .then( response => {
          if ([200,204].includes(response.status)){
            if ([200,204].includes(response.status)){
              response.json().then( () => {
                warning.success = true
                warning.text = 'Кондитерское изделие успешно удалено'
                warning.show = true
              })
            } else {
              warning.success = true
              warning.text = 'Кондитерское изделие удалить не удалось'
              warning.show = true
            }
          }
          
        })
        .catch(() => {
          warning.success = true
          warning.text = 'Кондитерское изделие удалить не удалось'
          warning.show = true
        })
        .finally(() => {
          this.cards.preloader = false
          warning.success = true
          warning.text = 'Кондитерское изделие удалить не удалось'
          warning.show = true
          setTimeout(() => {
            warning.show = false
          }, 3000)
          this.getCards()
        })

    },
    newCard() {
      
      this.addCardForm = {
        ...this.addCardForm,
        name: '',
        price: null,
        shortDescription: '',
        description: '',
        composition: '',
        calories: {
          protein: '',
          fats: '',
          carbo: '',
          calorie: ''
        },
        gallery: [],
        show: true
      }

    },
    
  }
})


