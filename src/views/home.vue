<script>
import HomeCard from "@/components/HomeCard.vue";
export default {
  components: { HomeCard },
};
</script>
<template>
  <div class="divGeral">
    <HomeCard route="/Teams" title="TEAMS" customClass="divTimes" />
    <HomeCard route="/Players" title="PLAYERS" customClass="divJogadores" />
    <HomeCard route="/Games" title="LAST MATCHUPS" customClass="divJogos" />
  </div>
</template>

<style>
a {
  text-decoration: none;
}

a:any-link {
}
</style>
