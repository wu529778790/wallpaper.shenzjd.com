<template>
  <VitualList
    :key="itemHeight"
    :data="groupList"
    :itemHeight="itemHeight"
    @scrollToBottom="scrollToBottom">
    <template #item="{ data, index }">
      <GroupItem :data="data" :rowIndex="index" :itemHeight="itemHeight" />
    </template>
  </VitualList>
</template>

<script setup>
import { ref, onBeforeMount, computed } from "vue";
import VitualList from "../VitualList/index.vue";
import GroupItem from "./GroupItem.vue";
import { decode360Url } from "@/utils/index.js";

const itemWidth = ref(0);
const itemHeight = ref(0);

onBeforeMount(() => {
  // 获取浏览器宽度
  const { innerWidth } = window;
  itemWidth.value = innerWidth / 4;
  itemHeight.value = (itemWidth.value * 9) / 16;
});

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
});

// 分组，每4个为一组
const groupList = computed(() => {
  return props.data.reduce((acc, cur, index) => {
    const i = Math.floor(index / 4);
    if (!acc[i]) {
      acc[i] = [];
    }
    acc[i].push({
      ...cur,
      width: itemWidth.value,
      height: itemHeight.value,
      decode360Url: decode360Url({
        oldUrl: cur.url,
        width: itemWidth.value,
        height: itemHeight.value,
      }),
    });
    return acc;
  }, []);
});

const emit = defineEmits(["scrollToBottom"]);
const scrollToBottom = () => {
  emit("scrollToBottom");
};
</script>
