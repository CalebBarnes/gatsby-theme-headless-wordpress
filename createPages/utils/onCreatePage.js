const getPageData = async ({ pageData, contentNode, options }) => {
  const { id, uri, nodeType, contentType } = contentNode

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
    options.type &&
    options.type[`${contentType.graphqlSingleName}`] &&
    options.type[`${contentType.graphqlSingleName}`].onCreatePage
  ) {
    pageData =
      options.type[`${contentType.graphqlSingleName}`].onCreatePage(pageData)
  }

  return pageData
}

exports.getPageData = getPageData
