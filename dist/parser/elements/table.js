import { Row } from './row.js';
const TAG_NAME_TABLE = 'w:tbl';
export class Table {
    constructor(rows) {
        this.rows = rows;
    }
    static isTable(node) {
        return node.name === TAG_NAME_TABLE;
    }
    static from(table, styles) {
        const { children } = table;
        if (!children) {
            return new Table([]);
        }
        const rowList = children
            .filter(Row.isRow)
            .map((child) => Row.from(child, styles));
        return new Table(rowList);
    }
}
//# sourceMappingURL=table.js.map