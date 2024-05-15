<template>
  <div class="category-names">
    <div
      class="item"
      v-for="item in category"
      :key="item.id"
      @click="getListByCategory(item)">
      {{ item.name }}
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";
import { getCategoryApi } from "./api";

const category = ref([]);

const getCategory = async () => {
  const res = await getCategoryApi();
  category.value = res.data;
};

onBeforeMount(async () => {
  await getCategory();
});

const router = useRouter();

const getListByCategory = async (item) => {
  router.push(`/wallpaper/index?cid=${item.id}`);
};
</script>

<style lang="scss" scoped>
.category-names {
  right: 0px;
  width: 210px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
  background-color: #fff;
  line-height: 30px;

  .item {
    width: 50%;
    padding: 0 15px;
    box-sizing: border-box;
    cursor: pointer;
    color: #666;

    &:hover {
      color: #1677ff;
      background-color: #eee;
    }
  }
}
</style>
