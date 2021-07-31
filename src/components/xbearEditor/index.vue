<template>
  <div
    :class="`markdown ${fullscreen ? 'fullscreen' : ''} ${bordered ? 'border' : ''}`"
    ref="markdown"
    :style="{ width: width + 'px', height: height + 'px' }"
  >
    <!-- 头部工具栏 -->
    <ul class="markdown-toolbars" v-show="!preview">
      <li>
        <slot name="title" />
      </li>
      <li v-if="tools.undo" name="撤销">
        <span class="iconfont icon-undo" @click="editor.undo()"></span>
      </li>
      <li v-if="tools.redo" name="重做" @click="redo">
        <span class="iconfont icon-redo"></span>
      </li>
      <li v-if="tools.strong" name="粗体">
        <span @click="insertStrong" class="iconfont icon-bold"></span>
      </li>
      <li v-if="tools.italic" name="斜体">
        <span @click="insertItalic" class="iconfont icon-italic"></span>
      </li>
      <li v-if="tools.overline" name="删除线">
        <span @click="insertOverline" class="iconfont icon-overline"></span>
      </li>
      <li v-if="tools.overline" name="下划线">
        <span @click="insertUnderline" class="iconfont icon-under-line"></span>
      </li>
      <li v-if="tools.h1" name="标题1">
        <span style="font-size: 16px" @click="insertTitle(1)">h1</span>
      </li>
      <li v-if="tools.h2" name="标题2">
        <span style="font-size: 16px" @click="insertTitle(2)">h2</span>
      </li>
      <li v-if="tools.h3" name="标题3">
        <span style="font-size: 16px" @click="insertTitle(3)">h3</span>
      </li>
      <li v-if="tools.h4" name="标题4">
        <span style="font-size: 16px" @click="insertTitle(4)">h4</span>
      </li>
      <li v-if="tools.h5" name="标题5">
        <span style="font-size: 16px" @click="insertTitle(5)">h5</span>
      </li>
      <li v-if="tools.h6" name="标题6">
        <span style="font-size: 16px" @click="insertTitle(6)">h6</span>
      </li>
      <li v-if="tools.hr" name="分割线">
        <span @click="insertLine" class="iconfont icon-horizontal"></span>
      </li>
      <li v-if="tools.quote" name="引用">
        <span style="font-size: 16px" @click="insertQuote" class="iconfont icon-quote"></span>
      </li>
      <li v-if="tools.ul" name="无序列表">
        <span @click="insertUl" class="iconfont icon-ul"></span>
      </li>
      <li v-if="tools.ol" name="有序列表">
        <span @click="insertOl" class="iconfont icon-ol"></span>
      </li>
      <li v-if="tools.code" name="代码块">
        <span @click="insertCode" class="iconfont icon-code"></span>
      </li>
      <li v-if="tools.notChecked" name="未完成列表">
        <span @click="insertNotFinished" class="iconfont icon-checked-false"></span>
      </li>
      <li v-if="tools.checked" name="已完成列表">
        <span @click="insertFinished" class="iconfont icon-checked"></span>
      </li>
      <li v-if="tools.link" name="链接">
        <span @click="insertLink" class="iconfont icon-link"></span>
      </li>
      <li v-if="tools.image" name="图片">
        <span @click="insertImage" class="iconfont icon-img"></span>
      </li>
      <li v-if="tools.uploadImage" name="本地图片">
        <span @click="chooseImage" class="iconfont icon-upload-img"></span>
      </li>
      <li v-if="tools.table" name="表格">
        <span @click="insertTable" class="iconfont icon-table"></span>
      </li>
      <li v-if="tools.theme" class="shift-theme" name="代码块主题">
        <div>
          <span class="iconfont icon-theme" @click="themeSlideDown = !themeSlideDown"></span>
          <ul :class="{ active: themeSlideDown }" @mouseleave="themeSlideDown = false">
            <li @click="setThemes('light')">Light</li>
            <li @click="setThemes('dark')">VS Code</li>
            <li @click="setThemes('oneDark')">Atom OneDark</li>
            <li @click="setThemes('gitHub')">GitHub</li>
          </ul>
        </div>
      </li>
      <li name="导入文件" class="import-file" v-show="tools.importmd">
        <span class="iconfont icon-daoru" @click="importFile"></span>
        <input type="file" @change="importFile($event)" accept="text/markdown" />
      </li>
      <li name="保存到本地" v-show="tools.exportmd">
        <span class="iconfont icon-download" @click="exportFile"></span>
      </li>
      <li v-if="tools.split && split" name="全屏编辑">
        <span @click="split = false" class="iconfont icon-md"></span>
      </li>
      <li v-if="tools.split && !split" name="分屏显示">
        <span @click="split = true" class="iconfont icon-group"></span>
      </li>
      <li v-if="tools.preview" name="预览">
        <span @click="preview = true" class="iconfont icon-preview"></span>
      </li>
      <li v-if="tools.clear" name="清空" @click="value = ''">
        <span class="iconfont icon-clear"></span>
      </li>
      <li v-if="tools.save" name="保存" @click="handleSave">
        <span class="iconfont icon-save"></span>
      </li>
      <li :name="scrolling ? '同步滚动:开' : '同步滚动:关'">
        <span @click="scrolling = !scrolling" v-show="scrolling" class="iconfont icon-on"></span>
        <span @click="scrolling = !scrolling" v-show="!scrolling" class="iconfont icon-off"></span>
      </li>
      <li class="empty"></li>
      <li v-if="tools.fullscreen && !fullscreen" name="全屏">
        <span @click="fullscreen = !fullscreen" class="iconfont icon-fullscreen"></span>
      </li>
      <li v-if="tools.fullscreen && fullscreen" name="退出全屏">
        <span @click="fullscreen = !fullscreen" class="iconfont icon-quite"></span>
      </li>
    </ul>

    <!-- 关闭预览按钮 -->
    <div class="close-preview" v-show="preview && !isPreview" @click="preview = false">
      <span class="iconfont icon-close"></span>
    </div>

    <!-- 编辑器 -->
    <div class="markdown-content" :style="{ background: preview ? '#fff' : '' }">
      <div class="codemirror" ref="codemirror" v-show="!preview" @mouseenter="mousescrollSide('left')"></div>
      <div
        v-show="preview ? preview : split"
        :class="`markdown-preview ${'markdown-theme-' + themeName}`"
        ref="preview"
        @scroll="previewScroll"
        @mouseenter="mouseScrollSide('right')"
      >
        <div v-html="html" ref="previewInner"></div>
      </div>
    </div>

    <!-- 预览图片-->
    <div :class="['preview-img', previewImgModal ? 'active' : '']">
      <span class="close icon-close iconfont" @click="previewImgModal = false"></span>
      <img :src="previewImgSrc" :class="[previewImgMode]" alt="" />
    </div>
  </div>
