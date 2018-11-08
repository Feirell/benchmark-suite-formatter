# Benchmark Suite Formatter

[![npm](https://img.shields.io/npm/v/benchmark-suite-formatter.svg)](https://www.npmjs.com/package/benchmark-suite-formatter)
[![GitHub issues](https://img.shields.io/github/issues/Feirell/benchmark-suite-formatter.svg)](https://github.com/Feirell/benchmark-suite-formatter/issues)

This packge can be used to format the state / result of a suite from the [benchmark](https://www.npmjs.com/package/benchmark) package.

Example output:

```text
copy an array

                  name   ops/sec     MoE samples
          array splice 8,179,662 ± 0.65%      93
json stringify + parse 1,377,104  ± 0.7%      91
```

```js
const RFormatter = require('benchmark-suite-formatter');
const Benchmark = require('benchmark');

function printStatus(suite) {
    console.clear();
    console.log('copy an array\n\n' + RFormatter.stringifySuite(suite));
}

const someArray = new Array(100);

const suite = new Benchmark.Suite;

suite.add("array splice", function () {
    someArray.slice(0);
});

suite.add("json stringify + parse", function () {
    JSON.parse(JSON.stringify(someArray));
});

suite.on('cycle', function (event) {
    printStatus(suite);
});

// not needed because the last test will emit the cycle event aswell
// suite.on('complete', function () {
//     printStatus(suite);
// });

suite.run({
    'async': true
});

// do it once to print the table
printStatus(suite);
```