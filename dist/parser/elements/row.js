import { Cell } from './cell.js';
const TAG_NAME_TABLE_ROW = 'w:tr';
export class Row {
    constructor(cells) {
        this.cells = cells;
    }
    static isRow(node) {
        return node.name === TAG_NAME_TABLE_ROW;
    }
    static from(row, styles) {
        const { children } = row;
        if (!children) {
            return new Row([]);
        }
        const cells = children
            .filter(Cell.isCell)
            .map((child) => Cell.from(child, styles));
        return new Row(cells);
    }
}
//# sourceMappingURL=row.js.map