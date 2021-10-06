import './style.css';
import { Editor } from './editor/editor';
import { EditorData } from './editor/editor.type';
import { EditorTag } from './editor-tag/editor-tag';

const initialContent: EditorData[] = [
  {
    tag: 'h1',
    content: 'H1',
    id: 1,
  },
  {
    id: 2,
    tag: 'ul',
    content: [
      { id: 3, tag: 'li', content: 'teste' },
      {
        id: 4,
        tag: 'li',
        content: [
          { id: 4, tag: 'span', content: 'bold', attributes: { bold: true } },
          { id: 5, tag: 'span', content: ' - ' },
          { id: 6, tag: 'span', content: 'italic', attributes: { italic: true } },
          { id: 7, tag: 'span', content: ' - ' },
          { id: 8, tag: 'span', content: 'underline', attributes: { underline: true } },
          { id: 9, tag: 'span', content: ' - ' },
          { id: 10, tag: 'span', content: 'line-through', attributes: { 'line-through': true } },
          { id: 11, tag: 'span', content: ' - ' },
          {
            id: 12,
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

declare global {
  interface HTMLElement {
    __stEditorTag?: EditorTag;
  }
}
