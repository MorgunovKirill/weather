<template>
    <ul class="weather-list">
        <li v-for="(item, i) in savedWidgets" :key="i" class="weather-list__item">
            <WeatherCard :data="item" />
        </li>
    </ul>
</template>
<script>
import WeatherCard from "@/components/WeatherCard";
export default {
    name: "WeatherWidgetsList",
    components: {WeatherCard},
    props: {
        savedWidgets: Array,
    },
    data() {
        return {};
    },
    methods: {},
};
</script>
<style lang="scss" scoped>
@import "../assets/sass/vars";
.weather-list {
    margin: 0;
    padding: 0;
    list-style: none;
    display: grid;
    grid-gap: 15px;
    //grid-template-columns: repeat(auto-fill, 250px);
}
</style>
