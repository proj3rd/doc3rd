import { CheerioAPI, Node } from 'cheerio';
import { Row } from './row.js';
export declare class Table {
    rows: Row[];
    constructor(rows: Row[]);
    static isTable(node: Node): boolean;
    static from(table: Node, styles: CheerioAPI): Table;
}
//# sourceMappingURL=table.d.ts.map