<template>
    <div class="layout">
        <Menu />
        <div class="content">
            <router-view />
        </div>
    </div>
</template>

<script setup>
import Menu from './Menu/index.vue'
</script>

<style lang="scss" scoped>
.layout {
    height: 100%;
    display: flex;
    flex-direction: column;

    .content {
        flex: 1;
        overflow: hidden;
        display: flex;
        flex-direction: column;
    }
}
</style>