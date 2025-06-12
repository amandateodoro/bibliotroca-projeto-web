<template>
  <div class="row">
    <div class="col-12">
      <div class="card my-4">
        <div
          class="bg-secondary shadow-dark border-radius-lg pt-4 pb-3 d-flex justify-content-between align-items-center">
          <h6 class="text-white ps-3">Novo Cadastro de Cidade</h6>
        </div>
      </div>
      <div class="container px-0 pb-2">
        <form @submit.prevent="salvar">
          <div class="row">
            <div class="col-5">
              <label for="txtName" class="form-label">Nome <a style="color: red;">*</a></label>
              <input type="text" class="form-control p-2" id="txtName" placeholder=" Nome da Cidade" v-model="formDados.nome">
              <div class="text-danger"  v-if="v$.formDados.nome.$errors.length">
                <p class="fs-6" v-for="error of v$.formDados.nome.$errors" :key="error.$uuid"> <small>{{ error.$message }}</small></p>
              </div>
            </div>
          </div>
          <div class="row mt-2">
            <div class="col-5">
              <label for="txtName" class="form-label">Estado <a style="color: red;">*</a></label>
              <select name="txtEstado" id="txtEstado" class="form-control px-2" 
              v-for="(estado, index) in listaEstados" :key="index">
                <option disabled selected>Selecione um Estado</option>
                <option value="{{ index }}"> {{ estado.nome }} - {{ estado.uf }}</option>
              </select>
              <div class="text-danger"  v-if="v$.formDados.uf.$errors.length">
                  <p class="fs-6" v-for="error of v$.formDados.uf.$errors" :key="error.$uuid">{{ error.$message }}</p>
                </div>
            </div>
          </div>
          <div class="d-flex justify-content-start gap-3">
            <RouterLink class="btn btn-warning mt-4 px-9" to="/cidades">Voltar</RouterLink>
            <button type="submit" class="btn btn-secondary mt-4 px-9">Cadastrar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import useVuelidate from "@vuelidate/core";
import { helpers, required, minLength, maxLength } from "@vuelidate/validators";

export default defineComponent({
  name: 'FormView',

  setup() {
    return {
      v$: useVuelidate()
    }
  },

  data() {
    return {
      listaEstados: [] as Array<{ nome: string; uf: string; }>,
      formDados: {
        nome: '',
        uf: ''
      },
    }
  },

  validations() {
    return {
      formDados: {
        nome: { required: helpers.withMessage('O nome é Obrigatório', required), minLength: helpers.withMessage('Nome precisa conter no mínimo 4 letras!', minLength(4)) },
        uf: { required: helpers.withMessage('A sigla é obrigatória', required), maxLength: helpers.withMessage('A sigla só pode conter 2 caracteres', maxLength(2)), 
        minLength: helpers.withMessage('A sigla precisa conter no mínimo 2 caracteres', minLength(2)) }
      },
    }
  },

  mounted() {
    this.buscarEstados();
  },

  methods: {
    buscarEstados() {
      this.listaEstados.push({
        nome: 'Rondônia',
        uf: 'RO'
      });
    },
    async salvar() {
      const result = await this.v$.$validate()

      if (!result) {
        return
      }

      console.log('Dados do Formulário', this.formDados);
    }
  }
});
</script>
