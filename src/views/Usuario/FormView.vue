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
                <select name="txtCidade" id="txtCidade" class="form-control px-2" v-model="formDados.id_cid">
                  <option disabled selected>Selecione uma Cidade</option>
                  <option v-for="(cidade, index) in listaCidades" :key="index" :value="cidade.id"> {{ cidade.nome }}
                  </option>
                </select>
                <div class="text-danger" v-if="v$.formDados.id_cid.$errors.length">
                  <p class="fs-6" v-for="error of v$.formDados.id_cid.$errors" :key="error.$uuid">{{ error.$message }}
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
import { required, email, minLength, helpers, numeric } from '@vuelidate/validators';
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
      listaCidades: [] as Array<{ id: number; nome: string; id_est: number }>,
      formDados: {
        nome: "",
        email: "",
        contato: "",
        admin: false,
        senha: "",
        avaliacao: 0,
        id_cid: 0
      }
    }
  },

  validations() {
    return {
      formDados: {
        nome: { required: helpers.withMessage('O nome é Obrigatório', required), minLength: helpers.withMessage('Nome precisa conter no mínimo 4 letras!', minLength(4)) },
        email: { required: helpers.withMessage('O email é obrigatório', required), email: helpers.withMessage('O email é inválido!', email) },
        contato: { required: helpers.withMessage('O telefone é obrigatório', required), numeric: helpers.withMessage('O telefone precisa ser apenas numeros <ex: (69) 99265-3985>', numeric) },
        id_cid: { required: helpers.withMessage('A cidade é obrigatória', required) },
        senha: { required: helpers.withMessage('A senha é obrigatória', required), minLength: helpers.withMessage('Senha precisa conter no mínimo 6 caracteres!', minLength(6)) }
      }
    }
  },

  mounted() {
    this.buscarCidades();
  },

  methods: {
    async buscarIdUsuario(): Promise<number> {
      try {
        const response = await axios.get('http://localhost:3000/usuario');

        if (response.status == 200) {
          const listaUsuario = response.data;
          const ultimoid = listaUsuario.length + 1;
          return ultimoid;
        }
      } catch (error) {
        console.error(error);
      }
      return 1;
    },
    async buscarCidades() {
      try {
        const response = await axios.get('http://localhost:3000/cidade');

        if (response.status == 200) {
          this.listaCidades = response.data;
          console.log('Cidades carregadas!');
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
        id: this.buscarIdUsuario()
      }

      try {
        const response = await axios.post('http://localhost:3000/usuario', dados);

        if (response.status == 201 || response.status == 200) {
          Toast.fire({
            icon: 'success',
            title: 'Usuario Adicionado com sucesso!'
          }).then(() => {
            this.$router.push('/usuarios')
          });
        }
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: 'Não foi possivel Cadastrar Usuario!'
        }).then(() => {
          this.$router.push('/usuarios')
        });
        console.error(error);
      }
    },
  }
});
</script>
