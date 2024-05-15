<template>
    <div class="fullpage-scroll">
        <section class="section" v-for="(item, index) in list" :key="item.hsh" :style="{
            backgroundImage: `url(https://www.bing.com${item.url})`,
        }">
        </section>
    </div>
</template>

<script setup>
import { onMounted, ref, nextTick } from 'vue';

const props = defineProps({
    list: Array
})

const offsets = ref([]);
const calculateSectionOffsets = async () => {
    await nextTick()
    let sections = document.getElementsByTagName('section');
    for (let i = 0; i < props.list.length; i++) {
        offsets.value.push(sections[i].offsetTop);
    }
}

const activeSection = ref(0);
const inMove = ref(false);

const handleMouseWheel = (e) => {
    if (e.wheelDelta < 30 && !inMove.value) {
        moveUp();
    } else if (e.wheelDelta > 30 && !inMove.value) {
        moveDown();
    }
    e.preventDefault();
    return false;
}

const moveDown = () => {
    inMove.value = true;
    activeSection.value--;

    if (activeSection < 0) {
        activeSection.value = offsets.value.length - 1;
    }
    scrollToSection(activeSection.value, true);
}

const moveUp = () => {
    inMove.value = true;
    activeSection.value = activeSection.value + 1
    if (activeSection.value > offsets.value.length - 1) {
        activeSection.value = 0;
    }
    scrollToSection(activeSection.value, true);
}

const inMoveDelay = 400;
const scrollToSection = (id, force = false) => {
    if (inMove.value && !force) return false;

    activeSection.value = id;
    inMove.value = true;
    let section = document.getElementsByTagName('section')[id];
    if (section) {
        document.getElementsByTagName('section')[id].scrollIntoView({ behavior: 'smooth' });
    }

    setTimeout(() => {
        inMove.value = false;
    }, inMoveDelay);
}

onMounted(() => {
    calculateSectionOffsets()
    window.addEventListener('mousewheel', handleMouseWheel, { passive: false })
})
</script>

<style lang="scss" scoped>
.fullpage-scroll {
    flex: 1;

    .section {
        width: 100%;
        height: 100%;
        background-size: cover;
        color: #fff;
        position: relative;
    }
}
</style>