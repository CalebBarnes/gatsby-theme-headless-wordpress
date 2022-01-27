async function getTaxonomies({ graphql, reporter }) {
  const graphqlResult = await graphql(/* GraphQL */ `
    query WpTaxonomies {
      allWpTaxonomy(filter: { graphqlSingleName: { ne: "postFormat" } }) {
        nodes {
          __typename
          nodeType
          id
          archivePath
          graphqlSingleName
          name
        }
      }
    }
  `)

  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your site taxonomies`,
      graphqlResult.errors
    )
    return
  }

  const taxonomies = graphqlResult.data.allWpTaxonomy.nodes

  return taxonomies
}

exports.getTaxonomies = getTaxonomies
