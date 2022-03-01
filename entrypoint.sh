#!/bin/sh

sed 's/__BACKEND_INGRESS__/'"$backendIngress"'/' src/App.js > src/App.js.sed
mv src/App.js.sed src/App.js

exec $@
