#!/usr/bin/env bash

rm -rf app
babel --ignore "src/node_modules,src/test" -d app src

cp src/package.json app
cp -R src/node_modules/ app/node_modules
cp src/event.json app
cp .env app

cd app
node-lambda run
