<template>
  <div class="menu-box">
    <div class="title">电脑壁纸</div>
    <div class="menu">
      <div
        class="item"
        :class="{ itemActive: currentKey === '/wallpaper/index' }"
        @click="handleClick({ key: '/wallpaper/index' })">
        最新壁纸
      </div>
      <div
        class="item category"
        :class="{ itemActive: currentKey.includes('cid=') }">
        分类壁纸
        <Category class="category-box" />
      </div>
      <div
        class="item"
        :class="{ itemActive: currentKey === '/wallpaper/bing' }"
        @click="handleClick({ key: '/wallpaper/bing' })">
        必应美图
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import Category from "./Category/index.vue";

const router = useRouter();
const currentKey = ref("/wallpaper/index");

watch(
  () => router.currentRoute.value.fullPath,
  (newPath) => {
    currentKey.value = newPath;
  },
  {
    immediate: true,
  }
);

function handleClick({ key }) {
  router.push(key);
}
</script>

<style lang="scss" scoped>
.menu-box {
  position: fixed;
  z-index: 999;
  height: 50px;
  width: 100%;
  line-height: 50px;
  font-size: 16px;
  background-color: #fff;
  opacity: 0.77;
  filter: alpha(opacity = 77);
  transition: all 0.25s ease;
  display: flex;
  justify-content: space-between;

  &:hover {
    opacity: 1;
  }

  .title {
    background-image: -webkit-gradient(
      linear,
      left top,
      right bottom,
      color-stop(0, #f22),
      color-stop(0.15, #f2f),
      color-stop(0.3, #22f),
      color-stop(0.45, #2ff),
      color-stop(0.6, #2f2),
      color-stop(0.85, #ff2),
      color-stop(1, #f22)
    );
    color: transparent;
    background-clip: text;
    font-size: 28px;
    font-weight: normal;
    display: inline-block;
    padding: 0 10px;
    cursor: pointer;
  }
  .menu {
    display: flex;
    .item {
      margin: 0 10px;
      cursor: pointer;
      font-size: 15px;
      &:hover {
        color: #1677ff;
      }
    }
    .itemActive {
      color: #1677ff;
    }
    .category {
      position: relative;
      &:hover {
        .category-box {
          visibility: visible;
        }
      }
      .category-box {
        position: absolute;
        visibility: hidden;
      }
    }
  }
}
</style>
