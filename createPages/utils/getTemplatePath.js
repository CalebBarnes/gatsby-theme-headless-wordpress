const fs = require("fs")
const { toCamel } = require(`./toCamel`)

const getTemplatePath = async ({ node, reporter, options }) => {
  const {
    uri,
    archivePath,
    nodeType,
    template,
    contentType = { node: { graphqlSingleName: null } },
    isPostsPage = false,
  } = node

  const { templateName } = template || {}

  const {
    node: { graphqlSingleName },
  } = contentType

  const templateDirectory = `${options.templatesPath}/${toCamel(
    isPostsPage ? `archive` : graphqlSingleName
  )}`

  const existingTemplates = []

  fs.readdirSync(templateDirectory).forEach(file => {
    existingTemplates.push(`${templateDirectory}/${file}`)
  })

  const contentTypeTemplatePath = `${templateDirectory}/${
    isPostsPage ? toCamel("post") : toCamel(templateName)
  }`

  const resolvedFilePath = existingTemplates.find(
    item => item.startsWith(`${contentTypeTemplatePath}.`) && item
  )

  const templateExists = fs.existsSync(resolvedFilePath) // check if template exists

  if (!templateExists) {
    reporter.warn(
      `Template "${
        templateName || "post"
      }" not found at "${contentTypeTemplatePath}" for node type "${nodeType}" on uri "${
        uri || archivePath
      }"`
    )
    return null
  }

  return resolvedFilePath
}

exports.default = getTemplatePath
exports.getTemplatePath = getTemplatePath