</template>

<script>
// 调用第三方库
import Codemirror from '@/assets/js/codemirror';
import '@/assets/js/codemirror/mode/xml';
import '@/assets/js/codemirror/mode/css';
import '@/assets/js/codemirror/mode/javascript';
import '@/assets/js/codemirror/mode/markdown';
import codemirrorConfig from '@/assets/js/codemirror/config';
import '@/assets/js/codemirror/styles/codemirror.css';

// 调用混入的模块
import base from '@/mixins/base';
import hotKey from '@/mixins/hotKey';
import theme from '@/mixins/theme';
import image from '@/mixins/image';
import file from '@/mixins/file';

// 调用配置的模块
import marked from '@/config/parse';
import defaultTools from '@/config/toolbar';

export default {
  name: 'xbear-markdown-editor',
  mixins: [base, hotKey, theme, image, file],
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
    // 默认主题
    theme: {
      type: String,
      default: 'light',
    },
    // 初始化宽度
    width: {
      type: [Number, String],
      default: 'auto',
    },
    // 初始化高度
    height: {
      type: Number,
      default: 600,
    },
    // 工具栏
    toolbars: {
      type: Object,
      default() {
        return {};
      },
    },
    // 是否有边框
    bordered: {
      type: Boolean,
      default: true,
    },
    // 是否自动保存
    autoSave: {
      type: Boolean,
      default: false,
    },
    // 自动保存间隔 单位mm
    interval: {
      type: Number,
      default: 10000,
    },
    // 默认导出文件名称
    exportFileName: {
      type: String,
      default: 'unnamed',
    },
    // marked.js配置项
    markedOptions: {
      type: Object,
      default() {
        return {};
      },
    },
    // 复制代码
    copyCode: {
      type: Boolean,
      default: true,
    },
    // 复制代码按钮文字
    copyBtnText: {
      type: String,
      default: '复制代码',
    },
    // 是否是预览模式
    isPreview: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      editor: null, // 编辑器实例
      lastPos: '', // 光标最后所在位置
      currentValue: '', // 输入框内容
      timeoutId: null,
      html: '', // 预览的html
      preview: false, // 是否是预览状态
      split: true, //分屏显示
      fullscreen: false, // 是否是全屏
      scrollSide: '', // 哪个半栏在滑动
      lastInsert: '', // 最后一次插入的内容
      timerId: null, // 定时器id
      scrolling: true, // 同步滚动
      editorScrollHeight: 0,
    };
  },
  mounted() {
    this.init();
    this.createEditor();
  },
  methods: {
    // 初始化
    init() {
      this.currentValue = this.value;
      this.themeName = this.theme;
      this.preview = this.isPreview;
      this.currentValue = this.value;
      if (this.isPreview) {
        return;
      }
      setTimeout(() => {
        if (this.autoSave) {
          this.timerId = setInterval(() => {
            this.handleSave();
          }, this.interval);
        }
      }, 20);
    },
    // 初始化左侧编辑器
    createEditor() {
      this.editor = new Codemirror(this.$refs.codemirror, {
        value: this.currentValue,
        onload: (data) => {
          const {
            doc: { height = 0 },
          } = data;
          this.editorScrollHeight = height;
        },
        ...codemirrorConfig,
      });
      this.addEditorLintener();
      this.$emit('on-ready', {
        vm: this,
        insertContent: this.insertContent,
      });
    },
  },
  computed: {
    // tools 里的属性都用来通过配置判断对应功能是否在在顶部栏生效
    tools() {
      const { toolbars = {} } = this;
      return {
        ...defaultTools,
        ...toolbars,
      };
    },
  },
  watch: {
    currentValue() {
      clearTimeout(this.timeoutId);
      this.timeoutId = setTimeout(() => {
        const { currentValue } = this;
        let html = marked(currentValue, {
          sanitize: false,
          ...this.markedOptions,
        }).replace(/href="/gi, 'target="_blank" href="');
        if (this.copyCode && html !== '') {
          html = html
            .replace(/<pre>/g, '<div class="code-block"><span class="copy-code">' + this.copyBtnText + '</span><pre>')
            .replace(/<\/pre>/g, '</pre></div>');
        }
        this.html = html;
        this.addImageClickListener();
        this.addCopyListener();
        this.$emit('input', currentValue);
      }, 30);
    },
    value() {
      const { value, currentValue } = this;
      if (currentValue !== value) {
        // 由于用户输入而造成的value变化，不对editor设置值
        this.currentValue = value;
        this.editor.setOption('value', value);
      }
    },
  },
};
</script>

