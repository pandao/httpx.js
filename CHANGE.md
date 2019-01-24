# Change logs

## Table of Content

[TOC]

## v0.x

### v0.3.1

- Add: The `request()` method add new option `xhrFields : { withCredentials: false }` like jQuery;
- Add: The `request()` method add new option `sendBefore()`;
- Add: The `request()` and `exec()` method return XMLHttpRequest Or XDomainRequest Object;

### v0.3.0

- Add: The `request()` method add new option `debug`;
- Add: NPM scripts `npm run dev` and `npm run build`;
- Add: NPM Install & Using `browser-sync` and `opn` module;
- Add: NPM Install & Using `gulp-sourcemaps` of Gulp.js plugin;
- Add: Apache Virtual Hosts for cross domain request tests;
- Update: `/examples/`;
- Update: `get|post|put...` etc. methods add `options` parameter;
- Update: In Internet Explorer 9, Cross domain requests By `XDomainRequest`;

### v0.2.0

- Using `addEventListener()` register XHR event;
- Change `urlBuild()` to private function;

### v0.1.0

Basic support XMLHttpRequest Level 1.

Methods :

- GET
- POST
- PUT
- PATCH
- DELETE
- JSON
- JSONP
- getScript
