<template>
  <div id="app">
    <!-- 导入 xbear-editor -->
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
// xbear-editor API 使用演示
export default {
  name: 'App',
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
