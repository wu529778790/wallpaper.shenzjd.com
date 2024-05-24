<template>
  <div class="index">
    <Wallpaper :data="list" @scrollToBottom="getList" />
  </div>
</template>

<script setup>
import { onBeforeMount, ref, watch } from "vue";
import { useRoute } from "vue-router";
import Wallpaper from "./components/Wallpaper/index.vue";
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
  const res = await getListByCategoryApi({
    ...params.value,
  });
  if (res.data.length < params.value.count) {
    haveData.value = false;
  }
  list.value = list.value.concat(res.data);
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
  const res = await getNewestApi({
    ...params.value,
    cid: undefined,
  });
  if (res.data.length < params.value.count) {
    haveData.value = false;
  }
  list.value = list.value.concat(res.data);
};

const haveData = ref(true);
const getList = () => {
  if (haveData.value === false) {
    console.log("没有更多数据了");
    return;
  }
  if (params.value.cid) {
    getListByCategory();
  } else {
    getNewest();
  }
  params.value.start += params.value.count;
};

onBeforeMount(() => {
  getList();
});
</script>

<style lang="scss" scoped>
.index {
  margin-top: 50px;
  height: 100%;
}
</style>
