<script>
import nophoto from "../assets/teams/noimage.png";
export default {
  data() {
    return {
      fullTeam: {},
      id: this.$route.params.id,
    };
  },
  methods: {
    /*chamada da api*/
    async getfullTeam(url) {
      this.loading = true;
      const res = await fetch(url);
      const data = await res.json();
      const { full_name, city, abbreviation, conference, division } = data;

      this.fullTeam = {
        Name: full_name,
        City: city,
        Abbreviation: abbreviation,
        Conference: conference,
        Division: division,
      };
      this.loading = false;
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
      // Cria um novo objeto de requisição
      var http = new XMLHttpRequest();

      // Define o método e a URL da requisição
      http.open("HEAD", filename, false);

      // Envia a requisição
      http.send();

      // Verifica o status da resposta
      return http.status !== 404;
    },
  },
  mounted() {
    const id = this.$route.params.id;
    this.getfullTeam(`https://www.balldontlie.io/api/v1/teams/${id}`);
  },
};
</script>

<template>
  <div class="divGeral1">
    <div class="divNav">
      <div class="divNavTitulo">
        <p class="pTituloItem">{{ fullTeam.Name }}</p>
      </div>
      <div class="divNavBottoes">
        <RouterLink :to="`/teams`"
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
          width="200"
        />
        <img v-else src="../assets/teams/noimage.png" alt="" width="200" />
      </div>
      <div class="divDadosPlayer">
        <h3 v-show="loading" class="loadingPreto">loading .....</h3>
        <table v-show="!loading" class="tableProfile">
          <tr v-for="(value, label) in fullTeam" :key="label">
            <td>{{ label }}</td>
            <td>{{ value }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.setaBranca {
  color: white;
}
</style>
