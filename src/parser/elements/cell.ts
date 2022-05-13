import { CheerioAPI, Element, Node } from 'cheerio';
import { Paragraph } from './paragraph.js';

const TAG_NAME_TABLE_CELL = 'w:tc';

export class Cell {
  public paragraphs: Paragraph[];

  constructor(paragraphs: Paragraph[]) {
    this.paragraphs = paragraphs;
  }

  static isCell(node: Node) {
    return (node as Element).name === TAG_NAME_TABLE_CELL;
  }

  public static from(cell: Node, styles: CheerioAPI): Cell {
    const { children } = cell as Element;
    if (!children) {
      return new Cell([]);
    }
    const paragraphs = children
      .filter(Paragraph.isParagraph)
      .map((child) => Paragraph.from(child, styles));
    return new Cell(paragraphs);
  }
}
