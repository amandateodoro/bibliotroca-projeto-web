<template>
  <div class="row">
    <div class="col-12">
      <div class="card my-4">
        <div
          class="bg-primary shadow-dark border-radius-lg pt-4 pb-3 d-flex justify-content-between align-items-center">
          <h6 class="text-white text-capitalize ps-3">Autores</h6>
          <a href="/autores/create" type="button" class="btn btn-light me-3">Novo Autor</a>
        </div>
      </div>
      <div class="card-body px-0 pb-2">
        <div class="table-responsive p-0">
          <table class="table align-items-center mb-0">
            <thead>
              <tr>
                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Nome
                </th>
                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Data de Nascimento
                </th>
                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                  Contato</th>
                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                  Bibliografia
                </th>
                <th class="text-secondary opacity-7"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(autor, index) in listaAutores" :key="index">
                <td>
                  <div class="d-flex px-2 py-1">
                    <div>
                      <img
                        :src="autor.imagem ? autor.imagem : 'https://i.pinimg.com/1200x/74/29/1f/74291f7447579619d38f70867c6ae122.jpg'"
                        class="avatar avatar-sm me-3 border-radius-lg" alt="user1">
                    </div>
                    <div class="d-flex flex-column justify-content-center">
                      <h6 class="mb-0 text-sm">{{ autor.nome }}</h6>
                    </div>
                  </div>
                </td>
                <td class="align-middle text-center">
                  <p class="text-xs text-secondary mb-0">
                    {{ new Date(autor.dataNascimento).toLocaleDateString('pt-BR') }}
                  </p>
                </td>
                <td>
                  <p class="text-xs font-weight-bold mb-0">{{ autor.email }}</p>
                </td>
                <td>
                  <p class="text-xs font-weight-bold mb-0 text-wrap">{{ autor.biografia }}</p>
                </td>
                <td class="align-middle">
                  <a href="javascript:;" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip"
                    data-original-title="Edit user" @click="editar(autor)">
                    🖊
                  </a>
                  <a href="javascript:;" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip"
                    data-original-title="Edit user" @click="excluir(autor)">
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
import { api } from "@/common/http";
import { Toast } from "@/common/toast";
import Swal from "sweetalert2";
import { defineComponent } from "vue";

export default defineComponent({
  name: 'IndexView',

  data() {
    return {
      listaAutores: []
    }
  },

  mounted() {
    this.buscarAutores();

  },

  methods: {
    async buscarAutores() {
      try {
        const response = await api.get('/autor');
        if (response.status == 200) {
          this.listaAutores = response.data
          console.log('Lista de Autores Carregada!');
        }
      } catch (error) {
        console.error(error);
      }
    },
    editar(id) {
      this.$router.push(`/autors/${id}/update`);
    },

    excluir(autor) {

      Swal.fire({
        icon: "warning",
        title: `Deseja realmente excluir o Autor ${autor.nome}?`,
        // showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Sim",
        // confirmButtonColor: "#F68537",
        cancelButtonText: 'Não',
        cancelButtonColor: "#d33",
      }).then((result) => {
        if (result.isConfirmed) {
          this.excluirSalvar(autor);
        }
      });

    },


    async excluirSalvar(autor) {
      try {

        const response = await api.delete(`autor/${autor.id}`);

        if (response.status == 200) {
          Toast.fire({
            icon: "success",
            title: `Autor excluido com sucesso!`
          });

          this.buscarAutores();

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
