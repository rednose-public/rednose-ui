#!/bin/bash

rm -rf web
mkdir -p web/components/rednose-ui
cp -r build web/components/rednose-ui/build
cp -r src web/components/rednose-ui/src

git clone git@gitorious.rednose.nl:yui/yui3.git web/components/yui3
git clone git@gitorious.rednose.nl:yui/yui3-gallery.git web/components/yui3-gallery
