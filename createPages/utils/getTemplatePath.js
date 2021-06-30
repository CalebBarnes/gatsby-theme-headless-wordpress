const fs = require("fs")
const { toCamel } = require(`./toCamel`)

const { options } = require(`../options`)

const getTemplatePath = async ({ node, reporter }) => {
  const {
    uri,
    archivePath,
    nodeType,
    template,
    isArchive = false,
    archiveContentType = null,
    contentType = { node: { graphqlSingleName: null } },
  } = node
  const { templateName } = template || {}

  const {
    node: { graphqlSingleName },
  } = contentType

  let contentTypeTemplatePath = `${options.templatesPath}/${toCamel(
    graphqlSingleName
  )}/${toCamel(templateName)}.tsx`

  if (isArchive) {
    contentTypeTemplatePath = `${options.templatesPath}/archive/${toCamel(
      archiveContentType
    )}.tsx`
  }

  const templateExists = fs.existsSync(contentTypeTemplatePath) // check if template exists

  if (!templateExists) {
    reporter.warn(
      `Template "${templateName}" not found at "${contentTypeTemplatePath}" for node type "${nodeType}" on uri "${
        uri || archivePath
      }"`
    )
    return null
  }

  return contentTypeTemplatePath
}

exports.default = getTemplatePath
exports.getTemplatePath = getTemplatePath
