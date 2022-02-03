const { getContentNodes } = require(`./getContentNodes`)
const { getTaxonomies } = require(`./getTaxonomies`)
const { createContentPages } = require(`./createContentPages`)
const { createTaxonomyPages } = require(`./createTaxonomyPages`)
const { getContentTypes } = require(`./getContentTypes`)

const { formatLogMessage } = require(`./utils/formatLogMessage`)

const defaultOptions = {
  templatesPath: `./src/templates`,
  excludedNodeTypes: [`MediaItem`], // excludes creating pages for individual media items
}

exports.createPages = async (gatsbyUtilities, pluginOptions) => {
  const options = { ...defaultOptions, ...pluginOptions }

  const contentTypes = await getContentTypes(gatsbyUtilities, options)
  const contentNodes = await getContentNodes(gatsbyUtilities, options)

  if (contentNodes.length >= 1) {
    const contentPagesActivity = gatsbyUtilities.reporter.activityTimer(
      formatLogMessage(`create content pages`)
    )
    contentPagesActivity.start()

    await createContentPages({
      contentTypes,
      contentNodes,
      gatsbyUtilities,
      options,
    })

    contentPagesActivity.end()
  }

  const taxonomies = await getTaxonomies(gatsbyUtilities, options)

  if (taxonomies.length >= 1) {
    const taxonomyPagesActivity = gatsbyUtilities.reporter.activityTimer(
      formatLogMessage(`create taxonomy pages`)
    )
    taxonomyPagesActivity.start()

    await createTaxonomyPages({
      taxonomies,
      gatsbyUtilities,
      options,
    })

    taxonomyPagesActivity.end()
  }
}
