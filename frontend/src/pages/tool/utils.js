import tools, { TOOLS_META_DATA } from 'Data/tools.js'

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
