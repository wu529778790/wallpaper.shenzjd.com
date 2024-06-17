<template>
  <div class="virtual-wapper" @scroll="onScroll">
    <div
      class="virtual-background"
      :style="{ height: totalHeight + 'px' }"></div>
    <div
      class="virtual-list"
      :style="{
        transform: `translate3d(0, ${startOffset}px, 0)`,
      }">
      <div
        v-for="item in virtualList"
        :key="item"
        class="item"
        :style="{ height: item.height + 'px' }">
        第{{ item.id }}个，高度{{ item.height }}px
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onBeforeMount } from "vue";

/**
 * Generates a random number between the given minimum and maximum values (inclusive).
 *
 * @param {number} min - The minimum value of the range.
 * @param {number} max - The maximum value of the range.
 * @return {number} - A random number between the given minimum and maximum values.
 */
const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const data = ref(
  Array.from({ length: 20 }, (_, i) => {
    return {
      id: i + 1,
      height: generateRandomNumber(200, 500),
    };
  })
);

// 预估高度
const estimatedHeight = 100;
// 缓存的实际总高度
const cacheHeight = new Map();

// 起始索引
const startIndex = ref(0);

const innerHeight = window.innerHeight;
// 显示行数
const visibaleCount = computed(() => {
  // 计算显示行数
  let i = 0;
  let height = 0;
  while (i < data.value.length && height < innerHeight) {
    const item = data.value[i];
    height += item.height;
    cacheHeight.set(i, height);
    i++;
  }
  return i;
});

// 结束索引
const endIndex = computed(() => {
  return startIndex.value + visibaleCount.value;
});

const virtualList = computed(() => {
  const i = endIndex.value - 1;
  // 如果没有缓存，计算高度
  if (!cacheHeight.has(i)) {
    cacheHeight.set(
      i,
      i === 0
        ? data.value[i].height
        : cacheHeight.get(i - 1) + data.value[i].height
    );
  }
  // 计算显示行数
  return data.value.slice(startIndex.value, endIndex.value);
});

const totalHeight = computed(() => {
  return (
    (data.value.length - endIndex.value) * estimatedHeight +
    cacheHeight.get(endIndex.value - 1)
  );
});

const startOffset = ref(0);
const hasChanged = ref(false);
const onScroll = (event) => {
  const { scrollTop } = event.target;
  // 如果大于第一个索引的高度，那么需要恢复位置
  if (
    cacheHeight.get(startIndex.value) < scrollTop &&
    scrollTop < cacheHeight.get(startIndex.value + 1)
  ) {
    if (hasChanged) return;
    console.log(
      `在 ${startIndex.value} 索引和 ${startIndex.value + 1} 索引之间`
    );
    hasChanged = true;
    startOffset.value = scrollTop;
    startIndex.value += 1;
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
