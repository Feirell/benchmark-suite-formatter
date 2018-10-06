# Benchmark Suite Formatter

This packge can be used to format the state / result of a suite from the [benchmark](https://www.npmjs.com/package/benchmark) package.

Example output:

```text
copy an array
                  name   ops/sec variance samples
          array splice 8,064,372     0.74      94
json stringify + parse 1,459,270      0.4      93
```

```js
const RFormatter = require("benchmark-suite-formatter");
const Benchmark = require('benchmark');

function printStatus(suite) {
    console.clear();
    console.log('copy an array\n\n'+ RFormatter.stringifySuite(suite));
}

const someArray = new Array(100);

const suite = new Benchmark.Suite;

suite.add("array splice", function(){
    someArray.splice(0);
});

suite.add("json stringify + parse", function(){
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