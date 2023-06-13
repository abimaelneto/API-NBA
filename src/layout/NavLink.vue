<script>
export default {
  props: {
    route: String,
    title: String,
    icon: String,
  },
};
</script>

<template>
  <RouterLink :to="route">
    <button class="btnAcessoCabecalho">
      <span class="material-symbols-sharp" :title="title"> {{ icon }} </span>
    </button>
  </RouterLink>
</template>
