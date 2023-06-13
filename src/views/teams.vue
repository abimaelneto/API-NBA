<script>
import nophoto from "../assets/teams/noimage.png";
import imageMixin from "@/mixins/image";

export default {
  mixins: [imageMixin],
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
        .then((response) => {
          const { data, meta } = response;
          const { previous, next_page } = meta;
          this.teams = data;
          this.next = next_page;
          this.previous = previous;
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
              :src="getImagePath('teams', team.id)"
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