<style scoped lang="less">
@import '../../assets/font/iconfont.css';
@import '../../assets/css/theme';
@import '../../assets/css/light';
@import '../../assets/css/dark';
@import '../../assets/css/one-dark';
@import '../../assets/css/github';

@margin: 8px 0;
@line-height: 22px;

.markdown {
  overflow: hidden;
  position: relative;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  background: @background;

  &.border {
    border: 1px solid @border;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  &.fullscreen {
    position: fixed;
    z-index: 999999;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100% !important;
    width: 100%;
    border: none;

    .markdown-content {
      padding: 0;
      padding-top: 10px;
    }
  }

  .markdown-toolbars {
    width: 100%;
    display: flex;
    align-items: center;
    list-style: none;
    background: #fff;
    color: #6a6f7b;
    height: 40px;
    cursor: pointer;
    //box-shadow: 0 2px 3px #ddd;
    padding-left: 4px;
    border-bottom: 1px solid @border;

    > li {
      position: relative;
      cursor: pointer;

      &:after {
        display: block;
        content: attr(name);
        position: absolute;
        z-index: 999999999999;
        top: 32px;
        left: 20px;
        background: #000;
        color: #fff;
        white-space: nowrap;
        font-size: 12px;
        line-height: 28px;
        padding: 0 6px;
        transition: all 0.3s 0.1s;
        transform: scale(0);
        opacity: 0;
        transform-origin: top;
        border-radius: 2px;
      }

      &:hover {
        &:after {
          transform: scale(1);
          opacity: 1;
        }
      }

      &:last-child {
        &:after {
          right: 20%;
          left: auto;
        }
      }

      .title {
        font-size: 16px !important;
      }
    }

    .empty {
      flex: 1;
      width: 12px;
    }

    span {
      font-size: 18px;
      color: #999;
      cursor: pointer;
      display: block;
      width: 30px;
      height: 30px;
      border-radius: 3px;
      line-height: 30px;
      text-align: center;

      &:hover {
        background: @background;
        color: @info;
      }
    }

    .title {
      padding-left: 4px;
      padding-right: 10px;
    }

    li:last-child {
      span {
        font-size: 20px !important;
        margin-right: 10px;
      }
    }

    .shift-theme,
    .export-file {
      height: 46px;
      //width: 80px;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;

      span {
        padding: 0 8px;
        transition: all 0.3s;
        font-size: 18px;
        display: inline-block;
        line-height: 32px;

        &:hover {
          color: #0084ff;
          background: @background;
          border-radius: 3px;
        }
      }

      ul {
        position: absolute;
        transform: scale(0);
        transition: all 0.3s;
        left: -50%;
        top: 40px;
        width: 160px;
        transform-origin: top center;
        list-style: none;
        margin: 0;
        padding: 6px 0;
        box-sizing: border-box;
        border: 1px solid @border;
        background: #fff;
        border-radius: 4px;
        position: absolute;
        z-index: 9999999;
        box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);

        &.active {
          opacity: 1;
          transform: scaleY(1);
        }

        li {
          line-height: 30px;
          padding: 0 12px;
          padding-left: 12px;
          font-size: 13px;
          cursor: pointer;
          user-select: none;
          display: flex;
          align-items: center;
          color: @content;

          .iconfont {
            font-size: 14px;
            display: block;
            height: 30px;
            width: 30px;
            line-height: 30px;
            overflow: hidden;

            &:hover {
              color: @content;
            }
          }

          i {
            font-size: 13px;
            display: block;
            font-style: normal;
            flex: 1;
            white-space: normal;
          }

          &:last-child {
            border-bottom: 0;

            .iconfont {
              font-size: 14px !important;
              margin: 0 !important;
            }
          }

          &:hover {
            background: @background;
          }

          &.disabled {
            cursor: not-allowed;
            color: @disabled;

            &:hover {
              background: transparent;
            }
          }
        }
      }
    }

    .import-file {
      position: relative;

      input {
        position: absolute;
        z-index: 9999;
        left: 0;
        top: 0;
        display: block;
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: pointer;
        font-size: 0;
      }

      &:hover {
        span {
          background: @background;
          color: @info;
        }
        &:after {
          transform: scale(1);
          opacity: 1;
        }
      }
    }
  }

  .close-preview {
    position: absolute;
    z-index: 999;
    right: 0;
    top: 0;
    height: 40px;
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: @content;

    span {
      font-size: 22px;

      &:hover {
        color: @title;
      }
    }
  }

  .markdown-content {
    flex: 1;
    width: 100%;
    display: flex;
    justify-content: space-between;
    position: relative;
    overflow: hidden;
    padding-bottom: 0;

    .markdown-editor {
      // simple版编辑器区域
      flex: 1;
      height: 100%;
      position: relative;
      margin: 0 !important;
      overflow: hidden;
      overflow-y: scroll;
      display: flex;
      justify-content: space-between;
      background: #2d2d2d;

      &::-webkit-scrollbar {
        display: none;
      }

      .index {
        background: #272727;
        min-height: 100%;
        width: 36px;
        line-height: @line-height;
        padding: 12px 0;

        li {
          background: #272727;
          color: #ccc;
          font-size: 14px;
          text-align: center;
          font-family: Consolas;
        }
      }

      textarea {
        width: 100%;
        min-height: 100%;
        outline: none;
        border: 0;
        background: #2d2d2d;
        line-height: @line-height;
        caret-color: #ccc;
        color: #669acc;
        font-size: 14px;
        font-family: Consolas;
        resize: none;
        padding: 12px 8px;
        overflow: hidden;
        white-space: nowrap;
        overflow-x: auto;

        &::selection {
          background: #999;
          color: #0084ff;
        }
      }
    }

    .codemirror {
      flex: 1;
      height: 100%;
      overflow: auto;
    }

    .markdown-preview {
      flex: 1;
      height: 100%;
    }
  }
}

