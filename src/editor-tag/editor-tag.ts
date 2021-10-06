import { EditorTagOptions } from './editor-tag.type';
import { EditorContent } from '../editor-content/editor-content';
import { Editor } from '../editor/editor';
import { EditorData } from '../editor/editor.type';
import { EDITOR_BASE_NAME, EDITOR_TAG_CLASSNAME, EDITOR_TAG_FOCUSED_CLASSNAME } from '../shared/constants';
import { isArray } from 'st-utils';
import { Listener } from '../shared/type';

export class EditorTag {
  constructor(private readonly _options: EditorTagOptions) {
    this.id = `${EDITOR_BASE_NAME}-${this.editor.id}-${this.data.id}`;
    this._readonly = !!this._options.readonly;
  }

  private readonly _listeners: Listener[] = [];
  private readonly _children: EditorTag[] = [];
  private _content!: EditorContent;
  private _element!: HTMLElement;
  private _readonly: boolean;
  private _focused = false;

  readonly id: string;

  get parent(): EditorTag | undefined {
    return this._options.parent;
  }

  get editor(): Editor {
    return this._options.editor;
  }

  get data(): EditorData {
    return this._options.data;
  }

  set readonly(readonly: boolean) {
    this._readonly = readonly;
    if (!this._children.length) {
      this._element.setAttribute('contenteditable', '' + !this._readonly);
    } else {
      for (const child of this._children) {
        child.readonly = readonly;
      }
    }
  }

  get readonly(): boolean {
    return this._readonly;
  }

  set focused(focused: boolean) {
    this._focused = focused;
    if (focused) {
      this._element.classList.add(EDITOR_TAG_FOCUSED_CLASSNAME);
    } else {
      this._element.classList.remove(EDITOR_TAG_FOCUSED_CLASSNAME);
    }
  }

  private _addFocusEvent(): void {
    const onFocusFn = (): void => {
      this.focused = true;
    };
    this._element.addEventListener('focus', onFocusFn);
    this._listeners.push(() => this._element.removeEventListener('focus', onFocusFn));
  }

  private _addBlurEvent(): void {
    const onBlurFn = (): void => {
      this.focused = false;
    };
    this._element.addEventListener('blur', onBlurFn);
    this._listeners.push(() => this._element.removeEventListener('blur', onBlurFn));
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

  appendChild(child: HTMLElement): this {
    this._element.appendChild(child);
    return this;
  }

  init(content: EditorContent): this {
    this._content = content;
    this._element = this.editor.createElement({ tag: this.data.tag, classes: [EDITOR_TAG_CLASSNAME] });
    if (isArray(this.data.content)) {
      for (const childData of this.data.content) {
        this._children.push(
          new EditorTag({ editor: this.editor, parent: this, data: childData, readonly: this._readonly }).init(
            this._content
          )
        );
      }
    } else {
      this._element.innerHTML = this.data.content;
      this._element.setAttribute('contenteditable', '' + !this._readonly);
      this.setAttributes();
    }
    const appendTo = this.parent ?? this._content;
    appendTo.appendChild(this._element);
    this._element.id = `${EDITOR_BASE_NAME}-${this.editor.id}-${this.data.id}`;
    this._element.__stEditorTag = this; // TODO maybe remove this?
    this._addFocusEvent();
    this._addBlurEvent();
    return this;
  }

  destroy(): void {
    for (const child of this._children) {
      child.destroy();
    }
    for (const listener of this._listeners) {
      listener();
    }
    this._element.remove();
  }
}
