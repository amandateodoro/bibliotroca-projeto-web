<template>
  <div class="row">
    <div class="col-12">
      <div class="card my-4">
        <div
          class="bg-secondary shadow-dark border-radius-lg pt-4 pb-3 d-flex justify-content-start align-items-center">
          <h6 class="text-white  ps-3">Novo Cadastro de Livro</h6>
        </div>
      </div>
      <div class="container px-0 pb-2">
        <form @submit.prevent="salvar">
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
          <div class="p-2 mt-2">
            <div class="row">
              <div class="col-5">
                <label for="txtName" class="form-label">Nome <a style="color: red;">*</a></label>
                <input type="text" class="form-control p-2" id="txtName" placeholder="Nome do Livro"
                  v-model="formDados.nome">
                <div class="text-danger" v-if="v$.formDados.nome.$errors.length">
                  <p class="fs-6" v-for="error of v$.formDados.nome.$errors" :key="error.$uuid">{{ error.$message }}
                  </p>
                </div>
              </div>
            </div>
            <div class="row mt-2">
              <div class="col-5">
                <label for="txtSinopse" class="form-label">Descrição <a style="color: red;">*</a></label>
                <textarea name="txtSinopse" id="txtSinopse" class="form-control mt-1 p-2" placeholder="Sinopse do livro"
                  v-model="formDados.descricao"></textarea>
                <div class="text-danger" v-if="v$.formDados.descricao.$errors.length">
                  <p class="fs-6" v-for="error of v$.formDados.descricao.$errors" :key="error.$uuid">{{ error.$message
                  }}</p>
                </div>
              </div>
            </div>
            <div class="row mt-2">
              <div class="col-5">
                <label for="txtData" class="form-label">Data de Aquisição <a style="color: red;">*</a></label>
                <input type="date" class="form-control p-2" id="txtData" placeholder=" Data de aquisição do livro"
                  v-model="formDados.dataAquisicao">
                <div class="text-danger" v-if="v$.formDados.dataAquisicao.$errors.length">
                  <p class="fs-6" v-for="error of v$.formDados.dataAquisicao.$errors" :key="error.$uuid">{{
                    error.$message }}</p>
                </div>
              </div>
            </div>
            <div class="row mt-2">
              <div class="col-5">
                <label for="txtEstado" class="form-label">Estado de Conservação <a style="color: red;">*</a></label>
                <select name="txtEstado" id="txtEstado" class="form-control px-2" v-model="formDados.conservacao">
                  <option disabled selected>Selecione o estado de conservação do livro</option>
                  <option value="NOVO">Novo</option>
                  <option value="USADO">Usado</option>
                  <option value="DANIFICADO">Danificado</option>
                </select>
                <div class="text-danger" v-if="v$.formDados.conservacao.$errors.length">
                  <p class="fs-6" v-for="error of v$.formDados.conservacao.$errors" :key="error.$uuid">{{
                    error.$message }}</p>
                </div>
              </div>
            </div>
            <div class="row mt-2">
              <div class="col-5">
                <label for="txtEditora" class="form-label">Editora <a style="color: red;">*</a></label>
                <select name="txtEditora" id="txtEditora" class="form-control px-2" v-model="formDados.editora">
                  <option disabled value="0">Selecione uma Editora</option>
                  <option v-for="(editora, index) in listaEditoras" :key="index" :value="editora.id"> {{ editora.nome }}
                  </option>
                </select>
                <div class="text-danger" v-if="v$.formDados.id_edi.$errors.length">
                  <p class="fs-6" v-for="error of v$.formDados.id_edi.$errors" :key="error.$uuid">{{ error.$message
                  }}</p>
                </div>
              </div>
            </div>
            <div class="row mt-2">
              <div class="col-5">
                <label for="txtAutor" class="form-label">Autor <a style="color: red;">*</a></label>
                <select name="txtAutor" id="txtAutor" class="form-control px-2" v-model="formDados.autor">
                  <option disabled value="0">Selecione um Autor</option>
                  <option v-for="(autor, index) in listaAutores" :key="index" :value="autor.id"> {{ autor.nome }}
                  </option>
                </select>
                <div class="text-danger" v-if="v$.formDados.id_aut.$errors.length">
                  <p class="fs-6" v-for="error of v$.formDados.id_aut.$errors" :key="error.$uuid">{{ error.$message }}
                  </p>
                </div>
              </div>
            </div>
            <div class="d-flex justify-content-start gap-3">
              <RouterLink to="/livros" class="btn btn-secondary mt-4 px-9">Voltar</RouterLink>
              <button type="submit" class="btn btn-secondary mt-4 px-9">Salvar</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { api } from '@/common/http';
