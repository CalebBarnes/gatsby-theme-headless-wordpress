const fs = require("fs")
const { toCamel } = require(`./toCamel`)

const getTemplatePath = async ({
  archive,
  node,
  taxonomy,
  taxNodeType,
  reporter,
  options,
}) => {
  const {
    uri,
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

  if (!!archive) {
    templateDirectory = `${options.templatesPath}/archive`

    contentTypeTemplatePath = `${templateDirectory}/${toCamel(
      archive.graphqlSingleName
    )}`
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
    templateName || taxonomy.graphqlSingleName || archive.graphqlSingleName
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

  const resolvedFilePath = existingTemplates.find(filePath => {
    const extensionIndex = filePath.lastIndexOf(".")
    const pathWithoutExtension = filePath.slice(0, extensionIndex)
    const fileExtension = filePath.slice(extensionIndex)

    if (contentTypeTemplatePath === pathWithoutExtension) {
      if (`${contentTypeTemplatePath}${fileExtension}` === filePath) {
        return filePath
      }
    }
  })

  const templateExists = fs.existsSync(resolvedFilePath) // check if template exists

  if (!templateExists) {
    reporter.warn(warningMessage)
    return null
  }

  return resolvedFilePath
}

exports.default = getTemplatePath
exports.getTemplatePath = getTemplatePath
