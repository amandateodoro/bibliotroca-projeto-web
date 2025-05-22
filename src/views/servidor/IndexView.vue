<template>
    <div class="row">
        <div class="col-12">
            <div class="card my-4">
                <div class="bg-gradient-success shadow-dark border-radius-lg pt-4 pb-3">
                    <h6 class="text-white text-capitalize ps-3">Servidores</h6>
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
                                    Siape</th>
                                <th
                                    class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                    Situacao
                                </th>
                                <th
                                    class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                    Cargo
                                </th>
                                <th class="text-secondary opacity-7"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(servidor, index) in listaServidores" :key="index">
                                <td>
                                    <div class="d-flex px-2 py-1">
                                        <div>
                                            <img src="/img/team-2.jpg" class="avatar avatar-sm me-3 border-radius-lg"
                                                alt="user1">
                                        </div>
                                        <div class="d-flex flex-column justify-content-center">
                                            <h6 class="mb-0 text-sm">{{ servidor.nome }}</h6>
                                            <p class="text-xs text-secondary mb-0">john@creative-tim.com</p>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <p class="text-xs font-weight-bold mb-0">{{ servidor.siape }}</p>
                                </td>
                                <td class="align-middle text-center text-sm">
                                    <span class="badge badge-sm"
                                        :class="{ 'bg-gradient-success': servidor.situacao, 'bg-gradient-secondary': !servidor.situacao }">{{
                                            servidor.situacao ? 'Ativo' : 'Inativo' }}</span>
                                </td>
                                <td class="align-middle text-center">
                                    <span class="text-secondary text-xs font-weight-bold">{{ servidor.cargo
                                    }}</span>
                                </td>
                                <td class="align-middle">
                                    <a href="javascript:;" class="text-secondary font-weight-bold text-xs"
                                        data-toggle="tooltip" data-original-title="Edit user">
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
import { defineComponent } from "vue";

export default defineComponent({
    name: 'IndexView',

    data() {
        return {
            listaServidores: [] as Array<{ nome: string; siape: number, situacao: boolean; cargo: string }>,
        }
    },

    mounted() {
        this.buscarServidores();

    },

    methods: {
        buscarServidores() {
            this.listaServidores.push({
                nome: 'Joao Teixeira',
                siape: 12345678,
                situacao: true,
                cargo: 'Docente'
            });

            this.listaServidores.push({
                nome: 'Jefferson dos Santos',
                siape: 12345679,
                situacao: true,
                cargo: 'Docente'
            });

            this.listaServidores.push({
                nome: 'Leticia Carvalho',
                siape: 12345623,
                situacao: true,
                cargo: 'Diretora Geral'
            });

            this.listaServidores.push({
                nome: 'Emi Oliveira',
                siape: 12345626,
                situacao: false,
                cargo: 'Docente'
            });
        },
    }


});
</script>