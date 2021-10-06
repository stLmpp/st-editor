import { Editor } from '../editor/editor';
import { EditorTag } from '../editor-tag/editor-tag';
import { EditorBaseOptions } from '../editor-base/editor-base.type';

export interface EditorContentOptions extends EditorBaseOptions {
  editor: Editor;
  tags: EditorTag[];
}
