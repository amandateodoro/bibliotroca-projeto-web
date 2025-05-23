<template>
  <div class="row">
    <div class="col-12">
      <div class="card my-4">
        <div
          class="bg-secondary shadow-dark border-radius-lg pt-4 pb-3 d-flex justify-content-start align-items-center">
          <h6 class="text-white  ps-3">Novo Cadastro de Autor</h6>
        </div>
      </div>
      <div class="container px-0 pb-2">
        <form>
          <div class="p-2 mt-2">
            <div class="row">
              <div class="col-4 ">
                <label for="txtName" class="form-label">Nome <a style="color: red;">*</a></label>
                <input type="text" class="form-control p-2" id="txtName" placeholder=" Nome do Autor">
              </div>
            </div>
            <div class="row mt-2">
              <div class="col">
                <label for="txtData" class="form-label">Data Nascimento</label>
                <input type="date" class="form-control p-2" id="txtData" placeholder=" Data Nascimento Autor">
              </div>
              <div class="col">
                <label for="txtNacionalidade" class="form-label">Nacionalidade</label>
                <input type="text" class="form-control p-2" id="txtNacionalidade" placeholder=" Nacionalidade do Autor">
              </div>
            </div>
            <div class="row mt-2">
              <div class="col">
                <label for="txtBibliografia" class="form-label">Bibliografia<a style="color: red;">*</a></label>
                <textarea name="txtBibliografia" id="txtBibliografia" class="form-control mt-1 p-2"
                  placeholder=" Bibliografia do autor"></textarea>
              </div>
            </div>
            <div class="d-flex justify-content-start">
              <a href="/autores" type="button" class="btn btn-secondary mt-4 px-9">Cadastrar</a>
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
      listaAutores: [] as Array<{ nome: string; dataNascimento: string; nacionalidade: string; biografia: string; }>,
    }
  },

  mounted() {

  },

  methods: {

  }
});
</script>
