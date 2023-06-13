<script>
export default {
  props: {
    route: String,
    title: String,
    customClass: String,
  },
};
</script>

<template>
  <div class="divGeralItem">
    <div :class="customClass">
      <RouterLink :to="route">
        <button class="btnAcesso">{{ title }}</button>
      </RouterLink>
    </div>
  </div>
</template>
