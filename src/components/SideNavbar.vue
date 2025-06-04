<template>
  <aside class="sidenav navbar navbar-vertical navbar-expand-xs border-radius-lg fixed-start ms-2  bg-white my-2"
    id="sidenav-main">
    <div class="sidenav-header">
      <i class="fas fa-times p-3 cursor-pointer text-dark opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
        aria-hidden="true" id="iconSidenav"></i>
      <RouterLink class="navbar-brand px-4 py-3 m-0" to="/">
        <img src="/img/logo-branca-sem-descricao.png" class="navbar-brand-img" width="40" height="45" alt="main_logo">
        <span class="ms-1 text-sm text-dark">BiblioTroca</span>
      </RouterLink>
    </div>
    <hr class="horizontal dark mt-0 mb-2">
    <div class="collapse navbar-collapse w-auto" id="sidenav-collapse-main">
      <ul class="navbar-nav">
        <li class="nav-item">
          <RouterLink class="nav-link text-dark" active-class="active bg-primary text-white" to="/">
            <i class="material-symbols-rounded opacity-5">dashboard</i>
            <span class="nav-link-text ms-1">Inicio</span>
          </RouterLink>
        </li>
        <!--
                <li class="nav-item">
                    <RouterLink class="nav-link text-dark" active-class="active bg-primary text-white" to="/servidores">
                        <i class="material-symbols-rounded opacity-5">table_view</i>
                        <span class="nav-link-text ms-1">Servidores</span>
                    </RouterLink>
                </li>
-->
        <li class="nav-item">
          <RouterLink class="nav-link text-dark" active-class="active bg-primary text-white" to="/usuarios">
            <i class="material-symbols-rounded opacity-5">table_view</i>
            <span class="nav-link-text ms-1">Usuario</span>
          </RouterLink>
        </li>

        <li class="nav-item">
          <RouterLink class="nav-link text-dark" active-class="active bg-primary text-white" to="/autores">
            <i class="material-symbols-rounded opacity-5">table_view</i>
            <span class="nav-link-text ms-1">Autor</span>
          </RouterLink>
        </li>

        <li class="nav-item">
          <RouterLink class="nav-link text-dark" active-class="active bg-primary text-white" to="/cidades">
            <i class="material-symbols-rounded opacity-5">table_view</i>
            <span class="nav-link-text ms-1">Cidade</span>
          </RouterLink>
        </li>

        <li class="nav-item">
          <RouterLink class="nav-link text-dark" active-class="active bg-primary text-white" to="/editoras">
            <i class="material-symbols-rounded opacity-5">table_view</i>
            <span class="nav-link-text ms-1">Editora</span>
          </RouterLink>
        </li>

        <li class="nav-item">
          <RouterLink class="nav-link text-dark" active-class="active bg-primary text-white" to="/estados">
            <i class="material-symbols-rounded opacity-5">table_view</i>
            <span class="nav-link-text ms-1">Estado</span>
          </RouterLink>
        </li>

        <li class="nav-item">
          <RouterLink class="nav-link text-dark" active-class="active bg-primary text-white" to="/generos">
            <i class="material-symbols-rounded opacity-5">table_view</i>
            <span class="nav-link-text ms-1">Genero</span>
          </RouterLink>
        </li>

        <li class="nav-item">
          <RouterLink class="nav-link text-dark" active-class="active bg-primary text-white" to="/livros">
            <i class="material-symbols-rounded opacity-5">table_view</i>
            <span class="nav-link-text ms-1">Livro</span>
          </RouterLink>
        </li>
        <!--

                <li class="nav-item">
                    <a class="nav-link text-dark" href="../pages/tables.html">
                        <i class="material-symbols-rounded opacity-5">table_view</i>
                        <span class="nav-link-text ms-1">Tables</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-dark" href="../pages/billing.html">
                        <i class="material-symbols-rounded opacity-5">receipt_long</i>
                        <span class="nav-link-text ms-1">Billing</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-dark" href="../pages/virtual-reality.html">
                        <i class="material-symbols-rounded opacity-5">view_in_ar</i>
                        <span class="nav-link-text ms-1">Virtual Reality</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-dark" href="../pages/rtl.html">
                        <i class="material-symbols-rounded opacity-5">format_textdirection_r_to_l</i>
                        <span class="nav-link-text ms-1">RTL</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-dark" href="../pages/notifications.html">
                        <i class="material-symbols-rounded opacity-5">notifications</i>
                        <span class="nav-link-text ms-1">Notifications</span>
                    </a>
                </li>
                <li class="nav-item mt-3">
                    <h6 class="ps-4 ms-2 text-uppercase text-xs text-dark font-weight-bolder opacity-5">Account pages
                    </h6>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-dark" href="../pages/profile.html">
                        <i class="material-symbols-rounded opacity-5">person</i>
                        <span class="nav-link-text ms-1">Profile</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-dark" href="../pages/sign-in.html">
                        <i class="material-symbols-rounded opacity-5">login</i>
                        <span class="nav-link-text ms-1">Sign In</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-dark" href="../pages/sign-up.html">
                        <i class="material-symbols-rounded opacity-5">assignment</i>
                        <span class="nav-link-text ms-1">Sign Up</span>
                    </a>
                </li>

                -->
      </ul>
    </div>
    <div class="sidenav-footer position-absolute w-100 bottom-0 ">
      <div class="mx-3">
        <RouterLink class="btn btn-outline-danger mt-4 w-100" to="/login">Sair</RouterLink>
      </div>
    </div>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SideNavbar'
});

</script>
