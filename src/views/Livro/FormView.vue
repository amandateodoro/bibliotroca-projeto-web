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
        <form @submit.prevent="salvar">
          <div class="p-2 mt-2">
            <div class="row">
              <div class="col-5">
                <label for="txtName" class="form-label">Nome <a style="color: red;">*</a></label>
                <input type="text" class="form-control p-2" id="txtName" placeholder="Nome do Livro" v-model="formDados.nome">
                <div class="text-danger"  v-if="v$.formDados.nome.$errors.length">
                  <p class="fs-6" v-for="error of v$.formDados.nome.$errors" :key="error.$uuid">{{ error.$message }}</p>
                </div>
              </div>
            </div>
            <div class="row mt-2">
              <div class="col-5">
                <label for="txtSinopse" class="form-label">Descrição <a style="color: red;">*</a></label>
                <textarea name="txtSinopse" id="txtSinopse" class="form-control mt-1 p-2"
                  placeholder="Sinopse do livro" v-model="formDados.descricao"></textarea>
                  <div class="text-danger"  v-if="v$.formDados.descricao.$errors.length">
                  <p class="fs-6" v-for="error of v$.formDados.descricao.$errors" :key="error.$uuid">{{ error.$message }}</p>
                </div>
              </div>
            </div>
            <div class="row mt-2">
              <div class="col-5">
                <label for="txtData" class="form-label">Data de Aquisição <a style="color: red;">*</a></label>
                <input type="date" class="form-control p-2" id="txtData" placeholder=" Data de aquisição do livro" v-model="formDados.dataAquisicao">
                <div class="text-danger"  v-if="v$.formDados.dataAquisicao.$errors.length">
                  <p class="fs-6" v-for="error of v$.formDados.dataAquisicao.$errors" :key="error.$uuid">{{ error.$message }}</p>
                </div>
              </div>
            </div>
            <div class="row mt-2">
              <div class="col-5">
                <label for="txtEstado" class="form-label">Estado de Conservação <a style="color: red;">*</a></label>
                <select name="txtEstado" id="txtEstado" class="form-control px-2" v-model="formDados.conservacao">
                  <option disabled selected>Selecione o estado de conservação do livro</option>
                  <option value="NOVO">Novo</option>
                  <option value="USADO">Usado</option>
                  <option value="DANIFICADO">Danificado</option>
                </select>
                <div class="text-danger"  v-if="v$.formDados.conservacao.$errors.length">
                  <p class="fs-6" v-for="error of v$.formDados.conservacao.$errors" :key="error.$uuid">{{ error.$message }}</p>
                </div>
              </div>
            </div>
            <div class="row mt-2">
              <div class="col-5">
                <label for="txtEditora" class="form-label">Editora <a style="color: red;">*</a></label>
                <select name="txtEditora" id="txtEditora" class="form-control px-2" v-for="(editora, index) in listaEditoras"
                :key="index" v-model="formDados.editora">
                  <option disabled selected>Selecione um Estado</option>
                  <option value="{{ editora.nome }}"> {{ editora.nome }} </option>
                </select>
                <div class="text-danger"  v-if="v$.formDados.editora.$errors.length">
                  <p class="fs-6" v-for="error of v$.formDados.editora.$errors" :key="error.$uuid">{{ error.$message }}</p>
                </div>
              </div>
            </div>
            <div class="row mt-2">
              <div class="col-5">
                <label for="txtAutor" class="form-label">Autor <a style="color: red;">*</a></label>
                <select name="txtAutor" id="txtAutor" class="form-control px-2" v-for="(autor, index) in listaAutores"
                :key="index" v-model="formDados.autor">
                  <option disabled selected>Selecione um Estado</option>
                  <option value="{{ autor.nome }}"> {{ autor.nome }} </option>
                </select>
                <div class="text-danger"  v-if="v$.formDados.autor.$errors.length">
                  <p class="fs-6" v-for="error of v$.formDados.autor.$errors" :key="error.$uuid">{{ error.$message }}</p>
                </div>
              </div>
            </div>
            <div class="d-flex justify-content-start gap-3">
              <RouterLink to="/livros" class="btn btn-secondary mt-4 px-9">Voltar</RouterLink>
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
import { required, helpers, minLength} from '@vuelidate/validators';

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
        descricao: {required: helpers.withMessage('A descrição é obrigatória', required), minLength: helpers.withMessage('faça uma pequena descrição', minLength(3))},
        dataAquisicao: {required: helpers.withMessage('A Data de Aquisição é obrigatório', required)},
        conservacao: {required: helpers.withMessage('O estado de conservação é obrigatório', required)},
        editora: {required: helpers.withMessage('A editora é obrigatória', required)},
        autor: {required: helpers.withMessage('O autor é obrigatório', required)}
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
    async salvar(){
      const result = await this.v$.$validate()
      if (!result) {

        return
      }

      console.log('Dados do formulario', this.formDados);
    },
  }
});
</script>
