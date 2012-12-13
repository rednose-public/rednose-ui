#!/bin/bash

sh src/common/scripts/bootstrap.sh
cd web/components/yui3-libbit && grover -t 180 -c 5  -i src/common/node/batch.js
