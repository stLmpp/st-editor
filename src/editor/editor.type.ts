import { EditorBaseOptions } from '../editor-base/editor-base.type';

export interface EditorAdapter {
  querySelector<E extends Element = Element>(selectors: string): E | undefined | null;
  createElement<K extends keyof HTMLElementTagNameMap>(tag: K): HTMLElementTagNameMap[K];
}

export interface EditorOptions extends EditorBaseOptions {
  adapter?: EditorAdapter;
  globalAttributes?: [attribute: string, value?: string][];
  globalClasses?: string[];
  initialContent?: EditorData[];
}

export type EditorDataTagText = keyof Pick<
  HTMLElementTagNameMap,
  'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'li' | 'span'
>;
export type EditorDataTagList = keyof Pick<HTMLElementTagNameMap, 'ul' | 'ol'>;
export type EditorDataTag = EditorDataTagText | EditorDataTagList;

export interface EditorDataBase {
  attributes?: EditorAttributes;
}

export interface EditorDataList extends EditorDataBase {
  tag: EditorDataTagList;
  content: EditorData[];
}

export interface EditorDataText extends EditorDataBase {
  tag: EditorDataTagText;
  content: string | EditorData[];
}

export type EditorData = EditorDataList | EditorDataText;

export interface EditorAttributes {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  'line-through'?: boolean;
}
