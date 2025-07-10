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

    // USUÁRIO
    {
      path: '/usuarios',
      name: 'Usuarios',
      component: () => import('../views/Usuario/IndexView.vue'),
    },
    {
      path: '/usuarios/create',
      name: 'Novo Usuario',
      component: () => import('../views/Usuario/FormView.vue'),
    },
    {
      path: '/usuarios/:id/update',
      name: 'Editar Usuario',
      component: () => import('../views/Usuario/FormView.vue'),
    },

    // AUTOR
    {
      path: '/autores',
      name: 'Autores',
      component: () => import('../views/Autor/IndexView.vue'),
    },
    {
      path: '/autores/create',
      name: 'Cadastrar Autor',
      component: () => import('../views/Autor/FormView.vue'),
    },

    // CIDADE
    {
      path: '/cidades',
      name: 'Cidades',
      component: () => import('../views/Cidade/IndexView.vue'),
    },
    {
      path: '/cidades/create',
      name: 'Cadastrar Cidade',
      component: () => import('../views/Cidade/FormView.vue'),
    },

    // EDITORA
    {
      path: '/editoras',
      name: 'Editoras',
      component: () => import('../views/Editora/IndexView.vue'),
    },
    {
      path: '/editoras/create',
      name: 'Cadastrar Editora',
      component: () => import('../views/Editora/FormView.vue'),
    },

    // ESTADO
    {
      path: '/estados',
      name: 'Estados',
      component: () => import('../views/Estado/IndexView.vue'),
    },
    {
      path: '/estados/create',
      name: 'Cadastrar Estado',
      component: () => import('../views/Estado/FormView.vue'),
    },

    // GENERO
    {
      path: '/generos',
      name: 'Generos',
      component: () => import('../views/Genero/IndexView.vue'),
    },
    {
      path: '/generos/create',
      name: 'Cadastrar Genero',
      component: () => import('../views/Genero/FormView.vue'),
    },

    // LIVRO
    {
      path: '/livros',
      name: 'Livros',
      component: () => import('../views/Livro/IndexView.vue'),
    },
    {
      path: '/livros/create',
      name: 'Cadastrar Livro',
      component: () => import('../views/Livro/FormView.vue'),
    },
  ],
})

export default router
