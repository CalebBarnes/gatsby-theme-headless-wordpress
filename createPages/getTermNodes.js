async function getTermNodes({
  nodeType,
  gatsbyUtilities: { graphql, reporter },
}) {
  const graphqlResult = await graphql(
    /* GraphQL */ `
      query WpTaxonomies($nodeType: String!) {
        allWpTermNode(filter: { nodeType: { eq: $nodeType } }) {
          nodes {
            __typename
            name
            nodeType
            id
            link
            slug
          }
        }
      }
    `,
    { nodeType }
  )

  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your site taxonomies`,
      graphqlResult.errors
    )
    return
  }

  const termNodes = graphqlResult.data.allWpTermNode.nodes

  return termNodes
}

exports.getTermNodes = getTermNodes
