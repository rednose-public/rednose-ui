# RedNoseUI

## Build

### Dependencies

1. Install [node.js](http://nodejs.org), if you don't have it yet.

2. Install global dependencies:

    ```
    [sudo] npm install -g grunt-cli

### Development

* Install local dependencies and build the source:

    ```
    npm install

* Building RedNoseUI:

    ```
    grunt build

* Run the unit tests:

    ```
    grunt test

### Loader metadata

* After changing any of the metadata files, run the following command to update the metadata JSON file:

    ```
    yogi loader --yes
