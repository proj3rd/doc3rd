var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * Get the content of an XML file in a docx file
 * @param doc document object (in {@link JSZip} format)
 * @param path path in the document, e.g. `word/document.xml`
 * @returns XML content in a string
 */
export function getFileContent(doc, path) {
    return __awaiter(this, void 0, void 0, function* () {
        const file = doc.file(path);
        if (!file) {
            return Promise.reject(new Error('file not found'));
        }
        const data = yield file.async('uint8array');
        const decoded = new TextDecoder().decode(data);
        return Promise.resolve(decoded);
    });
}
//# sourceMappingURL=docx.js.map