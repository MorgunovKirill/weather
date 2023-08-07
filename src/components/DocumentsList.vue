<template>
  <div class="documents">
     <slot></slot>
  </div>
</template>
<script>

export default {
  name: "DocumentsList",
  props: ["list"],
};
</script>
<style lang="scss" scoped>
@import "../assets/sass/vars";

</style>