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
              <input type="text" class="form-control p-2" id="txtName" placeholder=" Nome da Cidade"
                v-model="formDados.nome">
              <div class="text-danger" v-if="v$.formDados.nome.$errors.length">
                <p class="fs-6" v-for="error of v$.formDados.nome.$errors" :key="error.$uuid"> <small>{{ error.$message
                    }}</small></p>
              </div>
            </div>
          </div>
          <div class="row mt-2">
            <div class="col-5">
              <label for="txtName" class="form-label">Estado <a style="color: red;">*</a></label>
              <select name="txtEstado" id="txtEstado" class="form-control px-2" v-model="formDados.id_est">
                <option disabled selected>Selecione um Estado</option>
                <option v-for="(estado, index) in listaEstados"
                :key="index" :value="estado.id"> {{ estado.nome }} - {{ estado.uf }}</option>
              </select>
              <div class="text-danger" v-if="v$.formDados.id_est.$errors.length">
                <p class="fs-6" v-for="error of v$.formDados.id_est.$errors" :key="error.$uuid">{{ error.$message }}</p>
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
import { helpers, required, minLength } from "@vuelidate/validators";
import axios from "axios";
import { Toast } from "@/common/toast";

export default defineComponent({
  name: 'FormView',

  setup() {
    return {
      v$: useVuelidate()
    }
  },

  data() {
    return {
      listaEstados: [] as Array<{ id: number; nome: string; uf: string; }>,
      formDados: {
        nome: '',
        id_est: ''
      },
    }
  },

  validations() {
    return {
      formDados: {
        nome: { required: helpers.withMessage('O nome é Obrigatório', required), minLength: helpers.withMessage('Nome precisa conter no mínimo 4 letras!', minLength(4)) },
        id_est: { required: helpers.withMessage('O estado é obrigatório!', required) }
      },
    }
  },

  mounted() {
    this.buscarEstados();
  },

  methods: {
    async buscarEstados() {
      try {
        const response = await axios.get('http://localhost:3000/estado');
        if (response.status == 200) {
          this.listaEstados = response.data;
          console.log('Estados Carregados!');
        }
      } catch (error) {
        console.error(error)
      }
    },
    async buscarIdCidade() {
      try {
        const response = await axios.get('http://localhost:3000/cidade');
        if (response.status == 200) {
          const listaCidade = response.data;
          const ultimoid = listaCidade.length + 1;
          return ultimoid;
        }
      } catch (error) {
        console.error(error);
      }
    },
    async salvar() {
      const result = await this.v$.$validate()

      if (!result) {
        return
      }

      const dados = {
        ...this.formDados,
        id: this.buscarIdCidade()
      }

      try {
        const response = await axios.post('http://localhost:3000/cidade', dados);

        if (response.status == 200 || response.status == 201) {
          Toast.fire({
            icon: 'success',
            title: 'Cidade Adicionada com sucesso!'
          }).then(() => {
            this.$router.push('/cidades')
          });
        }
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: 'Não foi possivel Cadastrar Cidade!'
        }).then(() => {
          this.$router.push('/cidades')
        });
        console.error(error);
      }
    }
  }
});
</script>
