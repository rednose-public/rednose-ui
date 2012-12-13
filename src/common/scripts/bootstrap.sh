#!/bin/bash

rm -f web/components/yui3-libbit
mkdir web/components/yui3-libbit
cp -r build web/components/yui3-libbit/build
cp -r src web/components/yui3-libbit/src

git submodule init
git submodule update
