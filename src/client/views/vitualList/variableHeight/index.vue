<template>
  <div ref="wapper" class="virtual-wapper" @scroll="onScroll">
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
import { ref, computed, onMounted } from "vue";

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
  Array.from({ length: 10 }, (_, i) => {
    return {
      id: i + 1,
      height: generateRandomNumber(100, 700),
    };
  })
);

// 预估高度, 用已知的高度来计算平均高度
const estimatedHeight = computed(() => {
  if (!cacheHeight.get(endIndex.value)) {
    return 100;
  }
  return cacheHeight.get(endIndex.value) / (endIndex.value + 1);
});

// 缓存的实际总高度
const cacheHeight = new Map();

// 起始索引
const startIndex = ref(0);

const wapper = ref(null);

// 结束索引
const endIndex = ref(1);

// 设置缓存
const setCacheHeight = (i) => {
  if (!cacheHeight.has(i)) {
    cacheHeight.set(
      i,
      i === 0
        ? data.value[i].height
        : cacheHeight.get(i - 1) + data.value[i].height
    );
  }
};

// 当前页面不够展示一页就要加载更多
const checkEndIndex = () => {
  while (
    cacheHeight.get(endIndex.value - 1) - cacheHeight.get(startIndex.value) <=
      wapper.value.offsetHeight &&
    endIndex.value < data.value.length - 1
  ) {
    endIndex.value++;
    setCacheHeight(endIndex.value);
  }
  while (
    cacheHeight.get(endIndex.value - 1) - cacheHeight.get(startIndex.value) >
    wapper.value.offsetHeight
  ) {
    endIndex.value--;
  }
};

onMounted(() => {
  for (let i = 0; i <= endIndex.value; i++) {
    setCacheHeight(i);
  }
  checkEndIndex();
});

const virtualList = computed(() => {
  // 计算显示行数
  return data.value.slice(startIndex.value, endIndex.value + 1);
});

const totalHeight = computed(() => {
  return (
    (data.value.length - 1 - endIndex.value) * estimatedHeight.value +
    cacheHeight.get(endIndex.value)
  );
});

const startOffset = ref(0);
const onScroll = (event) => {
  const { scrollTop } = event.target;
  // 先判断是否在最顶部的上面还是下面
  if (scrollTop > cacheHeight.get(startIndex.value)) {
    let i = 0;
    while (scrollTop > cacheHeight.get(startIndex.value + i)) {
      i++;
    }
    startIndex.value = startIndex.value + i;
    startOffset.value = scrollTop;
  }
  if (
    startIndex.value > 0 &&
    scrollTop < cacheHeight.get(startIndex.value - 1)
  ) {
    let i = 0;
    while (scrollTop < cacheHeight.get(startIndex.value - 1 - i)) {
      i++;
    }
    startIndex.value = startIndex.value - i;
    startOffset.value = scrollTop - data.value[startIndex.value].height;
  }
  console.log(`在索引为${startIndex.value}的元素上`);
  checkEndIndex();
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
