<template>
    <FullpageScroll v-if="list.length > 0" :list="list" @addList="getList" />
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import FullpageScroll from './components/FullpageScroll/index.vue'
import { getBingApi } from './api'

const list = ref([])

onBeforeMount(async () => {
    await getList()
})

const getList = async () => {
    const res = await getBingApi({
        idx: -1,
        n: 30
    })
    list.value = [...list.value, ...res.images]
}
</script>