import { Toast } from '@/common/toast';
import { defineComponent } from "vue";
import { useVuelidate } from '@vuelidate/core'
import { required, helpers, minLength, minValue } from '@vuelidate/validators';
import Swal from 'sweetalert2';

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
    this.buscarEditoras();
    this.buscarAutores();
    this.carregarUsuario();

    if (this.ehEdicao) {
      this.carregarDados();
    }
  },

  data() {
    return {
      formDados: {
        nome: '',
        imagem: '',
        descricao: '',
        dataAquisicao: '',
        conservacao: '',
        editora: 0,
        autor: 0
      },
      listaEditoras: [] as Array<{ id: number; nome: string; }>,
      listaAutores: [] as Array<{ id: number; nome: string; }>,
      usuario: {},
    }
  },

  validations() {
    return {
      formDados: {
        nome: { required: helpers.withMessage('O nome é obrigatório', required) },
        descricao: { required: helpers.withMessage('A descrição é obrigatória', required), minLength: helpers.withMessage('faça uma pequena descrição', minLength(3)) },
        dataAquisicao: { required: helpers.withMessage('A Data de Aquisição é obrigatório', required) },
        conservacao: { required: helpers.withMessage('O estado de conservação é obrigatório', required) },
        editora: { required: helpers.withMessage('A editora é obrigatória', required), minValue: helpers.withMessage('Selecione uma Editora!', minValue(1)) },
        autor: { required: helpers.withMessage('O autor é obrigatório', required), minValue: helpers.withMessage('Selecione um Autor!', minValue(1)) }
      }
    }
  },

  methods: {
    carregarUsuario() {
      const usuarioSalvo = localStorage.getItem('usuario');
      if (usuarioSalvo) {
        this.usuario = JSON.parse(usuarioSalvo);
      } else {
        Toast.fire({
          icon: 'warning',
          title: 'Voce precisa está logado!'
        });
      }
    },
    async carregarDados() {
      try {
        const response = await api.get(`/livro/${this.id}`);

        if (response.status != 200) {
          Toast.fire({
            icon: 'error',
            title: 'Ocorreram Erros ao buscar a Informação!'
          }).then(() => {
            this.$router.push('/livros');
          });
        }

        const dados = response.data;

        this.formDados = {
          imagem: dados.imagem,
          nome: dados.nome,
          descricao: dados.descricao,
          dataAquisicao: dados.dataAquisicao,
          conservacao: dados.conservacao,
          editora: dados.editora.id,
          autor: dados.autor.id
        }
      } catch (error) {
        console.error(error);
      }
    },

    async buscarEditoras() {
      try {
        const response = await api.get('/editora');

        if (response.status == 200) {
          this.listaEditoras = response.data;
        }

      } catch (error) {
        console.error(error);
      }
    },

    async buscarAutores() {
      try {
        const response = await api.get('/autor');

        if (response.status == 200) {
          this.listaAutores = response.data;
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
        imagem: this.formDados.imagem,
        nome: this.formDados.nome,
        descricao: this.formDados.descricao,
        dataAquisicao: this.formDados.dataAquisicao,
        conservacao: this.formDados.conservacao,
        editora: {
          id: this.formDados.editora
        },
        autor: {
          id: this.formDados.autor
        },
        usuario: {
          id: this.usuario.id
        }
      }
      try {
        if (this.ehEdicao) {
          this.edicaoSalvar(dados);
          return;
        }
        const response = await api.post('/livro', dados).then(() => {
          Toast.fire({
            icon: 'success',
            title: 'Cadastro feito com sucesso!'
          }).then(() => {
            this.$router.push('/livros')
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
              this.$router.push('/livros');
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
        const response = await api.patch(`/livro/${this.id}`, dados);

        if (!this.notificarError(response.status)) {
          Toast.fire({
            icon: 'success',
            title: 'Atualizado com sucesso!'
          }).then(() => {
            this.$router.push('/livros');
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
