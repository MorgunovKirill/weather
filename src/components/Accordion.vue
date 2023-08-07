<template>
  <ul class="accordion">
    <draggable
      :list="list"
      ghostClass="on-drag"
      animation="400"
      :options="{ handle: '.handle' }"
    >
      <li
        v-for="item in list"
        :key="item.id"
        class="accordion__item"
        :data-index="item.id"
      >
        <div class="accordion__container">
          <div class="accordion__info">
            <button
              class="accordion__toggle"
              @click.prevent="toggleTab"
              type="button"
            >
              <img src="../assets/img/icon-arrow.svg" alt="открыть" />
            </button>
            <h2 class="accordion__title">{{ item.title }}</h2>
            <ul class="accordion__dots" v-if="item.dots?.length">
              <li
                class="accordion__dot"
                v-for="dot in item.dots"
                :key="dot"
                :style="{ backgroundColor: dot }"
              ></li>
            </ul>
            <p class="accordion__description">{{ item.description }}</p>
          </div>
          <div class="accordion__options">
            <button class="accordion__btn accordion__btn--edit" type="button">
              <img src="../assets/img/icon-edit.svg" alt="редактировать" />
            </button>
            <button class="accordion__btn accordion__btn--delete" type="button">
              <img src="../assets/img/icon-delete.svg" alt="удалить" />
            </button>
            <button class="accordion__btn handle" type="button">
              <img src="../assets/img/icon-drag.svg" alt="переместить" />
            </button>
          </div>
        </div>
        <div class="accordion__content">
          <slot name="item" :item="item"></slot>
        </div>
      </li>
    </draggable>
  </ul>
</template>
<script>
import draggable from "vuedraggable";

export default {
  name: "AccordionComponent",
  components: {
    draggable,
  },
  props: ["list"],
  methods: {
    toggleTab(evt) {
      const target = evt.target.closest(".accordion__item");
      const content = target.querySelector(".accordion__content");
      target
        .querySelector(".accordion__container")
        .classList.toggle("accordion__container--active");
      content.classList.toggle("accordion__content--active");
      if (content.classList.contains("accordion__content--active")) {
        content.style.maxHeight =
          target.querySelector(".accordion__content").scrollHeight + 10 + "px";
      } else {
        content.style.maxHeight = 0;
      }
    },
  },
};
</script>
<style lang="scss">
@import "../assets/sass/vars";

.accordion {
  margin: 0 0 14px 0;
  padding: 0;
  list-style: none;

  &__item {
    background-color: $color-default-white;
    max-width: 1174px;

    &:last-child {
      .accordion__container {
        border-bottom: 1px solid #dfe4ef;
      }
    }
  }

  &__title {
    font-weight: 700;
    font-size: 15px;
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

  &__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 13px 16px;
    font-style: normal;
    color: $color-dark-base;
    border: 1px solid #dfe4ef;
    border-bottom: none;

    img {
      transition: transform $default-transition-settings;
    }

    &--active {
      position: relative;
      border-bottom: 1px solid #dfe4ef;

      .accordion__info {
        img {
          transform: rotate(180deg);
        }
      }
    }
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

  &__toggle {
    background-color: $color-default-white;
    border: 1px solid #d3d8df;
    border-radius: 50%;
    cursor: pointer;
    padding: 0;
    width: 22px;
    height: 22px;
    display: grid;
    place-items: center;
    margin-right: 14px;
  }

  &__content {
    max-height: 0;
    margin-top: -1px;
    transition: max-height $default-transition-settings;
    padding-left: 16px;
    overflow: hidden;

    &--active {
      overflow: visible;
    }
  }

  &__content-item {
    font-family: $primary-font;
    font-style: normal;
    font-weight: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 108%;
    color: $color-dark-base;
    margin: 0;
    padding: 9px 15px;
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
}
</style>
