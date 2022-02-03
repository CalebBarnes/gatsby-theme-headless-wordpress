const path = require("path")

const { createTermPages } = require(`./createTermPages`)

const { getTermNodesByTaxonomyName } = require(`./getTermNodesByTaxonomyName`)
const {
  getTermContentNodesByTermNodeId,
} = require(`./getTermContentNodesByTermNodeId`)

const { getTemplatePath } = require(`./utils/getTemplatePath`)

const createTaxonomyPages = async ({
  taxonomies,
  gatsbyUtilities,
  options,
}) => {
  return Promise.all(
    taxonomies.map(async taxonomy => {
      const { graphqlSingleName, name: taxonomyName } = taxonomy

      const taxNodeType = `${graphqlSingleName
        .charAt(0)
        .toUpperCase()}${graphqlSingleName.slice(1)}`

      if (options.excludedNodeTypes.includes(taxNodeType)) {
        return // early exit for excluded nodeType
      }

      // getting list of individual terms (ex: "my-category", "my-other-category")
      // by the taxonomyName (ex: "category")
      const termNodes = await getTermNodesByTaxonomyName({
        taxonomyName, // ex: "category"
        gatsbyUtilities,
      })

      if (termNodes && termNodes.length >= 1) {
        return Promise.all(
          termNodes.map(async termNode => {
            const termContentNodes = await getTermContentNodesByTermNodeId({
              termNodeId: termNode.id,
              termNodeTypeName: termNode.__typename,
              gatsbyUtilities,
            })

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
              taxNodeType,
              termNode,
              termContentNodes,
              component: path.resolve(contentTypeTemplatePath),
              gatsbyUtilities,
              options,
            })
          })
        )
      }
    })
  )
}

exports.createTaxonomyPages = createTaxonomyPages
