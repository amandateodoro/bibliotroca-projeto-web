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
        <form @submit.prevent="">
          <div class="p-2 mt-2">
            <div class="row">
              <div class="col-5">
                <label for="txtName" class="form-label">Nome <a style="color: red;">*</a></label>
                <input type="text" class="form-control p-2" id="txtName" placeholder="Nome do Livro" v-model="formDados.nome">
              </div>
            </div>
            <div class="row mt-2">
              <div class="col-5">
                <label for="txtSinopse" class="form-label">Descrição</label>
                <textarea name="txtSinopse" id="txtSinopse" class="form-control mt-1 p-2"
                  placeholder="Sinopse do livro" v-model="formDados.descricao"></textarea>
              </div>
            </div>
            <div class="row mt-2">
              <div class="col-5">
                <label for="txtData" class="form-label">Data de Aquisição</label>
                <input type="date" class="form-control p-2" id="txtData" placeholder=" Data de aquisição do livro" v-model="formDados.dataAquisicao">
              </div>
            </div>
            <div class="row mt-2">
              <div class="col-5">
                <label for="txtEstado" class="form-label">Estado de Conservação<a style="color: red;">*</a></label>
                <select name="txtEstado" id="txtEstado" class="form-control px-2" v-model="formDados.conservacao">
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
                :key="index" v-model="formDados.editora">
                  <option value="" disabled selected>Selecione um Estado</option>
                  <option value=""> {{ editora.nome }} </option>
                </select>
              </div>
            </div>
            <div class="row mt-2">
              <div class="col-5">
                <label for="txtAutor" class="form-label">Autor <a style="color: red;">*</a></label>
                <select name="txtAutor" id="txtAutor" class="form-control px-2" v-for="(autor, index) in listaAutores"
                :key="index" v-model="formDados.autor">
                  <option value="" disabled selected>Selecione um Estado</option>
                  <option value=""> {{ autor.nome }} </option>
                </select>
              </div>
            </div>
            <div class="d-flex justify-content-start gap-3">
              <router-link to="/livros" class="btn btn-secondary mt-4 px-9">Voltar</router-link>
              <button type="submit" class="btn btn-secondary mt-4 px-9">Cadastrar</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useVuelidate } from '@vuelidate/core'
import { required, helpers} from '@vuelidate/validators'

export default defineComponent({
  name: 'FormView',

  setup() {
    return {
      v$: useVuelidate()
    }
  },

  data() {
    return {
      formDados: {
        nome: '',
        descricao: '',
        dataAquisicao: '',
        conservacao: '',
        editora: '',
        autor: ''
      },
      listaEditoras: [] as Array<{ nome: string; }>,
      listaAutores: [] as Array<{ nome: string; }>,
    }
  },

  validations(){
    return {
      formDados: {
        nome: {required: helpers.withMessage('O nome é obrigatório', required)},
        descricao: {required},
        dataAquisicao: {required},
        conservacao: {required},
        editora: {required},
        autor: {required}
      }
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
    async salva(){
      const result = await this.v$.$validate()
      if (!result) {

        return
      }

      console.log('Dados do formulario', this.formDados);
    },
  }
});
</script>
