<template>
  <div class="virtual" @scroll="onScroll">
    <div
      class="virtual-phantom"
      :style="{ height: `${data.length * 50}px` }"></div>
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
const list = Array.from({ length: 100 }, (_, i) => i + 1);
const data = ref(list);

const start = ref(0);
const count = ref(20);
const end = computed(() => start.value + count.value);
const virtualList = computed(() => {
  return data.value.slice(start.value, end.value);
});

const startTop = ref(0);
const onScroll = (e) => {
  const scrollTop = e.target.scrollTop;
  start.value = Math.floor(scrollTop / 50);
  startTop.value = scrollTop - (scrollTop % 50);
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
      height: 50px;
      background-color: #eee;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
