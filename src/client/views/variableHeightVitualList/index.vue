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
  Array.from({ length: 200 }, (_, i) => {
    return {
      id: i + 1,
      height: generateRandomNumber(200, 500),
    };
  })
);

// 预估高度
const estimatedHeight = 100;

const totalHeight = ref(0);

// 起始索引
const startIndex = ref(0);

const hasVisibleHeight = ref(0);
const innerHeight = window.innerHeight;
// 显示行数
const visibaleCount = computed(() => {
  // 计算显示行数
  let i = 0;
  while (hasVisibleHeight.value < innerHeight) {
    hasVisibleHeight.value = hasVisibleHeight.value + data.value[i].height;
    i++;
  }
  return i;
});
// 结束索引
const endIndex = computed(() => {
  return startIndex.value + visibaleCount.value;
});

const virtualList = computed(() => {
  return data.value.slice(startIndex.value, endIndex.value);
});

onBeforeMount(() => {
  // 预估总高度
  totalHeight.value =
    (data.value.length - visibaleCount.value) * estimatedHeight +
    hasVisibleHeight.value;
});

const startOffset = ref(0);
const hasChanged = ref(false);
const notVisibleHeight = ref(data.value[startIndex.value].height);
const onScroll = (event) => {
  const { scrollTop } = event.target;
  // 如果大于第一个索引的高度，那么需要恢复位置
  if (scrollTop >= notVisibleHeight.value) {
    console.log(`大于${startIndex.value}索引的高度，那么需要恢复位置`);
    if (hasChanged.value) {
      return;
    }
    startOffset.value = scrollTop;
    hasChanged.value = true;
    startIndex.value = startIndex.value + 1;
    notVisibleHeight.value =
      notVisibleHeight.value + data.value[startIndex.value].height;
  } else {
    console.log(`没有超出${startIndex.value}索引的高度，那么需要滚动`);
    hasChanged.value = false;
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
