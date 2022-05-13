import { CheerioAPI, Node } from "cheerio";
export declare const SELECTOR_W_OUTLINE_LEVEL = "w\\:outlineLvl";
export declare const SELECTOR_W_PARA_PROP = "w\\:pPr";
export declare const SELECTOR_W_PARA_STYLE = "w\\:pStyle";
export declare const TAG_NAME_PARAGRAPH = "w:p";
export declare class Paragraph {
    text: string;
    outlineLevel?: number;
    constructor(text: string, { outlineLevel }?: {
        outlineLevel?: number;
    });
    static isParagraph(node: Node): boolean;
    static from(node: Node, styles: CheerioAPI): Paragraph;
    static getOutlineLevel(node: Node, styles: CheerioAPI): number | undefined;
    static getOutlineLevelFromNode(node: Node): string | undefined;
    static getParaStyle(pPr: Node, styles: CheerioAPI): Node | undefined;
}
//# sourceMappingURL=paragraph.d.ts.map