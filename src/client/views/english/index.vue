<template>
    <div class="english" :style="{ backgroundImage: `url(${data.fenxiang_img})` }">
        <audio class="audio" :src="data.tts" controls="controls" autoplay="autoplay"></audio>
    </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue'
import { getEnglishApi } from './api'

const data = ref({})
onBeforeMount(async () => {
    const res = await getEnglishApi()
    data.value = res
})
</script>

<style lang="scss" scoped>
.english {
    margin-top: 50px;
    height: 100%;
    background-size: auto 100%;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;

    .audio {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        margin: 0 auto;
    }
}
</style>