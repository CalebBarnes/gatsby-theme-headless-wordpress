async function getContentNodes({ graphql, reporter }) {
  const graphqlResult = await graphql(/* GraphQL */ `
    query WpContentNodes {
      allWpContentNode {
        nodes {
          __typename
          id
          uri
          nodeType
          isArchive # added resolver for this to ContentNode - true/false
          archiveContentType # added resolver for this to ContentNode - null or the post type "post", "product", "movie", etc
          template {
            templateName
          }
          contentType {
            node {
              graphqlSingleName
            }
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
