<template>
    <div class="row">
        <div class="col-12">
            <div class="card my-4">
                <div class="bg-gradient-success shadow-dark border-radius-lg pt-4 pb-3 d-flex justify-content-between align-items-center">
                    <h6 class="text-white text-capitalize ps-3">Gêneros</h6>
                    <button type="button" class="btn btn-warning me-3">Novo Gênero</button>
                </div>
            </div>
            <div class="card-body px-0 pb-2">
                <div class="table-responsive p-0">
                    <table class="table align-items-center mb-0">
                        <thead>
                            <tr>
                                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                    Nome
                                </th>
                                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                    Descricao
                                </th>
                                <th class="text-secondary opacity-7"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(genero, index) in listaGeneros" :key="index">
                                <td>
                                    <div class="d-flex px-2 py-1">
                                        <div class="d-flex flex-column justify-content-center">
                                            <h6 class="mb-0 text-sm">{{ genero.nome }}</h6>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <p class="text-xs font-weight-bold mb-0">{{ genero.descricao }}</p>
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
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'IndexView',

    data() {
        return {
            listaGeneros: [] as Array<{
                nome: string
                descricao: string
            }>,
        }
    },

    mounted() {
        this.buscarGeneros()
    },

    methods: {
        buscarGeneros() {
            this.listaGeneros.push({
                nome: 'Terror',
                descricao: ' Caracterizado por elementos sobrenaturais, psicológicos ou grotescos, o terror explora os medos mais profundos da humanidade, como a morte, a solidão e o desconhecido.'
            });

            this.listaGeneros.push({
                nome: 'Ficção Científica',
                descricao: 'Diferentemente da fantasia, que incorpora elementos mágicos, a ficção científica se fundamenta em conceitos plausíveis dentro da ciência conhecida ou especulativa.'
            });
            this.listaGeneros.push({
                nome: 'Romance',
                descricao: 'Um gênero literário e cinematográfico que explora relacionamentos amorosos e emoções profundas.'
            });
            this.listaGeneros.push({
                nome: 'Manga',
                descricao: 'Um estilo de quadrinhos japoneses que abrange diversos gêneros e públicos, caracterizado por arte expressiva e narrativa envolvente.'
            });
            this.listaGeneros.push({
                nome: 'Fantasia',
                descricao: 'Um gênero que explora mundos imaginários, magia e seres sobrenaturais, criando narrativas épicas e envolventes.'
            });
            this.listaGeneros.push({
                nome: 'Infanto-Juvenil',
                descricao: 'Asbrange obras destinadas a crianças e adolescentes, explorando temas como aventura, amizade e autodescoberta.'
            });
        },
    },
})
</script>
