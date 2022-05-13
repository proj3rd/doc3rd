import assert from "assert";
import { readFileSync } from "fs";
import _ from "lodash";
const { isEqual } = _;
import { join } from "path";
import { parse } from "./dist/parser/index.js";
import { Paragraph } from "./dist/parser/elements/paragraph.js";
import { Table } from "./dist/parser/elements/table.js";
import { Row } from "./dist/parser/elements/row.js";
import { Cell } from "./dist/parser/elements/cell.js";

const exampleDir = "examples";
const examplePath = join(exampleDir, "example01.docx");
const exampleFile = readFileSync(examplePath);
parse(exampleFile)
  .then((parsed) => {
    const expected = [
      new Paragraph("Hello, world!", { outlineLevel: 0 }),
      new Table([
        new Row([
          new Cell([new Paragraph("This")]),
          new Cell([new Paragraph("is")]),
        ]),
        new Row([
          new Cell([new Paragraph("a")]),
          new Cell([new Paragraph("table")]),
        ]),
      ]),
      new Paragraph("This is a paragraph"),
      new Paragraph(""),
    ];
    console.log("Parsed");
    console.log(JSON.stringify(parsed, null, 4));
    console.log("Expected");
    console.log(JSON.stringify(expected, null, 4));
    assert(isEqual(parsed, expected));
  })
  .catch((reason) => console.error(reason));
