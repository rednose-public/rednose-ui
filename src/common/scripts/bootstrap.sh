#!/bin/bash

rm -r web/components/yui3-libbit
mkdir -p web/components/yui3-libbit
cp -r build web/components/yui3-libbit/build
cp -r src web/components/yui3-libbit/src

git clone git@gitorious.rednose.nl:yui/yui3.git web/components/yui3
git clone git@gitorious.rednose.nl:yui/yui3-gallery.git web/components/yui3-gallery
