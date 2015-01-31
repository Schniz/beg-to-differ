beg-to-differ.js ![Travis CI](https://travis-ci.org/Schniz/beg-to-differ.svg)
================

Simple string diff patches for your app.

Installing
----------

```bash
npm install --save beg-to-differ
```

Usage
-----

```bash
var differ = require('beg-to-differ');

var patch = differ.createPatch("from String", "to String");
var toString = differ.applyPatch("from String", patch);
```

Can be used in Neo4j relationships without `JSON.stringify`ing it (array of strings) for implementing a simple versioning system.

Testing
-------

```bash
npm test
```

Contributing
------------

- fork
- branch
- write tests
- code (don't break shit)
- commit & push
- pull request
- profit
