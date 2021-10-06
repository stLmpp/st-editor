import { EditorAdapter, EditorOptions } from './editor.type';
import { EDITOR_BASE_CLASSNAME, EDITOR_CONTENT_CLASSNAME, EDITOR_TOOLBAR_CLASSNAME } from '../shared/constants';
import { EditorToolbar } from '../editor-toolbar/editor-toolbar';
import { EditorContent } from '../editor-content/editor-content';
import { EditorTag } from '../editor-tag/editor-tag';
import { EditorBase } from '../editor-base/editor-base';

interface EditorCreateElementParams<K extends keyof HTMLElementTagNameMap> {
  tag: K;
  classes?: string[];
}

export class Editor extends EditorBase {
  constructor(protected override readonly _options: EditorOptions) {
    super(_options);
    this._adapter = _options.adapter ?? document;
    this._init();
  }

  private readonly _adapter: EditorAdapter;
  private _toolbar!: EditorToolbar;
  private _content!: EditorContent;

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
      tags: (this._options.initialContent ?? []).map(data => new EditorTag({ data, editor: this })),
    });
    this.element.appendChild(element);
  }

  private _init(): void {
    this.element.classList.add(EDITOR_BASE_CLASSNAME);
    this._setToolbar();
    this._setContent();
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
    return element;
  }

  destroy(): void {
    this.element.classList.remove(EDITOR_BASE_CLASSNAME);
  }
}
