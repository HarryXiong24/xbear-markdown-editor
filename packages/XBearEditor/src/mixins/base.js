export default {
  methods: {
    // 设置焦点
    setCursor(line = 0, ch = 0) {
      const { editor } = this;
      editor.setCursor(line, ch);
      editor.focus();
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
    // 绑定监听事件
    addEditorLintener() {
      const editor = this.editor;
      editor.on('change', (data) => {
        this.lastPos = editor.getCursor();
        this.currentValue = editor.getValue();
        const {
          doc: { height },
        } = data;
        this.editorScrollHeight = height;
      });
      editor.on('scroll', this.markdownScroll);
      editor.on('paste', this.handlePaste);
      editor.on('keydown', (data, e) => {
        if (e.keyCode === 83) {
          if (e.metaKey || e.ctrlKey) {
            e.preventDefault();
            this.handleSave();
          }
        } else if (e.keyCode === 13) {
          this.listerenKeyupEnter(e);
        } else if (e.keyCode === 8) {
          this.listerenDelete(data);
        }
      });
      editor.on('focus', () => {
        this.lastPos = editor.getCursor();
      });
    },
    // 设置究竟是哪个半边在主动滑动
    mouseScrollSide(side) {
      this.scrollSide = side;
    },
    // 监听复制操作
    addCopyListener() {
      setTimeout(() => {
        const buttons = document.querySelectorAll('.code-block .copy-code');
        this.buttons = buttons;
        for (let i = 0, len = buttons.length; i < len; i++) {
          buttons[i].onclick = () => {
            const code = buttons[i].parentNode.querySelectorAll('pre')[0].innerText;
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
    // 编辑器区域滚动
    markdownScroll(data = {}) {
      if (this.scrolling && this.scrollSide === 'left') {
        const {
          doc: { height, scrollTop },
        } = data;
        const preview = this.$refs.preview;
        const contentHeight = preview.offsetHeight;
        const previewScrollHeight = preview.scrollHeight;
        preview.scrollTop = parseInt((scrollTop * (previewScrollHeight - contentHeight)) / (height - contentHeight), 0);
      }
    },
    // 预览内容区域滚动
    previewScroll() {
      if (this.scrolling && this.scrollSide === 'right') {
        const preview = this.$refs.preview;
        const contentHeight = preview.offsetHeight;
        const previewScrollHeight = preview.scrollHeight;
        const previewScrollTop = preview.scrollTop;
        const scrollTop = parseInt(
          (previewScrollTop * (this.editorScrollHeight - contentHeight)) / (previewScrollHeight - contentHeight),
          0
        );
        this.editor.scrollTo(0, scrollTop);
      }
    },
    // 撤销操作
    redo() {
      const { editor } = this;
      editor.redo();
      setTimeout(() => {
        editor.refresh();
      }, 20);
    },
    // 回车事件
    listerenKeyupEnter(e) {
      const { lastInsert } = this;
      if (lastInsert) {
        const list = ['-', '- [ ]', '- [x]'];
        if (list.includes(lastInsert.trim())) {
          e.preventDefault();
          this.insertContent('\n' + lastInsert);
        } else if (/^\d+\.$/.test(lastInsert.trim())) {
          e.preventDefault();
          this.insertContent('\n' + (parseInt(lastInsert, 0) + 1) + '.  ');
        }
      }
    },
    // 删除 backup
    listerenDelete() {
      setTimeout(() => {
        const { editor } = this;
        if (!editor.isClean()) {
          const value = editor.getValue();
          if (value.split('\n').pop() === '') {
            this.lastInsert = '';
          }
        }
      }, 20);
    },
    // 删除时,以回车为界分割，如果数组最后一个元素为''时，将行一次插入的共嗯那个置为空，避免回车时再次插入
    onDelete() {
      const lines = this.currentValue.split('\n');
      if (lines[lines.length - 1] === '') {
        this.lastInsert = '';
      }
    },
  },
  // 销毁时清除定时器
  destroyed() {
    clearInterval(this.timerId);
  },
};
