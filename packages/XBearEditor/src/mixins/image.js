export default {
  data() {
    return {
      // imgSlideDown: false,
      imgs: [],
      previewImgModal: false,
      previewImgSrc: '',
      previewImgMode: '',
    };
  },
  methods: {
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
    // 预览编辑器中的图片
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
    // 选择本地图片上传
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
  },
};
