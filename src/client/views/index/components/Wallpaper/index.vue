<template>
  <div class="waterfall">
    <ImgBox v-for="(item, index) in list" :key="item.id" :data="item" />
  </div>
</template>

<script setup>
import { computed } from "vue";
import ImgBox from "./imgBox.vue";
import { decode360Url } from "@/utils/index.js";

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
});

const list = computed(() => {
  return props.data.map((item) => {
    return {
      ...item,
      decode360Url: decode360Url({
        oldUrl: item.url,
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
