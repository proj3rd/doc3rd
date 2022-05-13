import { CheerioAPI, Node } from 'cheerio';
import { Paragraph } from './paragraph.js';
export declare class Cell {
    paragraphs: Paragraph[];
    constructor(paragraphs: Paragraph[]);
    static isCell(node: Node): boolean;
    static from(cell: Node, styles: CheerioAPI): Cell;
}
//# sourceMappingURL=cell.d.ts.map