/**
 * Boostrap's a module that contains an Y.App definition.
 *
 * The module and its dependencies are loaded, a new instance is created and the render method
 * will be called.
 *
 * @param {string} constructor App constuctor
 * @param {string} module      Module name
 * @param {string} config      Optional config to pass to the app constructor
 *
 * @static
 */
YUI.bootstrap = function (constructor, module, config) {
    config || (config = {});

    YUI().use(module, function (Y) {
        // Looks for a namespaced constructor function on `Y`.
        var AppConstructor = Y.Object.getValue(Y, constructor.split('.'));

        new AppConstructor(config).render();
    });
};
