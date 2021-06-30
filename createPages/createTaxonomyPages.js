const fs = require("fs")
const path = require("path")

const { createTermPages } = require(`./createTermPages`)
const { getTermNodes } = require(`./getTermNodes`)

const { options } = require(`./options`)

const createTaxonomyPages = async ({ taxonomies, gatsbyUtilities }) => {
  return Promise.all(
    taxonomies.map(async taxonomy => {
      const { archivePath, graphqlSingleName } = taxonomy

      const taxNodeType = `${graphqlSingleName
        .charAt(0)
        .toUpperCase()}${graphqlSingleName.slice(1)}`

      const termNodes = await getTermNodes({
        nodeType: taxNodeType,
        gatsbyUtilities,
      })

      if (termNodes && termNodes.length >= 1) {
        return Promise.all(
          termNodes.map(async termNode => {
            const contentTypeTemplatePath = `${options.templatesPath}/taxonomy/${graphqlSingleName}.tsx`

            const templateExists = fs.existsSync(contentTypeTemplatePath)

            if (!templateExists) {
              gatsbyUtilities.reporter.warn(
                `Component "${termNode.slug}.tsx" not found at "${contentTypeTemplatePath}" for node type "${taxNodeType}" on uri "${archivePath}"`
              )
              return null
            }

            await createTermPages({
              graphqlSingleName,
              id: termNode.id,
              uri: termNode.link,
              component: path.resolve(contentTypeTemplatePath),
              gatsbyUtilities,
            })
            return
          })
        )
      }
    })
  )
}

exports.createTaxonomyPages = createTaxonomyPages
