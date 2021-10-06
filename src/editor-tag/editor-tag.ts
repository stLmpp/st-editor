import { EditorTagOptions } from './editor-tag.type';
import { EditorContent } from '../editor-content/editor-content';
import { Editor } from '../editor/editor';
import { EditorData } from '../editor/editor.type';
import { EDITOR_TAG_CLASSNAME } from '../shared/constants';
import { isArray } from 'st-utils';

export class EditorTag {
  constructor(private readonly _options: EditorTagOptions) {}

  private readonly _children: EditorTag[] = [];
  private _content!: EditorContent;
  private _element!: Element;

  get parent(): EditorTag | undefined {
    return this._options.parent;
  }

  get editor(): Editor {
    return this._options.editor;
  }

  get data(): EditorData {
    return this._options.data;
  }

  setAttributes(): void {
    const entries = Object.entries(this.data.attributes ?? {});
    const classNames: string[] = [];
    for (const [key, value] of entries) {
      if (!value) {
        continue;
      }
      classNames.push(`${EDITOR_TAG_CLASSNAME}--${key}`);
    }
    if (classNames.length) {
      this._element.classList.add(...classNames);
    }
  }

  appendChild(child: Element): this {
    this._element.appendChild(child);
    return this;
  }

  init(content: EditorContent): this {
    this._content = content;
    this._element = this.editor.createElement({ tag: this.data.tag, classes: [EDITOR_TAG_CLASSNAME] });
    if (isArray(this.data.content)) {
      for (const childData of this.data.content) {
        this._children.push(new EditorTag({ editor: this.editor, parent: this, data: childData }).init(this._content));
      }
    } else {
      this._element.innerHTML = this.data.content;
      this._element.setAttribute('contenteditable', 'true'); // TODO readonly
      this.setAttributes();
    }
    const appendTo = this.parent ?? this._content;
    appendTo.appendChild(this._element);
    return this;
  }

  destroy(): void {
    for (const child of this._children) {
      child.destroy();
    }
    this._element.remove();
  }
}
