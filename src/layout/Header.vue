<script>
import NavLink from "@/layout/NavLink.vue";
import navItems from "./navItems";
export default {
  components: {
    NavLink,
  },
  data() {
    return {
      navItems,
    };
  },
};
</script>

<template>
  <div class="divCabecalho">
    <div class="divCabecalhoLogoLocal">
      <div class="divCabecalhoLogo">
        <img src="@/assets/nbaLogo.png" height="60" />
      </div>
    </div>
    <div class="divCabecalhoLink">
      <NavLink
        v-for="item in navItems"
        :key="item.route"
        :route="item.route"
        :title="item.title"
        :icon="item.icon"
      />
    </div>
  </div>
</template>
