<script>
import nophoto from "../assets/teams/noimage.png";
export default {
  data() {
    return {
      games: [],
      data: [],
      loading: false,
      next: null,
      previous: null,
    };
  },
  methods: {
    /*chamada da api*/
    getGames(url) {
      this.loading = true;
      fetch(url)
        .then((res) => res.json())
        .then((response) => {
          const { data, meta } = response;
          this.games = data;
          this.next = response.meta.next_page;
          this.previous = response.meta.previous;
          this.loading = false;
        });
    },
    /*função para o botão retornar página*/
    handlePrevious() {
      this.getGames(
        `https://www.balldontlie.io/api/v1/games?page=${this.previous}`
      );
    },
    /*função para o botão avançar página*/
    handleNext() {
      this.getGames(
        `https://www.balldontlie.io/api/v1/games?page=${this.next}`
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
  computed: {
    parsedGames() {
      return this.games.map((el) => ({
        ...el,
        date: this.formatarData(el.date),
      }));
    },
  },
  mounted() {
    this.getGames(`https://www.balldontlie.io/api/v1/games`);
  },
};
</script>

<template>
  <main>
    <div class="divGeral1">
      <div class="divNav">
        <div class="divNavTitulo">
          <p class="pTituloItem">LAST MATCHUPS</p>
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
        <div v-for="game in parsedGames" :key="game.games">
          <div class="cardgames">
            <div class="house">
              <div class="view">
                <!-- Logo home -->
                <img
                  v-if="fileExists(getImagePath(game.home_team.id))"
                  :src="getImagePath(game.home_team.id)"
                  alt=""
                  width="65"
                  @error="replaceByDefault"
                />

                <div class="name">{{ game.home_team.abbreviation }}</div>
              </div>

              <div class="points">{{ game.home_team_score }}</div>
            </div>
            <div class="status">{{ game.status }}</div>
            <div class="visitor">
              <div class="points">{{ game.visitor_team_score }}</div>

              <div class="view">
                <!-- Logo visi -->
                <img
                  v-if="fileExists(getImagePath(game.visitor_team.id))"
                  :src="getImagePath(game.visitor_team.id)"
                  alt=""
                  width="65"
                  @error="replaceByDefault"
                />
                <div class="name">{{ game.visitor_team.abbreviation }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
h2 {
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  background: black;
  color: whitesmoke;
  width: 1200px;
  margin-left: 320px;
  border-radius: 30px;
  height: 40px;
}
.cardgames {
  display: flex;
  align-items: center;
  margin: 2rem;
  background: whitesmoke;
  box-shadow: inset 0 0 1em gray, 0 0 1em gray;
  border-radius: 3px;
  width: 300px;
  height: 200px;
}

.house {
  display: flex;
  width: 116px;
  height: 200px;
}
.status {
  display: block;
  width: 80px;
  height: 200px;
  text-align: center;
  padding-top: 10rem;
  font-family: "Bebas Neue", sans-serif;
}
.visitor {
  display: flex;
  width: 116px;
  height: 200px;
}
.view {
  width: 60px;
  padding-top: 4rem;
}

.name {
  padding-top: 1rem;
  text-align: center;
}
.points {
  padding-top: 5rem;
  width: 50px;
  font-family: "Bebas Neue", sans-serif;
  font-weight: bold;
  font-size: 25px;
}
</style>
