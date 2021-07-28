export default {
  data() {
    return {
      themeName: '',
      themeSlideDown: false,
    };
  },
  methods: {
    // // 显示主题选项
    // toggleSlideDown() {
    //   this.slideDown = !this.slideDown;
    // },
    // 设置主题
    setThemes(name) {
      this.themeName = name;
      this.themeSlideDown = false;
      this.$emit('on-theme-change', name);
    },
  },
};
