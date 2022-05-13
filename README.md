# doc3rd

MS Word utilities, especially targeted 3GPP

- [Installation](#installation)
- [Parser](#parser)
  - [Usage](#usage)

## Installation

```sh
npm install proj3rd/doc3rd
```

## Parser

![](https://img.shields.io/badge/support-DOCX-blue)

Parse MS Word document and extract paragraphs and tables in order.

### Usage

```ts
import { parse } from 'doc3rd';

const zip = readFileSync('38413-h00.docx');
const parsed = await parse(zip);
```

- Returns a list of `Paragraph`s and `Table`s in order
- `Paragraph`
  - `text`
  - `outlineLevel`: Optional
- `Table`: Contains a list of `Row`s
- `Row`: Contains a list of `Cell`s
- `Cell`: Contains a list of `Paragraph`s