.insert-img-model {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 99999;
  background: @mask;
  padding-top: 12%;
  transition: all 0.3s;
  opacity: 0;
  display: none;

  .model-container {
    background: #fff;
    width: 480px;
    margin: 0 auto;
    border-radius: 4px;
    transition: all 0.3s;
    transform: scale(0);
    transform-origin: center;

    .model-head {
      line-height: 32px;
      padding: 0 12px;
      background: @background;
      border-radius: 4px 4px 0 0;
      box-shadow: 0 1px 2px @border;
      display: flex;
      justify-content: space-between;

      span:nth-of-type(2) {
        font-size: 14px;
        padding-left: 12px;
        cursor: pointer;

        &:hover {
          color: @error;
        }
      }
    }

    .model-content {
      padding: 20px 12px;
      padding-top: 0;
      min-height: 180px;

      .insert-url {
        padding: 42px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;

        input {
          display: block;
          border: 1px solid #ccc;
          font-size: 14px;
          padding: 4px 8px;
          line-height: 24px;
          color: #333;
          background: #fff;
          border-radius: 4px;
          writing-mode: horizontal-tb;
          text-rendering: auto;
          transition: box-shadow 2s;
          flex: 1;

          &:focus {
            border-color: @info;
          }

          &::placeholder {
            color: @tip;
          }
        }

        a {
          display: block;
          background: @info;
          color: #fff;
          line-height: 32px;
          height: 32px;
          font-size: 13px;
          padding: 0 12px;
          border-radius: 3px;
          margin-left: 20px;
          border: 1px solid @border;
          transition: all 0.3s;

          &:hover {
            background: @dark-info;
          }
        }
      }

      .insert-local {
        height: 120px;
        border: 1px dashed @border;
        border-radius: 4px;
        transition: all 0.3s;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        cursor: pointer;

        span {
          font-size: 40px;
          color: @border;
          line-height: 50px;
          transition: all 0.3s;
        }

        p {
          font-size: 14px;
          color: @content;
          transition: all 0.3s;
        }

        &:hover {
          border-color: @info;

          span,
          p {
            color: @info;
          }
        }

        input {
          display: block;
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: 0;
        }
      }
    }

    .model-foot {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 10px 12px;
      display: none;

      a {
        display: block;
        background: @background;
        color: @title;
        line-height: 26px;
        height: 26px;
        font-size: 13px;
        padding: 0 12px;
        border-radius: 3px;
        margin-left: 12px;
        border: 1px solid @border;
        transition: all 0.3s;

        &:hover {
          background: @divider;
        }

        &.ok {
          background: @info;
          color: #fff;
          border-color: @info;

          &:hover {
            background: @dark-info;
          }
        }
      }
    }
  }

  &.active {
    opacity: 1;
    display: block;

    .model-container {
      transform: scale(1);
    }
  }
}

