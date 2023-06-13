<script>
import { RouterLink } from "vue-router";
import nophoto from "../assets/players/nophoto.png";
export default {
  data() {
    return {
      people: [],
      loading: false,
      next: null,
      previous: null,
      searchWord: "",
    };
  },
  methods: {
    /*chamada da api*/
    getPeople(url) {
      this.loading = true;
      fetch(url)
        .then((res) => res.json())
        .then((players) => {
          this.people = players.data;
          this.next = players.meta.next_page;
          this.previous = players.meta.previous;
          this.loading = false;
        });
    },
    /*função para o botão voltar página*/
    handleNext() {
      if (this.searchWord == "") {
        this.getPeople(
          `https://www.balldontlie.io/api/v1/players?page=${this.next}`
        );
      } else {
        this.getPeople(
          `https://www.balldontlie.io/api/v1/players?page=${this.next}&search=${this.searchWord}`
        );
      }
    },
    /*função para o botão retornar página*/
    handlePrevious() {
      if (this.searchWord == "") {
        this.getPeople(
          `https://www.balldontlie.io/api/v1/players?page=${this.previous}`
        );
      } else {
        this.getPeople(
          `https://www.balldontlie.io/api/v1/players?page=${this.previous}&search=${this.searchWord}`
        );
      }
    },
    searchPlayers() {
      this.getPeople(
        `https://www.balldontlie.io/api/v1/players?search=${this.searchWord}`
      );
    },
    clearSearch() {
      this.searchWord = "";
      this.getPeople(`https://www.balldontlie.io/api/v1/players`);
    },
    /*função de retorno caso não ache foto no diretório com id*/
    replaceByDefault(e) {
      e.target.src = nophoto;
    },
    /*função procurar imagem com o mesmo nome do id*/
    getImagePath(id) {
      return `/players/${id}.png`;
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

  mounted() {
    this.getPeople("https://www.balldontlie.io/api/v1/players");
  },
};
</script>

<template>
  <main>
    <div class="divGeral1">
      <div class="divSearch">
        <input
          type="search"
          v-model="searchWord"
          placeholder="search by last name"
          class="inputSearch"
        />
        <span class="material-symbols-sharp" @click="searchPlayers()">
          search
        </span>
        <span class="material-symbols-sharp" @click="clearSearch()">
          restart_alt
        </span>
      </div>
      <div class="divNav">
        <div class="divNavTitulo">
          <p class="pTituloItem">Players</p>
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
      <div class="divShoItens">
        <h3 v-show="loading" class="loadingPreto">loading .....</h3>
        <div class="divCard" v-for="player in people" :key="player.name">
          <div class="divCardFoto">
            <img
              v-if="fileExists(getImagePath(player.id))"
              :src="getImagePath(player.id)"
              alt=""
              width="65"
              @error="replaceByDefault"
            />
          </div>
          <RouterLink :to="`/player/${player.id}`">
            {{ player.first_name }} {{ player.last_name }}
            {{ player.team.name }}
          </RouterLink>
        </div>
      </div>
    </div>
  </main>
</template>
<style>
iframe {
  border: none;
  background-color: white;
}

th {
  color: white;
  background-color: black;
}

table {
  align-items: center;
}

#button-Container {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

button {
  width: 100px;
}

table {
  width: 500px;
}

a {
  text-decoration: none;
}

h3 {
  color: white;
}
</style>
