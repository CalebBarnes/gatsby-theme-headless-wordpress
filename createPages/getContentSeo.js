const getContentSeo = async ({ id, nodeType, graphql }) => {
  try {
    const {
      data: { [`wp${nodeType}`]: { seo = null } } = {
        [`wp${nodeType}`]: { seo: null },
      },
    } = await graphql(
      /* GraphQL */ `
         query ContentNode($id: String!) {
           wp${nodeType}(id: { eq: $id }) {
                 seo {
                    title
                    metaDesc
                    canonical
                    cornerstone
                    focuskw
                    fullHead
                    metaKeywords
                    metaRobotsNofollow
                    metaRobotsNoindex
                    opengraphAuthor
                    opengraphDescription
                    opengraphModifiedTime
                    opengraphPublishedTime
                    opengraphPublisher
                    opengraphSiteName
                    opengraphTitle
                    opengraphType
                    opengraphUrl
                    readingTime
                    twitterTitle
                    twitterDescription
                    breadcrumbs {
                        text
                        url
                    }
                    twitterImage {
                        altText
                        sourceUrl
                    }
                }
           }
         }
      `,
      { id }
    )

    return seo
  } catch (err) {
    reporter.warn(`Yoast SEO not enabled in WP`)
  }
}

exports.getContentSeo = getContentSeo
