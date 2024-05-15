<template>
    <div class="tinymce-box">
        <editor v-model="content" :init="init" />
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import tinymce from 'tinymce/tinymce';
import Editor from '@tinymce/tinymce-vue';

tinymce.baseURL = 'tinymce';

const content = ref('');

const init = {
    selector: '#tinydemo',
}
</script>

<style lang="scss" scoped>
.tinymce-box {
    width: 100%;
}
</style>