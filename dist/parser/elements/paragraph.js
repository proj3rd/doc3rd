import { load } from "cheerio";
import { Run } from "./run.js";
export const SELECTOR_W_OUTLINE_LEVEL = "w\\:outlineLvl";
export const SELECTOR_W_PARA_PROP = "w\\:pPr";
export const SELECTOR_W_PARA_STYLE = "w\\:pStyle";
export const TAG_NAME_PARAGRAPH = "w:p";
export class Paragraph {
    constructor(text, { outlineLevel } = {}) {
        this.text = text;
        this.outlineLevel = outlineLevel;
    }
    static isParagraph(node) {
        return node.name === TAG_NAME_PARAGRAPH;
    }
    static from(node, styles) {
        const { children } = node;
        if (!children) {
            return new Paragraph("");
        }
        const textList = children.filter(Run.isRun).map(Run.from);
        const outlineLevel = Paragraph.getOutlineLevel(node.cloneNode(true), styles);
        return new Paragraph(textList.join(""), { outlineLevel });
    }
    static getOutlineLevel(node, styles) {
        const $ = load(node, { xmlMode: true });
        const pPr = $(SELECTOR_W_PARA_PROP)[0];
        if (!pPr) {
            return undefined;
        }
        const outlineLevel = Paragraph.getOutlineLevelFromNode(pPr.cloneNode(true).cloneNode(true));
        if (outlineLevel) {
            return Number(outlineLevel);
        }
        const paraStyle = Paragraph.getParaStyle(pPr.cloneNode(true), styles);
        if (!paraStyle) {
            return undefined;
        }
        const outlineLevelFromStyle = Paragraph.getOutlineLevelFromNode(paraStyle.cloneNode(true));
        return Number(outlineLevelFromStyle);
    }
    static getOutlineLevelFromNode(node) {
        var _a;
        const $ = load(node, { xmlMode: true });
        const outlineLevel = (_a = $(SELECTOR_W_OUTLINE_LEVEL)[0]) === null || _a === void 0 ? void 0 : _a.attribs["w:val"];
        return outlineLevel;
    }
    static getParaStyle(pPr, styles) {
        var _a;
        const $ = load(pPr, { xmlMode: true });
        const styleId = (_a = $(SELECTOR_W_PARA_STYLE)[0]) === null || _a === void 0 ? void 0 : _a.attribs["w:val"];
        const selector = `w\\:style[w\\:type=paragraph][w\\:styleId=${styleId}]`;
        const style = styles(selector)[0];
        return style;
    }
}
//# sourceMappingURL=paragraph.js.map