import { EditorBaseOptions } from './editor-base.type';

export abstract class EditorBase {
  protected constructor(protected _options: EditorBaseOptions) {}

  get element(): HTMLElement {
    return this._options.element;
  }
}
