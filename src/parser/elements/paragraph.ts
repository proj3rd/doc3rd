import { CheerioAPI, Element, load, Node } from "cheerio";
import { Run } from "./run.js";

export const SELECTOR_W_OUTLINE_LEVEL = "w\\:outlineLvl";
export const SELECTOR_W_PARA_PROP = "w\\:pPr";
export const SELECTOR_W_PARA_STYLE = "w\\:pStyle";

export const TAG_NAME_PARAGRAPH = "w:p";

export class Paragraph {
  public text: string;
  public outlineLevel?: number;

  constructor(text: string, { outlineLevel }: { outlineLevel?: number } = {}) {
    this.text = text;
    this.outlineLevel = outlineLevel;
  }

  public static isParagraph(node: Node) {
    return (node as Element).name === TAG_NAME_PARAGRAPH;
  }

  public static from(node: Node, styles: CheerioAPI): Paragraph {
    const { children } = node as Element;
    if (!children) {
      return new Paragraph("");
    }
    const textList = children.filter(Run.isRun).map(Run.from);
    const outlineLevel = Paragraph.getOutlineLevel(node.cloneNode(true), styles);
    return new Paragraph(textList.join(""), { outlineLevel });
  }

  public static getOutlineLevel(
    node: Node,
    styles: CheerioAPI
  ): number | undefined {
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

  static getOutlineLevelFromNode(node: Node): string | undefined {
    const $ = load(node, { xmlMode: true });
    const outlineLevel = $(SELECTOR_W_OUTLINE_LEVEL)[0]?.attribs["w:val"];
    return outlineLevel;
  }

  static getParaStyle(pPr: Node, styles: CheerioAPI): Node | undefined {
    const $ = load(pPr, { xmlMode: true });
    const styleId = $(SELECTOR_W_PARA_STYLE)[0]?.attribs["w:val"];
    const selector = `w\\:style[w\\:type=paragraph][w\\:styleId=${styleId}]`;
    const style = styles(selector)[0];
    return style;
  }
}
