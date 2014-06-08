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
