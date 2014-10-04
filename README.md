# RedNoseUI

RedNoseUI is a JavaScript framework, providing core features used across several RedNose products. RedNoseUI is provided under the MIT license.

## Usage

    <html>
        <head>
            <link href="build/rednose/rednose-min.css" rel="stylesheet"/>
            <script src="build/rednose/rednose-min.js"></script>
        </head>
        <body class="yui3-skin-sam">
            <script>
                YUI().use('rednose-dialog', function (Y) {
                    Y.Rednose.Dialog.alert({title: 'RedNoseUI', text: 'Hello world'});
                });
            </script>
        </body>
    </html>

## Development

### Dependencies

1. Install [NodeJS](http://nodejs.org), if you don't have it yet.

2. Install global dependencies:

        [sudo] npm install -g grunt-cli yogi recess

3. Install local dependencies:

        npm install

### Building

 * To build the entire library, CSS and seed file:

        grunt build

 * To build a single module, run from a module dir:

        yogi build

After adding new modules or updating existing module meta data, the `rednose-loader` module needs to be rebuilt.

### Testing

 * To test the entire library, CSS and seed file:

        grunt test

 * To test a single module, run from a module dir:

        yogi test

## About

RedNoseUI is a [RedNose](http://www.rednose.nl) initiative.
