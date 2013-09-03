#!/bin/bash

sh src/common/scripts/bootstrap.sh
cd web/components/rednose-ui && yogi test
