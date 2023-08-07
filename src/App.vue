<template>
    <div id="app">
        <div class="container">
            <h2>Weather widgets</h2>
            <div class="weather-widgets">
                <button v-if="settingsMode" type="button" @click="toggleSettingsMode(true)">
                    <img class="settings-list__move" src="./assets/img/gear.svg" width="16" height="16" alt="открыть меню" />
                </button>
                <button v-else type="button" @click="toggleSettingsMode(false)">
                    <img class="settings-list__move" src="./assets/img/icon-cross.svg" width="12" height="12" alt="закрыть меню" />
                </button>
            </div>
            <SettingsList :saved-widgets="savedWidgets" @removeWidget="removeWidget" />
<!--            <WeatherCard :city="localData.name" :data="localWeather" />-->
<!--            <search-component @changeQuery="changeSearchQuery"></search-component>-->
<!--            <accordion-component :list="filteredList || list">-->
<!--                <template #item="{ item }">-->
<!--                    <documents-list>-->
<!--                        <draggable-->
<!--                            :list="item.documents"-->
<!--                            group="documentsGroup"-->
<!--                            ghostClass="on-drag"-->
<!--                            animation="400"-->
<!--                            :options="{ handle: '.handle' }"-->
<!--                            @end="onEnd"-->
<!--                        >-->
<!--                            <document-item-->
<!--                                v-for="document in item.documents"-->
<!--                                :item="document"-->
<!--                                :key="document.id"-->
<!--                            ></document-item>-->
<!--                        </draggable>-->
<!--                    </documents-list>-->
<!--                </template>-->
<!--            </accordion-component>-->
<!--            <documents-list>-->
<!--                <draggable-->
<!--                    :list="unClassifiedList"-->
<!--                    group="documentsGroup"-->
<!--                    ghostClass="on-drag"-->
<!--                    animation="400"-->
<!--                    :options="{ handle: '.handle' }"-->
<!--                    @end="onEnd"-->
<!--                >-->
<!--                    <document-item-->
<!--                        v-for="document in filteredUnClassifiedList || unClassifiedList"-->
<!--                        :item="document"-->
<!--                        :key="document.id"-->
<!--                    ></document-item>-->
<!--                </draggable>-->
<!--            </documents-list>-->
        </div>
    </div>
</template>
<script>
// import SearchComponent from "@/components/Search.vue";
// import draggable from "vuedraggable";
// import AccordionComponent from "@/components/Accordion.vue";
// import DocumentsList from "@/components/DocumentsList.vue";
// import DocumentItem from "@/components/DocumentItem.vue";
// import {getCurrentLocation, weatherInfoByLocationParams} from "@/api/weatherApi";
// import WeatherCard from "@/components/WeatherCard";
import SettingsList from "@/components/SettingsWidgetsList";

export default {
    name: "App",
    components: {
        SettingsList,
        // WeatherCard
    },
    data() {
        return {
            localData: {},
            localWeather: {},
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

            list: [
                {
                    id: 1,
                    title: "Обязательные для всех",
                    description:
                        "Документы, обязательные для всех сотрудников без исключения",
                    dots: ["#FF238D", "#FFB800", "#FF8D23"],
                    documents: [
                        {
                            id: "doc1",
                            title: "Паспорт",
                            description: "Для всех",
                            required: true,
                            dots: ["#00C2FF"],
                        },
                        {
                            id: "doc2",
                            title: "ИНН",
                            description: "Для всех",
                            required: true,
                        },
                    ],
                },
                {
                    id: 2,
                    title: "Обязательные для трудоустройства",
                    description:
                        "Документы, без которых невозможно трудоустройство человека на какую бы то ни было должность в компании вне зависимости от граж",
                    documents: [
                        {
                            id: "doс3",
                            title: "Паспорт",
                            description: "Для всех",
                            required: true,
                        },
                        {
                            id: "doc4",
                            title: "ИНН",
                            description: "Для всех",
                            required: true,
                        },
                    ],
                },
                {
                    id: 3,
                    title: "Специальные",
                    documents: [
                        {
                            id: "doc5",
                            title: "Паспорт",
                            description: "Для всех",
                            required: true,
                        },
                        {
                            id: "doc6",
                            title: "ИНН",
                            description: "Для всех",
                            required: true,
                        },
                    ],
                },
            ],
            unClassifiedList: [
                {
                    id: "doc7",
                    title: "Тестовое задание кандидата",
                    description:
                        "Россия, Белоруссия, Украина, администратор филиала, повар-сушист, повар-пиццмейкер, повар горячего цеха",
                },
                {
                    id: "doc8",
                    dots: ["#00C2FF", "#8E9CBB"],
                    title: "Трудовой договор",
                },
                {
                    id: "doc9",
                    title: "Медкнижка",
                },
            ],
            query: "",
            filteredList: null,
            filteredUnClassifiedList: null,
        };
    },
    // created() {
    //     const success = (position) => {
    //         this.currentLat = position.coords.latitude;
    //         this.currentLong = position.coords.longitude;
    //     };
    //
    //     const error = (err) => {
    //         console.log(err)
    //     };
    //
    //     navigator.geolocation.getCurrentPosition(success, error);
    // },
    // watch: {
    //     currentLat() {
    //         if (this.currentLat && this.currentLong) {
    //             getCurrentLocation(this.currentLat, this.currentLong).then(({data}) =>  {
    //                 this.localData = data[0];
    //             });
    //             weatherInfoByLocationParams(this.currentLat, this.currentLong).then(({data}) =>  {
    //                 console.log('data', data)
    //                 this.localWeather = data.current;
    //             });
    //         }
    //     }
    // },
    methods: {
        toggleSettingsMode(flag) {
            this.settingsMode = flag;
        },
        removeWidget(city) {
            this.savedWidgets = this.savedWidgets.filter((el) => {
                return el.name !== city;
            });
        },

        changeSearchQuery(newQuery) {
            this.query = newQuery;

            if (this.query) {
                this.filteredList = this.list.filter((item) => {
                    return item.title.includes(this.query);
                });

                this.filteredUnClassifiedList = this.unClassifiedList.filter((item) => {
                    return item.title.includes(this.query);
                });
            } else {
                this.filteredList = null;
                this.filteredUnClassifiedList = null;
            }
        },
        onEnd(e) {
            if (e.to.closest(".accordion__content")) {
                const target = e.to.closest(".accordion__item");
                const content = target.querySelector(".accordion__content");
                content.style.maxHeight =
                    target.querySelector(".accordion__content").scrollHeight + 10 + "px";
            }
        },
    },
};
</script>
<style lang="scss">
@import "assets/sass/base.scss";
</style>
