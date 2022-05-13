var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { load } from 'cheerio';
import jszip from 'jszip';
const { loadAsync } = jszip;
import { getFileContent } from './docx.js';
import { Paragraph } from './elements/paragraph.js';
import { Table } from './elements/table.js';
const SELECTOR_W_BODY = 'w\\:body';
export function parse(bin) {
    return __awaiter(this, void 0, void 0, function* () {
        const zip = yield loadAsync(bin);
        const wordDocument = yield getFileContent(zip, 'word/document.xml');
        const $ = load(wordDocument, { xmlMode: true });
        const wBody = $(SELECTOR_W_BODY)[0];
        const wordStyles = yield getFileContent(zip, 'word/styles.xml');
        const styles = load(wordStyles, { xmlMode: true });
        const elementList = [];
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
    });
}
//# sourceMappingURL=index.js.map