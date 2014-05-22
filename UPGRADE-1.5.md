# UPGRADE FROM 1.4 to 1.5

Version 1.5 is compatible with YUI 3.16.0.

## rednose-app

 * Loading app within iFrames is no longer supported in its current form.
 * Module `Rednose.Templates` was removed and has been replaced by App/View extensions.

## rednose-contextmenu

 * Module `Rednose.ContextMenu` was removed in favor of `Rednose.Dropdown`.

## rednose-dd

 * Module `Rednose.DD` was removed.

## rednose-datatable

 * Deprecated event `dblclick` has been replaced by `open`.

## rednose-navbar

 * Class now extends Y.View instead of Y.Widget.
 * Method `createDropdown` has been removed. Use module `Rednose.Dropdown` instead.
 * Class `Rednose.Toolbar` was moved to a separate module, see `rednose-toolbar`.

## rednose-navbar-recent

 * Constructor `Rednose.Navbar.Recent` was renamed to `Rednose.Plugin.NavbarRecent`.
 * Method `addEntry` was renamed to `add`.
 * Method `clearEntries` was renamed to `clear`.
 * Subscription now occurs through the `clickRecent` event, that bubbles to the plugin host.

## rednose-controlform

* Module `Rednose.ControlForm` was removed and was replaced by the `rednose-form` module.

## rednose-dataprovider

* Module `Rednose.DataProvider` was removed and was replaced by the `rednose-datasource-manager` module.

## rednose-dropdown

 * Event `select` was renamed to `click`.

## rednose-toolbar

 * Class `Rednose.Toolbar` was refactored and now uses instances of `rednose-button-group`.
 * Config property `evtPrefix` for backwards compatibility was removed in this version.

## rednose-view-nav

 * Event `buttonClose` was renamed to `close`.
 * Event `load` was removed.
 * Method `getButton` was removed. Use  `getButtonById` on the `toolbar` property.
 * The `buttons` **attribute** was removed. Use `reset` on the toolbar property to reset the buttons.
 * The `buttons` **property** was removed. Use the `buttonGroups` properties, it accepts an array of button-group configurations.

## rednose-ui

* **All CSS** except vendor CSS is now handled by `LESS` templates within the `rednose-ui` module.
