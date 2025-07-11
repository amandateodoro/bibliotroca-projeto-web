import axios from 'axios'
import router from '@/router'

const api = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000
})

api.interceptors.response.use(
  response => response,
  error => {
    if (error.code === 'ERR_NETWORK' || error.response?.status >= 500) {
      // Verifica se já estamos na tela de erro para evitar loop
      if (router.currentRoute.value.path !== '/erro-api') {
        router.push('/erro-api')
      }
    }

    return Promise.reject(error)
  }
)

export { api }
