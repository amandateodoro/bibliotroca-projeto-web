<template>
  <div class="row">
    <div class="col-12">
      <div class="card my-4">
        <div
          class="bg-secondary shadow-dark border-radius-lg pt-4 pb-3 d-flex justify-content-between align-items-center">
          <h6 class="text-white ps-3">Novo Cadastro de Cidade</h6>
        </div>
      </div>
      <div class="container px-0 pb-2">
        <form>
          <div class="row">
            <div class="col-3">
              <label for="txtName" class="form-label">Nome</label>
              <input type="text" class="form-control p-2" id="txtName" placeholder=" Nome da Cidade">
            </div>
          </div>
          <div class="row mt-2">
            <div class="col-4">
              <label for="txtName" class="form-label">Estado</label>
              <select name="txtEstado" id="txtEstado" class="form-control px-2" v-for="(estado, index) in listaEstados"
                :key="index">
                <option value="" disabled selected>Selecione um Estado</option>
                <option value=""> {{ estado.nome }} - {{ estado.uf }}</option>
              </select>
            </div>
          </div>
          <div class="d-flex justify-content-start">
              <a href="/cidades" type="button" class="btn btn-secondary mt-4 px-9">Cadastrar</a>
            </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: 'FormView',

  data() {
    return {
      listaEstados: [] as Array<{ nome: string; uf: string; }>,
    }
  },

  mounted() {
    this.buscarEstados();
  },

  methods: {
    buscarEstados() {
      this.listaEstados.push({
        nome: 'Rondônia',
        uf: 'RO'
      });
    },
  }
});
</script>
