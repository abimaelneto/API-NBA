<script>
import nophoto from "../assets/players/nophoto.png";
import imageMixin from "@/mixins/image";
export default {
  mixins: [imageMixin],
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
            :src="getImagePath('players', id)"
            alt=""
            @error="replaceByDefault"
          />
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
