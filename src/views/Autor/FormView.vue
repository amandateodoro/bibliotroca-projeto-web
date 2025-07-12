<template>
  <div class="row">
    <div class="col-12">
      <div class="card my-4">
        <div
          class="bg-secondary shadow-dark border-radius-lg pt-4 pb-3 d-flex justify-content-start align-items-center">
          <h6 class="text-white  ps-3">Novo Cadastro de Autor</h6>
        </div>
      </div>
      <div class="container px-0 pb-2">
        <form @submit.prevent="salvar">
          <div class="p-2 mt-2">
            <div class="row mt-2">
              <div class="col">
                <label for="txtImagemLink" class="form-label">Link da Imagem</label>
                <input type="text" class="form-control p-2" id="txtImagemLink" placeholder="URL da imagem"
                  v-model="formDados.imagem">
                <div v-if="formDados.imagem" class="mt-2">
                  <img :src="formDados.imagem" alt="Prévia da imagem" class="img-thumbnail" style="max-width: 200px;">
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-4 ">
                <label for="txtName" class="form-label">Nome <a style="color: red;">*</a></label>
                <input type="text" class="form-control p-2" id="txtName" placeholder=" Nome do Autor"
                  v-model="formDados.nome">
                <div class="text-danger" v-if="v$.formDados.nome.$errors.length">
                  <p class="fs-6" v-for="error of v$.formDados.nome.$errors" :key="error.$uuid">{{ error.$message }}</p>
                </div>
              </div>
            </div>
            <div class="row mt-2">
              <div class="col">
                <label for="txtData" class="form-label">Data Nascimento <a style="color: red;">*</a></label>
                <input type="date" class="form-control p-2" id="txtData" placeholder=" Data Nascimento Autor"
                  v-model="formDados.dataNascimento">
                <div class="text-danger" v-if="v$.formDados.dataNascimento.$errors.length">
                  <p class="fs-6" v-for="error of v$.formDados.dataNascimento.$errors" :key="error.$uuid">{{
                    error.$message }}</p>
                </div>
              </div>
              <div class="col">
                <label for="txtEmail" class="form-label">Email <a style="color: red;">*</a></label>
                <input type="mail" class="form-control p-2" id="txtEmail" placeholder=" Email do Autor"
                  v-model="formDados.email">
                <div class="text-danger" v-if="v$.formDados.email.$errors.length">
                  <p class="fs-6" v-for="error of v$.formDados.email.$errors" :key="error.$uuid">{{ error.$message }}
                  </p>
                </div>
              </div>
            </div>
            <div class="row mt-2">
              <div class="col">
                <label for="txtBibliografia" class="form-label">Bibliografia</label>
                <textarea name="txtBibliografia" id="txtBibliografia" class="form-control mt-1 p-2"
                  placeholder=" Bibliografia do autor" v-model="formDados.biografia"></textarea>
              </div>
            </div>
            <div class="d-flex justify-content-start gap-3">
              <RouterLink class="btn btn-warning mt-4 px-9" to="/autores">Voltar</RouterLink>
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
import { useVuelidate } from '@vuelidate/core';
import { helpers, required, minLength, email } from "@vuelidate/validators";
import { Toast } from "@/common/toast";
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
        dataNascimento: '',
        biografia: '',
        email: '',
        imagem: '',
      }
    }
  },

  validations() {
    return {
      formDados: {
        nome: { required: helpers.withMessage('O nome é obrigatório', required), minLength: helpers.withMessage('Nome precisa conter no mínimo 4 letras!', minLength(4)) },
        dataNascimento: { required: helpers.withMessage('A Data de nascimento é obrigatório', required) },
        email: { required: helpers.withMessage('O Email é obrigatório', required), email: helpers.withMessage('O email é inválido!', email) }
      }
    }
  },  

  methods: {
    async carregarDados() {
      try {
        const response = await api.get(`/autor/${this.id}`);

        if (response.status != 200) {
          Toast.fire({
            icon: "error",
            title: "Ocorreram erros ao buscar a informação!"
          }).then(() => {
            this.$router.push('/autores');
          });
        } 

        const dados = response.data;

        this.formDados = {
          nome: dados.nome,
          dataNascimento: dados.dataNascimento,
          biografia: dados.biografia,
          email: dados.email,
          imagem: dados.imagem
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

        const response = await api.post('/autor', dados).then(() => {
          Toast.fire({
            icon: 'success',
            title: 'Cadastro feito com sucesso!'
          }).then (() => {
            this.$router.push('/autores')
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
              this.$router.push('/autores');
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
        const response = await api.put(`/autor/${this.id}`, dados);

        if (!this.notificarError(response.status)) {
          Toast.fire({
            icon: 'success',
            title: 'Atualizado com sucesso!'
          }).then(() => {
            this.$router.push('/autores');
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
