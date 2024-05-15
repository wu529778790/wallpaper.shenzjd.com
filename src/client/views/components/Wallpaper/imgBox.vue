<template>
  <div class="img-box">
    <img
      class="img"
      ref="imgRef"
      :src="src"
      :alt="data.tag"
      @click="openFullScreen" />
    <Teleport v-if="fullscreenSrc" to="body">
      <img
        class="fullscreen"
        :src="fullscreenSrc"
        :alt="data.tag"
        @click="closeFullScreen" />
    </Teleport>
    <div class="download">
      <div
        v-for="item in downloadArr"
        :key="item"
        class="download-item"
        @click="handleDownload(item)">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { decode360Url } from "../../utils";

const props = defineProps({
  data: {
    type: Object,
  },
});

const src = ref(
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
);

const imgRef = ref(null);
onMounted(() => {
  const imgObserver = new IntersectionObserver((entries) => {
    if (entries[0].intersectionRatio <= 0) return;
    src.value = props.data.decode360Url;
    imgObserver.unobserve(document.querySelector(".img"));
  });
  imgObserver.observe(imgRef.value);
});

const downloadArr = [
  "2560x1600",
  "1440x900",
  "1024x768",
  "800x600",
  "原始尺寸",
];

const handleDownload = (item) => {
  const url = decode360Url({
    oldUrl: props.data.url,
    width:
      item === "原始尺寸"
        ? props.data.resolution.split("x")[0]
        : item.split("x")[0],
    height:
      item === "原始尺寸"
        ? props.data.resolution.split("x")[1]
        : item.split("x")[1],
    quality: 100,
  });
  const a = document.createElement("a");
  a.href = `http://image.baidu.com/search/down?tn=download&word=download&ie=utf8&fr=detail&url=${url}`;
  a.style = "display: none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

const fullscreenSrc = ref("");
const openFullScreen = () => {
  fullscreenSrc.value = decode360Url({
    oldUrl: props.data.url,
    width: "1920",
    height: "1080",
    quality: 0,
  });
};

const closeFullScreen = () => {
  fullscreenSrc.value = "";
};
</script>

<style>
.fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 999;
  object-fit: cover;
  background-color: #eee;
}
</style>
<style lang="scss" scoped>
.img-box {
  width: 25%;
  position: relative;
  overflow: hidden;
  // counter-increment: item-counter;
  // &:after {
  //   position: absolute;
  //   color: white;
  //   left: 0;
  //   top: 0;
  //   content: counter(item-counter);
  // }
  .img {
    width: 100%;
  }
  &:hover {
    .download {
      left: 0;
    }
  }
  .download {
    height: 100%;
    position: absolute;
    top: 0;
    left: -130px;
    box-sizing: border-box;
    background: rgba(0, 0, 0, 0.7);
    font-size: 13px;
    padding: 10px;
    line-height: 22px;
    transition: all 0.25s ease;
    overflow-y: auto;
    color: #fff;
    .download-item {
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAIVBMVEUAAADe3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t4RmXU5AAAACnRSTlMAsKAQW6Z5c2lOCqK00wAAAEJJREFUCNdjwAaYVq1SIMAwNl21KtgYyMhaBQTLgAx2EKMAJNe1atUKsGKWVascICZ6LYEazTkB1SpBMAAyVoEBAwBXFRj52xzkuAAAAABJRU5ErkJggg==)
        no-repeat;
      background-position: 0 2px;
      padding-left: 20px;
      &:hover {
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
}
</style>
