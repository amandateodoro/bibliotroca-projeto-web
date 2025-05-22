<template>
    <div class="row">
        <div class="col-12">
            <div class="card my-4">
                <div class="bg-primary shadow-dark border-radius-lg pt-4 pb-3 d-flex justify-content-between align-items-center">
                    <h6 class="text-white text-capitalize ps-3">Usuarios</h6>
                    <button type="button" class="btn btn-warning me-3">Novo Usuario</button>
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
                                    Contato</th>
                                <th
                                    class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                    Avaliação
                                </th>
                                <th
                                    class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                    Cidade
                                </th>
                                <th class="text-secondary opacity-7"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(usuario, index) in listaUsuarios" :key="index">
                                <td>
                                    <div class="d-flex px-2 py-1">
                                        <div class="d-flex flex-column justify-content-center">
                                            <h6 class="mb-0 text-sm">{{ usuario.nome }}</h6>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <p class="text-xs text-secondary mb-0">{{usuario.email}}</p>
                                </td>
                                <td>
                                    <p class="text-xs font-weight-bold mb-0">{{ usuario.contato }}</p>
                                </td>
                                <td class="align-middle text-center text-sm">
                                    <span class="text-secondary text-xs font-weight-bold">{{usuario.avaliacao
                                    }}</span>
                                </td>
                                <td class="align-middle text-center">
                                    <span class="text-secondary text-xs font-weight-bold">{{ usuario.cidade
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
            listaUsuarios: [] as Array<{ nome: string; email: string; contato: string; avaliacao: number; cidade: string; }>,
        }
    },

    mounted() {
        this.buscarUsuarios();

    },

    methods: {
        buscarUsuarios() {
            this.listaUsuarios.push({
                nome: 'Rodrigo Fábio dos Santos',
                email: 'rodrigofabiodossantos@bidoul.eng.br',
                contato: '(69) 98706-1244',
                avaliacao: 4,
                cidade: 'Ji-Paraná'
            });

            this.listaUsuarios.push({
                nome: 'Caleb Igor Novaes',
                email: 'caleb.igor.novaes@dcazzainteriores.com.br',
                contato: '(69) 98159-7254',
                avaliacao: 5,
                cidade: 'Ji-Paraná'
            });

            this.listaUsuarios.push({
                nome: 'Eduarda Eduarda Costa',
                email: 'eduarda_costa@uel.br',
                contato: '(69) 99413-8844',
                avaliacao: 5,
                cidade: 'Ji-Paraná'
            });

            this.listaUsuarios.push({
                nome: 'Hugo Nathan Melo',
                email: 'hugo_melo@xerocopiadora.com.br',
                contato: '(69) 99468-4768',
                avaliacao: 3,
                cidade: 'Ji-Paraná'
            });

            this.listaUsuarios.push({
                nome: 'Lívia Sophie Teixeira',
                email: 'liviasophieteixeira@yool.com.br',
                contato: '(69) 99242-9642',
                avaliacao: 5,
                cidade: 'Ji-Paraná'
            });
        },
    }

});
</script>
