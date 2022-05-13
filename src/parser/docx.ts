import JSZip from 'jszip';

/**
 * Get the content of an XML file in a docx file
 * @param doc document object (in {@link JSZip} format)
 * @param path path in the document, e.g. `word/document.xml`
 * @returns XML content in a string
 */
export async function getFileContent(doc: JSZip, path: string) {
  const file = doc.file(path);
  if (!file) {
    return Promise.reject(new Error('file not found'));
  }
  const data = await file.async('uint8array');
  const decoded = new TextDecoder().decode(data);
  return Promise.resolve(decoded);
}
