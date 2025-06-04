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
        <!--        <div
          class="alert alert-warning"
          role="alert"
          v-if="v$.$errors.length"
        >
          <p v-for="error of v$.$errors" :key="error.$uuid">
            <strong>{{ error.$property }}</strong>{{ error.$message }}
          </p>
        </div>
-->
        <form @submit.prevent="salvar">
          <div class="p-2 mt-2">
            <div class="row">
              <div class="col-4 ">
                <label for="txtName" class="form-label">Nome <a style="color: red;">*</a></label>
                <input type="text" class="form-control p-2" id="txtName" placeholder="Nome do Usuário" v-model="formDados.nome">
                <div class="text-danger"  v-if="v$.formDados.nome.$errors.length">
                  <p class="fs-6" v-for="error of v$.formDados.nome.$errors" :key="error.$uuid"> <small>{{ error.$message }}</small></p>
                </div>
              </div>
            </div>
            <div class="row mt-2">
              <div class="col-5">
                <label for="txtEmail" class="form-label">E-mail <a style="color: red;">*</a></label>
                <input type="text" class="form-control p-2" id="txtEmail" placeholder=" E-mail para contato" v-model="formDados.email">
                <div class="text-danger"  v-if="v$.formDados.email.$errors.length">
                  <p class="fs-6" v-for="error of v$.formDados.email.$errors" :key="error.$uuid">{{ error.$message }}</p>
                </div>
              </div>
            </div>
            <div class="row mt-2">
              <div class="col-5">
                <label for="txtTelefone" class="form-label">Telefone <a style="color: red;">*</a></label>
                <input type="text" class="form-control p-2" id="txtTelefone" placeholder=" Telefone para contato" v-model="formDados.telefone">
                <div class="text-danger"  v-if="v$.formDados.telefone.$errors.length">
                  <p class="fs-6" v-for="error of v$.formDados.telefone.$errors" :key="error.$uuid">{{ error.$message }}</p>
                </div>
              </div>
            </div>
            <div class="row mt-2">
              <div class="col-5">
                <label for="txtCidade" class="form-label">Cidade <a style="color: red;">*</a></label>
                <select name="txtCidade" id="txtCidade" class="form-control px-2"
                  v-for="(cidade, index) in listaCidades" :key="index">
                  <option disabled selected>Selecione uma Cidade</option>
                  <option value="{{ index }}"> {{ cidade.nome }} {{ cidade.uf }}</option>
                </select>
                <div class="text-danger"  v-if="v$.formDados.cidade.$errors.length">
                  <p class="fs-6" v-for="error of v$.formDados.cidade.$errors" :key="error.$uuid">{{ error.$message }}</p>
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
import { useVuelidate } from '@vuelidate/core'
import { required, email ,minLength, helpers, numeric} from '@vuelidate/validators'

export default defineComponent({
  name: 'FormView',

  setup() {
    return {
      v$: useVuelidate()
    }
  },

  data() {
    return {
      listaCidades: [] as Array<{ nome: string; uf: string }>,
      formDados: {
        nome: '',
        email: '',
        telefone: '',
        cidade: 0,
      }
    }
  },

  validations() {
    return {
      formDados: {
        nome: { required: helpers.withMessage('O nome é Obrigatório', required), minLength: helpers.withMessage('Nome precisa conter no mínimo 4 letras!', minLength(4))  },
        email: { required: helpers.withMessage('O email é obrigatório', required), email: helpers.withMessage('O email é inválido!', email) },
        telefone: { required: helpers.withMessage('O telefone é obrigatório', required), numeric: helpers.withMessage('O telefone precisa ser apenas numeros (ex: 69992653985)', numeric)},
        cidade: { required: helpers.withMessage('A cidade é obrigatória', required) },
      }
    }
  },

  mounted() {
    this.buscarCidades();
  },

  methods: {
    buscarCidades() {
      this.listaCidades.push({
        nome: 'Ji-Paraná',
        uf: 'RO'
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
