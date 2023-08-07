<template>
  <div class="document">
    <div class="document__info">
      <h2 class="document__title">{{ item.title }}</h2>
      <ul class="document__dots" v-if="item.dots?.length">
        <li
          class="document__dot"
          v-for="dot in item.dots"
          :key="dot"
          :style="{ backgroundColor: dot }"
        ></li>
      </ul>
      <p class="document__required" v-if="item.required">Обязательный</p>
      <p class="document__description">{{ item.description }}</p>
    </div>
    <div class="document__options">
      <button class="document__btn document__btn--edit" type="button">
        <img src="../assets/img/icon-edit.svg" alt="редактировать" />
      </button>
      <button class="document__btn document__btn--delete" type="button">
        <img src="../assets/img/icon-delete.svg" alt="удалить" />
      </button>
      <button class="document__btn handle" type="button">
        <img src="../assets/img/icon-drag.svg" alt="переместить" />
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: "DocumentItem",
  props: ["item"],
};
</script>
<style lang="scss" scoped>
@import "../assets/sass/vars";

.document {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1174px;
  border: 1px solid #dfe4ef;
  border-bottom: none;
  padding: 9px 17px 11px 17px;

  &:last-of-type {
    border-bottom: 1px solid #dfe4ef;
  }

  &__info {
    display: flex;
    align-items: center;
  }

  &__options {
    display: flex;
    align-items: center;
  }

  &__btn {
    background-color: $color-default-white;
    border: none;
    cursor: pointer;
    padding: 0;

    &--edit {
      margin-right: 23px;
    }

    &--delete {
      margin-right: 21px;
    }
  }

  &__title {
    font-weight: 400;
    font-size: 13px;
    line-height: 108%;
    margin: 0 15px 0 0;
  }

  &__description {
    font-family: "Fira Sans";
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 108%;
    color: #8e9cbb;
    margin: 0;
  }

  &__dots {
    margin: 0 15px 0 0;
    padding: 0;
    list-style: none;
    display: flex;
  }

  &__dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #000;

    &:not(:last-child) {
      margin-right: 6px;
    }
  }

  &__required {
    font-weight: 400;
    font-size: 11px;
    line-height: 108%;
    color: #ff238d;
    margin-right: 16px;
  }
}
</style>