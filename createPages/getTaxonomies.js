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
          connectedContentTypes {
            nodes {
              graphqlSingleName
              contentNodes {
                nodes {
                  id
                  uri
                  nodeType
                  isArchive
                  archiveContentType
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
          }
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
