<template>
  <div class="virtual" @scroll="onScroll">
    <div
      class="virtual-phantom"
      :style="{ height: `${data.length * itemHeight}px` }"></div>
    <div
      class="virtual-list"
      :style="{ transform: `translateY(${startTop}px)` }">
      <div
        v-for="item in virtualList"
        :key="item"
        class="item"
        :style="{ height: itemHeight + 'px' }">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
const data = ref(Array.from({ length: 100 }, (_, i) => i + 1));

const start = ref(0);
const count = ref(6);
const end = computed(() => start.value + count.value);
const itemHeight = 200;

const virtualList = computed(() => {
  return data.value.slice(start.value, end.value);
});

const startTop = ref(0);
const onScroll = (e) => {
  const scrollTop = e.target.scrollTop;
  start.value = Math.floor(scrollTop / itemHeight);
  // 向下取整(比较好理解)
  startTop.value =
    scrollTop % itemHeight
      ? Math.floor(scrollTop / itemHeight) * itemHeight
      : scrollTop;
  // 通用写法
  // startTop.value = scrollTop - (scrollTop % itemHeight);
};
</script>

<style lang="scss" scoped>
.virtual {
  height: 100%;
  overflow: auto;
  position: relative;
  .virtual-phantom {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }
  .virtual-list {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    .item {
      background-color: #eee;
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom: 1px solid #ccc;
      box-sizing: border-box;
    }
  }
}
</style>
