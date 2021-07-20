const path = require("path")

const { createTermPages } = require(`./createTermPages`)
const { getTermNodes } = require(`./getTermNodes`)
const { getTemplatePath } = require(`./utils/getTemplatePath`)

const createTaxonomyPages = async ({
  taxonomies,
  gatsbyUtilities,
  options,
}) => {
  return Promise.all(
    taxonomies.map(async taxonomy => {
      const { archivePath, graphqlSingleName } = taxonomy

      const taxNodeType = `${graphqlSingleName
        .charAt(0)
        .toUpperCase()}${graphqlSingleName.slice(1)}`

      if (options.excludedNodeTypes.includes(taxNodeType)) {
        return // early exit for excluded nodeType
      }

      const termNodes = await getTermNodes({
        nodeType: taxNodeType,
        gatsbyUtilities,
      })

      if (termNodes && termNodes.length >= 1) {
        return Promise.all(
          termNodes.map(async termNode => {
            const contentTypeTemplatePath = await getTemplatePath({
              taxonomy,
              node: termNode,
              taxNodeType,
              reporter: gatsbyUtilities.reporter,
              options,
            })

            if (!contentTypeTemplatePath) {
              return // no template found, exit
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
