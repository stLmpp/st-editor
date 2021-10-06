import { EditorContentOptions } from './editor-content.type';
import { EditorBase } from '../editor-base/editor-base';
import { EditorTag } from '../editor-tag/editor-tag';

export class EditorContent extends EditorBase {
  constructor(protected override readonly _options: EditorContentOptions) {
    super(_options);
    for (const tag of this.tags) {
      tag.init(this);
    }
  }

  get tags(): EditorTag[] {
    return this._options.tags;
  }

  setReadonly(readonly: boolean): void {
    for (const tag of this.tags) {
      tag.readonly = readonly;
    }
  }

  appendChild(child: HTMLElement): this {
    this.element.appendChild(child);
    return this;
  }

  destroy(): void {
    for (const tag of this.tags) {
      tag.destroy();
    }
    this.element.remove();
  }
}
