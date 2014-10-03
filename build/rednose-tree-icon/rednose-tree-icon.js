YUI.add('rednose-tree-icon', function (Y, NAME) {

/*jshint boss:true, expr:true, onevar:false */

/**
 * @module rednose-tree
 * @submodule rednose-tree-icon
 * @main rednose-tree-icon
 */

function Icon() {}

Icon.prototype = {
    initializer: function () {
        this.nodeExtensions = this.nodeExtensions.concat(Y.Rednose.Tree.Node.Icon);
    }
};

Y.namespace('Rednose.Tree').Icon = Icon;
/*jshint boss:true, expr:true, onevar:false */

/**
 * @module rednose-tree
 * @submodule rednose-tree-icon
 */

function NodeIcon(tree, config) {
    this._serializable = this._serializable.concat('icon');

    if ('icon' in config) {
        this.icon = config.icon;
    }
}

NodeIcon.prototype = {
    /**
     * Icon for this node.
     * @property {String|Array} icon
     */

     /**
      * @return {String}
      */
     getIcon: function () {
        if (Y.Lang.isArray(this.icon)) {
            return this.isOpen() ? this.icon[0] : this.icon[1];
        }

        return this.icon;
     }
};

Y.namespace('Rednose.Tree.Node').Icon = NodeIcon;


}, '1.6.0-dev', {"requires": ["tree"]});
