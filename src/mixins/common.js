import { importFile, exportFile } from '@/utils/file';
import defaultTools from '@/config/tools';

export default {
  name: 'markdown',
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
    theme: {
      // 默认主题
      type: String,
      default: 'light',
    },
    width: {
      // 初始化宽度
      type: [Number, String],
      default: 'auto',
    },
    height: {
      // 初始化高度
      type: Number,
      default: 600,
    },
    toolbars: {
      // 工具栏
      type: Object,
      default() {
        return {};
      },
    },
    bordered: {
      //是否有边框
      type: Boolean,
      default: true,
    },
    autoSave: {
      // 是否自动保存
      type: Boolean,
      default: false,
    },
    interval: {
      // 自动保存间隔 mm
      type: Number,
      default: 10000,
    },
    exportFileName: {
      // 默认导出文件名称
      type: String,
      default: 'unnamed',
    },
    markedOptions: {
      //marked.js配置项
      type: Object,
      default() {
        return {};
      },
    },
    copyCode: {
      // 复制代码
      type: Boolean,
      default: true,
    },
    copyBtnText: {
      // 复制代码按钮文字
      type: String,
      default: '复制代码',
    },
    isPreview: {
      //是否是预览模式
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      currentValue: '', // 输入框内容
      timeoutId: null,
      indexLenth: 1,
      html: '', // 预览的html
      preview: false, // 是否是预览状态
      split: true, //分屏显示
      fullscreen: false, // 是否是全屏
      scrollSide: '', // 哪个半栏在滑动
      lastInsert: '', //最后一次插入的内容
      timerId: null, // 定时器id
      themeName: '',
      themeSlideDown: false,
      imgSlideDown: false,
      imgs: [],
      scrolling: true, // 同步滚动
      editorScrollHeight: 0,
      previewImgModal: false,
      previewImgSrc: '',
      previewImgMode: '',
    };
  },
  computed: {
    tools() {
      const { toolbars = {} } = this;
      return {
        ...defaultTools,
        ...toolbars,
      };
    },
  },
  methods: {
    // 插入链接
    insertLink() {
      this.insertContent('\n[link](href)');
    },
    // 插入图片
    insertImage() {
      this.insertContent('\n![image](imgUrl)');
    },
    // 插入表格
    insertTable() {
      this.insertContent('\nheader 1 | header 2\n---|---\nrow 1 col 1 | row 1 col 2\nrow 2 col 1 | row 2 col 2\n\n');
    },
    // 保存操作
    handleSave() {
      const { currentValue, themeName, html } = this;
      this.$emit('on-save', {
        theme: themeName,
        value: currentValue,
        html,
      });
    },
    // 显示主题选项
    toggleSlideDown() {
      this.slideDown = !this.slideDown;
    },
    // 设置主题
    setThemes(name) {
      this.themeName = name;
      this.themeSlideDown = false;
      this.$emit('on-theme-change', name);
    },
    // 导出md格式文件
    exportFile() {
      exportFile(this.currentValue, this.exportFileName + '.md');
    },
    // 导入文件
    importFile(event) {
      importFile(event);
    },
    // 粘贴图片
    handlePaste(_, e) {
      const { clipboardData = {} } = e;
      const { types = [], items } = clipboardData;
      let item = null;
      for (let i = 0; i < types.length; i++) {
        if (types[i] === 'Files') {
          item = items[i];
          break;
        }
      }
      if (item) {
        const file = item.getAsFile();
        if (/image/gi.test(file.type)) {
          this.$emit('on-upload-image', file);
          e.preventDefault();
        }
      }
    },
    // 设置究竟是哪个半边在主动滑动
    mousescrollSide(side) {
      this.scrollSide = side;
    },
    // 监听查看大图
    addImageClickListener() {
      const { imgs = [] } = this;
      if (imgs.length > 0) {
        for (let i = 0, len = imgs.length; i < len; i++) {
          imgs[i].onclick = null;
        }
      }
      setTimeout(() => {
        this.imgs = this.$refs.preview.querySelectorAll('img');
        for (let i = 0, len = this.imgs.length; i < len; i++) {
          this.imgs[i].onclick = () => {
            const src = this.imgs[i].getAttribute('src');
            this.previewImage(src);
          };
        }
      }, 600);
    },
    // 预览图片
    previewImage(src) {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        if (height / width > 1.4) {
          this.previewImgMode = 'horizontal';
        } else {
          this.previewImgMode = 'vertical';
        }
        this.previewImgSrc = src;
        this.previewImgModal = true;
      };
    },
    // 选择图片
    chooseImage() {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = () => {
        const files = input.files;
        if (files[0]) {
          this.$emit('on-upload-image', files[0]);
          input.value = '';
        }
      };
      input.click();
    },
    // 监听复制操作
    addCopyListener() {
      setTimeout(() => {
        const btns = document.querySelectorAll('.code-block .copy-code');
        this.btns = btns;
        for (let i = 0, len = btns.length; i < len; i++) {
          btns[i].onclick = () => {
            const code = btns[i].parentNode.querySelectorAll('pre')[0].innerText;
            const aux = document.createElement('input');
            aux.setAttribute('value', code);
            document.body.appendChild(aux);
            aux.select();
            document.execCommand('copy');
            document.body.removeChild(aux);
            this.$emit('on-copy', code);
          };
        }
      }, 600);
    },
  },
  // 销毁时清除定时器
  destroyed() {
    clearInterval(this.timerId);
  },
};
