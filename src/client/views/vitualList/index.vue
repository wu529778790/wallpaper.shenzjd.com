<template>
  <div class="virtual-wapper" @scroll="onScroll">
    <div
      class="virtual-background"
      :style="{ height: totalHeight + 'px' }"></div>
    <div
      class="virtual-list"
      :style="{
        top: -(topBufferList.length * itemHeight) + 'px',
        bottom: -(bottomBufferList.length * itemHeight) + 'px',
        transform: `translate3d(0, ${startOffset}px, 0)`,
      }">
      <!-- 顶部缓冲 -->
      <div
        class="item"
        v-for="item in topBufferList"
        :key="item"
        :style="{
          height: itemHeight + 'px',
          background: '#f0fcff',
        }">
        {{ item }}
      </div>
      <!-- 中间内容 -->
      <div
        v-for="item in virtualList"
        :key="item"
        class="item"
        :style="{ height: itemHeight + 'px' }">
        {{ item }}
      </div>
      <!-- 底部缓冲 -->
      <div
        class="item"
        v-for="item in bottomBufferList"
        :key="item"
        :style="{ height: itemHeight + 'px', background: '#d6ecf0' }">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onBeforeMount } from "vue";
const data = ref(Array.from({ length: 20 }, (_, i) => i + 1));

const itemHeight = 100;

const totalHeight = computed(() => data.value.length * itemHeight);
// 起始索引
const startIndex = ref(0);
// 显示行数
const count = ref(0);
// 结束索引
const endIndex = ref(0);
// 缓冲行数
const buffer = ref(2);
// 顶部缓冲
const topBufferList = computed(() => {
  return data.value.slice(
    Math.max(0, startIndex.value - buffer.value),
    startIndex.value
  );
});
// 底部缓冲
const bottomBufferList = computed(() => {
  return data.value.slice(
    endIndex.value,
    Math.min(endIndex.value + buffer.value, data.value.length)
  );
});

const virtualList = computed(() => {
  return data.value.slice(startIndex.value, endIndex.value);
});

onBeforeMount(() => {
  const { innerHeight } = window;
  count.value = Math.ceil(innerHeight / itemHeight);
  endIndex.value = startIndex.value + count.value;
});

const startOffset = ref(0);
const onScroll = (event) => {
  const scrollTop = event.target.scrollTop;
  startIndex.value = Math.floor(scrollTop / itemHeight);
  endIndex.value = Math.min(startIndex.value + count.value, data.value.length);
  startOffset.value = scrollTop - (scrollTop % itemHeight);
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
    bottom: 0;
  }
  .virtual-list {
    position: absolute;
    left: 0;
    right: 0;
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
