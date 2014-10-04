# UPGRADE FROM 1.5 to 1.6

Version 1.6 is built on top of YUI 3.18 and Bootstrap 2.3.2.

The library is now distributed as stand-alone framework with all YUI, gallery and Bootstrap dependencies included.

## Initial file loading

 * All initial JavaScript, including the YUI seed and the rednose-ui loader metadata can now be included with a single file, 'build/rednose/rednose.js' or 'build/rednose/rednose-min.js'
 * All initial CSS, including Bootstrap can now be included with a single file, 'build/rednose/rednose.csss' or 'build/rednose/rednose-min.css'

## Combo loading

Combo loading is now disabled by default and all dependencies can automatically be loaded without any configuration. Combo loading can be enabled by specifying the `combine`, `comboBase` and `root` configuration parameters.

## Building

Building of the library, dependencies and seed file is now handled by Grunt. Individual modules can still be built with Shifter or Yogi.
