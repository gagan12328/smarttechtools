const vm = require('vm')
const fs = require('fs-extra')
const svelte = require('rollup-plugin-svelte')
const { rollup } = require('rollup')
const commonjs = require('@rollup/plugin-commonjs')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const { terser } = require('rollup-plugin-terser')
const css = require('rollup-plugin-css-only')
const sveltePreprocess = require('svelte-preprocess')
const alias = require('@rollup/plugin-alias')
const image = require('@rollup/plugin-image')
const path = require('path')
const posthtml = require('posthtml')
// const beautify = require('posthtml-beautify')
const { insertAt } = require('posthtml-insert-at')
// const svelteStaticHtml = require('rollup-plugin-svelte-static-html')
const envVars = require('rollup-plugin-inject-process-env')

const exportConfig = require("./export.config.js")

// eslint-disable-next-line no-undef
const projectRootDir = path.resolve()

// const production = !process.env.ROLLUP_WATCH

const aliases = alias({
  resolve: ['.svelte', '.js', '.ts'], //optional, by default this will just look for .js files or folders
  entries: [
    {
      find: 'Components',
      replacement: path.resolve(projectRootDir, 'src/Components'),
    },
    { find: 'Layout', replacement: path.resolve(projectRootDir, 'src/Layout') },
    { find: 'Utils', replacement: path.resolve(projectRootDir, 'src/Utils') },
    { find: 'Data', replacement: path.resolve(projectRootDir, 'src/Data') },
  ],
})

const rollupConfig = exportConfig.pages.map((page) => {
  return {
    output: page.output,
    client: {
      input: path.join(page.input, 'main.js'),
      output: {
        name: 'App',
        exports: "auto",
        file: path.join(page.output, 'bundle.js'),
        format: "iife",
      },
      plugins: [
        aliases,
        image(),
        svelte({
          preprocess: sveltePreprocess({
            postcss: {
              plugins: [require('tailwindcss'), require('autoprefixer')],
            },
          }),
          compilerOptions: {
            hydratable: true,
          }
        }),
        css({ output: 'bundle.css' }),

        // If you have external dependencies installed from
        // npm, you'll most likely need these plugins. In
        // some cases you'll need additional configuration -
        // consult the documentation for details:
        // https://github.com/rollup/plugins/tree/master/packages/commonjs
        nodeResolve({
          browser: true,
          dedupe: ['svelte'],
        }),
        commonjs(),

        envVars({
          PAGE_LINK: page.link,
          API_BASE_PATH: exportConfig.apiBasePath,
          NODE_ENV: "production",
        }),

        terser(),
      ]
    },
    server: {
      input: path.join(page.input, 'index.svelte'),
      output: {
        exports: "auto",
        file: path.join(page.output, 'bundle.js'),
        format: "iife",
      },
      plugins: [
        aliases,
        image(),
        svelte({
          preprocess: sveltePreprocess({
            postcss: {
              plugins: [require('tailwindcss'), require('autoprefixer')],
            },
          }),
          compilerOptions: {
            generate: 'ssr',
            hydratable: false,
            customElement: false
          }
        }),
        css({ output: 'bundle.css' }),

        // If you have external dependencies installed from
        // npm, you'll most likely need these plugins. In
        // some cases you'll need additional configuration -
        // consult the documentation for details:
        // https://github.com/rollup/plugins/tree/master/packages/commonjs
        nodeResolve({
          browser: true,
          dedupe: ['svelte'],
        }),
        commonjs(),

        envVars({
          PAGE_LINK: page.link,
          API_BASE_PATH: exportConfig.apiBasePath,
        }),

        // If we're building for production (npm run build
        // instead of npm run dev), minify
        // production && terser(),
        // svelteStaticHtml({
        //   template: exportConfig.template,
        //   component: page.input,
        //   output: page.output,
        //   preprocess: {
        //     postcss: {
        //       plugins: [require('tailwindcss'), require('autoprefixer')],
        //     }
        //   }
        // })
      ]
    }
  }
})

function formatCss(css) {
  return css.replace('}\n', '}')
}

async function generateHtmlTemplate(template, html, css, inlineCss) {
  if (template) {
    return fs.readFile(template, 'utf8')
  }

  return (inlineCss && css)
    ? `<style>${formatCss(css)}</style>${html}`
    : html
}

function exportToHtml() {
  rollupConfig.forEach(async (config) => {
    try {
      const { generate } = await rollup(config.server)
      const bundle = await generate({ format: 'cjs', exports: 'auto' })
      const entryChunk = bundle.output.find((chunkOrAsset) => chunkOrAsset.isEntry)
      // eslint-disable-next-line no-undef
      const Component = vm.runInNewContext(entryChunk.code, { module })
      const { css, html, head } = Component.render({})
      const htmlTemplate = await generateHtmlTemplate(exportConfig.template, html, css.code, false)

      const clientSide = await rollup(config.client);
      const clientBundle = await clientSide.generate({ format: 'iife', exports: 'auto', name: 'App' })

      const clientEntryChunk = clientBundle.output.find((chunkOrAsset) => chunkOrAsset.isEntry)

      const processedHtml = await posthtml([
        exportConfig.template && insertAt({ selector: '#app', prepend: html }),
        exportConfig.template && css.code && insertAt({
          selector: 'head',
          append: `<style>${formatCss(css.code)}</style>`
        }),
        insertAt({
          selector: 'head',
          append: head,
        }),
        insertAt({
          selector: 'body',
          append: `<script>${clientEntryChunk.code}</script>`
        }),
      ].filter(Boolean)).process(htmlTemplate)

      await fs.outputFile(path.join(path.resolve() + '/dist', `${config.output}.html`), processedHtml.html)
      // fs.outputFile(config.output.file, entryChunk.code)
    } catch (err) {
      console.log(err);
    }
  })
}

exportToHtml();
