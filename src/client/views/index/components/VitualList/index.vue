<template>
  <div class="virtual-wapper" @scroll="onScroll">
    <div
      class="virtual-background"
      :style="{ height: totalHeight + 'px' }"></div>
    <div
      class="virtual-list"
      :style="{ transform: `translateY(${startTop}px)` }">
      <div
        v-for="(item, index) in virtualList"
        :key="item"
        :style="{ height: itemHeight + 'px' }">
        <slot name="item" :data="item" :index="index"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onBeforeMount } from "vue";

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  itemHeight: {
    type: Number,
    default: 0,
    requied: true,
  },
  // 缓冲行数
  buffer: {
    type: Number,
    default: 3,
  },
});

const totalHeight = computed(() => props.data.length * props.itemHeight);
const start = ref(0);
const count = ref(0);
const end = computed(() => start.value + count.value);
const virtualList = computed(() => {
  return props.data.slice(start.value, end.value);
});

onBeforeMount(() => {
  const { innerHeight } = window;
  count.value = Math.ceil(innerHeight / props.itemHeight) + props.buffer;
});

const startTop = ref(0);
const emit = defineEmits(["scrollToBottom"]);
const onScroll = (e) => {
  const { scrollTop, clientHeight, scrollHeight } = e.target;
  start.value = Math.floor(scrollTop / props.itemHeight);
  startTop.value =
    scrollTop % props.itemHeight
      ? Math.floor(scrollTop / props.itemHeight) * props.itemHeight
      : scrollTop;
  // 如果滚动到底部
  if (scrollTop + clientHeight === scrollHeight) {
    emit("scrollToBottom");
  }
};
</script>

<style lang="scss" scoped>
.virtual-wapper {
  height: 100%;
  position: relative;
  overflow: auto;
  .virtual-background {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
  }
  .virtual-list {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
  }
}
</style>
