<template>
  <div class="row">
    <div class="col-12">
      <div class="card my-4">
        <div
          class="bg-secondary shadow-dark border-radius-lg pt-4 pb-3 d-flex justify-content-start align-items-center">
          <h6 class="text-white  ps-3">Novo Cadastro de Estado</h6>
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
                <p class="fs-6" v-for="error of v$.formDados.nome.$errors" :key="error.$uuid">{{ error.$message }}</p>
              </div>
            </div>
          </div>
          <div class="row mt-2">
            <div class="col-5">
              <label for="txtSigla" class="form-label">UF <a style="color: red;">*</a></label>
              <input type="text" class="form-control p-2" id="txtSigla" placeholder=" Sigla do Estado" maxlength="2"
                v-model="formDados.uf">
              <div class="text-danger" v-if="v$.formDados.uf.$errors.length">
                <p class="fs-6" v-for="error of v$.formDados.uf.$errors" :key="error.$uuid">{{ error.$message }}</p>
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-start gap-3">
            <RouterLink to="/cidades" type="button" class="btn btn-secondary mt-4 px-9">Voltar</RouterLink>
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
import { helpers, maxLength, minLength, required } from "@vuelidate/validators";
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
        uf: '',
        nome: ''
      },
    }
  },

  validations() {
    return {
      formDados: {
        uf: { required: helpers.withMessage('A sigla (UF) é Obrigatório', required), maxLength: helpers.withMessage('UF precisa conter no máximo 2 letras!', maxLength(2)) },
        nome: { required: helpers.withMessage('O nome é Obrigatório', required), minLength: helpers.withMessage('Nome precisa ser um Estado Válido!', minLength(4)) }
      },
    }
  },

  methods: {
    async carregarDados() {
      try {
        const response = await api.get(`/estado/${this.id}`);

        if (response.status != 200) {
          Toast.fire({
            icon: "error",
            title: "Ocorreram erros ao buscar a informação!"
          }).then(() => {
            this.$router.push('/estados');
          });
        }

        const dados = response.data;

        this.formDados = {
          nome: dados.nome,
          uf: dados.uf
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

        const response = await api.post('/estado', dados).then(() => {
          Toast.fire({
            icon: 'success',
            title: 'Cadastro feito com sucesso!'
          }).then (() => {
            this.$router.push('/estados')
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
              this.$router.push('/estados');
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
        const response = await api.patch(`/estado/${this.id}`, dados);

        if (!this.notificarError(response.status)) {
          Toast.fire({
            icon: 'success',
            title: 'Atualizado com sucesso!'
          }).then(() => {
            this.$router.push('/estados');
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
