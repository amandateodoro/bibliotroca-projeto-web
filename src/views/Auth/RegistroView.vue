<template>
  <div class="d-flex justify-content-center align-items-center vh-100 bg-primary bg-opacity-75">
    <div class="container py-4">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card shadow-sm">
            <div class="card-header bg-secondary text-white">
              <h5 class="mb-0">Criar Conta</h5>
            </div>
            <div class="card-body">
              <form @submit.prevent="registrar">
                <div class="mb-3">
                  <label for="nome" class="form-label">Nome</label>
                  <input type="text" class="form-control" id="nome" v-model="form.nome" />
                  <div class="text-danger small" v-if="v$.form.nome.$errors.length">
                    <p v-for="error of v$.form.nome.$errors" :key="error.$uid">{{ error.$message }}</p>
                  </div>
                </div>

                <div class="mb-3">
                  <label for="email" class="form-label">E-mail</label>
                  <input type="email" class="form-control" id="email" v-model="form.email" />
                  <div class="text-danger small" v-if="v$.form.email.$errors.length">
                    <p v-for="error of v$.form.email.$errors" :key="error.$uid">{{ error.$message }}</p>
                  </div>
                </div>

                <div class="mb-3">
                  <label for="cidade" class="form-label">Cidade</label>
                  <select class="form-select" id="cidade" v-model="form.cidade">
                    <option disabled value="0">Selecione uma cidade</option>
                    <option v-for="(cidade, index) in listaCidades" :key="index" :value="cidade.id">
                      {{ cidade.nome }}
                    </option>
                  </select>
                  <div class="text-danger small" v-if="v$.form.cidade.$errors.length">
                    <p v-for="error of v$.form.cidade.$errors" :key="error.$uid">{{ error.$message }}</p>
                  </div>
                </div>


                <div class="mb-3">
                  <label for="senha" class="form-label">Senha</label>
                  <input type="password" class="form-control" id="senha" v-model="form.senha" />
                  <div class="text-danger small" v-if="v$.form.senha.$errors.length">
                    <p v-for="error of v$.form.senha.$errors" :key="error.$uid">{{ error.$message }}</p>
                  </div>
                </div>

                <div class="mb-3">
                  <label for="confirmarSenha" class="form-label">Confirmar Senha</label>
                  <input type="password" class="form-control" id="confirmarSenha" v-model="form.confirmarSenha" />
                  <div class="text-danger small" v-if="v$.form.confirmarSenha.$errors.length">
                    <p v-for="error of v$.form.confirmarSenha.$errors" :key="error.$uid">{{ error.$message }}</p>
                  </div>
                </div>

                <div class="d-flex justify-content-between">
                  <RouterLink to="/login" class="btn btn-warning">Voltar</RouterLink>
                  <button type="submit" class="btn btn-secondary">Cadastrar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, sameAs, helpers, minValue } from '@vuelidate/validators'
import { api } from '@/common/http'
import { Toast } from '@/common/toast'

export default defineComponent({
  name: 'RegistroView',
  setup() {
    return {
      v$: useVuelidate()
    }
  },
  data() {
    return {
      form: {
        nome: '',
        email: '',
        senha: '',
        confirmarSenha: '',
        cidade: 0
      },
      listaCidades: []
    }
  },
  validations() {
    return {
      form: {
        nome: { required: helpers.withMessage('Nome é obrigatório', required) },
        email: {
          required: helpers.withMessage('Email é obrigatório', required),
          email: helpers.withMessage('Email inválido', email)
        },
        senha: {
          required: helpers.withMessage('Senha é obrigatória', required),
          minLength: helpers.withMessage('Mínimo de 6 caracteres', minLength(6))
        },
        confirmarSenha: {
          required: helpers.withMessage('Confirme a senha', required),
          sameAsSenha: helpers.withMessage('Senhas não coincidem', sameAs(() => this.form.senha))
        },
        cidade: {
          required: helpers.withMessage('Cidade é obrigatória', required),
          minValue: helpers.withMessage('Selecione uma cidade válida', minValue(1)),
        }
      }
    }
  },
  mounted() {
    this.carregarCidades()
  },

  methods: {
    async carregarCidades() {
      try {
        const response = await api.get('/cidade');
        if (response.status == 200 || response.status == 201) {
          this.listaCidades = response.data;
        } 
      } catch (error) {
        console.error('Erro ao carregar cidades:', error)
      }
    },
    async registrar() {
      const validado = await this.v$.$validate()
      if (!validado) return

      const usuario = {
        nome: this.form.nome,
        email: this.form.email,
        senha: this.form.senha,
        cidade: this.form.cidade
      }

      try {
        await api.post('/usuario', usuario)

        Toast.fire({
          icon: 'success',
          title: 'Cadastro realizado com sucesso!'
        }).then(() => {
          this.$router.push('/')
        })

      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: 'Erro ao cadastrar. Tente novamente.'
        })
        console.error(error)
      }
    }
  }
})
</script>
