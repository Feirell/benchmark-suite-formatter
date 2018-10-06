'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function createTableLikeOutput(columnNames, rows) {
    const maxSizeColumns = columnNames.map(n => n.length);
    const columns = columnNames.length;

    for (let r = 0; r < rows.length; r++) {
        const row = rows[r];

        if (columns < row.length)
            throw new Error("row " + r + " has more columns than defined in columnNames");

        for (let c = 0; c < columns; c++)
            if (maxSizeColumns[c] < row[c].length)
                maxSizeColumns[c] = row[c].length;
    }

    let str = "";
    for (let c = 0; c < columns; c++) {
        str += columnNames[c].padStart(maxSizeColumns[c], ' ');

        if (c != columns - 1)
            str += " ";
    }

    str += '\n';

    for (let r = 0; r < rows.length; r++) {
        const row = rows[r];
        for (let c = 0; c < columns; c++) {
            str += row[c].padStart(maxSizeColumns[c], ' ');
            if (c != columns - 1)
                str += " ";
        }

        if (r != rows.length - 1)
            str += '\n';
    }

    return str;
}

const integerFormatter = Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0
});
const floatFormatter = Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2
});

function stringifySuite(suite) {
    return createTableLikeOutput(['name', 'ops/sec', 'variance', 'samples'], suite.map(
        benchmark => [
            '' + benchmark.name,
            '' + integerFormatter.format(benchmark.hz),
            '' + floatFormatter.format(benchmark.stats.rme),
            '' + integerFormatter.format(benchmark.stats.sample.length)
        ]
    ));
}

exports.stringifySuite = stringifySuite;
