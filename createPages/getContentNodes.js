async function getContentNodes({ graphql, reporter }) {
  const graphqlResult = await graphql(/* GraphQL */ `
    query WpContentNodes {
      allWpContentNode {
        nodes {
          __typename
          id
          uri
          slug
          nodeType
          template {
            templateName
          }
          contentType {
            node {
              archivePath
              graphqlSingleName
            }
          }
          ... on WpPage {
            isPostsPage
          }
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
  return graphqlResult.data.allWpContentNode.nodes
}

exports.getContentNodes = getContentNodes
