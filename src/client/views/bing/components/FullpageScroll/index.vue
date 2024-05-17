<template>
  <div class="fullpage-scroll" ref="fullpage">
    <section
      class="section"
      v-for="(item, index) in list"
      :key="item.hsh"
      :style="{
        backgroundImage: `url(https://www.bing.com${item.url})`,
      }" />
  </div>
</template>

<script setup>
import { onMounted, ref, nextTick, onUnmounted } from "vue";

const props = defineProps({
  list: Array,
});

const offsets = ref([]);
const calculateSectionOffsets = async () => {
  await nextTick();
  let sections = document.getElementsByTagName("section");
  for (let i = 0; i < props.list.length; i++) {
    offsets.value.push(sections[i].offsetTop);
  }
};

const activeSection = ref(0);
const inMove = ref(false);

const handleMouseWheel = (e) => {
  if (e.wheelDelta < 30 && !inMove.value) {
    moveUp();
  } else if (e.wheelDelta > 30 && !inMove.value) {
    moveDown();
  }
  e.preventDefault();
  return false;
};

const moveDown = () => {
  inMove.value = true;
  activeSection.value--;
  if (activeSection < 0) {
    activeSection.value = offsets.value.length - 1;
  }
  scrollToSection(activeSection.value, true);
};

const moveUp = () => {
  inMove.value = true;
  activeSection.value = activeSection.value + 1;
  if (activeSection.value > offsets.value.length - 1) {
    activeSection.value = 0;
  }
  scrollToSection(activeSection.value, true);
};

const inMoveDelay = 400;
const scrollToSection = (id, force = false) => {
  if (inMove.value && !force) return false;
  activeSection.value = id;
  inMove.value = true;
  let section = document.getElementsByTagName("section")[id];
  if (section) {
    document
      .getElementsByTagName("section")
      [id].scrollIntoView({ behavior: "smooth" });
  }
  setTimeout(() => {
    inMove.value = false;
  }, inMoveDelay);
};

const handleMouseWheelDOM = (e) => {
  if (e.detail > 0 && !inMove.value) {
    moveUp();
  } else if (e.detail < 0 && !inMove.value) {
    moveDown();
  }
  return false;
};

const touchStartY = ref(0);
const touchStart = (e) => {
  e.preventDefault();
  touchStartY.value = e.touches[0].clientY;
};
const touchMove = (e) => {
  if (inMove.value) return false;
  e.preventDefault();

  const currentY = e.touches[0].clientY;

  if (touchStartY.value < currentY) {
    moveDown();
  } else {
    moveUp();
  }

  touchStartY.value = 0;
  return false;
};

const fullpage = ref(null);
onMounted(() => {
  calculateSectionOffsets();
  window.addEventListener("mousewheel", handleMouseWheel, { passive: false });
  window.addEventListener("DOMMouseScroll", handleMouseWheelDOM); // Mozilla Firefox
  fullpage.value.addEventListener("touchstart", touchStart, { passive: false }); // mobile devices
  fullpage.value.addEventListener("touchmove", touchMove, { passive: false }); // mobile devices
});

onUnmounted(() => {
  window.removeEventListener("mousewheel", handleMouseWheel);
  window.removeEventListener("DOMMouseScroll", handleMouseWheelDOM); // Mozilla Firefox
  fullpage.value.removeEventListener("touchstart", touchStart); // mobile devices
  fullpage.value.removeEventListener("touchmove", touchMove); // mobile devices
});
</script>

<style lang="scss" scoped>
.fullpage-scroll {
  flex: 1;

  .section {
    width: 100%;
    height: 100%;
    background-size: cover;
    color: #fff;
    position: relative;
  }
}
</style>
