#!/usr/bin/env node

var path = require('path');

var base = path.join(__dirname, '../../');

var json = require('./parse').parse(function(line) {
    return (line.indexOf('coverage') === -1);
});
var paths = require('./parse').paths(json);

var out = [];

paths.forEach(function(p, i) {
    out.push(path.join(base, p));
});

module.exports = out;
