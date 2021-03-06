async function getTermContentNodesByTermNodeId({
  termNodeId,
  termNodeTypeName,
  gatsbyUtilities: { graphql, reporter },
}) {
  const graphqlResult = await graphql(
    /* GraphQL */ `
      query TermNodeContentNodes($termNodeId: String!) {
        wpTermNode(id: { eq: $termNodeId }) {
          ... on ${termNodeTypeName} {
            id
            name
            contentNodes {
              nodes {
                id
                uri
              }
            }
          }
        }
      }
    `,
    { termNodeId }
  )

  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your site taxonomies`,
      graphqlResult.errors
    )
    return
  }

  const wpTermContentNodes = graphqlResult.data.wpTermNode.contentNodes.nodes

  return wpTermContentNodes
}

exports.getTermContentNodesByTermNodeId = getTermContentNodesByTermNodeId
