import './style.css';
import { Editor } from './editor/editor';
import { EditorData } from './editor/editor.type';

const initialContent: EditorData[] = [
  {
    tag: 'h1',
    content: 'H1',
  },
  {
    tag: 'ul',
    content: [
      { tag: 'li', content: 'teste' },
      {
        tag: 'li',
        content: [
          { tag: 'span', content: 'bold', attributes: { bold: true } },
          { tag: 'span', content: ' - ' },
          { tag: 'span', content: 'italic', attributes: { italic: true } },
          { tag: 'span', content: ' - ' },
          { tag: 'span', content: 'underline', attributes: { underline: true } },
          { tag: 'span', content: ' - ' },
          { tag: 'span', content: 'line-through', attributes: { 'line-through': true } },
          { tag: 'span', content: ' - ' },
          {
            tag: 'span',
            content: 'all',
            attributes: { bold: true, 'line-through': true, italic: true, underline: true },
          },
        ],
      },
    ],
  },
];

const editor = new Editor({
  element: document.querySelector('.editor')!,
  globalAttributes: [['_ngcontent-1']],
  globalClasses: ['my-editor'],
  initialContent,
});

(window as any).editor = editor;
