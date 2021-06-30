const { getContentNodes } = require(`./getContentNodes`)
const { getTaxonomies } = require(`./getTaxonomies`)
const { createContentPages } = require(`./createContentPages`)
const { createTaxonomyPages } = require(`./createTaxonomyPages`)

exports.createPages = async (
  gatsbyUtilities,
  options = {
    templatesPath: `./src/templates`,
    excludedNodeTypes: [`MediaItem`], // excludes creating pages for individual media items
  }
) => {
  const contentNodes = await getContentNodes(gatsbyUtilities, options)

  if (contentNodes.length >= 1) {
    await createContentPages({
      contentNodes,
      gatsbyUtilities,
      options,
    })
  }

  const taxonomies = await getTaxonomies(gatsbyUtilities, options)

  if (taxonomies.length >= 1) {
    await createTaxonomyPages({
      taxonomies,
      gatsbyUtilities,
      options,
    })
  }
}
