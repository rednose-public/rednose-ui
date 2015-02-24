RedNoseUI [![Build status...](https://secure.travis-ci.org/rednose-public/rednose-ui.png?branch=master)](http://travis-ci.org/rednose-public/rednose-ui)
=========

RedNoseUI is a JavaScript framework, providing core features used across several RedNose products. RedNoseUI is provided under the MIT license.

## Usage

    <link href="path/to/rednose-ui/build/rednose-bootstrap/rednose-bootstrap-min.css" rel="stylesheet"/>
    <link href="path/to/rednose-ui/build/rednose-ui/rednose-ui.css" rel="stylesheet"/>

    <script src="http://yui.yahooapis.com/3.16.0/build/yui/yui.js"></script>
    <script src="path/to/rednose-ui/build/rednose-loader/rednose-loader.js"></script>

    <script>
    	YUI.Env.core.push('rednose-loader');

    	YUI({
        	"groups": {
            	"rednose-ui": {
    	            base: "path/to/rednose-ui/build/"
        	    }
    	    }
    	}).use('rednose-app', function (Y) {
    		Y.log('Hello world');
    	});
    </script>

## Development

### Global dependencies

1. Install [NodeJS](http://nodejs.org), if you don't have it yet.

2. Install global dependencies:

        [sudo] npm install -g yogi recess

### Building

Run from `src/` to build the entire library, or from a module folder:

    yogi build

After adding new modules or updating existing module meta data, the `rednose-loader` module needs to be rebuilt.

### Testing

1.  To run the test suites you'll need PhantomJS:

        [sudo] npm install -g phantomjs

2. Run from `src/` or a module folder:

        yogi test

## About

RedNoseUI is a [RedNose](http://www.rednose.nl) initiative.
