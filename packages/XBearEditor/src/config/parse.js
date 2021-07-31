import highlight from '../assets/js/highlight';
import marked from '../assets/js/marked';

highlight.initHighlightingOnLoad();

const renderer = new marked.Renderer();

export default marked.setOptions({
  renderer,
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  highlight: function (code) {
    return highlight.highlightAuto(code).value;
  },
});
