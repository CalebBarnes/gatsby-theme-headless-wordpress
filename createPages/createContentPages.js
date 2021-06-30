const path = require("path")

const { getContentSeo } = require(`./getContentSeo`)
const { createArchivePages } = require(`./createArchivePages`)
const { getTemplatePath } = require(`./utils/getTemplatePath`)

const { options } = require(`./options`)

const createContentPages = async ({
  contentNodes,
  gatsbyUtilities: { actions, reporter, graphql },
}) =>
  Promise.all(
    contentNodes.map(async contentNode => {
      const {
        id,
        uri,
        nodeType,
        isArchive = false,
        archiveContentType = null,
      } = contentNode

      if (options.excludedNodeTypes.includes(nodeType)) {
        return // early exit for excluded nodeType
      }

      const contentTypeTemplatePath = await getTemplatePath({
        node: contentNode,
        reporter,
      })

      if (!contentTypeTemplatePath) {
        return // no template found, exit
      }

      const seo = await getContentSeo({ id, nodeType, graphql })

      if (isArchive) {
        await createArchivePages({
          archiveContentType,
          id,
          component: path.resolve(contentTypeTemplatePath),
          uri,
          contentNodes,
          graphql,
          actions,
          reporter,
          seo,
        })
        return
      } else {
        reporter.verbose(`Creating ${nodeType} at ${uri}`)

        // create single page
        return actions.createPage({
          path: uri,
          component: path.resolve(contentTypeTemplatePath),
          context: {
            id,
            seo,
          },
        })
      }
    })
  )

exports.createContentPages = createContentPages
