const fs = require("fs")
const { toCamel } = require(`./toCamel`)

const getTemplatePath = async ({
  node,
  taxonomy,
  taxNodeType,
  reporter,
  options,
}) => {
  const {
    uri,
    archivePath,
    nodeType,
    template = { templateName: null },
    contentType = { node: { graphqlSingleName: null } },
    isPostsPage = false,
  } = node

  const {
    node: { graphqlSingleName },
  } = contentType

  const { templateName } = template

  let templateDirectory = ``
  let contentTypeTemplatePath = ``

  if (!!isPostsPage) {
    templateDirectory = `${options.templatesPath}/archive`

    contentTypeTemplatePath = `${templateDirectory}/post`
  } else if (!!taxonomy) {
    templateDirectory = `${options.templatesPath}/taxonomy`

    contentTypeTemplatePath = `${templateDirectory}/${toCamel(
      taxonomy.graphqlSingleName
    )}`
  } else {
    templateDirectory = `${options.templatesPath}/${toCamel(graphqlSingleName)}`

    contentTypeTemplatePath = `${templateDirectory}/${toCamel(templateName)}`
  }

  const existingTemplates = []

  const warningMessage = `Template "${
    templateName || taxonomy.graphqlSingleName || "post"
  }" not found at ${contentTypeTemplatePath} for type "${
    taxNodeType || nodeType
  }" on uri "${uri}"`

  try {
    fs.readdirSync(templateDirectory).forEach(file => {
      existingTemplates.push(`${templateDirectory}/${file}`)
    })
  } catch (err) {
    reporter.warn(warningMessage)

    return null
  }

  const resolvedFilePath = existingTemplates.find(
    item => item.startsWith(`${contentTypeTemplatePath}.`) && item
  )

  const templateExists = fs.existsSync(resolvedFilePath) // check if template exists

  if (!templateExists) {
    reporter.warn(warningMessage)
    return null
  }

  return resolvedFilePath
}

exports.default = getTemplatePath
exports.getTemplatePath = getTemplatePath
