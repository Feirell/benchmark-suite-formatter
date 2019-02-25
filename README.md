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

## API

### `stringifySuite(suite: Suite, addName = true, addRelativ = true): string`

This function provides you an easy to use way to stringify a Suite of the [benchmark](https://www.npmjs.com/package/benchmark) package. It will return an string as the one shown above in the example. The tablelike output will have 4 or 5 columns depending on the third parameter. The second parameter gives you the option to hide the name of the suite.

The colums:

- [`name`](https://benchmarkjs.com/docs#options_name) The name of the benchmark.
- [`ops/sec`](https://benchmarkjs.com/docs#prototype_hz) the number of executions per second.
- [`MoE`](https://benchmarkjs.com/docs#stats_rme) the relative margin of error (expressed as a percentage of the mean).
- [`samples`](https://benchmarkjs.com/docs#stats_sample) The number of sampled periods.
- [`relativ`] The relativ `ops/sec` to the slowest benchmark (2 => two times faster, 1 => as fast as the slowest).