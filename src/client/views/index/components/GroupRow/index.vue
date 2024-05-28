<template>
  <div class="group-item">
    <ItemBox
      v-for="(item, index) in data"
      :key="item.id"
      :data="item"
      class="item"
      :style="{ height: itemHeight + 'px' }" />
  </div>
</template>

<script setup>
import ItemBox from "../ItemBox/index.vue";

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  // 行索引
  rowIndex: {
    type: Number,
    default: 0,
  },
  itemHeight: {
    type: Number,
    default: 0,
  },
});
</script>

<style lang="scss" scoped>
.group-item {
  display: flex;
  .item {
    flex: 1;
  }
}
</style>
