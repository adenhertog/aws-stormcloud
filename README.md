[![Build Status](https://travis-ci.org/adenhertog/aws-stormcloud.svg?branch=master)](https://travis-ci.org/adenhertog/aws-stormcloud)

# aws-stormcloud

A continuous integration platform for managing AWS Cloudformation stacks in development teams.

# Install

Install the dependencies with npm:
```bash
npm install
```

# Commands

## start

Starts node.js and listens on [http://localhost:8080/](http://localhost:8080/).

```bash
npm start
```

## dev

Creates a new nodemon process and watches for changes. Site will launch on [http://localhost:8083/](http://localhost:8083/).

```bash
npm run dev
```

## lint

TS Lints the `/src` folder

```bash
npm run lint
```

## test

Runs mocha behavioural tests on `/src` folder

```bash
npm run test
```
