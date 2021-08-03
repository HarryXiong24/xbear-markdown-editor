/*
 * 保存文件到本地
 */
export function exportFile(fileData, name) {
  var pom = document.createElement('a');
  pom.setAttribute('href', 'data:text/plain;charset=UTF-8,' + encodeURIComponent(fileData));
  pom.setAttribute('download', name);
  pom.style.display = 'none';
  if (document.createEvent) {
    const event = document.createEvent('MouseEvents');
    event.initEvent('click', true, true);
    pom.dispatchEvent(event);
  } else {
    pom.click();
  }
}
/*
 * 导入本地文件
 */
export function importFile(event, value, editor) {
  const file = event.target.files[0];
  if (!file) {
    return;
  }
  const { type } = file;
  if (!['text/markdown', 'text/src'].includes(type)) {
    return;
  }
  const reader = new FileReader();
  reader.readAsText(file, {
    encoding: 'utf-8',
  });
  reader.onload = () => {
    value = reader.result;
    event.target.value = '';
    editor.setOption('value', value);
  };
  reader.onerror = (err) => {
    console.error(err);
  };
}
