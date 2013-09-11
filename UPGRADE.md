Upgrade instructions
====================

## 1.0 to 1.1

### Modules

* Module `rednose-nav-container` has been renamed to `rednose-widget-nav-container`.

### CSS

* CSS now depends on having Bootstrap globally available. The CSS classes `rednose-ui` and `rednose-widget` are deprecated within the Bootstrap skinning context.

### Builds

* The build directory is removed from the repository. Builds are now handled by [node.js](http://nodejs.org) & [Grunt](http://gruntjs.com).

* Builds now rely on fully generated metadata, created by running `yogi builder --yes`.
