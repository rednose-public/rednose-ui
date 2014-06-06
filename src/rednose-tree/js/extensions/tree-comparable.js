/*jshint boss:true, expr:true, onevar:false */

/**
 * @module rednose-tree
 * @submodule rednose-tree-comparable
 * @main rednose-tree-comparable
 */

function Comparable() {}

Comparable.prototype = {
    initializer: function () {
        this.nodeExtensions = this.nodeExtensions.concat(Y.Rednose.Tree.Node.Comparable);
    }
};

Y.namespace('Rednose.Tree').Comparable = Comparable;
