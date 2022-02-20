const exportConfig = {
  input: "src/main.js",
  output: "dist/bundle.js",
  apiBasePath: "http://35.154.213.35:8000",
  template: "public/template.html",
  pages: [
    {
      link: "/",
      input: "src/pages/allTools",
      output: "all-tools",
    },
    {
      link: "/pdf-to-image",
      input: "src/pages/tool",
      output: "pdf-to-image",
    },
    {
      link: "/image-to-pdf",
      input: "src/pages/tool",
      output: "image-to-pdf",
    },
    {
      link: "/pdf-to-doc",
      input: "src/pages/tool",
      output: "pdf-to-doc",
    },
    {
      link: "/doc-to-pdf",
      input: "src/pages/tool",
      output: "doc-to-pdf",
    }
  ]
};

// eslint-disable-next-line no-undef
module.exports = exportConfig
