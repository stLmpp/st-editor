import { EditorContentOptions } from './editor-content.type';
import { EditorBase } from '../editor-base/editor-base';

export class EditorContent extends EditorBase {
  constructor(protected override readonly _options: EditorContentOptions) {
    super(_options);
    for (const tag of this._options.tags) {
      tag.init(this);
    }
  }

  appendChild(child: Element): this {
    this.element.appendChild(child);
    return this;
  }
}
