<template>
    <div>
        <button v-for="(title, index) in titles" :key="index" :style="{ backgroundColor: title.color }"
            @click="emitMenuClicked(index)">
            {{ title.text }}
        </button>
    </div>
</template>

<script>
export default {
    name: 'NavBar',
    props: {
        titles: {
            type: Array,
            required: true,
        },
    },
    methods: {
        emitMenuClicked(index) {
            this.$emit('menu-clicked', index);
        },
    },
};
</script>

<style scoped>
button {
    padding: 10px;
    margin: 5px;
    border: none;
    cursor: pointer;
}
</style>