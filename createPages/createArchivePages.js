const chunk = require("lodash/chunk")

const { toCamel } = require("./utils/toCamel")

/**
 * ? This function creates all the individual archive pages
 */
async function createArchivePages({
  archiveContentType,
  id,
  component,
  uri,
  contentNodes,
  graphql,
  actions,
  reporter,
  seo,
  options,
}) {
  const nodes = contentNodes.filter(
    node => toCamel(node.nodeType) === toCamel(archiveContentType)
  )

  const graphqlResult = await graphql(/* GraphQL */ `
    {
      wp {
        readingSettings {
          postsPerPage
        }
      }
    }
  `)

  const { readingSettings } = graphqlResult.data.wp

  let postsPerPage = readingSettings.postsPerPage

  if (options.type) {
    // load postsPerPage overrides from plugin options
    if (
      options.type[archiveContentType] &&
      options.type[archiveContentType].postsPerPage
    ) {
      postsPerPage = options.type[archiveContentType].postsPerPage
    }

    if (options.type[`__all`]) {
      postsPerPage = options.type[`__all`].postsPerPage
    }
  }

  const nodesChunkedIntoArchivePages = chunk(nodes, postsPerPage)

  const totalPages = nodesChunkedIntoArchivePages.length

  return Promise.all(
    nodesChunkedIntoArchivePages.map(async (_nodes, index) => {
      if (_nodes.length === 0) {
        return
      }

      const pageNumber = index + 1

      const getPagePath = page => {
        if (page > 0 && page <= totalPages) {
          // we want the first page to be the uri of the archive page. example: "/blog/"
          // and any additional pages to be numbered. example: "/blog/2"

          return page === 1 ? uri : `${uri}${page}`
        }

        return null
      }

      reporter.verbose(
        `Creating ${archiveContentType} archive at ${getPagePath(pageNumber)}`
      )

      const hasNextPage = pageNumber < nodesChunkedIntoArchivePages.length
      const hasPrevPage = pageNumber > 1

      // createPage is an action passed to createPages
      // See https://www.gatsbyjs.com/docs/actions#createPage for more info
      await actions.createPage({
        path: getPagePath(pageNumber),

        // use the archive template passed as the page component
        component,

        // `context` is available in the template as a prop and
        // as a variable in GraphQL.
        context: {
          id,
          // the index of our loop is the offset of which posts we want to display
          // so for page 1, 0 * 10 = 0 offset, for page 2, 1 * 10 = 10 posts offset,
          // etc
          offset: index * postsPerPage,

          seo,

          // We need to tell the template how many posts to display too
          postsPerPage,
          totalPages, // it can be helpful if the template knows the total number of pages
          currentPage: pageNumber, // also useful to have the current page number

          nextPagePath: hasNextPage ? getPagePath(pageNumber + 1) : null,
          previousPagePath: hasPrevPage ? getPagePath(pageNumber - 1) : null,
        },
      })
    })
  )
}

exports.createArchivePages = createArchivePages
