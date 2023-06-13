<script>
import nophoto from "../assets/teams/noimage.png";
export default {
  data() {
    return {
      teams: {},
      next: null,
      previous: null,
      loading: false,
      searchWord: "",
    };
  },
  methods: {
    /*chamada da api*/
    getTeams(url) {
      this.loading = true;
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          const { name, full_name, division } = data;
          this.teams = data.data;
          this.next = data.meta.next_page;
          this.previous = data.meta.previous;
          this.loading = false;
        });
    },
    /*função para o botão retornar página*/
    handlePrevious() {
      this.getTeams(
        `https://www.balldontlie.io/api/v1/teams?page=${this.previous}`
      );
    },
    /*função para o botão avançar página*/
    handleNext() {
      this.getTeams(
        `https://www.balldontlie.io/api/v1/teams?page=${this.next}`
      );
    },
    /*função de retorno caso não ache foto no diretório com id*/
    replaceByDefault(e) {
      e.target.src = nophoto;
    },
    /*função procurar imagem com o mesmo nome do id*/
    getImagePath(id) {
      return `/teams/${id}.png`;
    },
    /*função para procurar imagem no diretório*/
    fileExists(filename) {
      var http = new XMLHttpRequest();
      http.open("HEAD", filename, false);
      http.send();

      if (http.status === 404) {
        filename = nophoto;
        http = new XMLHttpRequest();
        http.open("HEAD", filename, false);
        http.send();

        return http.status !== 404;
      }
      return http.status !== 404;
    },
  },
  computed: {},
  mounted() {
    this.getTeams(`https://www.balldontlie.io/api/v1/teams`);
  },
};
</script>

<template>
  <main>
    <div class="divGeral1">
      <div class="divNav">
        <div class="divNavTitulo">
          <p class="pTituloItem">Teams</p>
        </div>
        <div class="divNavBottoes">
          <span class="material-symbols-sharp" @click="handlePrevious">
            arrow_circle_left
          </span>
          <span class="material-symbols-sharp" @click="handleNext">
            arrow_circle_right
          </span>
        </div>
      </div>
      <div class="divShoTeams">
        <h3 v-show="loading" class="loadingPreto">loading .....</h3>
        <div class="divCard" v-for="team in teams" :key="team.full_name">
          <div class="divCardFoto">
            <img
              v-if="fileExists(getImagePath(team.id))"
              :src="getImagePath(team.id)"
              alt=""
              width="65"
              @error="replaceByDefault"
            />
          </div>
          <RouterLink :to="`/team/${team.id}`">
            {{ team.full_name }} {{ team.division }}
            {{ team.conference }}
          </RouterLink>
        </div>
      </div>
    </div>
  </main>
</template>

<style>
h3 {
  color: white;
}
</style>
