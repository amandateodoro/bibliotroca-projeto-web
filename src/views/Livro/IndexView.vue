<template>
  <div class="row">
    <div class="col-12">
      <div class="card my-4">
        <div
          class="bg-primary shadow-dark border-radius-lg pt-4 pb-3 d-flex justify-content-between align-items-center">
          <h6 class="text-white text-capitalize ps-3">Livros</h6>
          <RouterLink to="/livros/create" class="btn btn-light me-3">Novo Livro</RouterLink>
        </div>
      </div>
      <div class="card-body px-0 pb-2">
        <div class="table-responsive p-0">
          <table class="table align-items-center mb-0">
            <thead>
              <tr>
                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                  Livro</th>
                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                  Data Aquisicao</th>
                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                  Estado de Conservação
                </th>
                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                  Editora
                </th>
                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                  Autor(a)
                </th>
                <th class="text-secondary opacity-7"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(livro, index) in listaLivros" :key="index">
                <td>
                  <div class="d-flex px-2 py-1">
                    <div>
                      <img :src="livro.imagem" class="img-thumbnail">
                    </div>
                    <div class="d-flex flex-column justify-content-center ms-4">
                      <h6 class="mb-0 text-sm">{{ livro.nome }}</h6>
                      <p class="text-xs text-secondary mb-0 text-wrap ms-1" style="white-space: pre-line;">{{ livro.descricao
                        }}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <p class="text-xs font-weight-bold mb-0">{{ livro.dataAquisicao }}</p>
                </td>
                <td class="align-middle text-center text-sm">
                  <span class="badge badge-sm" :class="{
                    'bg-success': livro.conservacao === 'Novo',
                    'bg-warning': livro.conservacao === 'Usado',
                    'bg-danger': livro.conservacao === 'Danificado'
                  }">
                    {{ livro.conservacao }}
                  </span>
                </td>
                <td class="align-middle text-center">
                  <span class="text-secondary text-xs font-weight-bold">{{ livro.id_edi }}</span>
                </td>

                <td class="align-middle text-center">
                  <span class="text-secondary text-xs font-weight-bold">{{ livro.id_aut }}</span>
                </td>
                <td class="align-middle">
                  <a href="javascript:;" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip"
                    data-original-title="Edit user" @click="editar(livro)">
                    🖊
                  </a>
                  <a href="javascript:;" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip"
                    data-original-title="Edit user" @click="excluir(livro)">
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
      listaLivros: [],
    }
  },

  mounted() {
    this.buscarLivros();

  },

  methods: {
    async buscarLivros() {
      try {
        const response = await api.get('/livro');

        if (response.status == 200) {
          this.listaLivros = response.data;
          console.log('Lista de Livros carregados!');
        }
      } catch (error) {
        console.error(error);
      }
    },

    editar(id) {
      this.$router.push(`/livros/${id}/update`);
    },

    excluir(livro) {

      Swal.fire({
        icon: "warning",
        title: `Deseja realmente excluir o Livro ${livro.nome}?`,
        // showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Sim",
        // confirmButtonColor: "#F68537",
        cancelButtonText: 'Não',
        cancelButtonColor: "#d33",
      }).then((result) => {
        if (result.isConfirmed) {
          this.excluirSalvar(livro);
        }
      });

    },

    async excluirSalvar(livro) {
      try {

        const response = await api.delete(`livro/${livro.id}`);

        if (response.status == 200) {
          Toast.fire({
            icon: "success",
            title: `Livro excluido com sucesso!`
          });

          this.buscarLivros();

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
