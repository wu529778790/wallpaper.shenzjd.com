<template>
  <div class="file-upload">
    <input ref="uploadRef" type="file" :multiple="multiple" :accept="accept" />
    <button @click="handleUpload">上传</button>
    <div>已上传文件:</div>
    <div v-for="item in uploadData" :key="item.url">
      <div>{{ item.fileName }}</div>
      <button @click="handleDownload(item)">下载</button>
    </div>
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
const uploadData = ref([]);
const handleUpload = async () => {
  const file = uploadRef.value.files[0];
  if (!file) {
    console.warn("请选择文件");
    return;
  }
  const formData = new FormData();
  formData.append("file", file);
  const res = await fileUploadApi(formData);
  uploadData.value.push(res.data);
};

const handleDownload = (item) => {
  const url = item.fileUrl;
  const a = document.createElement("a");
  a.href = url;
  a.download = "3Nu7ZJcKdMb_z9AYfNyAhmQc.crt";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
</script>
