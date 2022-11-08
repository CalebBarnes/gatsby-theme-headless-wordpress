const path = require("path")
const { toCamel } = require("./toCamel")

const getPageData = ({
  nodeType,
  contentNode,
  options,
  contentTypeTemplatePath,
  seo,
}) => {
  const { id, uri } = contentNode

  const contentType = toCamel(nodeType)

  const option = options.type && options.type[nodeType]

  // construct pageData object that will be passed to createPage function
  let pageData = {
    path: uri,
    component: path.resolve(contentTypeTemplatePath),
    ownerNodeId: id,
    context: {
      id,
      seo,
      archivePath: contentType.node && contentType.node.archivePath,
    },
  }

  // if onCreatePage function is defined in gatsby-config.js, run it
  // it can mutate the pageData object before page creation
  // this can be used to add additional context to the page or change any other pageData property

  if (
    option &&
    option.onCreatePage &&
    option.onCreatePage instanceof Function
  ) {
    pageData = option.onCreatePage(pageData)
  }

  return pageData
}

exports.getPageData = getPageData
