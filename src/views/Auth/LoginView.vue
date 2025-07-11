<template>
  <div class="d-flex justify-content-center align-items-center vh-100 bg-primary bg-opacity-75">
    <div class="card shadow-lg p-4" style="width: 100%; max-width: 440px;">
      <div class="text-center mb-4">
        <img src="/img/logo-branca-sem-descricao.png" alt="Logo" class="img-fluid" style="width: 80px;" />
        <h4 class="mt-3 text-dark">Bem-vindo ao <span class="text-warning">BiblioTroca</span></h4>
      </div>

      <div class="card bg-secondary text-white mb-3">
        <div class="card-body py-3 d-flex align-items-center justify-content-center">
          <h6 class="mb-0 fs-3">Login</h6>
        </div>
      </div>

      <form @submit.prevent="realizarLogin">
        <div class="mb-3">
          <label for="txtEmail" class="form-label text-white">Email</label>
          <input type="email" class="form-control px-2" id="txtEmail" placeholder="Digite seu email"
            v-model="formLogin.email" />
          <div class="text-danger small" v-if="v$.formLogin.email.$errors.length">
            <p v-for="error of v$.formLogin.email.$errors" :key="error.$uid">{{ error.$message }}</p>
          </div>
        </div>

        <div class="mb-3">
          <label for="txtSenha" class="form-label text-white">Senha</label>
          <input type="password" class="form-control px-2" id="txtSenha" placeholder="Digite sua senha"
            v-model="formLogin.senha" />
          <div class="text-danger small" v-if="v$.formLogin.senha.$errors.length">
            <p v-for="error of v$.formLogin.senha.$errors" :key="error.$uid">{{ error.$message }}</p>
          </div>
        </div>

        <div class="d-flex flex-column justify-content-between mt-4">
          <div class="d-flex flex-row justify-content-between">
            <RouterLink class="btn btn-warning px-5" to="/">Voltar</RouterLink>
            <button type="submit" class="btn btn-primary px-5">Entrar</button>
          </div>
          <div class="d-flex justify-content-center align-items-center">
            <RouterLink class="link-info" to="/login/registro">Cadastrar-se</RouterLink>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { helpers, required, email } from '@vuelidate/validators'
import { Toast } from '@/common/toast'
import { api } from '@/common/http'

export default defineComponent({
  name: 'LoginView',
  setup() {
    return {
      v$: useVuelidate()
    }
  },
  data() {
    return {
      formLogin: {
        email: '',
        senha: ''
      }
    }
  },
  validations() {
    return {
      formLogin: {
        email: {
          required: helpers.withMessage('O Email é obrigatório', required),
          email: helpers.withMessage('Email inválido!', email)
        },
        senha: {
          required: helpers.withMessage('A senha é obrigatória', required)
        }
      }
    }
  },
  methods: {
    async realizarLogin() {
      const result = await this.v$.$validate()
      if (!result) {
        return
      }

      let listaUsuarios: [] = [];

      try {
        const response = await api.get('/usuario');
        if (response.status == 200) {
          listaUsuarios = response.data;
        }
        const usuario = listaUsuarios.find(u => u.email == this.formLogin.email && u.senha == this.formLogin.senha);

        if (!usuario) {
          Toast.fire({
            icon: 'error',
            title: 'Email ou senha inválidos!'
          });
        }
        else {
          Toast.fire({ icon: 'success', title: `Bem-vindo ${usuario.nome}` }).then(() => {
            this.$router.push('/');
          });
          localStorage.setItem('usuario', JSON.stringify(usuario));

        }

      } catch (error) {
        Toast.fire({ icon: 'error', title: 'Email ou senha inválidos!' })
        console.error('Erro no login:', error)
      }
    }
  }
})
</script>
