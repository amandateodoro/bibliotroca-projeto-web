<template>
  <div class="row">
    <div class="col-12">
      <div class="card my-4">
        <div
          class="bg-primary shadow-dark border-radius-lg pt-4 pb-3 d-flex justify-content-between align-items-center">
          <h6 class="text-white text-capitalize ps-3">Usuarios</h6>
          <RouterLink to="/usuarios/create" class="btn btn-light me-3">Novo Usuário</RouterLink>
        </div>
      </div>
      <div class="card-body px-0 pb-2">
        <div class="table-responsive p-0">
          <table class="table align-items-center mb-0">
            <thead>
              <tr>
                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Nome
                </th>
                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">E-mail
                </th>
                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                  Telefone para Contato</th>
                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                  Avaliação
                </th>
                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                  Cidade
                </th>
                <th class="text-secondary opacity-7"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(usuario, index) in usuarios" :key="index">
                <td>
                  <div class="d-flex px-2 py-1">
                    <div class="d-flex flex-column justify-content-center">
                      <h6 class="mb-0 text-sm">{{ usuario.nome }}</h6>
                    </div>
                  </div>
                </td>
                <td>
                  <p class="text-xs text-secondary mb-0">{{ usuario.email }}</p>
                </td>
                <td>
                  <p class="text-xs font-weight-bold mb-0">{{ usuario.contato }}</p>
                </td>
                <td class="align-middle text-center text-sm">
                  <span class="text-secondary text-xs font-weight-bold">{{ usuario.avaliacao
                    }}</span>
                </td>
                <td class="align-middle text-center">
                  <span class="text-secondary text-xs font-weight-bold">{{ usuario.cidade.nome }}</span>
                </td>
                <td class="align-middle">
                  <a href="javascript:;" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip"
                    data-original-title="Edit user" @click="editar(usuario)">
                    🖊
                  </a>
                  <a href="javascript:;" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip"
                    data-original-title="Edit user" @click="excluir(usuario)">
                    🗑
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { api } from '@/common/http';
import { Toast } from '@/common/toast';
import Swal from 'sweetalert2';
import { defineComponent } from "vue";

export default defineComponent({
  name: 'IndexView',

  data() {
    return {
      usuarios: [],
    }
  },

  mounted() {
    this.buscarUsuarios();
  },

  methods: {
    async buscarUsuarios() {
      try {
        const response = await api.get('/usuario');

        if (response.status == 200) {
          this.usuarios = response.data;
          console.log('Lista de Usuarios carregados!');
        }
      } catch (error) {
        console.error(error);
      }
    },
    editar(usuario) {
      const usuarioLogado = JSON.parse(localStorage.getItem('usuario') || 'null');

      const podeExcluir = usuarioLogado?.admin || usuarioLogado?.id === usuario.id;

      if (!podeExcluir) {
        Toast.fire({
          icon: "warning",
          title: "Você não tem permissão para editar este Usuario"
        });
        return;
      }
      this.$router.push(`/usuarios/${usuario.id}/update`);
    },

    excluir(usuario) {

      Swal.fire({
        icon: "warning",
        title: `Deseja realmente excluir o Usuairo ${usuario.nome}?`,
        // showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Sim",
        // confirmButtonColor: "#F68537",
        cancelButtonText: 'Não',
        cancelButtonColor: "#d33",
      }).then((result) => {
        if (result.isConfirmed) {
          this.excluirSalvar(usuario);
        }
      });

    },


    async excluirSalvar(usuario) {
      const usuarioLogado = JSON.parse(localStorage.getItem('usuario') || 'null');

      const podeExcluir = usuarioLogado?.admin || usuarioLogado?.id === usuario.id;

      if (!podeExcluir) {
        Toast.fire({
          icon: "warning",
          title: "Você não tem permissão para excluir este usuário"
        });
        return;
      }
      try {

        const response = await api.delete(`usuario/${usuario.id}`);

        if (response.status == 200) {
          Toast.fire({
            icon: "success",
            title: `Usuario excluido com sucesso!`
          }).then(() => {
            if (usuarioLogado?.id === usuario.id) {
              localStorage.clear();

              this.$router.push('/login'); // redireciona para tela de login

              Toast.fire({ icon: 'info', title: 'Sessão encerrada!' });
            }
          });

          this.buscarUsuarios();

          return;
        }

        Toast.fire({
          icon: "error",
          title: 'Ocorreram erros ao processar a solicitação'
        });

      } catch { }
    },
  }

});
</script>
