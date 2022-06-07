const getPageExclusionStatus = ({ contentNode, options }) => {
  const { uri, nodeType } = contentNode

  if (options.excludedNodeTypes.includes(nodeType)) {
    return true
  }

  if (options.excludedPageUrls.includes(uri)) {
    return true
  }

  return false
}

exports.getPageExclusionStatus = getPageExclusionStatus
