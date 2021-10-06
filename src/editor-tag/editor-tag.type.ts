import { Editor } from '../editor/editor';
import { EditorData, EditorName } from '../editor/editor.type';
import { EditorTag } from './editor-tag';

export interface EditorTagOptions {
  data: EditorData;
  editor: Editor;
  parent?: EditorTag;
  readonly?: boolean;
}

export type EditorTagId = `${EditorName}-${number}-${number}`;
