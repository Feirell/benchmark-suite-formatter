function createTableLikeOutput(columnNames: string[], rows: string[][]): string {
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

function formatNumber(type: string, number: number) {
    if (number == 0)
        return '';

    if (type == 'float')
        return floatFormatter.format(number);

    if (type == 'integer')
        return integerFormatter.format(number);
}

/**
 * Converts a given `Suite` of the [benchmark](https://www.npmjs.com/package/benchmark) package into a table.
 * 
 * @param suite 
 */
function stringifySuite(suite: any): string {
    return createTableLikeOutput(['name', 'ops/sec', 'margin of error', 'samples'], suite.map(
        (benchmark: any) => [
            '' + benchmark.name,
            '' + formatNumber('integer', benchmark.hz),
            '±' + formatNumber('float', benchmark.stats.rme) + '%',
            '' + formatNumber('integer', benchmark.stats.sample.length)
        ]
    ));
}

export {
    stringifySuite
};