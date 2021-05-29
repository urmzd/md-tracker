
// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---cache-dev-404-page-js": preferDefault(require("/home/urmzd/personal/neuro-tracker/.cache/dev-404-page.js")),
  "component---src-pages-index-tsx": preferDefault(require("/home/urmzd/personal/neuro-tracker/src/pages/index.tsx"))
}

