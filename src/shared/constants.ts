import { EditorDataTagList } from '../editor/editor.type';

export const EDITOR_BASE_CLASSNAME = 'st-editor';
export const EDITOR_TOOLBAR_CLASSNAME = `${EDITOR_BASE_CLASSNAME}__toolbar`;
export const EDITOR_CONTENT_CLASSNAME = `${EDITOR_BASE_CLASSNAME}__content`;
export const EDITOR_TAG_CLASSNAME = `${EDITOR_BASE_CLASSNAME}__tag`;
export const EDITOR_DATA_TAG_LIST_SET = new Set<EditorDataTagList>(['ul', 'ol']);
