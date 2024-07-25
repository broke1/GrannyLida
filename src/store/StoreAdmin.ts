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
        warning: '',
        preloader: false
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
    
  }
})


