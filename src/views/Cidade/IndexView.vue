<template>
  <div class="row">
    <div class="col-12">
      <div class="card my-4">
        <div
          class="bg-primary shadow-dark border-radius-lg pt-4 pb-3 d-flex justify-content-between align-items-center">
          <h6 class="text-white text-capitalize ps-3">Cidades</h6>
          <a href="/cidades/create" type="button" class="btn btn-light me-3">Nova Cidade</a>
        </div>
      </div>
      <div class="card-body px-0 pb-2">
        <div class="table-responsive p-0">
          <table class="table align-items-center mb-0">
            <thead>
              <tr>
                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Nome
                </th>
                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                  Estado</th>
                <th class="text-secondary opacity-7"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(cidade, index) in listaCidades" :key="index">
                <td>
                  <div class="d-flex px-2 py-1">
                    <div>
                      <img src="https://images-na.ssl-images-amazon.com/images/I/51S6Vya%2BjyL.__AC_SX300_QL70_ML2_.jpg"
                        class="avatar avatar-sm me-3 border-radius-lg" alt="user1">
                    </div>
                    <div class="d-flex flex-column justify-content-center">
                      <h6 class="mb-0 text-sm">{{ cidade.nome }}</h6>
                    </div>
                  </div>
                </td>
                <td>
                  <p class="text-xs font-weight-bold mb-0">{{ cidade.id_est }}</p>
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
      listaCidades: [] as Array<{ id: number; nome: string; id_est: number; }>,
    }
  },

  mounted() {
    this.buscarCidades();
  },

  methods: {
    async buscarEstadoId(estado: number) {
      try {
        const response = await axios.get('http://localhost:3000/estado', {
          params: {
            id: estado
          }
        });

        if (response.status == 200) {
          return response.data.nome.toString();
        }
      } catch (error) {
        console.error(error);
      }
    },
    async buscarCidades() {
      try {
        const response = await axios.get('http://localhost:3000/cidade');
        if (response.status == 200) {
          this.listaCidades = response.data;
          console.log('Lista de Cidades Carregadas!');
        }
      } catch (error) {
        console.error(error);
      }
    },
  }
});
</script>
