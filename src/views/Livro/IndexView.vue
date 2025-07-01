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
                    data-original-title="Edit user">
                    Edit
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
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
  name: 'IndexView',

  data() {
    return {
      listaLivros: [] as Array<{ id: number; imagem:string; nome: string; descricao: string, dataAquisicao: string; conservacao: string; id_edi: number; id_aut: number; }>,
    }
  },

  mounted() {
    this.buscarLivros();

  },

  methods: {
    async buscarLivros() {
      try {
        const response = await axios.get('http://localhost:3000/livro');

        if (response.status == 200) {
          this.listaLivros = response.data;
          console.log('Lista de Livros carregados!');
        }
      } catch (error) {
        console.error(error);
      }
    },
    async buscarEditora(editora: number): Promise<string> {
      try {
        const response = await axios.get('http://localhost:3000/editora', {
          params: {
            id: editora
          }
        });

        if (response.status == 200 || response.status == 201) {
          return response.data.nome;
        }
      } catch (error) {
        console.error(error);
      }
      return 'Desconhecida'
    },
    async buscarAutor(autor: number) {
      try {
        const response = await axios.get('http://localhost:3000/autor', {
          params: {
            id: autor
          }
        });

        if (response.status == 200) {
          return response.data.nome.toString();
        }
      } catch (error) {
        console.error(error);
      }
    },
  }


});
</script>
