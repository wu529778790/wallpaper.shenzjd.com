<template>
  <div class="waterfall">
    <ImgBox v-for="(item, index) in data" :key="item.id" :data="item" />
  </div>
</template>

<script setup>
import ImgBox from "./imgBox.vue";

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
});
</script>

<style lang="scss" scoped>
.waterfall {
  display: flex;
  flex-wrap: wrap;
}
</style>
