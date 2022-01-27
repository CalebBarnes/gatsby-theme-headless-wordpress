async function getTermNodesByTaxonomyName({
  taxonomyName,
  gatsbyUtilities: { graphql, reporter },
}) {
  const graphqlResult = await graphql(
    /* GraphQL */ `
      query WpTermNodesByTaxonomyName($taxonomyName: String!) {
        allWpTermNode(filter: { taxonomyName: { eq: $taxonomyName } }) {
          nodes {
            __typename
            name
            nodeType
            id
            link
            slug
            uri
            taxonomyName
          }
        }
      }
    `,
    { taxonomyName }
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

exports.getTermNodesByTaxonomyName = getTermNodesByTaxonomyName
