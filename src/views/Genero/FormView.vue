<template>
  <div class="row">
    <div class="col-12">
      <div class="card my-4">
        <div
          class="bg-secondary shadow-dark border-radius-lg pt-4 pb-3 d-flex justify-content-start align-items-center">
          <h6 class="text-white  ps-3">Novo Cadastro de Gênero Literário</h6>
        </div>
      </div>
      <div class="container px-0 pb-2">
        <form @submit.prevent="salvar">
          <div class="p-2 mt-2">
            <div class="row">
              <div class="col-5">
                <label for="txtName" class="form-label">Nome <a style="color: red;">*</a></label>
                <input type="text" class="form-control p-2" id="txtName" placeholder="Nome do Gênero"
                  v-model="formDados.nome">
                <div class="text-danger" v-if="v$.formDados.nome.$errors.length">
                  <p class="fs-6" v-for="error of v$.formDados.nome.$errors" :key="error.$uuid">{{ error.$message }}</p>
                </div>
              </div>
            </div>
            <div class="row mt-2">
              <div class="col-5">
                <label for="txtDescricao" class="form-label">Descrição<a style="color: red;">*</a></label>
                <textarea name="txtBibliografia" id="txtBibliografia" class="form-control mt-1 p-2"
                  placeholder="Informações sobre o gênero literário" v-model="formDados.descricao"></textarea>
                <div class="text-danger" v-if="v$.formDados.descricao.$errors.length">
                  <p class="fs-6" v-for="error of v$.formDados.descricao.$errors" :key="error.$uuid">{{ error.$message
                    }}</p>
                </div>
              </div>
            </div>
            <div class="d-flex justify-content-start">
              <RouterLink to="/generos" class="btn btn-warning mt-4 px-9">Voltar</RouterLink>
              <button type="submit" class="btn btn-secondary mt-4 px-9">Cadastrar</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import useVuelidate from "@vuelidate/core";
import { helpers, minLength, required } from "@vuelidate/validators";
import { defineComponent } from "vue";

export default defineComponent({
  name: 'FormView',

  setup() {
    return {
      v$: useVuelidate()
    }
  },

  data() {
    return {
      formDados:
      {
        nome: '',
        descricao: ''
      },
    }
  },

  validations() {
    return {
      formDados:
      {
        nome: { required: helpers.withMessage('O nome é Obrigatório', required), minLength: helpers.withMessage('Nome precisa conter no mínimo 4 letras!', minLength(4)) },
        descricao: { required: helpers.withMessage('A descrição é Obrigatória', required) }
      },
    }
  },

  mounted() {

  },

  methods: {
    async salvar() {
      const result = await this.v$.$validate()
      if (!result) {
        return
      }

      console.log('Dados do formulario', this.formDados);
    }
  }
});
</script>
