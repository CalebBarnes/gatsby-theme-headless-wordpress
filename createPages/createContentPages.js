const path = require("path")

const { getContentSeo } = require(`./getContentSeo`)
const { createArchivePages } = require(`./createArchivePages`)
const { getTemplatePath } = require(`./utils/getTemplatePath`)
const { getPageExclusionStatus } = require(`./utils/getPageExclusionStatus`)

const createContentPages = async ({
  contentTypes,
  contentNodes,
  gatsbyUtilities: { actions, reporter, graphql },
  options,
}) =>
  Promise.all(
    contentNodes.map(async contentNode => {
      const { id, uri, nodeType, contentType } = contentNode

      const isPageExcluded = getPageExclusionStatus({ contentNode, options })

      if (isPageExcluded) {
        return // early exit for excluded pages
      }

      const archive = contentTypes.find(contentType => {
        if (contentType.archivePath === uri) {
          if (uri === "/" && !contentType.isFrontPage) {
            // if no blog page exists, the archivePath defaults to "/"
            // even if the home page is already set to a different page
            // todo: test more options for Reading Settings / home page / posts page settings
            return null
          }
          return contentType
        }
      })

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
        reporter.verbose(`Creating ${archive.graphqlSingleName} at ${uri}`)

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
          options,
        })
        return
      } else {
        reporter.verbose(`Creating ${nodeType} at ${uri}`)

        // create single page
        return actions.createPage({
          path: uri,
          component: path.resolve(contentTypeTemplatePath),
          ownerNodeId: id,
          context: {
            id,
            seo,
            archivePath: contentType.node && contentType.node.archivePath,
          },
        })
      }
    })
  )

exports.createContentPages = createContentPages
