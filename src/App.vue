<template>
    <div id="app">
        <div class="container">
            <div class="weather-widgets">
                <button class="weather-widgets__toggle" v-if="!settingsMode" type="button" @click="toggleSettingsMode(true)">
                    <img class="settings-list__move" src="./assets/img/gear.svg" width="32" height="32" alt="открыть меню" />
                </button>
                <button class="weather-widgets__toggle" v-else type="button" @click="toggleSettingsMode(false)">
                    <img class="settings-list__move" src="./assets/img/icon-cross.svg" width="18" height="18" alt="закрыть меню" />
                </button>
            </div>
<!--            <SettingsList :saved-widgets="savedWidgets" @removeWidget="removeWidget" />-->
<!--            <WeatherWidgetsList :saved-widgets="savedWidgets" />-->
            <WeatherCard v-if="localWeather" :city="currentCityName" :data="localWeather" />
        </div>
    </div>
</template>
<script>
// import {getLocationByData, weatherInfoByLocationParams} from "@/api/weatherApi";
import WeatherCard from "@/components/WeatherCard";
// import SettingsList from "@/components/SettingsWidgetsList";
// import WeatherWidgetsList from "@/components/WeatherWidgetsList";
import {getLocationByData, weatherInfoByLocationParams} from "@/api/weatherApi";

export default {
    name: "App",
    components: {
        // WeatherWidgetsList,
        // SettingsList,
        WeatherCard
    },
    data() {
        return {
            currentCityName: '',
            localWeather: null,
            currentLat: null,
            currentLong: null,
            settingsMode: false,
            savedWidgets: [
                {
                    name: 'London',
                },
                {
                    name: 'Moscow',
                }
            ],
        };
    },
    created() {
        const success = (position) => {
            this.currentLat = position.coords.latitude;
            this.currentLong = position.coords.longitude;
        };

        const error = (err) => {
            console.log(err)
        };

        navigator.geolocation.getCurrentPosition(success, error);
    },
    watch: {
        currentLat() {
            this.getCurrentLocationData();
        }
    },
    methods: {
        toggleSettingsMode(flag) {
            this.settingsMode = flag;
        },
        removeWidget(city) {
            this.savedWidgets = this.savedWidgets.filter((el) => {
                return el.name !== city;
            });
        },
        async getCurrentLocationData() {
            const currentLocation = await getLocationByData(this.currentLat, this.currentLong);
            this.currentCityName = currentLocation.name;
            this.localWeather  = await weatherInfoByLocationParams(this.currentLat, this.currentLong);
        }
    },
};
</script>
<style lang="scss">
@import "assets/sass/base.scss";


.weather-widgets {
    position: relative;
    max-width: 280px;
    padding: 10px 0 0 0;
}

.weather-widgets__toggle {
    position: absolute;
    top: 7.5px;
    right: 3.5px;
    background-color: transparent;
    border: none;
    padding: 0;
    width: 32px;
    height: 32px;
    display: grid;
    place-items: center;
}
</style>
