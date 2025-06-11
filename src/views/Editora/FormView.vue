<template>
  <div class="row">
    <div class="col-12">
      <div class="card my-4">
        <div
          class="bg-secondary shadow-dark border-radius-lg pt-4 pb-3 d-flex justify-content-start align-items-center">
          <h6 class="text-white  ps-3">Novo Cadastro de Editora</h6>
        </div>
      </div>
      <div class="container px-0 pb-2">
        <form @submit.prevent="salvar">
          <div class="row">
            <div class="col-5">
              <label for="txtName" class="form-label">Nome <a style="color: red;">*</a></label>
              <input type="text" class="form-control p-2" id="txtName" placeholder=" Nome da Editora" v-model="formDados.nome">
              <div class="text-danger"  v-if="v$.formDados.nome.$errors.length">
                  <p class="fs-6" v-for="error of v$.formDados.nome.$errors" :key="error.$uuid">{{ error.$message }}</p>
                </div>
            </div>
          </div>
          <div class="row mt-2">
            <div class="col-5">
              <label for="txtUrl" class="form-label">URL</label>
              <input type="url" class="form-control p-2" id="txtUrl" placeholder=" URL do site da Editora" v-model="formDados.url">
            </div>
          </div>
          <div class="row mt-2">
            <div class="col-5">
              <label for="txtContact" class="form-label">Email Contato</label>
              <input type="email" class="form-control p-2" id="txtContact" placeholder=" E-mail para contato" v-model="formDados.email">
              <div class="text-danger"  v-if="v$.formDados.email.$errors.length">
                  <p class="fs-6" v-for="error of v$.formDados.email.$errors" :key="error.$uuid">{{ error.$message }}</p>
                </div>
            </div>
          </div>
          <div class="d-flex justify-content-start gap-3">
            <RouterLink to="/editoras" type="button" class="btn btn-secondary mt-4 px-9">Cadastrar</RouterLink>
            <button type="submit" class="btn btn-secondary mt-4 px-9">Cadastrar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import useVuelidate from "@vuelidate/core";
import { email, helpers, minLength, required } from "@vuelidate/validators";
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
      formDados: {
        nome: '',
        url: '',
        email: ''
      },
    }
  },

  validations() {
    return {
      formDados: {
        nome: { required: helpers.withMessage('O nome é Obrigatório', required), minLength: helpers.withMessage('Nome completo da Editora !', minLength(4)) },
        email: { required: helpers.withMessage('O email é obrigatório', required), email: helpers.withMessage('O email é inválido!', email) }
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

      console.log('Dados dO Formulário', this.formDados);

    }
  }
});
</script>
