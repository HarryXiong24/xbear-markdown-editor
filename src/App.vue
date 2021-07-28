<template>
  <div id="app">
    <xbear-editor
      v-model="val"
      @on-ready="onReady"
      @on-copy="onCopy"
      @on-upload-image="onUpladImage"
      @on-save="onSave"
      :height="500"
    />
  </div>
</template>

<script>
import xbearEditor from '@/components/xbearEditor';

export default {
  name: 'App',
  components: {
    xbearEditor,
  },
  data: function () {
    return {
      val: '',
    };
  },
  methods: {
    onReady(data) {
      console.log(data);
    },
    onCopy(text) {
      console.log(text);
    },
    onUpladImage(file) {
      console.log(file);
    },
    onSave(data) {
      console.log(data);
    },
  },
};
</script>

<style lang="less"></style>
