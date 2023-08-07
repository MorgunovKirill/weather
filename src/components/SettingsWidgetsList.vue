<template>
    <div>
        <h2 class="heading">Setting</h2>
        <ul class="settings-list">
            <li v-for="(item, i) in savedWidgets" :key="i" class="settings-list__item">
                <img class="settings-list__move" src="../assets/img/menu.svg" alt="передвинуть" width="16" height="16" />
                <span class="settings-list__city">{{item.name}}</span>
                <img class="settings-list__delete" src="../assets/img/trash.svg" alt="удалить" width="30" height="25" @click="removeWidget(item.name)"/>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: "SettingsList",
    props: {
        savedWidgets: Array,
    },
    data() {
        return {};
    },
    methods: {
        removeWidget(city) {
            this.$emit('removeWidget', city)
        }
    },
};
</script>
<style lang="scss" scoped>
@import "../assets/sass/vars";
.heading {
    margin: 0 0 30px 0;
    font-size: 20px;
    line-height: 1.5;
}
.settings-list {
    margin: 0;
    padding: 0;
    list-style: none;
    display: grid;
    grid-gap: 15px;
    width: 250px;
}

.settings-list__item {
    padding: 5px;
    background-color: #eee;
    display: flex;
    align-items: center;
}

.settings-list__move {
    margin-right: 15px;
}

.settings-list__delete {
    margin-left: auto;
}
</style>
