<template>
  <div class="img-box">
    <img
      class="img"
      ref="imgRef"
      :src="src"
      :alt="data.tag"
      @click="openFullScreen" />
    <Teleport v-if="fullscreenShow" to="body">
      <div class="fullscreen-box" @click="closeFullScreen">
        <img
          class="fullscreen"
          :class="fullscreenSrc === data.decode360Url ? 'vague' : 'clear'"
          ref="fullscreen"
          :src="fullscreenSrc"
          :alt="data.tag" />
      </div>
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
import { ref, onMounted, onBeforeUnmount } from "vue";
import { decode360Url } from "@/utils/index.js";

const props = defineProps({
  data: {
    type: Object,
  },
});

const src = ref(
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
);

const handlerMousewheel = (e) => {
  if (e.target !== fullscreen.value) return;
  if (!fullscreen.value.style.transform) {
    fullscreen.value.style.transform = "scale(1.0)";
  }
  if (e.deltaY < 0) {
    fullscreen.value.style.transform = `scale(${
      parseFloat(
        fullscreen.value.style.transform.split("scale(")[1].split(")")[0]
      ) + 0.1
    })`;
  } else {
    if (
      parseFloat(
        fullscreen.value.style.transform.split("scale(")[1].split(")")[0]
      ) <= 0.1
    ) {
      return;
    }
    fullscreen.value.style.transform = `scale(${
      parseFloat(
        fullscreen.value.style.transform.split("scale(")[1].split(")")[0]
      ) - 0.1
    })`;
  }
};
const imgRef = ref(null);
const fullscreen = ref(null);
onMounted(() => {
  // const imgObserver = new IntersectionObserver((entries) => {
  //   if (entries[0].intersectionRatio <= 0) return;
  //   src.value = props.data.decode360Url;
  //   imgObserver.unobserve(document.querySelector(".img"));
  // });
  // imgObserver.observe(imgRef.value);

  const img = new Image();
  img.src = props.data.decode360Url;
  img.onload = () => {
    src.value = props.data.decode360Url;
  };
  window.addEventListener("mousewheel", handlerMousewheel, { passive: false });
});

onBeforeUnmount(() => {
  window.removeEventListener("mousewheel", handlerMousewheel);
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
  a.href = `https://image.baidu.com/search/down?tn=download&word=download&ie=utf8&fr=detail&url=${url}`;
  a.download = url.split("/").pop();
  a.style = "display: none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

const fullscreenSrc = ref("");
const fullscreenShow = ref(false);
const openFullScreen = async () => {
  const { innerWidth, innerHeight } = window;
  // 先用小图的url
  fullscreenSrc.value = props.data.decode360Url;
  fullscreenShow.value = true;
  // 再用大图的url
  const realUrl = decode360Url({
    oldUrl: props.data.url,
    width: innerWidth,
    height: innerHeight,
    quality: 0,
  });
  const img = new Image();
  img.src = realUrl;
  img.onload = () => {
    fullscreenSrc.value = realUrl;
  };
};

const closeFullScreen = () => {
  fullscreenSrc.value = "";
  fullscreenShow.value = false;
};
</script>

<style lang="scss" scoped>
.fullscreen-box {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 999;
  backdrop-filter: blur(5px);
}
.fullscreen {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
// 模糊
.vague {
  filter: blur(4px);
  transition: all 0.7s;
}
// 清晰
.clear {
  filter: blur(0);
}
.img-box {
  position: relative;
  overflow: hidden;
  .img {
    width: 100%;
    height: 100%;
    display: block;
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
