import { Editor } from '../editor/editor';
import { EditorData } from '../editor/editor.type';
import { EditorTag } from './editor-tag';

export interface EditorTagOptions {
  data: EditorData;
  editor: Editor;
  parent?: EditorTag;
}
