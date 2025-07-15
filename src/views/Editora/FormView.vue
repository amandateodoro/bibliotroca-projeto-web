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
              <label for="txtContact" class="form-label">Email Contato <a style="color: red;">*</a></label>
              <input type="email" class="form-control p-2" id="txtContact" placeholder=" E-mail para contato" v-model="formDados.email">
              <div class="text-danger"  v-if="v$.formDados.email.$errors.length">
                  <p class="fs-6" v-for="error of v$.formDados.email.$errors" :key="error.$uuid">{{ error.$message }}</p>
                </div>
            </div>
          </div>
          <div class="d-flex justify-content-start gap-3">
            <RouterLink to="/editoras" type="button" class="btn btn-secondary mt-4 px-9">Voltar</RouterLink>
            <button type="submit" class="btn btn-secondary mt-4 px-9">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Toast } from "@/common/toast";
import useVuelidate from "@vuelidate/core";
import { email, helpers, minLength, required } from "@vuelidate/validators";
import { defineComponent } from "vue";
import Swal from "sweetalert2";
import { AxiosError } from "axios";
import { api } from "@/common/http";

export default defineComponent({
  name: 'FormView',

  setup() {
    return {
      v$: useVuelidate()
    }
  },

  computed: {
    id() {
      return this.$route.params.id || null;
    },

    ehEdicao() {
      return !!this.id;
    }
  },

  mounted() {
    if (this.ehEdicao) {
      this.carregarDados();
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

  methods: {
    async carregarDados() {
      try {
        const response = await api.get(`/editora/${this.id}`);

        if (response.status != 200) {
          Toast.fire({
            icon: "error",
            title: "Ocorreram erros ao buscar a informação!"
          }).then(() => {
            this.$router.push('/editoras');
          });
        }

        const dados = response.data;

        this.formDados = {
          nome: dados.nome,
          url: dados.url,
          email: dados.email
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
        ...this.formDados
      }

      try {

        if (this.ehEdicao) {
          this.edicaoSalvar(dados);
          return;
        }

        const response = await api.post('/editora', dados).then(() => {
          Toast.fire({
            icon: 'success',
            title: 'Cadastro feito com sucesso!'
          }).then (() => {
            this.$router.push('/editoras')
          });
        });
      } catch (error) {
        if (error instanceof AxiosError){
          const { status, response } = error;

          if(status && status >=500){
            Toast.fire({
              icon: 'error',
              title: 'Não foi possivel realizar o cadastro!'
            }).then(() => {
              this.$router.push('/editoras');
            });
            console.error(error);
          }

          const mensagensError = this.extrairMensagensDeErro(response?.data?.errors);

          Swal.fire({
            text: mensagensError.join(', '),
            icon: 'error',
            showConfirmButton: true,
            timer: 5000,
          });

        }
      }
    },

    async edicaoSalvar(dados) {
      try {
        const response = await api.patch(`/editora/${this.id}`, dados);

        if (!this.notificarError(response.status)) {
          Toast.fire({
            icon: 'success',
            title: 'Atualizado com sucesso!'
          }).then(() => {
            this.$router.push('/editoras');
          });
        }
      } catch (error) {
        console.error(error);
      }
    },

    notificarError(status: any) {
      if (status != 200 && status != 201) {
        Toast.fire({
          icon: "error",
          title: "Ocorreram erros ao processar os dados!"
        });

        return true;
      }

      return false;
    },

    extrairMensagensDeErro(errors: any) {
      const mensagens = [];

      if (errors) {
        for (const campo in errors) {
          if (Array.isArray(errors[campo])) {
            mensagens.push(...errors[campo]);
          }
        }
      }

      return mensagens;
    }
  }
});
</script>
