<template>
    <div class="row">
        <div class="col-12">
            <div class="card my-4">
                <div class="bg-primary shadow-dark border-radius-lg pt-4 pb-3 d-flex justify-content-between align-items-center">
                    <h6 class="text-white text-capitalize ps-3">Livros</h6>
                    <RouterLink to="/livros/create" class="btn btn-light me-3">Novo Livro</RouterLink>
                </div>
            </div>
            <div class="card-body px-0 pb-2">
                <div class="table-responsive p-0">
                    <table class="table align-items-center mb-0">
                        <thead>
                            <tr>
                                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                    Livro</th>
                                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                    Data Aquisicao</th>
                                <th
                                    class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                    Estado de Conservação
                                </th>
                                <th
                                    class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                    Editora
                                </th>
                                <th
                                    class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                    Autor(a)
                                </th>
                                <th class="text-secondary opacity-7"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(livro, index) in listaLivros" :key="index">
                                <td>
                                    <div class="d-flex px-2 py-1">
                                        <div>
                                            <img src="/img/team-2.jpg" class="avatar avatar-lg me-3" alt="user1">
                                        </div>
                                        <div class="d-flex flex-column justify-content-center">
                                            <h6 class="mb-0 text-sm">{{ livro.nome }}</h6>
                                            <p class="text-xs text-secondary mb-0 text-wrap"
                                                style="white-space: pre-line;">{{ livro.descricao }}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <p class="text-xs font-weight-bold mb-0">{{ livro.dataAquisicao }}</p>
                                </td>
                                <td class="align-middle text-center text-sm">
                                    <span class="badge badge-sm" :class="{
                                        'bg-success': livro.conservacao === 'Novo',
                                        'bg-warning': livro.conservacao === 'Usado',
                                        'bg-danger': livro.conservacao === 'Danificado'
                                    }">
                                        {{ livro.conservacao }}
                                    </span>
                                </td>
                                <td class="align-middle text-center">
                                    <span class="text-secondary text-xs font-weight-bold">{{ livro.editora }}</span>
                                </td>

                                <td class="align-middle text-center">
                                    <span class="text-secondary text-xs font-weight-bold">{{ livro.autor }}</span>
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
            listaLivros: [] as Array<{ nome: string; descricao: string, dataAquisicao: string; conservacao: string; editora: string; autor: string; }>,
        }
    },

    mounted() {
        this.buscarLivros();

    },

    methods: {
        buscarLivros() {
            this.listaLivros.push({
                nome: 'Harry Potter e a Ordem da Fênix',
                descricao: 'Após um verão desastroso, Harry volta para o seu quinto ano em Hogwarts, um dos mais difíceis que terá de encarar. Pouquíssimos alunos e pais acreditam nele ou em Dumbledore sobre a volta de Voldemort, e uma série interminável de artigos circula dizendo que eles estão completamente malucos. Ainda por cima, Dolores Umbridge, a nova professora de Defesa Contra as Artes das Trevas, prova ser a pessoa mais repugnante que Harry já conheceu.',
                dataAquisicao: '01/01/2025',
                conservacao: 'Danificado',
                editora: 'Rocco',
                autor: 'J.K. Rowling'
            });
            this.listaLivros.push({
                nome: 'A Garota no Trem',
                descricao: 'Uma mulher alcoólatra passa todos os dias em frente à sua antiga casa com o trem, que ela pega para sair. Embora ver o ex-marido com a nova esposa e o bebê a deixe extremamente triste, ela gosta de imaginar que outro casal que mora nas proximidades é a combinação perfeita. Mas quando ela testemunha algo que a faz duvidar, ela fica tão revoltada que decide agir para mudar os fatos.',
                dataAquisicao: '01/01/2025',
                conservacao: 'Danificado',
                editora: 'Record',
                autor: 'Paula Hawkins'
            });
            this.listaLivros.push({
                nome: 'Assassinato no Expresso do Oriente',
                descricao: 'Ocorre um assassinato em um luxuoso trem. O famoso detetive Hercule Poirot, que também estava a bordo, precisa correr contra o tempo para resolver o caso.',
                dataAquisicao: '01/01/2025',
                conservacao: 'Usado',
                editora: 'HarperCollins',
                autor: 'Agatha Christie'
            });
            this.listaLivros.push({
                nome: 'A Metamorfose',
                descricao: 'A Metamorfose, de Franz Kafka, narra a história de Gregor Samsa, um caixeiro-viajante, que acorda transformado em um inseto monstruoso. A narrativa aborda a sua vida após a metamorfose, a reação da família e as consequências da alienação e da exclusão social. ',
                dataAquisicao: '01/01/2025',
                conservacao: 'Usado',
                editora: 'Camelot',
                autor: 'Franz Kafka'
            });
            this.listaLivros.push({
                nome: 'Orgulho e Preconceito',
                descricao: 'A história de Orgulho e Preconceito gira em torno das cinco irmãs Bennet, que viviam na área rural do interior da Inglaterra, no século XVIII. Aborda a questão da sucessão em uma família sem herdeiros homens, dentro de uma sociedade patriarcal, onde o casamento era fundamental para as mulheres.',
                dataAquisicao: '01/01/2025',
                conservacao: 'Novo',
                editora: 'Martin Claret',
                autor: 'Jane Austen'
            });
        },
    }


});
</script>
