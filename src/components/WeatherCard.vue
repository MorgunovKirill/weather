<template>
    <div class="weather-card">
        <h3 class="weather-card__city">{{ data.city }}, {{ data.country }}</h3>
        <div class="weather-card__temp">
            <div class="weather-card__icon">
                <img src="https://openweathermap.org/img/wn/10d@2x.png" alt="weather-icon">
            </div>
            <span class="weather-card__temp-value">{{ Math.floor(parseInt(data.temp)) }} C</span>
        </div>
        <p class="weather__description">Feels like: {{ Math.floor(parseInt(data.feels_like)) }}</p>
        <div class="weather__wind-info">
            <span class="weather__sse">Wind speed: {{ data.wind_speed }} m/s SSE</span>
            <span class="weather__hpa">Pressure: {{ data.pressure }} hPa</span>
        </div>
        <div class="weather__humidity-info">
            <span class="weather__humidity-value">Humidity: {{ data.humidity }}%</span>
            <span class="weather__dew-point">Dew point: {{ data.dew_point }}</span>
        </div>
        <div class="weather__visibility">Visibility: {{ Math.floor(parseInt(data.visibility)) / 1000 }} km</div>
    </div>
</template>
<script>
export default {
    name: "WeatherCard",
    props: {
        data: Object,
        city: String,
    },
    data() {
        return {};
    },
    methods: {},
};
</script>
<style lang="scss" scoped>
@import "../assets/sass/vars";

.weather-card {
    border: 5px solid #eee;
    width: 280px;
    min-height: 350px;
    padding: 10px;
    font-size: 16px;
    line-height: 1.5;
}

.weather-card__city {
    font-weight: 700;
    font-size: 16px;
    line-height: 1.5;
    margin: 0 0 15px 0;
}

.weather-card__temp,
.weather__wind-info,
.weather__humidity-info {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;
    margin: 0 0 15px 0;
    font-size: 16px;
    line-height: 1.5;
}

.weather-card__temp-value {
    font-weight: 700;
    font-size: 25px;
    line-height: 1.5;
}

.weather__description {
    margin: 0 0 15px 0;
}
</style>
