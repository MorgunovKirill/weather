<template>
  <div class="form-input">
    <input type="text" v-model="searchQuery" @input="changeQuery" />
    <button v-show="searchQuery" @click="clearQuery" class="form-input__clear">
        <img src="../assets/img/icon-cross.svg" alt="очистить поиск"/>
    </button>
  </div>
</template>
<script>
export default {
  name: "SearchComponent",
  data() {
    return {
      searchQuery: "",
    };
  },
  methods: {
    clearQuery() {
        this.searchQuery = "";
        this.$emit('changeQuery', "")
    },
    changeQuery() {
      this.$emit('changeQuery', this.searchQuery)
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/sass/vars";

.form-input {
   max-width: 50%;
   margin-bottom: 19px;
   position: relative;


   &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    background-image: url('../assets/img/icon-search.svg');
    width: 14px;
    height: 14px;
   }

  input[type="text"],
  input[type="tel"],
  input[type="search"],
  input[type="email"] {
    width: 100%;
    border: 2px solid $color-transparent;
    padding: 12px 23px 12px 25px;
    border-bottom: 1px solid #0066FF;
    font-size: 15px;
    line-height: 108%;
    font-family: $primary-font;
    outline: none;
    color: $color-dark-base;

    &::placeholder {
      color: #808080;
    }
  }

  &__clear {
    background-color: $color-transparent;
    border: none;
    cursor: pointer;
    position: absolute;
    height: 11px;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    z-index: 1;
  }
}
</style>
