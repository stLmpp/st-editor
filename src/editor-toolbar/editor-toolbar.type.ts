import { Editor } from '../editor/editor';
import { EditorBaseOptions } from '../editor-base/editor-base.type';

export interface EditorToolbarOptions extends EditorBaseOptions {
  editor: Editor;
}
