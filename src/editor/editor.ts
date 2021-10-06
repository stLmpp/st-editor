import { EditorAdapter, EditorOptions } from './editor.type';
import {
  EDITOR_BASE_NAME,
  EDITOR_CONTENT_CLASSNAME,
  EDITOR_ID_ATTRIBUTE,
  EDITOR_TOOLBAR_CLASSNAME,
} from '../shared/constants';
import { EditorToolbar } from '../editor-toolbar/editor-toolbar';
import { EditorContent } from '../editor-content/editor-content';
import { EditorTag } from '../editor-tag/editor-tag';
import { EditorBase } from '../editor-base/editor-base';
import { Listener } from '../shared/type';

interface EditorCreateElementParams<K extends keyof HTMLElementTagNameMap> {
  tag: K;
  classes?: string[];
}

let uid = 1;

export class Editor extends EditorBase {
  constructor(protected override readonly _options: EditorOptions) {
    super(_options);
    this._adapter = _options.adapter ?? document;
    this._readonly = !!_options.readonly;
    this._init();
  }

  private readonly _adapter: EditorAdapter;
  private readonly _listeners: Listener[] = [];
  private _toolbar!: EditorToolbar;
  private _content!: EditorContent;
  private _readonly: boolean;

  readonly id = uid++;

  private _setToolbar(): void {
    const element = this.createElement({ tag: 'div', classes: [EDITOR_TOOLBAR_CLASSNAME] });
    this._toolbar = new EditorToolbar({ element, editor: this });
    this.element.appendChild(element);
  }

  private _setContent(): void {
    const element = this.createElement({ tag: 'div', classes: [EDITOR_CONTENT_CLASSNAME] });
    this._content = new EditorContent({
      element,
      editor: this,
      tags: (this._options.initialContent ?? []).map(
        data => new EditorTag({ data, editor: this, readonly: this._readonly })
      ),
      readonly: this._readonly,
    });
    this.element.appendChild(element);
  }

  private _addSelectionEvent(): void {
    const onSelectionFn = (): void => {
      const selection = this._adapter.getSelection();
      if (this._readonly || selection?.isCollapsed || !selection?.anchorNode?.parentElement?.__stEditorTag) {
        return;
      }
      this.setReadonly(true);
    };
    this._adapter.addEventListener('selectionchange', onSelectionFn);
    this._listeners.push(() => this._adapter.removeEventListener('selectionchange', onSelectionFn));
  }

  private _addMouseEvents(): void {
    const onMouseFn = (): void => {
      if (!this._readonly) {
        return;
      }
      this.setReadonly(false);
      this.element.focus();
    };
    this.element.addEventListener('mouseup', onMouseFn);
    this.element.addEventListener('mouseleave', onMouseFn);
    this._listeners.push(
      () => this.element.removeEventListener('mouseup', onMouseFn),
      () => this.element.removeEventListener('mouseleave', onMouseFn)
    );
  }

  private _addKeydownEvents(): void {
    const onKeydownFn = (event: KeyboardEvent): void => {
      // TODO add keydownfn
    };
    this.element.addEventListener('keydown', onKeydownFn);
    this._listeners.push(() => this.element.removeEventListener('keydown', onKeydownFn));
  }

  private _init(): void {
    this.element.classList.add(EDITOR_BASE_NAME);
    this.element.setAttribute('tabindex', '0');
    this._setToolbar();
    this._setContent();
    this._addSelectionEvent();
    this._addMouseEvents();
    this._addKeydownEvents();
  }

  setReadonly(readonly: boolean): void {
    if (this._readonly === readonly) {
      return;
    }
    this._readonly = readonly;
    this._toolbar.setReadonly(readonly);
    this._content.setReadonly(readonly);
  }

  createElement<K extends keyof HTMLElementTagNameMap>(params: EditorCreateElementParams<K>): HTMLElementTagNameMap[K] {
    const classes = [...(params.classes ?? []), ...(this._options.globalClasses ?? [])];
    const element = this._adapter.createElement(params.tag);
    element.classList.add(...classes);
    if (this._options.globalAttributes?.length) {
      for (const [attribute, value] of this._options.globalAttributes) {
        element.setAttribute(attribute, value ?? '');
      }
    }
    element.setAttribute(EDITOR_ID_ATTRIBUTE, '' + this.id);
    return element;
  }

  destroy(): void {
    for (const listener of this._listeners) {
      listener();
    }
    this.element.classList.remove(EDITOR_BASE_NAME);
    this._toolbar.destroy();
    this._content.destroy();
  }
}
