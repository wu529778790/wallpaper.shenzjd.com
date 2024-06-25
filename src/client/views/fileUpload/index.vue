<template>
  <div class="file-upload">
    <input ref="uploadRef" type="file" :multiple="multiple" :accept="accept" />
    <button @click="handleUpload">上传</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { fileUploadApi } from "./api";

const props = defineProps({
  multiple: {
    type: Boolean,
    default: true,
  },
  accept: {
    type: Array,
    default: () => {
      return [];
    },
  },
});

const uploadRef = ref();
const handleUpload = async () => {
  const file = uploadRef.value.files[0];
  if (!file) {
    console.warn("请选择文件");
    return;
  }
  const formData = new FormData();
  formData.append("file", file);
  const res = await fileUploadApi(formData);
  console.log(res);
};
</script>
