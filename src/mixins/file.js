import { exportFile, importFile } from '@/utils/fileTools';

export default {
  methods: {
    // 导出md格式文件
    exportFile() {
      exportFile(this.currentValue, this.exportFileName + '.md');
    },
    // 导入文件
    importFile(event) {
      importFile(event);
    },
  },
};
