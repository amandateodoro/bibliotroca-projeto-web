import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/servidores',
      name: 'Servidores',
      component: () => import('../views/servidor/IndexView.vue'),
    },
    {
      path: '/usuarios',
      name: 'Usuarios',
      component: () => import('../views/Usuario/IndexView.vue'),
    },
    {
      path: '/autores',
      name: 'Autores',
      component: () => import('../views/Autor/IndexView.vue'),
    },
    {
      path: '/autores/create',
      name: 'Autor',
      component: () => import('../views/Autor/FormView.vue'),
    },
    {
      path: '/cidades',
      name: 'Cidades',
      component: () => import('../views/Cidade/IndexView.vue'),
    },
    {
      path: '/cidades/create',
      name: 'Cidade',
      component: () => import('../views/Cidade/FormView.vue'),
    },
    {
      path: '/editoras',
      name: 'Editoras',
      component: () => import('../views/Editora/IndexView.vue'),
    },
    {
      path: '/estados',
      name: 'Estados',
      component: () => import('../views/estado/IndexView.vue'),
    },
    {
      path: '/generos',
      name: 'Generos',
      component: () => import('../views/Genero/IndexView.vue'),
    },
    {
      path: '/livros',
      name: 'Livros',
      component: () => import('../views/Livro/IndexView.vue'),
    },
  ],
})

export default router
