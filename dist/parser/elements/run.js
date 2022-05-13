import { tagToString, TAG_NAME_BREAK, TAG_NAME_CARRIAGE_RETURN, TAG_NAME_NO_BREAK_HYPHEN, TAG_NAME_TAB, TAG_NAME_TEXT, } from '../utils.js';
export const TAG_NAME_RUN = 'w:r';
export class Run {
    static isRun(node) {
        return node.name === TAG_NAME_RUN;
    }
    static from(node) {
        const { children } = node;
        if (!children) {
            return '';
        }
        const tagList = children.filter((child) => {
            const { name } = child;
            return (name === TAG_NAME_TEXT ||
                name === TAG_NAME_BREAK ||
                name === TAG_NAME_CARRIAGE_RETURN ||
                name === TAG_NAME_NO_BREAK_HYPHEN ||
                name === TAG_NAME_TAB);
        });
        const textList = tagList.map(tagToString);
        return textList.join('');
    }
}
//# sourceMappingURL=run.js.map