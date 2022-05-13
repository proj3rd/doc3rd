import { CheerioAPI, Node } from 'cheerio';
import { Cell } from './cell.js';
export declare class Row {
    cells: Cell[];
    constructor(cells: Cell[]);
    static isRow(node: Node): boolean;
    static from(row: Node, styles: CheerioAPI): Row;
}
//# sourceMappingURL=row.d.ts.map