import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/servidores',
      name: 'servidores',
      component: () => import('../views/servidor/IndexView.vue'),
    },
    {
      path: '/usuarios',
      name: 'usuarios',
      component: () => import('../views/Usuario/IndexView.vue'),
    },
    {
      path: '/autores',
      name: 'autores',
      component: () => import('../views/Autor/IndexView.vue'),
    },
    {
      path: '/cidades',
      name: 'cidades',
      component: () => import('../views/Cidade/IndexView.vue'),
    },
    {
      path: '/editoras',
      name: 'editoras',
      component: () => import('../views/Editora/IndexView.vue'),
    },
    {
      path: '/estados',
      name: 'estados',
      component: () => import('../views/estado/IndexView.vue'),
    },
    {
      path: '/generos',
      name: 'generos',
      component: () => import('../views/Genero/IndexView.vue'),
    },
    {
      path: '/livros',
      name: 'livros',
      component: () => import('../views/Livro/IndexView.vue'),
    },
  ],
})

export default router
