<template>
  <div class="index">
    <Wallpaper :data="list" />
    <div class="loadmore">
      <div v-if="loadmore" class="loading">
        <div class="spinner" v-for="i in 3" :key="i"></div>
      </div>
      <div v-else>没有更多了</div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import Wallpaper from "../components/Wallpaper/index.vue";
import { getNewestApi, getListByCategoryApi } from "./api";
import { decode360Url } from "../utils";

const route = useRoute();

const list = ref([]);
const params = ref({
  start: 0,
  count: 40,
  cid: route.query.cid,
});

const handlerData = (data) => {
  return data.map((item, index) => {
    return {
      ...item,
      decode360Url: decode360Url({
        oldUrl: item.url,
      }),
    };
  });
};

// 获取分类壁纸
const getListByCategory = async () => {
  const res = await getListByCategoryApi({
    ...params.value,
  });
  const newList = handlerData(res.data);
  list.value = list.value.concat(newList);
};

watch(
  () => route.query.cid,
  (newValue, oldValue) => {
    if (newValue === oldValue) return;
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
  list.value = list.value.concat(handlerData(res.data));
};

const loadmore = ref(true);
const getList = () => {
  if (params.value.start > list.value.length && params.value.start > 0) {
    loadmore.value = false;
    return;
  }
  if (params.value.cid) {
    getListByCategory();
  } else {
    getNewest();
  }
  params.value.start += params.value.count;
};
onMounted(() => {
  const endObserver = new IntersectionObserver((entries) => {
    if (entries[0].intersectionRatio <= 0) return;
    getList();
  });
  endObserver.observe(document.querySelector(".loadmore"));
});
</script>

<style lang="scss" scoped>
.index {
  margin-top: 50px;
  overflow-y: auto;
  .loadmore {
    padding: 16px;
    color: #999;
    font-size: 14px;
    display: flex;
    justify-content: center;
    .loading {
      position: relative;
      display: flex;
      gap: 10px;
      .spinner {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #000;
        animation: loading 1s infinite ease-in-out;
      }
      .spinner:nth-child(1) {
        animation-delay: 0.3s;
      }
      .spinner:nth-child(2) {
        animation-delay: 0.6s;
      }
      .spinner:nth-child(3) {
        animation-delay: 0.9s;
      }
    }

    @keyframes loading {
      0% {
        opacity: 1;
        transform: translateX(-50%) scale(1);
      }
      50% {
        opacity: 0.5;
        transform: translateX(-50%) scale(1.5);
      }
      100% {
        opacity: 1;
        transform: translateX(-50%) scale(1);
      }
    }
  }
}
</style>
