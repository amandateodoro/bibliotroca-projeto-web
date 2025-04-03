<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
  </div>

  <div style="margin-top: 20px;">
    <div style="display: flex; align-items: center; justify-content: center;">
      <input type="text" style="padding: 20px; font-size: 1.2rem; margin-right: 5px;" v-model="nome" @keyup.enter="adivinhaNome"/>
      <button style="padding: 20px; font-size: 1.2rem; margin-right: 5px;" @click="adivinhaNome">Adivinhar</button>
    </div>    

    <h3 v-if="carregando">Adivinhando seu nome...</h3>
    <h3 v-if="btClicado">Seu nome é: {{ nome }}</h3>

    <h3>Nomes Adivinhados</h3>

    <div v-for="(nome, index) in listaNomesAdivinhados" :key="index">
      {{ nome }}
    </div>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },

  data() {
    return {
      nome: null,
      nomeAdivinhado: null,
      btClicado: false,
      carregando: false,
      listaNomesAdivinhados: [],
    }
  },

  methods: {
    adivinhaNome() {
      this.carregando = true;
      this.nomeAdivinhado = this.nome;
      this.listaNomesAdivinhados.push(this.nome);
      this.nome = null;

      setTimeout(() => {
        this.carregando = false;
        this.btClicado = true;        
      }, 1500);

      //this.autoLimpar();      
    },

    autoLimpar() {
      setTimeout(() => {
        this.nome = null;
        this.btClicado = false;        
      }, 10000);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
