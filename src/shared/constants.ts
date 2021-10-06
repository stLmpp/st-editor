import { EditorDataTagList, EditorName } from '../editor/editor.type';

export const EDITOR_BASE_NAME: EditorName = 'st-editor';
export const EDITOR_TOOLBAR_CLASSNAME = `${EDITOR_BASE_NAME}__toolbar`;
export const EDITOR_CONTENT_CLASSNAME = `${EDITOR_BASE_NAME}__content`;
export const EDITOR_TAG_CLASSNAME = `${EDITOR_BASE_NAME}__tag`;
export const EDITOR_DATA_TAG_LIST_SET = new Set<EditorDataTagList>(['ul', 'ol']);
export const EDITOR_ID_ATTRIBUTE = `id-${EDITOR_BASE_NAME}`;
export const EDITOR_TAG_FOCUSED_CLASSNAME = `${EDITOR_TAG_CLASSNAME}--focused`;
