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
            <SettingsList v-if="settingsMode" :saved-widgets="savedWidgets" @addWidget="addWidget" @removeWidget="removeWidget" />
            <WeatherWidgetsList v-else :saved-widgets="savedWidgets" />
        </div>
    </div>
</template>
<script>
import SettingsList from "@/components/SettingsWidgetsList";
import WeatherWidgetsList from "@/components/WeatherWidgetsList";
import {getLocationByData, weatherInfoByLocationParams} from "@/api/weatherApi";
import {getValueFromStorage, storeValueInStorage} from "@/storage/storage";

export default {
    name: "App",
    components: {
        WeatherWidgetsList,
        SettingsList,
    },
    data() {
        return {
            localWeather: null,
            currentLat: null,
            currentLong: null,
            settingsMode: false,
            savedWidgets: [],
        };
    },
    mounted() {
        const savedLocations = getValueFromStorage('locationsList');
        if (savedLocations && JSON.parse(savedLocations).length) {
            this.savedWidgets = JSON.parse(savedLocations);
        } else {
            const success = async (position) => {
                this.currentLat = position.coords.latitude;
                this.currentLong = position.coords.longitude;
                await this.getCurrentLocationData();
                this.savedWidgets.push(this.localWeather);
                storeValueInStorage('locationsList', JSON.stringify(this.savedWidgets));
            };

            const error = (err) => {
                console.log(err)
            };

            navigator.geolocation.getCurrentPosition(success, error);
        }
    },
    methods: {
        toggleSettingsMode(flag) {
            this.settingsMode = flag;
        },
        addWidget(data) {
            this.savedWidgets.push(data);
            storeValueInStorage('locationsList', JSON.stringify(this.savedWidgets));
        },
        removeWidget(city) {
            this.savedWidgets = this.savedWidgets.filter((el) => {
                return el.city !== city;
            });
            storeValueInStorage('locationsList', JSON.stringify(this.savedWidgets));
        },
        async getCurrentLocationData() {
            const currentLocation = await getLocationByData(this.currentLat, this.currentLong);
            this.localWeather = await weatherInfoByLocationParams(this.currentLat, this.currentLong);
            this.localWeather.city = currentLocation.name;
            this.localWeather.state = currentLocation.state;
            this.localWeather.country = currentLocation.country;
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
