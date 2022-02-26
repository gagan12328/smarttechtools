import * as toolImages from './toolImages';

export const TOOLS = {
  pdfToImage: 'pdfToImage',
  imageToPdf: 'imageToPdf',
  pdfToDoc: 'pdfToDoc',
  docToPdf: 'docToPdf',
}

export const TOOLS_META_DATA = {
  [TOOLS.pdfToImage]: {
    api: '/services/convert_pdf_to_image/',
    inputFiles: ['application/pdf'],
    outputFiles: ['image'],
    theme: {
      'document-color': 'hsl(141, 76%, 55%)',
      'document-color-light': 'hsl(141, 76%, 65%)',
    },
    fileSizeLimit: 1000000, // 10 MB
  },
  [TOOLS.imageToPdf]: {
    api: '/services/convert_image_to_pdf/',
    inputFiles: [
      'image/jpg',
      'image/png',
      'images/bmp',
      'images/gif',
      'images/tiff',
    ],
    outputFiles: ['pdf'],
    theme: {
      'document-color': 'hsl(345, 97%, 60%)',
      'document-color-light': 'hsl(345, 97%, 70%)',
    },
    fileSizeLimit: 1000000, // 10 MB
  },
  [TOOLS.pdfToDoc]: {
    api: '/services/convert_pdf_to_doc/',
    inputFiles: ['application/pdf'],
    outputFiles: ['doc'],
    theme: {
      'document-color': 'hsl(205, 76%, 60%)',
      'document-color-light': 'hsl(205, 76%, 70%)',
    },
    fileSizeLimit: 1000000, // 10 MB
  },
  [TOOLS.docToPdf]: {
    api: '/services/convert_pdf_to_doc/',
    inputFiles: ['.doc', '.docx'],
    outputFiles: ['pdf'],
    theme: {
      'document-color': 'hsl(345, 97%, 60%)',
      'document-color-light': 'hsl(345, 97%, 70%)',
    },
    fileSizeLimit: 1000000, // 10 MB
  },
}

export default [
  {
    name: 'PDF to Image',
    icon: toolImages.pdfToImage,
    description: 'Save each page of PDF as image',
    link: '/pdf-to-image',
    id: TOOLS['pdfToImage'],
  },
  {
    name: 'Image to PDF',
    icon: toolImages.imageToPdf,
    description: 'Transform JPG, PNG, BMP, GIF, and TIFF images to PDF',
    link: '/image-to-pdf',
    id: TOOLS['imageToPdf'],
  },
  {
    name: 'PDF to Doc',
    icon: toolImages.pdfToDoc,
    description: 'Convert your PDF to WORD documents with incredible accuracy',
    link: '/pdf-to-doc',
    id: TOOLS['pdfToDoc'],
  },
  {
    name: 'Doc to PDF',
    icon: toolImages.docToPdf,
    description: 'Convert word documents to PDF file',
    link: '/doc-to-pdf',
    id: TOOLS['docToPdf'],
  },
]
