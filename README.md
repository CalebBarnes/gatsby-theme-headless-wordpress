# gatsby-theme-headless-wordpress

## 💡 What does it do?

This plugin handles creating pages in Gatsby for all of the content sourced by [gatsby-source-wordpress](https://www.gatsbyjs.com/plugins/gatsby-source-wordpress/).

## 🚀 Quick start

Use my starter project [gatsby-starter-headless-wordpress](https://github.com/CalebBarnes/gatsby-starter-headless-wordpress) or follow the [getting started section for gatsby-source-wordpress](https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-source-wordpress/docs/getting-started.md)

Install and add the theme to your gatsby-config.js

```
yarn add gatsby-theme-headless-wordpress gatsby-source-wordpress
```

Minimal gatsby-config setup

```javascript
module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        // the only required plugin option for WordPress is the GraphQL url.
        url:
          process.env.WPGRAPHQL_URL ||
          `https://wpgatsbydemo.wpengine.com/graphql`,
      },
    },

    `gatsby-theme-headless-wordpress`, // no plugin options are required
  ],
}
```

## Plugin Options

```javascript
{
  resolve: `gatsby-theme-headless-wordpress`
  options: {
     templatesPath: `./src/templates`, // default ~ the folder where you will keep your page template files
     excludedNodeTypes: [`MediaItem`], // default ~ excludes creating pages for individual media items
     type: {
       __all: { // '__all' will override options for all post types
         postsPerPage: 999 // overrides the postsPerPage option from WordPress reading settings
       },
       post: { // 'post' will override options for a specific post type, matching by graphqlSingleName
         postsPerPage: 999 // overrides the postsPerPage option from WordPress reading settings
       }
     }
  }
}
```

## Compatibility

Currently supports WP templates, pages, posts, archive pages, taxonomies (tags, categories, custom taxonomies), custom post types, and custom post type archives.

If the [WPGraphQL Yoast SEO Addon](https://wordpress.org/plugins/add-wpgraphql-seo/) is installed in WordPress, this plugin will query the seo data for each node and pass it to the page context. `{ pageContext: { seo } }`

## 📂Templates

To use different templates for a single post type, a template must be assigned to the page/post in WP.

The template files will follow this folder structure with camel cased names. Supports any file extension. (.js, .jsx, .ts, .tsx)

    .
    ├── src
        ├── templates
            ├── page // post type graphqlSingleName
                ├── default.tsx
                ├── fullWidth.tsx // name of the template assigned to the page in WP (camelCased)
            ├── post
                ├── default.tsx
            ├── archive
                ├── post.tsx // post type graphqlSingleName
                ├── product.tsx
            ├── taxonomy
                ├── category.tsx
                ├── tag.tsx
                ├── customTaxonomyName.tsx

##### Pages, Posts, and Custom post types:

`${pluginOptions.templatesPath}/${postType graphqlSingleName}/${templateName}`

##### Taxonomies:

`${pluginOptions.templatesPath}/taxonomy/${taxonomy.name}`

##### Archive pages:

`${pluginOptions.templatesPath}/archive/${postType graphqlSingleName}`

## Roadmap

- ~~Support CPT archive pages~~ - ✔ Completed in 0.1.0
- Add options to pass additional data to page context - 💥In progress
- Add options to have more control over the templates folder structure
- Allow more generic page components to be used across different post types similar to WP template hierarchy

## Sites using this plugin

- https://jambaree.com/
- https://www.thedeckingsuperstore.com/
- https://polarbattery.com/

Did you use this plugin in a website? Open a pull request and add to this list.

## Changelog

0.1.7

- added plugin options to override `postsPerPage` for specific post types or globally.

0.1.6

- added `archivePath` to pageContext for single pages. Now single pages can link back to the archive page OR use this uri to query data from the archive page.

0.1.5

- added `currentPage` to pageContext for archive pages and taxonomy pages. Used to help with pagination in page templates.

0.1.4

- added `totalPages` to pageContext for archive pages and taxonomy pages. This is to help with page templates that need more advanced pagination than just prev/next buttons.

0.1.1

- fixed bug that caused the home page to become the posts page even if no posts archive was set in WP

0.1.0

- added support for all post type archives, previous versions only support the /blog/ archive for the default 'post' type
