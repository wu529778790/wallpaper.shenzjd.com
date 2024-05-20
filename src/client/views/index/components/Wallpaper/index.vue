<template>
  <div class="waterfall">
    <ImgBox v-for="(item, index) in list" :key="item.id" :data="item" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import ImgBox from "./imgBox.vue";
import { decode360Url } from "@/utils/index.js";

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
});

const itemWidth = ref(0);
onMounted(() => {
  // 获取浏览器宽度
  const { innerWidth } = window;
  itemWidth.value = innerWidth / 4;
})

const list = computed(() => {
  return props.data.map((item) => {
    return {
      ...item,
      width: itemWidth.value,
      height: itemWidth.value * 9 / 16,
      decode360Url: decode360Url({
        oldUrl: item.url,
        width: itemWidth.value,
        height: itemWidth.value * 9 / 16,
      }),
    };
  });
})
</script>

<style lang="scss" scoped>
.waterfall {
  display: flex;
  flex-wrap: wrap;
}
</style>
