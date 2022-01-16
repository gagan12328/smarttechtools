export default [
  {
    name: 'PDF to Image',
    icon: '/assets/pdfToImage.svg',
    description: 'Save each page of PDF as image',
    link: '/pdf-to-image',
    id: 'pdfToImage',
  },
  {
    name: 'Image to PDF',
    icon: '/assets/imageToPdf.svg',
    description: 'Transform JPG, PNG, BMP, GIF, and TIFF images to PDF',
    link: '/image-to-pdf',
    id: 'imageToPdf',
  },
  {
    name: 'PDF to Doc',
    icon: '/assets/pdfToDoc.svg',
    description: 'Convert your PDF to WORD documents with incredible accuracy',
    link: '/pdf-to-doc',
    id: 'pdfToDoc',
  },
  {
    name: 'Doc to PDF',
    icon: '/assets/docToPdf.svg',
    description: 'Convert word documents to PDF file',
    link: '/doc-to-pdf',
    id: 'docToPdf',
  },
]

export const TOOL_COLOR_MAP = {
  pdfToImage: {
    'document-color': 'hsl(141, 76%, 60%)',
    'document-color-light': 'hsl(141, 76%, 70%)',
  },
  imageToPdf: {
    'document-color': 'hsl(345, 97%, 60%)',
    'document-color-light': 'hsl(345, 97%, 70%)',
  },
  pdfToDoc: {
    'document-color': 'hsl(205, 76%, 60%)',
    'document-color-light': 'hsl(205, 76%, 70%)',
  },
  docToPdf: {
    'document-color': 'hsl(345, 97%, 60%)',
    'document-color-light': 'hsl(345, 97%, 70%)',
  },
}
