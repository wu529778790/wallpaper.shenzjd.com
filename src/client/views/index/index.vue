<template>
  <div class="index">
    <VitualList
      :key="itemHeight"
      :data="groupList"
      :itemHeight="itemHeight"
      @scrollToBottom="getList">
      <template #item="{ data, index }">
        <GroupRow :data="data" :rowIndex="index" :itemHeight="itemHeight" />
      </template>
    </VitualList>
  </div>
</template>

<script setup>
import { onBeforeMount, ref, watch, computed } from "vue";
import { useRoute } from "vue-router";
import VitualList from "./components/VitualList/index.vue";
import GroupRow from "./components/GroupRow/index.vue";
import { decode360Url } from "@/utils/index.js";
import { getNewestApi, getListByCategoryApi } from "./api";

const route = useRoute();

const list = ref([]);
const params = ref({
  start: 0,
  count: 100,
  cid: route.query.cid,
});

// 获取分类壁纸
const getListByCategory = async () => {
  return await getListByCategoryApi({
    ...params.value,
  });
};

watch(
  () => route.query.cid,
  (newValue, oldValue) => {
    if (newValue === oldValue) return;
    haveData.value = true;
    params.value.cid = newValue;
    params.value.start = 0;
    list.value = [];
    getList();
  },
  {
    deep: true,
  }
);

// 获取最新壁纸
const getNewest = async () => {
  return await getNewestApi({
    ...params.value,
    cid: undefined,
  });
};

const haveData = ref(true);
const getList = async () => {
  if (haveData.value === false) {
    console.log("没有更多数据了");
    return;
  }
  let res;
  if (params.value.cid) {
    res = await getListByCategory();
  } else {
    res = await getNewest();
  }
  if (res.data.length < params.value.count) {
    haveData.value = false;
  }
  list.value = list.value.concat(res.data);
  params.value.start += params.value.count;
};

const groupList = computed(() => {
  return list.value.reduce((acc, cur, index) => {
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

const itemWidth = ref(0);
const itemHeight = ref(0);

onBeforeMount(() => {
  // 获取浏览器宽度
  const { innerWidth } = window;
  itemWidth.value = innerWidth / 4;
  itemHeight.value = (itemWidth.value * 9) / 16;
  getList();
});
</script>

<style lang="scss" scoped>
.index {
  margin-top: 50px;
  height: 100%;
}
</style>
