/*jshint boss:true, expr:true, onevar:false */

/**
 * @module rednose-tree
 * @submodule tree-comparable
 */

function NodeComparable() {}

NodeComparable.prototype = {
    /**
     * @param {Tree.Node} node
     * @return {Number}
     */
    compare: function (node) {
        if (!node || node === this || node.tree !== this.tree) {
            return 0;
        }

        if (this.depth() === node.depth()) {
            return node.index() < this.index() ? 1 : -1;
        }

        if (node.depth() > this.depth()) {
            if (node.parent === this) {
                return -1;
            }

            return this.compare(node.parent);
        }

        if (node === this.parent) {
            return 1;
        }

        return this.parent.compare(node);
    }
};

Y.namespace('Rednose.Tree.Node').Comparable = NodeComparable;
