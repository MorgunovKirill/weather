<template>
    <div id="app">
        <div class="container">
            <h2>Welcome!</h2>
            <p> Your current location is: {{ city }} in {{region}}, {{country}}. </p>
            <search-component @changeQuery="changeSearchQuery"></search-component>
            <accordion-component :list="filteredList || list">
                <template #item="{ item }">
                    <documents-list>
                        <draggable
                            :list="item.documents"
                            group="documentsGroup"
                            ghostClass="on-drag"
                            animation="400"
                            :options="{ handle: '.handle' }"
                            @end="onEnd"
                        >
                            <document-item
                                v-for="document in item.documents"
                                :item="document"
                                :key="document.id"
                            ></document-item>
                        </draggable>
                    </documents-list>
                </template>
            </accordion-component>
            <documents-list>
                <draggable
                    :list="unClassifiedList"
                    group="documentsGroup"
                    ghostClass="on-drag"
                    animation="400"
                    :options="{ handle: '.handle' }"
                    @end="onEnd"
                >
                    <document-item
                        v-for="document in filteredUnClassifiedList || unClassifiedList"
                        :item="document"
                        :key="document.id"
                    ></document-item>
                </draggable>
            </documents-list>
        </div>
    </div>
</template>
<script>
import draggable from "vuedraggable";
import SearchComponent from "@/components/Search.vue";
import AccordionComponent from "@/components/Accordion.vue";
import DocumentsList from "@/components/DocumentsList.vue";
import DocumentItem from "@/components/DocumentItem.vue";
import {getCurrentLocation, weatherInfoByLocationParams} from "@/api/weatherApi";

export default {
    name: "App",
    components: {
        SearchComponent,
        AccordionComponent,
        DocumentsList,
        DocumentItem,
        draggable,
    },
    data() {
        return {
            city: '',
            region: '',
            country: '',
            currentLat: null,
            currentLong: null,
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
            if (this.currentLat && this.currentLong) {
                getCurrentLocation(this.currentLat, this.currentLong).then(({data}) =>  {
                    this.country = data[0].country;
                    this.region = data[0].state;
                    this.city = data[0].name;
                });
                weatherInfoByLocationParams(this.currentLat, this.currentLong);
            }
        }
    },
    methods: {
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
