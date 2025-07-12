<template>
  <div class="row">
    <div class="col-12">
      <div class="card my-4">
        <div
          class="bg-secondary shadow-dark border-radius-lg pt-4 pb-3 d-flex justify-content-start align-items-center">
          <h6 class="text-white  ps-3">Novo Cadastro de Usuário</h6>
        </div>
      </div>
      <div class="container px-0 pb-2">
        <form @submit.prevent="salvar">
          <div class="p-2 mt-2">
            <div class="row">
              <div class="col-4 ">
                <label for="txtName" class="form-label">Nome <a style="color: red;">*</a></label>
                <input type="text" class="form-control p-2" id="txtName" placeholder="Nome do Usuário"
                  v-model="formDados.nome">
                <div class="text-danger" v-if="v$.formDados.nome.$errors.length">
                  <p class="fs-6" v-for="error of v$.formDados.nome.$errors" :key="error.$uuid"> <small>{{
                    error.$message }}</small></p>
                </div>
              </div>
            </div>
            <div class="row mt-2">
              <div class="col-5">
                <label for="txtEmail" class="form-label">E-mail <a style="color: red;">*</a></label>
                <input type="text" class="form-control p-2" id="txtEmail" placeholder=" E-mail para contato"
                  v-model="formDados.email">
                <div class="text-danger" v-if="v$.formDados.email.$errors.length">
                  <p class="fs-6" v-for="error of v$.formDados.email.$errors" :key="error.$uuid">{{ error.$message }}
                  </p>
                </div>
              </div>
            </div>
            <div class="row mt-2">
              <div class="col-5">
                <label for="txtTelefone" class="form-label">Telefone <a style="color: red;">*</a></label>
                <input type="text" class="form-control p-2" id="txtTelefone" placeholder=" Telefone para contato"
                  v-model="formDados.contato">
                <div class="text-danger" v-if="v$.formDados.contato.$errors.length">
                  <p class="fs-6" v-for="error of v$.formDados.contato.$errors" :key="error.$uuid">{{ error.$message }}
                  </p>
                </div>
              </div>
            </div>
            <div class="row mt-2">
              <div class="col-5">
                <label for="txtCidade" class="form-label">Cidade <a style="color: red;">*</a></label>
                <select name="txtCidade" id="txtCidade" class="form-control px-2" v-model="formDados.cidade">
                  <option disabled value="0">Selecione uma Cidade</option>
                  <option v-for="(cidade, index) in listaCidades" :key="index" :value="cidade.id"> {{ cidade.nome }}
                  </option>
                </select>
                <div class="text-danger" v-if="v$.formDados.cidade.$errors.length">
                  <p class="fs-6" v-for="error of v$.formDados.cidade.$errors" :key="error.$uuid">{{ error.$message }}
                  </p>
                </div>
              </div>
            </div>
            <div class="row mt-2">
              <div class="col-5">
                <label for="txtSenha" class="form-label">Senha <a style="color: red;">*</a></label>
                <input type="password" class="form-control p-2" id="txtSenha" placeholder="Digite uma senha"
                  v-model="formDados.senha">
                <div class="text-danger" v-if="v$.formDados.senha?.$errors.length">
                  <p class="fs-6" v-for="error of v$.formDados.senha.$errors" :key="error.$uuid">
                    {{ error.$message }}
                  </p>
                </div>
              </div>
            </div>
            <div class="d-flex justify-content-start gap-3">
              <RouterLink class="btn btn-warning mt-4 px-9" to="/usuarios">Voltar</RouterLink>
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
import { required, email, minLength, helpers, numeric, minValue } from '@vuelidate/validators';
import { api } from "@/common/http";
import { Toast } from "@/common/toast";
import { AxiosError } from "axios";
import Swal from "sweetalert2";

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
    this.buscarCidades();

    if (this.ehEdicao) {
      this.carregarDados();
    }
  },

  data() {
    return {
      listaCidades: [],
      formDados: {
        nome: "",
        email: "",
        contato: "",
        admin: false,
        senha: "",
        avaliacao: 0,
        cidade: 0
      }
    }
  },

  validations() {
    return {
      formDados: {
        nome: { required: helpers.withMessage('O nome é Obrigatório', required), minLength: helpers.withMessage('Nome precisa conter no mínimo 4 letras!', minLength(4)) },
        email: { required: helpers.withMessage('O email é obrigatório', required), email: helpers.withMessage('O email é inválido!', email) },
        contato: { required: helpers.withMessage('O telefone é obrigatório', required), numeric: helpers.withMessage('O telefone precisa ser apenas numeros <ex: 69992653985>', numeric) },
        cidade: { required: helpers.withMessage('A cidade é obrigatória', required), minValue: helpers.withMessage('Selecione uma cidade!', minValue(1)) },
        senha: { required: helpers.withMessage('A senha é obrigatória', required), minLength: helpers.withMessage('Senha precisa conter no mínimo 6 caracteres!', minLength(6)) }
      }
    }
  },

  methods: {
    async carregarDados() {

      try {
        const response = await api.get(`/usuario/${this.id}`);

        if (response.status != 200) {
          Toast.fire({
            icon: 'error',
            title: 'Ocorreram erros ao buscar a informação!'
          }).then(() => {
            this.$router.push('/usuarios');
          });
        }

        const dados = response.data;

        this.formDados = {
          nome: dados.nome,
          email: dados.email,
          contato: dados.contato,
          admin: dados.admin,
          senha: dados.senha,
          avaliacao: dados.avaliacao,
          cidade: dados.cidade.id
        }

      } catch (error) {
        console.error(error);
      }

    },

    async buscarCidades() {
      try {
        const response = await api.get('/cidade');

        if (response.status == 200) {
          if (response.data.length > 0) {
            this.listaCidades = response.data;
          }
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
        const response = await api.post('/usuario', dados).then(() => {
          Toast.fire({
            icon: 'success',
            title: 'Cadastro feito com sucesso!'
          }).then(() => {
            this.$router.push('/usuarios');
          });
        });
      } catch (error) {
        if (error instanceof AxiosError) {
          const { status, response } = error;

          if (status && status >= 500) {
            Toast.fire({
              icon: 'error',
              title: 'Não foi possivel realizar o cadastro!'
            }).then(() => {
              this.$router.push('/usuarios');
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
        const response = await api.put(`/usuario/${this.id}`, dados);

        if (!this.notificarError(response.status)) {
          Toast.fire({
            icon: 'success',
            title: 'Atualizado com sucesso!'
          }).then(() => {
            this.$router.push('/usuarios');
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
