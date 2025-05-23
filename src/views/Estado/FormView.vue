<template>
  <div class="row">
    <div class="col-12">
      <div class="card my-4">
        <div
          class="bg-secondary shadow-dark border-radius-lg pt-4 pb-3 d-flex justify-content-start align-items-center">
          <h6 class="text-white  ps-3">Novo Cadastro de Estado</h6>
        </div>
      </div>
      <div class="container px-0 pb-2">
        <form>
          <div class="row">
            <div class="col-5">
              <label for="txtName" class="form-label">Nome <a style="color: red;">*</a></label>
              <input type="text" class="form-control p-2" id="txtName" placeholder=" Nome da Cidade">
            </div>
          </div>
          <div class="row mt-2">
            <div class="col-5">
                <label for="txtSigla" class="form-label">UF <a style="color: red;">*</a></label>
                <input type="text" class="form-control p-2" id="txtSigla" placeholder=" Sigla do Estado">
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
      listaEstados: [] as Array<{ uf: string; nome: string }>,
      }
  },

  mounted() {

  },

  methods: {

  }
});
</script>
