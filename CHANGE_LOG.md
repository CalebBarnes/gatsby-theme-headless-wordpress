## Changelog

0.1.10
- added new option `excludedPageUrls` to allow excluding pages from being created by their uri

0.1.9
- fixed taxonomy query issue that was introduced in 0.1.8

0.1.8

- fixed issue with taxonomy archive pagination. Now taxonomy pages will paginate correctly.
- added the ability to override `postsPerPage` for taxonomy archive pages, similar to how you would override `postsPerPage` for normal archive pages.
- Tested with WPGraphQL 1.6.12 and WPGatsby 2.1.1

0.1.7

- added plugin options to override `postsPerPage` for specific post types or globally.
- Tested with WPGraphQL 1.4.3 and WPGatsby 1.0.10

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
