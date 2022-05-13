import JSZip from 'jszip';
/**
 * Get the content of an XML file in a docx file
 * @param doc document object (in {@link JSZip} format)
 * @param path path in the document, e.g. `word/document.xml`
 * @returns XML content in a string
 */
export declare function getFileContent(doc: JSZip, path: string): Promise<string>;
//# sourceMappingURL=docx.d.ts.map