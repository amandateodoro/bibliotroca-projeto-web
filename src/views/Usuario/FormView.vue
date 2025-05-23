<template>
  <div class="row">
    <div class="col-12">
      <div class="card my-4">
        <div
          class="bg-secondary shadow-dark border-radius-lg pt-4 pb-3 d-flex justify-content-start align-items-center">
          <h6 class="text-white  ps-3">Novo Cadastro de Usuário</h6>
        </div>
      </div>
      <div class="container px-0 pb-2">
        <form>
          <div class="p-2 mt-2">
            <div class="row">
              <div class="col-4 ">
                <label for="txtName" class="form-label">Nome <a style="color: red;">*</a></label>
                <input type="text" class="form-control p-2" id="txtName" placeholder="Nome do Usuário">
              </div>
            </div>
            <div class="row mt-2">
              <div class="col-5">
                <label for="txtEmail" class="form-label">E-mail <a style="color: red;">*</a></label>
                <input type="text" class="form-control p-2" id="txtEmail" placeholder=" E-mail para contato">
              </div>
            </div>
            <div class="row mt-2">
              <div class="col-5">
                <label for="txtTelefone" class="form-label">Telefone <a style="color: red;">*</a></label>
                <input type="text" class="form-control p-2" id="txtTelefone" placeholder=" Telefone para contato">
              </div>
            </div>
            <div class="row mt-2">
              <div class="col-5">
              <label for="txtCidade" class="form-label">Cidade <a style="color: red;">*</a></label>
              <select name="txtCidade" id="txtCidade" class="form-control px-2" v-for="(cidade, index) in listaCidades"
                :key="index">
                <option value="" disabled selected>Selecione uma Cidade</option>
                <option value=""> {{ cidade.nome }} {{ cidade.uf }}</option>
              </select>
            </div>
            </div>
            <div class="d-flex justify-content-start">
              <a href="/usuarios" type="button" class="btn btn-secondary mt-4 px-9">Cadastrar</a>
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
      listaCidades: [] as Array<{ nome: string; uf: string }>,
      listaUsuarios: [] as Array<{ nome: string; email: string; telefone: string; avaliacao: number; cidade: string; }>,
    }
  },

  mounted() {
    this.buscarCidades();
  },

  methods: {
    buscarCidades() {
      this.listaCidades.push({
        nome: 'Ji-Paraná',
        uf: 'RO'
      });
    },
  }
});
</script>
