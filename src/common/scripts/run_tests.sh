#!/bin/bash

sh src/common/scripts/bootstrap.sh
rm -rf reports
mkdir reports
#cd web/components/rednose-ui && grover -t 180 -c 5  -i src/common/node/batch.js -o ../../../reports/junit.xml --junit
cd web/components/rednose-ui && yogi test --istanbul --coverage -o ../../../reports/junit.xml --junit
