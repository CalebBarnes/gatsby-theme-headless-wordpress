const chunk = require("lodash/chunk")

/**
 * ? This function creates all the individual term pages in this site
 */
async function createTermPages({
  graphqlSingleName,
  id,
  component,
  uri,
  gatsbyUtilities,
}) {
  const {
    data: {
      wp: {
        readingSettings: { postsPerPage },
      },
    },
  } = await gatsbyUtilities.graphql(/* GraphQL */ `
    {
      wp {
        readingSettings {
          postsPerPage
        }
      }
    }
  `)

  const {
    data: {
      allWpTaxonomy: { taxonomyNodes },
    },
  } = await gatsbyUtilities.graphql(
    /* GraphQL */ `
      query TaxPages($graphqlSingleName: String!) {
        allWpTaxonomy(
          filter: { graphqlSingleName: { eq: $graphqlSingleName } }
        ) {
          taxonomyNodes: nodes {
            graphqlSingleName
            archivePath
            connectedContentTypes {
              nodes {
                id
                uri
                contentNodes {
                  nodes {
                    uri
                  }
                }
              }
            }
          }
        }
      }
    `,
    { graphqlSingleName }
  )

  const nodes =
    taxonomyNodes &&
    taxonomyNodes[0] &&
    taxonomyNodes[0].connectedContentTypes &&
    taxonomyNodes[0].connectedContentTypes.nodes

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

      gatsbyUtilities.reporter.verbose(
        `Creating ${graphqlSingleName} archive page at ${getPagePath(
          pageNumber
        )}`
      )

      const hasNextPage = pageNumber < nodesChunkedIntoArchivePages.length
      const hasPrevPage = pageNumber > 1

      // createPage is an action passed to createPages
      // See https://www.gatsbyjs.com/docs/actions#createPage for more info
      await gatsbyUtilities.actions.createPage({
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

          //   seo,

          // We need to tell the template how many posts to display too
          postsPerPage,
          nextPagePath: hasNextPage ? getPagePath(pageNumber + 1) : null,
          previousPagePath: hasPrevPage ? getPagePath(pageNumber - 1) : null,
        },
      })
    })
  )
}

exports.createTermPages = createTermPages