ul.shift {
  padding: 6px 12px;
  display: flex;
  align-items: center;

  span {
    font-size: 12px;
    cursor: pointer;
    user-select: none;

    &.iconfont {
      font-size: 14px;
    }
  }

  label {
    font-size: 12px;
    padding-right: 10px;
    position: relative;
    cursor: pointer;
    user-select: none;
  }

  input[type='radio'],
  label {
    transition: all 0.6s ease;
    box-sizing: border-box;
  }

  input[type='radio'] + label::before {
    content: '\a0';
    display: inline-block;
    vertical-align: middle;
    margin-right: 4px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    border: 1px solid @primary;
    padding: 2px;
  }

  input[type='radio']:checked + label::before {
    background-color: @primary;
    background-clip: content-box;
    padding: 2px;
  }

  input[type='radio'] {
    position: absolute;
    clip: rect(0, 0, 0, 0);
  }

  input[type='radio']:checked + label {
    color: @primary;
  }
}

/deep/ .markdown-preview {
  flex: 1;
  overflow: hidden;
  overflow-y: scroll;
  background: #fff;
  padding: 20px 12px !important;
  font-family: 'Tahoma For Number', 'Chinese Quote', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif;

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  > div {
    padding: 10px 12px !important;
    background: #fff;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  &::-webkit-scrollbar {
    display: none;
  }

  ul {
    list-style: none;
    padding: 0 20px;

    li {
      position: relative;

      &:after {
        display: block;
        content: '';
        width: 8px;
        height: 8px;
        border-radius: 50%;
        position: absolute;
        z-index: 99;
        top: 12px;
        left: -8px;
        background: @content;
      }
    }
  }

  ol,
  ul {
    margin: 10px 0;

    li {
      font-size: 14px !important;
      color: @content;
      line-height: 22px !important;
      padding: 4px 0;
      padding-left: 6px;
      min-height: 28px;

      input[type='checkbox'] {
        position: relative;
        cursor: pointer;
        overflow: visible;
        position: absolute;
        left: -14px;
        top: 5px;

        &:before {
          font-family: 'iconfont' !important;
          color: #999;
          display: block;
          width: 18px;
          height: 18px;
          position: absolute;
          content: '\E684';
          top: 0px;
          left: -4px;
          z-index: 999999;
          background-position: center;
          background: #fff;
          font-size: 18px;
          text-align: center;
          line-height: 18px;
        }
      }

      input[type='checkbox']:checked {
        &:before {
          content: '\E683';
        }
      }
    }
  }

  ol {
    list-style-type: decimal;
    padding-left: 20px;
  }

  hr {
    color: @border;
    height: 1px;
    border: 0;
    border-top: 1px solid @border;
    margin: 20px 0;
    padding: 0;
  }

  del,
  em,
  strong {
    display: inline-block;
  }

  blockquote {
    position: relative;
    background: @background;
    padding: 6px 12px;
    border-left: 5px solid @divider;
    border-radius: 2px;
    margin: @margin;
  }

  /*基本样式*/

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: @title;
  }

  h1 {
    font-size: 28px;
    border-bottom: 1px solid @border;
  }

  h2 {
    font-size: 24px;
  }

  h3 {
    font-size: 18px;
  }

  h4 {
    font-size: 16px;
  }

  h5 {
    font-size: 14px;
  }

  h6 {
    font-size: 12px;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    padding: 8px 0;
    font-weight: 600;
  }
  p {
    font-size: 14px !important;
    color: @content;
    margin-bottom: 8px;
    line-height: @line-height;
  }
  // 图片
  img {
    display: block;
    max-width: 100%;
    margin: 20px 0;
    cursor: pointer;
  }
  // 表格样式
  table {
    width: 100%;
    border: 1px solid @border;
    border-bottom: 0;
    background: #fff;
    border-spacing: 0;
    border-collapse: collapse;
    margin: 20px 0;

    tr {
      -webkit-transition: background 0.1s;
      transition: background 0.1s;
    }

    tr td,
    tr th {
      padding: 4px 8px;
      font-size: 14px;
      line-height: 24px;
      color: #333;
      border-bottom: 1px solid @border;
      cursor: pointer;
    }
    th {
      background: #f8f8f9;
      text-align: left;
      font-weight: bold;
    }

    tr:nth-of-type(even) {
      td {
        background: #fafafa;
      }
    }

    tr {
      &:hover {
        td {
          background: #f5f5f5;
        }
      }
    }

    td,
    th {
      border: 1px solid @border;
      word-break: break-all;
    }
  }

  input[type='checkbox'] {
    display: inline-block;
    border-radius: 0;
    margin-right: 8px;
  }

  a {
    text-decoration: none;
    color: @info;
    font-size: 14px;
    line-height: @line-height;
  }

  .code-block {
    position: relative;
    padding: 0 !important;

    .copy-code {
      // 复制代码
      position: absolute;
      z-index: 999;
      top: 5px;
      right: 10px;
      font-size: 12px;
      color: @border;
      line-height: 20px;
      cursor: pointer;
      user-select: none;
      transition: all 0.3s;
      opacity: 0;

      &:hover {
        color: @info;
      }
    }

    &:hover {
      .copy-code {
        opacity: 1;
      }
    }
  }
}

.preview-img {
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 99999999;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  display: none;
  opacity: 0;
  transition: opacity 0.3s 0.1s;
  justify-content: center;
  align-items: center;

  .close {
    position: absolute;
    right: 0;
    top: 0;
    color: #fff;
    padding: 10px;
    font-size: 20px;
    cursor: pointer;
  }

  img {
    display: block;
    &.vertical {
      height: 80%;
      width: auto;
    }

    &.horizontal {
      width: 80%;
      height: auto;
    }
  }

  &.active {
    display: flex;
    opacity: 1;
  }
}
</style>
