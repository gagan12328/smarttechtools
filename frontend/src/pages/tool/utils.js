import tools, { TOOL_COLOR_MAP } from 'Data/tools.js';

export const getPageData = (link) => {
  const pageData = tools.find(tool => tool.link === link)

  if (pageData) {
    pageData.color = TOOL_COLOR_MAP[pageData.id]

    if (typeof window !== 'undefined') {
      Object.keys(pageData.color).forEach(key => {
        document.body.style.setProperty(`--${key}`, pageData.color[key])
      })
    }
  }

  return pageData;
}
