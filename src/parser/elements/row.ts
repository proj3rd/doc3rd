import { CheerioAPI, Element, Node } from 'cheerio';
import { Cell } from './cell.js';

const TAG_NAME_TABLE_ROW = 'w:tr';

export class Row {
  public cells: Cell[];

  constructor(cells: Cell[]) {
    this.cells = cells;
  }

  public static isRow(node: Node) {
    return (node as Element).name === TAG_NAME_TABLE_ROW;
  }

  public static from(row: Node, styles: CheerioAPI): Row {
    const { children } = row as Element;
    if (!children) {
      return new Row([]);
    }
    const cells = children
      .filter(Cell.isCell)
      .map((child) => Cell.from(child, styles));
    return new Row(cells);
  }
}
