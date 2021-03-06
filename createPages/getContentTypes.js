async function getContentTypes({ graphql, reporter }) {
  const graphqlResult = await graphql(/* GraphQL */ `
    query WpContentNodes {
      allWpContentType {
        nodes {
          archivePath
          graphqlSingleName
          isFrontPage
          isPostsPage
        }
      }
    }
  `)

  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your site content`,
      graphqlResult.errors
    )
    return
  }
  return graphqlResult.data.allWpContentType.nodes
}

exports.getContentTypes = getContentTypes
