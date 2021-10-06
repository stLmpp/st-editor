import { isNil } from 'st-utils';
import { logger } from './logger';
import { EditorData, EditorDataList, EditorDataTagList } from '../editor/editor.type';
import { EDITOR_DATA_TAG_LIST_SET } from './constants';

export function assertNotNill<T>(value: T, messageIfNill: string): asserts value is NonNullable<T> {
  if (isNil(value)) {
    throw new Error(logger.getMessage(messageIfNill));
  }
}

export function isEditorDataList(value: EditorData): value is EditorDataList {
  return EDITOR_DATA_TAG_LIST_SET.has(value.tag as EditorDataTagList);
}
