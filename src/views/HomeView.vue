<template>
  <div class="row">
    <div class="home">
      <h2 v-if="usuario"> {{ usuario.nome }} Aproveite seu Bibliotrocas!</h2>

      <div class="livros-grid">
        <div v-for="livro in livros" :key="livro.id"
          class="livro-card d-flex flex-column align-items-center justify-content-center">
          <img :src="livro.imagem ? livro.imagem : '/public/img/livro-realista-com-nuvens-em-fundo-azul.jpg'"
            alt="Capa do livro" style="height: 360px; width: 200px;" />
          <h3 class="fs-3">{{ livro.nome }}</h3>
          <p class="fs-5 text-start">Data de Aquisição:{{ formatarData(livro.dataAquisicao) }}</p>
          <p class="fs-5 text-start">Estado de Conservação: {{ livro.conservacao ? livro.conservacao : 'Não Informado'
          }}</p>
          <p class="fs-6 text-start">Cadastrado por: {{ livro.usuario.nome }}</p>
          <button @click="interesseLivro(livro)">Tenho Interesse</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { api } from '@/common/http';
import { Toast } from '@/common/toast';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomeView',
  data() {
    return {
      usuario: {},
      livros: []
    };
  },
  mounted() {
    this.carregarUsuario();
    this.carregarLivros();
  },
  methods: {
    formatarData(data: string | Date) {
      return new Intl.DateTimeFormat('pt-BR').format(new Date(data));
    },
    carregarUsuario() {
      const usuarioSalvo = localStorage.getItem('usuario');
      if (usuarioSalvo) {
        this.usuario = JSON.parse(usuarioSalvo);
      } else {
        Toast.fire({
          icon: 'warning',
          title: 'Voce precisa estar logado!'
        });
      }
    },
    async carregarLivros() {
      try {
        const response = await api.get('/livro');

        if (response.status >= 200 && response.status < 300) {
          this.livros = response.data;
        }

      } catch (error) {
        console.error(error);
      }
    },
    interesseLivro(livro) {
      if (!this.usuario || Object.keys(this.usuario).length === 0) {
        Toast.fire({
          icon: 'warning',
          title: 'Voce precisa estar logado!'
        }).then(() => {
          this.$router.push('/login');
        });
        return;
      }
      try {
        const numeroOriginal = livro.usuario.contato;

        let numeroLimpo = numeroOriginal.replace(`/\D/g`, '');
        if (numeroLimpo.length >= 8 && numeroLimpo.length <= 9) {
          numeroLimpo = '69' + numeroLimpo;
        }
        window.open(`https://wa.me/55${numeroLimpo}`, '_blank');
      } catch (error) {
        console.error(error);
      }

    }
  }
});
</script>

<style scoped>
.livros-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
}

.livro-card {
  background-color: #f5f5f5;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.livro-card img {
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-radius: 8px;
}

.livro-card h3 {
  margin: 10px 0 5px;
}

.livro-card button {
  margin-top: 10px;
  padding: 6px 12px;
  border: none;
  background-color: #3b82f6;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

.livro-card button:hover {
  background-color: #2563eb;
}
</style>
