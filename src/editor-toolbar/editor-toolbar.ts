import { EditorToolbarOptions } from './editor-toolbar.type';
import { EditorBase } from '../editor-base/editor-base';

export class EditorToolbar extends EditorBase {
  constructor(protected override readonly _options: EditorToolbarOptions) {
    super(_options);
  }
}
