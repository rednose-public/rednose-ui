# UPGRADE FROM 1.4 to 1.5

Version 1.5 is compatible with YUI 3.16.0.

## rednose-app

 * Loading app within iFrames is no longer supported in its current form.
 * Module `Rednose.Templates` was removed and has been replaced by App/View extensions.

## rednose-contextmenu

 * Module `Rednose.ContextMenu` was removed in favor of `Rednose.Dropdown`.

## rednose-navbar

 * Method `createDropdown` has been removed. Use module `Rednose.Dropdown` instead.
 * Class `Rednose.Toolbar` was moved to a separate module, see `rednose-toolbar`.

## rednose-controlform

* Module `Rednose.ControlForm` was removed and was replaced by the `rednose-form` module.

## rednose-toolbar

 * Class `Rednose.Toolbar` was refactored and now uses instances of `rednose-button-group`.
 * Config property `evtPrefix` for backwards compatibility was removed in this version.

## rednose-view-nav

 * Event `buttonClose` was renamed to `close`.
 * Event `load` was removed.
 * Method `getButton` was removed. Use  `getButtonById` on the `toolbar` property.
 * The `buttons` **attribute** was removed. Use `reset` on the toolbar property to reset the buttons.
 * The `buttons` **property** was removed. Use the `buttonGroups` properties, both accept an array of button-group configurations.

## rednose-ui

* **All CSS** is now handled by `LESS` templates within the `rednose-ui` module.
