<template>
  <div class="tiptap">
    <editor-content class="editor__content" :editor="editor" />
  </div>
</template>

<script setup>
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';

const props = defineProps({
  content: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:modelValue']);

const editor = useEditor({
  content: props.content,
  extensions: [StarterKit, Link, Image],
  onUpdate: () => {
    emit('update:modelValue', editor.value.getHTML());
  },
  editable: false,
});
</script>
<style lang="scss" src="/src/css/tiptap.scss"></style>
