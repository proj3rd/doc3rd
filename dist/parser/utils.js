export const TAG_NAME_BREAK = 'w:br';
export const TAG_NAME_CARRIAGE_RETURN = 'w:cr';
export const TAG_NAME_NO_BREAK_HYPHEN = 'w:noBreakHyphen';
export const TAG_NAME_TAB = 'w:tab';
export const TAG_NAME_TEXT = 'w:t';
export const TYPE_TEXT = 'text';
export function tagToString(tag) {
    const { name, children } = tag;
    // Tag maybe t, br, cr, noBreakHyphen or tab
    switch (name) {
        case TAG_NAME_TEXT:
            if (!children) {
                return '';
            }
            const textList = children
                .filter((child) => child.type === TYPE_TEXT)
                .map((child) => child.data);
            return textList.join('');
        case TAG_NAME_BREAK:
            return '\n';
        case TAG_NAME_CARRIAGE_RETURN:
            return '\n';
        case TAG_NAME_NO_BREAK_HYPHEN:
            return '\u2011';
        case TAG_NAME_TAB:
            return '\t';
        default:
            return '';
    }
}
//# sourceMappingURL=utils.js.map