/**
 * Boostrap's a module that contains an Y.App definition.
 *
 * The module and its dependencies are loaded, a new instance is created and the render method
 * will be called.
 *
 * This method creates a global Y singleton instance. Modules should be loaded from this single instance to allow lazyloading
 * of new modules.
 *
 * @param {string} constructor App constuctor
 * @param {string} module      Module name
 * @param {string} config      Optional config to pass to the app constructor
 *
 * @static
 */
YUI.bootstrap = function (constructor, module, config) {
    config || (config = {});

    window.Y || (window.Y = YUI());

    Y.use(module, function () {
        // Looks for a namespaced constructor function on `Y`.
        var AppConstructor = Y.Object.getValue(Y, constructor.split('.'));

        new AppConstructor(config).render();
    });
};
