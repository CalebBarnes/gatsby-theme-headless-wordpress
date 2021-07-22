const path = require("path")

const { getContentSeo } = require(`./getContentSeo`)
const { createArchivePages } = require(`./createArchivePages`)
const { getTemplatePath } = require(`./utils/getTemplatePath`)

const createContentPages = async ({
  contentTypes,
  contentNodes,
  gatsbyUtilities: { actions, reporter, graphql },
  options,
}) =>
  Promise.all(
    contentNodes.map(async contentNode => {
      const { id, uri, nodeType } = contentNode

      if (options.excludedNodeTypes.includes(nodeType)) {
        return // early exit for excluded nodeType
      }

      const archive = contentTypes.find(
        contentType => contentType.archivePath === uri
      )

      const contentTypeTemplatePath = await getTemplatePath({
        archive,
        node: contentNode,
        reporter,
        options,
      })

      if (!contentTypeTemplatePath) {
        return // no template found, exit
      }

      const seo = await getContentSeo({ id, nodeType, graphql })

      if (!!archive) {
        await createArchivePages({
          archiveContentType: archive.graphqlSingleName,
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
