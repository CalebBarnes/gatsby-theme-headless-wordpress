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
  }
}
```

## Compatibility

Currently supports WP templates, pages, posts, archive pages, taxonomies (tags, categories, custom taxonomies), and custom post types.

If the [WPGraphQL Yoast SEO Addon](https://wordpress.org/plugins/add-wpgraphql-seo/) is installed in WordPress, this plugin will query the seo data for each node and pass it to the page context. `{ pageContext: { seo } }`

## 📂Templates

To use different templates for a single post type a template must be assigned to the page/post in WP.

The template files will follow this folder structure with camel cased names. Supports any file extension. (.js, .jsx, .ts, .tsx)

    .
    ├── src
        ├── templates
            ├── page
                ├── default.tsx
                ├── fullWidth.tsx
            ├── post
                ├── default.tsx
            ├── taxonomy
                ├── category.tsx
                ├── tag.tsx

##### Pages, Posts, and Custom post types:

`${pluginOptions.templatesPath}/${postType graphqlSingleName}/${templateName}`

##### Taxonomies:

`${pluginOptions.templatesPath}/taxonomy/${taxonomy.name}`

##### Archive pages:

`${pluginOptions.templatesPath}/archive/${postType graphqlSingleName}`

## Roadmap

- Support CPT archive pages - In progress
- Add options to pass additional data to page context
- Add options to have more control over the templates folder structure
- Allow more generic page components to be used across different post types similar to WP template hierarchy

## Example sites

- https://jambaree.com/
- https://www.thedeckingsuperstore.com/
