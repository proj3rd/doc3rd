import { CheerioAPI, Element, Node } from 'cheerio';
import { Row } from './row.js';

const TAG_NAME_TABLE = 'w:tbl';

export class Table {
  public rows: Row[];

  constructor(rows: Row[]) {
    this.rows = rows;
  }

  public static isTable(node: Node) {
    return (node as Element).name === TAG_NAME_TABLE;
  }

  public static from(table: Node, styles: CheerioAPI): Table {
    const { children } = table as Element;
    if (!children) {
      return new Table([]);
    }
    const rowList = children
      .filter(Row.isRow)
      .map((child) => Row.from(child, styles));
    return new Table(rowList);
  }
}
