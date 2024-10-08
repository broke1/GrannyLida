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
      cardForm: {
        id: -1,
        name: '',
        originName: '',
        price: null,
        shortDescription: '',
        description: ``,
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
        show: false,
        btnText: 'Изменить'
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

      const { id, name, originName, price, shortDescription, description, composition,  calories, gallery, warning } = this.cardForm

      if (name == ''){
        warning.success = false
        warning.text = 'Пожалуйста заполните Имя'
        warning.show = true
        setTimeout(() => {
          warning.show = false
        }, 3000)
        return
      }
      
      this.cardForm.preloader = true
      
      const formData = new FormData()

      formData.append('id', String(id))
      formData.append('name', name)
      formData.append('originName',originName)
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
      
      await fetch('/api/changeCard',{
        method: 'POST',
        body: formData
      })
        .then( response => {
          if ([200,204].includes(response.status)){
            response.json().then( () => {
              warning.success = true
              warning.text = 'Кондитерское изделие успешно сохраненно'
              warning.show = true
              setTimeout(() => {
                warning.show = false
                this.cardForm.show = false
              }, 3000)
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
          this.cardForm.preloader = false
          setTimeout(() => {
            warning.show = false
          }, 3000)
          this.getCards()
        })

    },
    chooseCard(id: number) {
      
      const { name, originName, price, shortDescription, description, composition,  protein, fats, carbo, calorie, gallery } = this.cards.body.filter( item => item.id == id)[0]

      this.cardForm = {
        ...this.cardForm,
        id,
        name,
        originName,
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
        show: true,
        btnText: 'Изменить'
      }

    },
    async deleteCard(id: number, name: string) {
      
      this.cards.preloader = true
      this.cardForm.show = false

      const { warning } = this.cards

      await fetch('/api/deleteCards',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          name
        })
      })
        .then( response => {
          if ([200,204].includes(response.status)){
            if ([200,204].includes(response.status)){
              response.json().then( () => {
                warning.success = true
                warning.text = 'Кондитерское изделие успешно удалено'
                warning.show = true
                this.cardForm.show = false
              })
            } else {
              warning.success = true
              warning.text = 'Кондитерское изделие удалить не удалось'
              warning.show = true
              this.cardForm.show = false
            }
          }
          
        })
        .catch(() => {
          warning.success = true
          warning.text = 'Кондитерское изделие удалить не удалось'
          warning.show = true
          this.cardForm.show = false
        })
        .finally(() => {
          this.cards.preloader = false
          this.cardForm.show = false
          setTimeout(() => {
            this.cards.warning = {
              show: false,
              text: '',
              success: false 
            }
          }, 3000)
          this.getCards()
        })

    },
    newCard() {
      
      this.cardForm = {
        ...this.cardForm,
        id: -1,
        name: '',
        originName: '',
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
        show: true,
        btnText: 'Создать'
      }
    },
    
  }
})


