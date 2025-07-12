<template>
  <div class="row">
    <div class="col-12">
      <div class="card my-4">
        <div
          class="bg-primary shadow-dark border-radius-lg pt-4 pb-3 d-flex justify-content-between align-items-center">
          <h6 class="text-white text-capitalize ps-3">Editoras</h6>
          <a href="/editoras/create" type="button" class="btn btn-light me-3">Nova Editora</a>
        </div>
      </div>
      <div class="card-body px-0 pb-2">
        <div class="table-responsive p-0">
          <table class="table align-items-center mb-0">
            <thead>
              <tr>
                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Nome
                </th>
                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Url
                </th>
                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                  E-mail para Contato</th>
                <th class="text-secondary opacity-7"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(editora, index) in listaEditoras" :key="index">
                <td>
                  <div class="d-flex px-2 py-1">
                    <div class="d-flex flex-column justify-content-center">
                      <h6 class="mb-0 text-sm">{{ editora.nome }}</h6>
                    </div>
                  </div>
                </td>
                <td>
                  <p class="text-xs text-secondary mb-0">{{ editora.url }}</p>
                </td>
                <td>
                  <p class="text-xs font-weight-bold mb-0">{{ editora.email }}</p>
                </td>
                <td class="align-middle">
                  <a href="javascript:;" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip"
                    data-original-title="Edit user" @click="editar(editora)">
                    🖊
                  </a>
                  <a href="javascript:;" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip"
                    data-original-title="Edit user" @click="excluir(editora)">
                    🗑
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
import { api } from "@/common/http";
import { Toast } from "@/common/toast";
import Swal from "sweetalert2";
import { defineComponent } from "vue";

export default defineComponent({
  name: 'IndexView',

  data() {
    return {
      listaEditoras: [] as Array<{
        id: number;
        nome: string;
        url: string;
        email: string
      }>,
    }
  },

  mounted() {
    this.buscarEditoras();

  },

  methods: {
    async buscarEditoras() {
      try {
        const response = await api.get('/editora');

        if (response.status == 200) {
          this.listaEditoras = response.data;
          console.log('Lista de Editoras carregadas!');
        }
      } catch (error) {
        console.error(error);
      }
    },
    editar(id) {
      this.$router.push(`/editoras/${id}/update`);
    },

    excluir(editora) {

      Swal.fire({
        icon: "warning",
        title: `Deseja realmente excluir o Editora ${editora.nome}?`,
        // showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Sim",
        // confirmButtonColor: "#F68537",
        cancelButtonText: 'Não',
        cancelButtonColor: "#d33",
      }).then((result) => {
        if (result.isConfirmed) {
          this.excluirSalvar(editora);
        }
      });

    },


    async excluirSalvar(editora) {
      try {

        const response = await api.delete(`editora/${editora.id}`);

        if (response.status == 200) {
          Toast.fire({
            icon: "success",
            title: `Editora excluido com sucesso!`
          });

          this.buscarEditoras();

          return;
        }

        Toast.fire({
          icon: "error",
          title: 'Ocorreram erros ao processar a solicitação'
        });

      } catch { }
    },
  }


});
</script>
