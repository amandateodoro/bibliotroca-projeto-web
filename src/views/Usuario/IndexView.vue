<template>
  <div class="row">
    <div class="col-12">
      <div class="card my-4">
        <div
          class="bg-primary shadow-dark border-radius-lg pt-4 pb-3 d-flex justify-content-between align-items-center">
          <h6 class="text-white text-capitalize ps-3">Usuarios</h6>
          <RouterLink to="/usuarios/create" class="btn btn-light me-3">Novo Usuário</RouterLink>
        </div>
      </div>
      <div class="card-body px-0 pb-2">
        <div class="table-responsive p-0">
          <table class="table align-items-center mb-0">
            <thead>
              <tr>
                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Nome
                </th>
                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">E-mail
                </th>
                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                  Telefone para Contato</th>
                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                  Avaliação
                </th>
                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                  Cidade
                </th>
                <th class="text-secondary opacity-7"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(usuario, index) in usuarios" :key="index">
                <td>
                  <div class="d-flex px-2 py-1">
                    <div class="d-flex flex-column justify-content-center">
                      <h6 class="mb-0 text-sm">{{ usuario.nome }}</h6>
                    </div>
                  </div>
                </td>
                <td>
                  <p class="text-xs text-secondary mb-0">{{ usuario.email }}</p>
                </td>
                <td>
                  <p class="text-xs font-weight-bold mb-0">{{ usuario.telefone }}</p>
                </td>
                <td class="align-middle text-center text-sm">
                  <span class="text-secondary text-xs font-weight-bold">{{ usuario.avaliacao
                  }}</span>
                </td>
                <td class="align-middle text-center">
                  <span class="text-secondary text-xs font-weight-bold">{{ buscarCidade(usuario.id_cid) }}</span>
                </td>
                <td class="align-middle">
                  <a href="javascript:;" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip"
                    data-original-title="Edit user">
                    Edit
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
  name: 'IndexView',

  data() {
    return {
      usuarios: [] as Array<{ nome: string; email: string; telefone: string; avaliacao: number; id_cid: number; }>,
    }
  },

  mounted() {
    this.buscarUsuarios();
  },

  methods: {
    async buscarCidade(cidade:number){
      try {
        const response = await axios.get('http://localhost:3000/cidade', {
          params:{
            id: cidade
        }});

        if (response.status == 200) {
          return response.data.nome.toString();
        }
      } catch (error) {
        console.error(error);
      }
    },
    async buscarUsuarios() {
      try {
        const response = await axios.get('http://localhost:3000/usuario');

        if (response.status == 200) {
          this.usuarios = response.data;
          console.log('Lista de Usuarios carregados!');
        }
      } catch (error) {
        console.error(error);
      }
    },
  }

});
</script>
