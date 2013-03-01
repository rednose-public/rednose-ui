#!/bin/bash

sh src/common/scripts/bootstrap.sh
rm -rf reports
mkdir reports
cd web/components/yui3-libbit && grover -t 180 -c 5  -i src/common/node/batch.js -o ../../../reports/junit.xml --junit
