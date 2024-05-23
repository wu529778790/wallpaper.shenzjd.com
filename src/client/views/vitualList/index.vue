<template>
  <div class="virtual" @scroll="onScroll">
    <div
      class="virtual-phantom"
      :style="{ height: `${data.length * 100}px` }"></div>
    <div
      class="virtual-list"
      :style="{ transform: `translateY(${startTop}px)` }">
      <div v-for="item in virtualList" :key="item" class="item">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
const data = ref(Array.from({ length: 20 }, (_, i) => i + 1));

const start = ref(0);
const count = ref(10);
const end = computed(() => start.value + count.value);
const virtualList = computed(() => {
  return data.value.slice(start.value, end.value);
});

const startTop = ref(0);
const onScroll = (e) => {
  const scrollTop = e.target.scrollTop;
  start.value = Math.floor(scrollTop / 100);
  // 向下取整(比较好理解)
  // startTop.value =
  //   scrollTop % 100 ? Math.floor(scrollTop / 100) * 100 : scrollTop;
  // 通用写法
  startTop.value = scrollTop - (scrollTop % 100);
};
</script>

<style lang="scss" scoped>
.virtual {
  flex: 1;
  margin-top: 50px;
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
      height: 100px;
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
