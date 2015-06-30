#!/usr/bin/env bash

babel src -d app

cp src/package.json app
cp .env app

cd app
node-lambda deploy
