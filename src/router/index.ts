import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Swal from 'sweetalert2';

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
      meta: { requiresAuth: true },
    },
    {
      path: '/usuarios/create',
      name: 'Novo Usuario',
      component: () => import('../views/Usuario/FormView.vue'),
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/usuarios/:id/update',
      name: 'Editar Usuario',
      component: () => import('../views/Usuario/FormView.vue'),
      meta: { requiresAuth: true, },
    },

    // AUTOR
    {
      path: '/autores',
      name: 'Autores',
      component: () => import('../views/Autor/IndexView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/autores/create',
      name: 'Cadastrar Autor',
      component: () => import('../views/Autor/FormView.vue'),
      meta: { requiresAuth: true, requiresAdmin: true }
    },

    // CIDADE
    {
      path: '/cidades',
      name: 'Cidades',
      component: () => import('../views/Cidade/IndexView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/cidades/create',
      name: 'Cadastrar Cidade',
      component: () => import('../views/Cidade/FormView.vue'),
      meta: { requiresAuth: true, requiresAdmin: true }
    },

    // EDITORA
    {
      path: '/editoras',
      name: 'Editoras',
      component: () => import('../views/Editora/IndexView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/editoras/create',
      name: 'Cadastrar Editora',
      component: () => import('../views/Editora/FormView.vue'),
      meta: { requiresAuth: true, requiresAdmin: true }
    },

    // ESTADO
    {
      path: '/estados',
      name: 'Estados',
      component: () => import('../views/Estado/IndexView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/estados/create',
      name: 'Cadastrar Estado',
      component: () => import('../views/Estado/FormView.vue'),
      meta: { requiresAuth: true, requiresAdmin: true }
    },

    // GENERO
    {
      path: '/generos',
      name: 'Generos',
      component: () => import('../views/Genero/IndexView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/generos/create',
      name: 'Cadastrar Genero',
      component: () => import('../views/Genero/FormView.vue'),
      meta: { requiresAuth: true, requiresAdmin: true }
    },

    // LIVRO
    {
      path: '/livros',
      name: 'Livros',
      component: () => import('../views/Livro/IndexView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/livros/create',
      name: 'Cadastrar Livro',
      component: () => import('../views/Livro/FormView.vue'),
      meta: { requiresAuth: true, requiresAdmin: true }
    },

    //Login
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Auth/LoginView.vue'),
      meta: { layout: 'login' }
    },
    {
      path: '/login/registro',
      name: 'Registro',
      component: () => import('../views/Auth/RegistroView.vue'),
      meta: { layout: 'login' }
    },

    //Erro Api
    {
      path: '/erro-api',
      name: 'ErroAPI',
      component: () => import('../views/ErroApiView.vue'),
      meta: { layout: 'login' }
    },

  ],
});

router.beforeEach((to, from, next) => {
  const usuario = JSON.parse(localStorage.getItem('usuario') || 'null');

  const precisaAutenticacao = to.meta.requiresAuth;
  const precisaAdmin = to.meta.requiresAdmin;

  // ✅ Bloqueia acesso à rota protegida se não estiver logado
  if (precisaAutenticacao && !usuario) {
    return next('/login');
  }

  // ✅ Bloqueia rota de admin se não for admin
  if (precisaAdmin && (!usuario || !usuario.admin)) {
    Swal.fire({
      icon: 'warning',
      title: 'Acesso Negado!',
      text: 'Você não tem acesso especial para esta função!',
      showCancelButton: false,
      showCloseButton: false,
      showConfirmButton: true,
      confirmButtonText: 'Ok',
    }).then(() => {
      return next('/');
    });
  }

  // ✅ Impede que usuário logado acesse a tela de login
  if (to.path === '/login' && usuario) {
    return next('/');
  }

  next();
});


export default router
