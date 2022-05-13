import { Element, Node } from 'cheerio';
import {
  tagToString,
  TAG_NAME_BREAK,
  TAG_NAME_CARRIAGE_RETURN,
  TAG_NAME_NO_BREAK_HYPHEN,
  TAG_NAME_TAB,
  TAG_NAME_TEXT,
} from '../utils.js';

export const TAG_NAME_RUN = 'w:r';

export class Run {
  public static isRun(node: Node) {
    return (node as Element).name === TAG_NAME_RUN;
  }

  public static from(node: Node) {
    const { children } = node as Element;
    if (!children) {
      return '';
    }
    const tagList = children.filter((child) => {
      const { name } = child as Element;
      return (
        name === TAG_NAME_TEXT ||
        name === TAG_NAME_BREAK ||
        name === TAG_NAME_CARRIAGE_RETURN ||
        name === TAG_NAME_NO_BREAK_HYPHEN ||
        name === TAG_NAME_TAB
      );
    });
    const textList = tagList.map(tagToString);
    return textList.join('');
  }
}
