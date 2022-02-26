import tools, { TOOLS_META_DATA } from 'Data/tools.js'
import { FILE_STATUS } from './constants'

const upperCase = (str) => {
  if (str && typeof str === 'string') {
    return str.toUpperCase();
  }
  return '';
}

const convertToKb = (size) => {
  if (size !== 0) {
    return Math.round(size / 1000);
  }
  return 0;
}

export const getPageData = (link) => {
  const pageData = tools.find((tool) => tool.link === link)

  if (pageData) {
    pageData.metadata = TOOLS_META_DATA[pageData.id]
    const theme = pageData.metadata.theme

    if (typeof window !== 'undefined') {
      Object.keys(theme).forEach((key) => {
        document.body.style.setProperty(`--${key}`, theme[key])
      })
    }
  }

  return pageData
}

export const formatFiles = (files, pageData) => {
  if (!files || files && !files.length) {
    return [];
  }
  const formatted = [];
  let i = 0;
  let len = files.length;
  while(i < len) {
    const file = files[i];
    formatted.push({
      id: i,
      bin: file,
      file: file.name,
      type: file.type,
      size: `${convertToKb(file.size)} KB`,
      convert: upperCase(pageData.metadata.outputFiles[0]),
      download: '',
      status: file.size > pageData.metadata.fileSizeLimit ? FILE_STATUS.FILE_SIZE_EXCEEDS : FILE_STATUS.READY,
    })
    i += 1;
  }
  return formatted;
}
