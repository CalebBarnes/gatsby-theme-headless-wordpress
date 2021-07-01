# gatsby-theme-headless-wordpress


## Quick start

Follow the [getting started section for gatsby-source-wordpress](https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-source-wordpress/docs/getting-started.md) 

Install and add the theme to your gatsby-config.js

```
yarn add gatsby-theme-headless-wordpress
```
Minimal gatsby-config setup
```javascript
module.exports = {
  plugins: [
    {
      /**
       * First up is the WordPress source plugin that connects Gatsby
       * to your WordPress site.
       *
       * visit the plugin docs to learn more
       * https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-source-wordpress/README.md
       *
       */
      resolve: `gatsby-source-wordpress`,
      options: {
        // the only required plugin option for WordPress is the GraphQL url.
        url:
          process.env.WPGRAPHQL_URL ||
          `https://wpgatsbydemo.wpengine.com/graphql`,
      },
    },
    
    `gatsby-theme-headless-wordpress` // no plugin options are required
  ]
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
