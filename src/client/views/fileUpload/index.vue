<template>
  <div class="file-upload">
    <input ref="uploadRef" type="file" :multiple="multiple" :accept="accept" />
    <button @click="handleUpload">上传</button>
    <button @click="handleDownload">下载</button>
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

const handleDownload = () => {
  const url = "/src/server/3Nu7ZJcKdMb_z9AYfNyAhmQc.crt";
  const a = document.createElement("a");
  a.href = url;
  a.download = "3Nu7ZJcKdMb_z9AYfNyAhmQc.crt";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
</script>
