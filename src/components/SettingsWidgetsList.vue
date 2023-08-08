<template>
    <div class="settings">
        <h2 class="heading">Settings</h2>
            <draggable
                :list="widgets"
                ghostClass="on-drag"
                animation="400"
                :options="{ handle: '.handle' }"
                class="settings-list"
            >
<!--                @end="onEnd"-->
                    <div v-for="(item, i) in widgets" :key="i" class="settings-list__item">
                        <img class="settings-list__move handle" src="../assets/img/menu.svg" alt="передвинуть" width="16" height="16" />
                        <span class="settings-list__city">{{item.name}}</span>
                        <img class="settings-list__delete" src="../assets/img/trash.svg" alt="удалить" width="30" height="25" @click="removeWidget(item.name)"/>
                    </div>
            </draggable>
        <search-component @submitQuery="addLocation"></search-component>
    </div>
</template>
<script>
import draggable from "vuedraggable";
import SearchComponent from "@/components/Search";
import {getLocationByCityName, getLocationByData} from "@/api/weatherApi";

export default {
    name: "SettingsList",
    props: {
        savedWidgets: Array,
    },
    components: {
        SearchComponent,
        draggable
    },
    data() {
        return {
            widgets: [],
        };
    },
    methods: {
        removeWidget(city) {
            this.$emit('removeWidget', city)
        },
        async addLocation(cityName) {
            const {lat, lon} = await getLocationByCityName(cityName);
            const newLocation = await getLocationByData(lat, lon);
            console.log(newLocation);
        },
        // onEnd(e) {
        //     if (e.to.closest(".accordion__content")) {
        //         const target = e.to.closest(".accordion__item");
        //         const content = target.querySelector(".accordion__content");
        //         content.style.maxHeight =
        //             target.querySelector(".accordion__content").scrollHeight + 10 + "px";
        //     }
        // },
    },
    mounted() {
        this.widgets = this.savedWidgets;
    }
};
</script>
<style lang="scss" scoped>
@import "../assets/sass/vars";
.settings {
    max-width: 280px;
}
.heading {
    margin: 0 0 30px 0;
    font-size: 20px;
    line-height: 1.5;
}
.settings-list {
    margin: 0 0 40px 0;
    padding: 0;
    list-style: none;
    display: grid;
    grid-gap: 15px;
    width: 100%;
}

.settings-list__item {
    padding: 5px;
    background-color: #eee;
    display: flex;
    align-items: center;
}

.settings-list__move {
    margin-right: 15px;
    cursor: pointer;
}

.settings-list__delete {
    margin-left: auto;
}
</style>
