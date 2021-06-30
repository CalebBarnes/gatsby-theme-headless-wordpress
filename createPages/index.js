const { getContentNodes } = require(`./getContentNodes`)
const { getTaxonomies } = require(`./getTaxonomies`)
const { createContentPages } = require(`./createContentPages`)
const { createTaxonomyPages } = require(`./createTaxonomyPages`)

exports.createPages = async gatsbyUtilities => {
  const contentNodes = await getContentNodes(gatsbyUtilities)

  if (contentNodes.length >= 1) {
    await createContentPages({
      contentNodes,
      gatsbyUtilities,
    })
  }

  const taxonomies = await getTaxonomies(gatsbyUtilities)

  if (taxonomies.length >= 1) {
    await createTaxonomyPages({
      taxonomies,
      gatsbyUtilities,
    })
  }
}
