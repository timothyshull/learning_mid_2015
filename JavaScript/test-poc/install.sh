#!/u/tools/bin/bash

# install script for linux
# setup openssl certificate
./sslcert.exp

# linux pre-built binaries
curl -O https://iojs.org/download/release/v2.3.0/iojs-v2.3.0-linux-x64.tar.gz

gunzip iojs-v2.3.0-linux-x64.tar.gz
tar -zxvf iojs-v2.3.0-linux-x64.tar
rm iojs-v2.3.0-linux-x64.tar
export TEST_PW=hedvig && export TEST_USER=admin

iojs-v2.3.0-linux-x64/bin/npm install
iojs-v2.3.0-linux-x64/bin/node ./server.js

# install script for mac
# ./sslcert.exp
# mac pre-built binaries
# curl -O https://iojs.org/dist/v2.3.0/iojs-v2.3.0-darwin-x64.tar.gz
# gunzip iojs-v2.3.0-darwin-x64.tar.gz
# tar -zxvf iojs-v2.3.0-darwin-x64.tar
# rm iojs-v2.3.0-darwin-x64.tar
# export TEST_PW=hedvig && export TEST_USER=admin
#
# iojs-v2.3.0-darwin-x64/bin/npm install
# iojs-v2.3.0-darwin-x64/bin/node ./server.js