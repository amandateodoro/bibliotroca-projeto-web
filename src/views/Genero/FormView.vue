<template>
  <div class="row">
    <div class="col-12">
      <div class="card my-4">
        <div
          class="bg-secondary shadow-dark border-radius-lg pt-4 pb-3 d-flex justify-content-start align-items-center">
          <h6 class="text-white  ps-3">Novo Cadastro de Gênero Literário</h6>
        </div>
      </div>
      <div class="container px-0 pb-2">
        <form>
          <div class="p-2 mt-2">
            <div class="row">
              <div class="col-5">
                <label for="txtName" class="form-label">Nome <a style="color: red;">*</a></label>
                <input type="text" class="form-control p-2" id="txtName" placeholder="Nome do Gênero">
              </div>
            </div>
            <div class="row mt-2">
              <div class="col-5">
                <label for="txtDescricao" class="form-label">Descrição<a style="color: red;">*</a></label>
                <textarea name="txtBibliografia" id="txtBibliografia" class="form-control mt-1 p-2"
                  placeholder="Informações sobre o gênero literário"></textarea>
              </div>
            </div>
            <div class="d-flex justify-content-start">
              <a href="/generos" type="button" class="btn btn-secondary mt-4 px-9">Cadastrar</a>
            </div>
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
      listaGeneros: [] as Array<{ nome: string; descricao: string }>,
      }
  },

  mounted() {

  },

  methods: {

  }
});
</script>
