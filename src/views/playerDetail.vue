<script>
import nophoto from "../assets/players/nophoto.png";
export default {
  data() {
    return {
      person: {},
      loading: false,
      query: "",
      ulrGoolge: "",
      id: this.$route.params.id,
    };
  },
  methods: {
    /*chamada da api*/
    async getPerson2(url) {
      this.loading = true;
      const res = await fetch(url);
      const data = await res.json();

      const { first_name, last_name, position, team } = data;

      (this.person = {
        Name: first_name,
        "Last Name": last_name,
        Position: position,
        Team: team.full_name,
        City: team.city,
      }),
        (this.loading = false);
    },
    /*função retorno de foto quando não achar imagem no diretório*/
    replaceByDefault(e) {
      e.target.src = nophoto;
    },
    /*função para procurar imagem com o mesmo id no diretório*/
    getImagePath(id) {
      return `/players/${id}.png`;
    },

    /*função para verificar se a imagem existe ou não*/
    fileExists(filename) {
      var http = new XMLHttpRequest();
      http.open("HEAD", filename, false);
      http.send();
      return http.status !== 404;
    },
  },
  mounted() {
    const id = this.$route.params.id;
    this.getPerson2(`https://www.balldontlie.io/api/v1/players/${id}`);
  },
};
</script>
<template>
  <main>
    <div class="divGeral1">
      <div class="divNav">
        <div class="divNavTitulo">
          <p class="pTituloItem">{{ person.Name }}</p>
        </div>
        <div class="divNavBottoes">
          <RouterLink :to="`/players`"
            ><span class="material-symbols-sharp setaBranca">
              undo
            </span></RouterLink
          >
        </div>
      </div>

      <div class="divProfile">
        <div class="divCardFotoProfile">
          <img
            v-if="fileExists(getImagePath(id))"
            :src="getImagePath(id)"
            alt=""
          />
          <img v-else src="../assets/players/nophoto.png" alt="" width="200" />
        </div>
        <div class="divDadosPlayer">
          <h3 v-show="loading" class="loadingPreto">loading .....</h3>
          <table v-show="!loading" class="tableProfile">
            <tr v-for="(value, label) in person" :key="label">
              <td>{{ label }}</td>
              <td>{{ value }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </main>
</template>
<style scoped>
.setaBranca {
  color: white;
}
</style>
