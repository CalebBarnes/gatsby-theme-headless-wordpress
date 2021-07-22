const { getContentNodes } = require(`./getContentNodes`)
const { getTaxonomies } = require(`./getTaxonomies`)
const { createContentPages } = require(`./createContentPages`)
const { createTaxonomyPages } = require(`./createTaxonomyPages`)
const { getContentTypes } = require(`./getContentTypes`)

const defaultOptions = {
  templatesPath: `./src/templates`,
  excludedNodeTypes: [`MediaItem`], // excludes creating pages for individual media items
}

exports.createPages = async (gatsbyUtilities, pluginOptions) => {
  const options = { ...defaultOptions, ...pluginOptions }

  const contentTypes = await getContentTypes(gatsbyUtilities, options)
  const contentNodes = await getContentNodes(gatsbyUtilities, options)

  if (contentNodes.length >= 1) {
    await createContentPages({
      contentTypes,
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
