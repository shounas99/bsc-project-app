import { ref } from 'vue'
import { defineStore } from 'pinia'
import { loginApi } from '@/api/login-api'
import type { ILogin } from '@/interfaces/ILogin'

export const useLoginStore = defineStore('LoginStore', () => {
  const dataLogin = ref<ILogin>()

  async function getUserLogin(email: string, password: string) {
    const response = await loginApi(email, password)
    dataLogin.value = response
  }
  function $reset() {
    dataLogin.value = {
      isSuccess: false,
      token: '',
    }
  }

  return {
    /*state properties*/
    dataLogin,
    /*getters*/
    getUserLogin,
    /*actions*/
    $reset,
  }
})
