<template>
  <div class="row">
    <div class="col-12">
      <div class="card my-4">
        <div
          class="bg-secondary shadow-dark border-radius-lg pt-4 pb-3 d-flex justify-content-start align-items-center">
          <h6 class="text-white  ps-3">Novo Cadastro de Livro</h6>
        </div>
      </div>
      <div class="container px-0 pb-2">
        <form>
          <div class="p-2 mt-2">
            <div class="row">
              <div class="col-5">
                <label for="txtName" class="form-label">Nome <a style="color: red;">*</a></label>
                <input type="text" class="form-control p-2" id="txtName" placeholder="Nome do Livro">
              </div>
            </div>
            <div class="row mt-2">
              <div class="col-5">
                <label for="txtSinopse" class="form-label">Descrição</label>
                <textarea name="txtSinopse" id="txtSinopse" class="form-control mt-1 p-2"
                  placeholder="Sinopse do livro"></textarea>
              </div>
            </div>
            <div class="row mt-2">
              <div class="col-5">
                <label for="txtData" class="form-label">Data de Aquisição</label>
                <input type="date" class="form-control p-2" id="txtData" placeholder=" Data de aquisição do livro">
              </div>
            </div>
            <div class="row mt-2">
              <div class="col-5">
                <label for="txtEstado" class="form-label">Estado de Conservação<a style="color: red;">*</a></label>
                <select name="txtEstado" id="txtEstado" class="form-control px-2">
                  <option value="" disabled selected>Selecione o estado de conservação do livro</option>
                  <option value="">Novo</option>
                  <option value="">Usado</option>
                  <option value="">Danificado</option>
                </select>
              </div>
            </div>
            <div class="row mt-2">
              <div class="col-5">
                <label for="txtEditora" class="form-label">Editora <a style="color: red;">*</a></label>
                <select name="txtEditora" id="txtEditora" class="form-control px-2" v-for="(editora, index) in listaEditoras" 
                :key="index">
                  <option value="" disabled selected>Selecione um Estado</option>
                  <option value=""> {{ editora.nome }} </option>
                </select>
              </div>
            </div>
            <div class="row mt-2">
              <div class="col-5">
                <label for="txtAutor" class="form-label">Autor <a style="color: red;">*</a></label>
                <select name="txtAutor" id="txtAutor" class="form-control px-2" v-for="(autor, index) in listaAutores" 
                :key="index">
                  <option value="" disabled selected>Selecione um Estado</option>
                  <option value=""> {{ autor.nome }} </option>
                </select>
              </div>
            </div>
            <div class="d-flex justify-content-start">
              <a href="/livros" type="button" class="btn btn-secondary mt-4 px-9">Cadastrar</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: 'FormView',

  data() {
    return {
      listaLivros: [] as Array<{ nome: string; descricao: string, dataAquisicao: string; conservacao: string; editora: string; autor: string; }>,
      listaEditoras: [] as Array<{ nome: string; }>,
      listaAutores: [] as Array<{ nome: string; }>,
    }
  },

  mounted() {
    this.buscarEditoras();
    this.buscarAutores();
  },

  methods: {
    buscarEditoras() {
      this.listaEditoras.push({
        nome: 'Rocco'
      });
    },
    buscarAutores() {
      this.listaAutores.push({
        nome: 'J.K. Rowling'
      });
    },
  }
});
</script>
