export default {
  methods: {
    // 插入文本
    insertContent(str) {
      this.editor.replaceSelection(str);
      this.lastInsert = str.replace(/\n/g, '');
    },
    // 粗体
    insertStrong() {
      const { editor, lastPos = {} } = this;
      const { line = 0, ch = 0 } = lastPos;
      const selection = editor.getSelection();
      if (selection) {
        this.insertContent('**' + selection + '**');
      } else {
        this.insertContent('****');
        this.setCursor(line, ch + 2);
      }
    },
    // 斜体
    insertItalic() {
      const { editor, lastPos = {} } = this;
      const { line = 0, ch = 0 } = lastPos;
      const selection = editor.getSelection();
      if (selection) {
        this.insertContent('*' + selection + '*');
      } else {
        this.insertContent('**');
        this.setCursor(line, ch + 1);
      }
    },
    // 下划线
    insertUnderline() {
      const { editor, lastPos = {} } = this;
      const { line = 0, ch = 0 } = lastPos;
      const selection = editor.getSelection();
      if (selection) {
        this.insertContent('<u>' + selection + '</u>');
      } else {
        this.insertContent('<u></u>');
        this.setCursor(line, ch + 3);
      }
    },
    // 删除线
    insertOverline() {
      const { editor, lastPos = {} } = this;
      const { line = 0, ch = 0 } = lastPos;
      const selection = editor.getSelection();
      if (selection) {
        this.insertContent('~~' + selection + '~~');
      } else {
        this.insertContent('~~~~');
        this.setCursor(line, ch + 2);
      }
    },
    // 插入标题
    insertTitle(level) {
      const titles = {
        1: '#  ',
        2: '##  ',
        3: '###  ',
        4: '####  ',
        5: '#####  ',
        6: '######  ',
      };
      const { editor, lastPos = {} } = this;
      const { line } = lastPos;
      const selection = editor.getSelection();
      if (selection) {
        this.insertContent('\n' + titles[level] + selection + '\n');
      } else {
        const title = titles[level];
        if (editor.isClean()) {
          this.insertContent(title);
          this.setCursor(0, title.length);
        } else {
          this.insertContent('\n' + title);
          this.setCursor(line + 1, title.length);
        }
      }
    },
    // 插入分割线
    insertLine() {
      const { editor } = this;
      if (editor.isClean()) {
        this.insertContent('----\n');
      } else {
        this.insertContent('\n\n----\n');
      }
    },
    // 引用
    insertQuote() {
      const { editor, lastPos = {} } = this;
      const { line = 0 } = lastPos;
      const selection = editor.getSelection();
      if (selection) {
        this.insertContent('\n>  ' + selection + '\n\n');
      } else {
        if (editor.isClean()) {
          this.insertContent('>  ');
          this.setCursor(0, 3);
        } else {
          this.insertContent('\n>  ');
          this.setCursor(line + 1, 3);
        }
      }
    },
    // 无序列表
    insertUl() {
      const { editor, lastPos = {} } = this;
      const { line = 0, ch = 0 } = lastPos;
      const selection = editor.getSelection();
      if (selection) {
        this.insertContent('\n-  ' + selection + '\n\n');
      } else {
        if (editor.isClean() || ch === 0) {
          this.insertContent('-  ');
          this.setCursor(line, 3);
        } else {
          this.insertContent('\n-  ');
          this.setCursor(line + 1, 3);
        }
      }
    },
    // 有序列表
    insertOl() {
      const { editor, lastPos = {} } = this;
      const { line = 0, ch = 0 } = lastPos;
      const selection = editor.getSelection();
      if (selection) {
        this.insertContent('\n1.  ' + selection + '\n\n');
      } else {
        if (editor.isClean() || ch === 0) {
          this.insertContent('1.  ');
          this.setCursor(line, 4);
        } else {
          this.insertContent('\n1.  ');
          this.setCursor(line + 1, 4);
        }
      }
    },
    // 插入code
    insertCode() {
      const { editor, lastPos = {} } = this;
      const { line } = lastPos;
      const selection = editor.getSelection();
      if (selection) {
        this.insertContent('\n```\n' + selection + '\n```\n');
      } else {
        if (editor.isClean()) {
          this.insertContent('```\n\n```');
          this.setCursor(1, 0);
        } else {
          this.insertContent('\n```\n\n```');
          this.setCursor(line + 2, 0);
        }
      }
    },
    // 已完成列表
    insertFinished() {
      const { editor, lastPos = {} } = this;
      const { line = 0, ch = 0 } = lastPos;
      const selection = editor.getSelection();
      if (selection) {
        this.insertContent('\n- [x] ' + selection + '\n\n');
      } else {
        if (editor.isClean() || ch === 0) {
          this.insertContent('- [x] ');
          this.setCursor(line, 6);
        } else {
          this.insertContent('\n- [x] ');
          this.setCursor(line + 1, 6);
        }
      }
    },
    // 未完成列表
    insertNotFinished() {
      const { editor, lastPos = {} } = this;
      const { line = 0, ch = 0 } = lastPos;
      const selection = editor.getSelection();
      if (selection) {
        this.insertContent('\n- [ ] ' + selection + '\n\n');
      } else {
        if (editor.isClean() || ch === 0) {
          this.insertContent('- [ ] ');
          this.setCursor(line, 6);
        } else {
          this.insertContent('\n- [ ] ');
          this.setCursor(line + 1, 6);
        }
      }
    },
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
  },
};
