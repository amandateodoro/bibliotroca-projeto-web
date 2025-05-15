<template>
    <div class="row">
        <div class="col-12">
            <div class="card my-4">
                <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                    <div class="bg-gradient-dark shadow-dark border-radius-lg pt-4 pb-3">
                        <h6 class="text-white text-capitalize ps-3">Autores</h6>
                    </div>
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
                                    Nacionalidade</th>
                                <th
                                    class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                    Bibliografia
                                </th>
                                <th class="text-secondary opacity-7"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(autor, index) in listaAutores" :key="index">
                                <td>
                                    <div class="d-flex px-2 py-1">
                                        <div class="d-flex flex-column justify-content-center">
                                            <h6 class="mb-0 text-sm">{{ autor.nome }}</h6>
                                            <p class="text-xs text-secondary mb-0">{{autor.dataNascimento}}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <p class="text-xs font-weight-bold mb-0">{{ autor.nacionalidade }}</p>
                                </td>
                                <td>
                                    <p class="text-xs font-weight-bold mb-0">{{ autor.biografia }}</p>
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
            listaAutores: [] as Array<{ nome: string; dataNascimento: string; nacionalidade: string; biografia: string; }>,
        }
    },

    mounted() {
        this.buscarAutores();

    },

    methods: {
        buscarAutores() {
            this.listaAutores.push({
                nome: 'J.K. Rowling',
                dataNascimento: '31 de julho de 1965',
                nacionalidade: 'Britânica',
                biografia: 'Autora da série Harry Potter, Rowling transformou sua ideia concebida em um trem em uma das franquias literárias mais bem-sucedidas da história, vendendo mais de 600 milhões de cópias.'
            });

            this.listaAutores.push({
                nome: 'Paula Hawkins',
                dataNascimento: '26 de agosto de 1972',
                nacionalidade: 'Britânica ',
                biografia: 'Ganhou destaque mundial com o thriller A Garota no Trem, explorando temas como abuso e alcoolismo, após escrever comédias românticas sob pseudônimo.'
            });

            this.listaAutores.push({
                nome: 'Agatha Christie',
                dataNascimento: '15 de setembro de 1890',
                nacionalidade: 'Britânica',
                biografia: 'Conhecida como a "Rainha do Crime", Christie escreveu mais de 80 romances policiais, sendo uma das autoras mais publicadas e traduzidas do mundo.'
            });

            this.listaAutores.push({
                nome: 'Franz Kafka',
                dataNascimento: '3 de julho de 1883',
                nacionalidade: 'Boêmio ',
                biografia: 'Escritor de língua alemã, Kafka é renomado por obras que exploram temas de alienação e burocracia opressiva, como A Metamorfose.'
            });
            
            this.listaAutores.push({
                nome: 'Jane Austen',
                dataNascimento: '16 de dezembro de 1775',
                nacionalidade: 'Britânica',
                biografia: 'Romancista inglesa cujas obras, como Orgulho e Preconceito, criticam e comentam sobre a sociedade e a dependência feminina do casamento na Inglaterra do século XIX.'
            });
        },
    }


});
</script>