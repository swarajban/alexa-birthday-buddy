#!/usr/bin/env bash

rm -rf app
babel --ignore "src/node_modules,src/test" -d app src

cp src/package.json app
cp .env app

cd app
node-lambda deploy
