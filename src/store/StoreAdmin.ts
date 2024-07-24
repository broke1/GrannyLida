import { defineStore } from 'pinia'
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
        warning: {
          show: false,
          text: ''
        },
        preloader: false
      }
    }
  },
  getters: {

  },
  actions: {
    async checkAuth() {

      this.authForm.preloader = true
      this.authForm.warning.show = true
      this.authForm.warning.text = 'Введенный логин или пароль не верны'

      setTimeout(() => {
        this.authForm.preloader = false
      },3000)
      
      // const {  login, pass } = this.authForm

      // warning.show = false 
      
      // if (name == ''){
      //   warning.success = false
      //   warning.text = 'Пожалуйста введите Ваше имя'
      //   warning.show = true
      // } else if (phone == '') {
      //   warning.success = false
      //   warning.text = 'Пожалуйста введите Ваш телефон'
      //   warning.show = true
      // } else if (!aggrement) {
      //   warning.success = false
      //   warning.text = 'Пожалуйста согласитесь на обработку данных'
      //   warning.show = true
      // }else {

       

      //   await fetch('/api/sendOrder',{
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify({
      //       name,
      //       phone,
      //       comments
      //     }),
      //   })
      //     .then( response => {
      //       if ([200,204].includes(response.status)){
      //         response.json().then( () => {
      //           warning.success = true
      //           warning.text = 'Ваше письмо успешно отправлено'
      //           warning.show = true
      //           setTimeout( () => {
      //             warning.show = false
      //           },3000)
      //         })
      //       } else {
      //         warning.success = false
      //         warning.text = 'К сожалению, письмо отправить не удалось. Попробуйте еще раз.'
      //         warning.show = true
      //       }
            
      //     })
      //     .catch(() => {
      //       warning.success = false
      //       warning.text = 'К сожалению, письмо отправить не удалось. Попробуйте еще раз.'
      //       warning.show = true
      //     })

      // }

    },
    
  }
})


