import { Element, load } from 'cheerio';
import jszip from 'jszip';
const { loadAsync } = jszip;
import { getFileContent } from './docx.js';
import { Paragraph } from './elements/paragraph.js';
import { Table } from './elements/table.js';

const SELECTOR_W_BODY = 'w\\:body';

export async function parse(bin: Buffer) {
  const zip = await loadAsync(bin);

  const wordDocument = await getFileContent(zip, 'word/document.xml');
  const $ = load(wordDocument, { xmlMode: true });
  const wBody = $(SELECTOR_W_BODY)[0];

  const wordStyles = await getFileContent(zip, 'word/styles.xml');
  const styles = load(wordStyles, { xmlMode: true });

  const elementList: (Paragraph | Table)[] = [];
  wBody.children.forEach((child) => {
    if (Paragraph.isParagraph(child)) {
      elementList.push(Paragraph.from(child, styles));
      return;
    }
    if (Table.isTable(child)) {
      elementList.push(Table.from(child, styles));
      return;
    }
  });
  return Promise.resolve(elementList);
}
