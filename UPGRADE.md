Upgrade instruction
===================

## 1.0 to 1.1

### CSS

CSS now depends on having Bootstrap globally available. The CSS classes 'rednose-ui' and 'rednose-widget' are deprecated within the Bootstrap skinning context. Package 'rednose-css' will be refactored to provide library-wide access to Bootstrap variables.

### Builds

The build directory is removed from the repository. Builds are now handled by node.js & Grunt.

