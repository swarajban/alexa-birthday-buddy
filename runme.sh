#!/usr/bin/env bash

babel src -d app

cp src/package.json app
cp src/event.json app
cp .env app

cd app
node-lambda run
