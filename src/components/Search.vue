<template>
    <div>
        <h2 class="heading">Add location:</h2>
        <div class="form-input">
            <input type="text" v-model="searchQuery" />
            <button v-show="searchQuery" @click="submitQuery" class="form-input__submit">
                <img src="../assets/img/icon-arrow.svg" alt="искать"/>
            </button>
        </div>
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
    submitQuery() {
        this.$emit('submitQuery', this.searchQuery);
        this.searchQuery = "";
    },
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/sass/vars";

.heading {
    margin: 0 0 30px 0;
    font-size: 20px;
    line-height: 1.5;
}

.form-input {
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

  input[type="text"] {
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

  &__submit {
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
