/*jshint expr:true, onevar:false */

/**
 * Provides Rednose.Dropdown.Item class.
 *
 * @module rednose-dropdown
 * @submodule rednose-dropdown-item
 */

/**
 * A single item within a `Rednose.Dropdown`.
 *
 * @class Rednose.Dropdown.Item
 * @constructor
 * @param {Rednose.Dropdown} dropdown `Rednose.Dropdown` instance.
 * @param {Object} [config] Configuration hash for this item.
 *     @param {Boolean} [config.id] The id for this item.
 *
 *     @param {String} [config.type='item'] The type for this dropdown item.
 *         Can be 'item' or 'divider'.
 *
 *     @param {Array} [config.children=[]] Array of child config objects for this item.
 *
 *     @param {Boolean} [config.disabled=false] Whether this item is disabled or not. Disabled
 *         items can't be clicked and won't trigger any events.
 *
 *     @param {String} [config.icon] Icon CSS class for this item.
 *
 *     @param {String} [config.title] The text label for this item.
 *
 *     @param {String} [config.url] URL that will be opened when this item is clicked.
 *
 *     @param {String} [config.html] Custom HTML string to render the contents of this item.
 */
function DropdownItem(dropdown, config) {
    config || (config = {});

    this.dropdown = dropdown;
    this.id       = config.id || Y.stamp(this);
    this.type     = config.type || 'item';
    this.url      = config.url || '#';
    this.children = [];

    if (config.html && !config.url) {
        var html = Y.Node.create(config.html);

        html.hasAttribute('href') && (this.url = html.getAttribute('href'));
    }

    Y.mix(this, config);
}

DropdownItem.prototype = {
    /**
     * The id for this node.
     *
     * @property {string} title
     * @readOnly
     */

    /**
     * The dropdown instance.
     *
     * @property {Rednose.Dropdown} dropdown
     * @readOnly
     */

    /**
     * This node's children.
     *
     * @property {Array} children
     * @readOnly
     */

    /**
     * This node's type.
     *
     * @property {String} type
     * @readOnly
     */

    /**
     * Whether this node is disabled or not.
     *
     * @property {Boolean} disabled
     * @readOnly
     */

    /**
     * The icon for this node.
     *
     * @property {String} icon
     * @readOnly
     */

    /**
     * The title for this node.
     *
     * @property {String} title
     * @readOnly
     */

    /**
     * The URL for this node.
     *
     * @property {String} url
     * @readOnly
     */

    /**
     * Custom HTML for this node.
     *
     * @property {String} html
     * @readOnly
     */

    /**
     * Parent node for this item.
     *
     * @property {Rednose.Dropdown.Item} parent
     * @readOnly
     */

    // -- Public Methods -------------------------------------------------------

    /**
     * Enables this item.
     */
    enable: function () {
        this.dropdown.enableItem(this);

        return this;
    },

    /**
     * Disables this item.
     *
     * @chainable
     */
    disable: function () {
        this.dropdown.disableItem(this);

        return this;
    },

    /**
     * Renames this item.
     *
     * @param {String} title
     */
    rename: function (title) {
        this.dropdown.renameItem(this, title);

        return this;
    },

    /**
     * Whether this node is disabled or not.
     *
     * @return {Boolean}
     */
    isDisabled: function () {
        return this.disabled === true;
    },

    /**
     * Whether this node has children or not.
     *
     * @return {Boolean}
     */
    hasChildren: function () {
        return this.children && this.children.length > 0;
    },

    /**
     * @param {Object[]} children
     */
    resetChildren: function (children) {
        this.dropdown.resetItemChildren(this, children);

        return this;
    },

    /**
     * Adds a child to this node.
     *
     * @param {Rednose.Dropdown.Item} child
     */
    addChild: function (child) {
        child.parent = this;

        this.children.push(child);
    }
};

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.Dropdown').Item = DropdownItem;
