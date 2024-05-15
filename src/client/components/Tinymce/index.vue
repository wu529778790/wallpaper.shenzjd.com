<template>
    <Editor :init="init" tinymceScriptSrc="/tinymce/tinymce.min.js" v-model="innerValue" />
</template>
<script setup>
import { ref, watch } from 'vue';
import Editor from '@tinymce/tinymce-vue';

defineOptions({
    name: 'Tinymce'
})


const props = defineProps({
    modelValue: String,
    init: Object
})

const init = {
    language_url: '/tinymce/langs/zh_CN.js',
    language: 'zh_CN',
    placeholder: '在这里输入文字',
    menubar: false,
    elementpath: false,
    auto_focus: true,
    ...props.init
}

const innerValue = ref(props.modelValue)
const emit = defineEmits(['update:modelValue'])

watch(() => innerValue.value, (val) => {
    emit('update:modelValue', val)
})
</script>
