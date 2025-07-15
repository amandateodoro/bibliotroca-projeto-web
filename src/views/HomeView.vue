<template>
  <div class="row">
    <div class="home">
      <h2 v-if="usuario"> {{ usuario.nome }} Aproveite seu Bibliotrocas!</h2>

      <div class="livros-grid">
        <div v-for="livro in livros" :key="livro.id" class="livro-card">
          <img :src="livro.imagem" alt="Capa do livro" />
          <h3>{{ livro.titulo }}</h3>
          <p>{{ livro.descricao }}</p>
          <small>Cadastrado por: {{ livro.usuario.nome }}</small>
          <button @click="interesseLivro()">Tenho Interesse</button>
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
    interesseLivro() {
      if (this.usuario) {
        try {
          const numeroOriginal = this.usuario.contato;

          let numeroLimpo = numeroOriginal.replace(`/\D/g`, '');
          if (numeroLimpo.length >= 8 && numeroLimpo.length <= 9) {
            numeroLimpo = '69' + numeroLimpo;
          }
          window.open(`https://wa.me/55${numeroLimpo}`, '_blank');
        } catch (error) {
          console.error(error);
        }
      } else {
        Toast.fire({
          icon: 'warning',
          title: 'Voce precisa estar logado!'
        });
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
