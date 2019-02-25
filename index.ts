const columnLength = (arr: any[][]): number => {
    const columlength = arr[0].length;
    for (let row of arr)
        if (row.length != columlength)
            return -1;

    return columlength;
}

function formatTableLike(rows: string[][]): string {
    const columnCount = columnLength(rows);

    if (columnCount == -1)
        throw new RangeError('rows needs to be a uniform 2d array');

    const maxSizeColum = new Array(columnCount).fill(0);

    for (let row of rows)
        for (let i = 0; i < columnCount; i++)
            if (row[i].length > maxSizeColum[i])
                maxSizeColum[i] = row[i].length;

    const stringRows = rows.map(row =>
        row.map((item, index) =>
            item.padStart(maxSizeColum[index], ' ')
        ).join(' ')
    ).join('\n');

    return stringRows;
}

const integerFormatter = Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0
});

const floatFormatter = Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2
});

const formatFloat = floatFormatter.format;
const formatInteger = integerFormatter.format;

const formatPercentage = (n: number) => formatFloat(n) + '%';
const formatMoE = (n: number) => '± ' + formatPercentage(n);

const formatNone = (val: any) => '' + val;

const formatFunctions: ((v: any) => string)[] = [formatNone, formatInteger, formatMoE, formatInteger, formatFloat];

/**
 * Converts a given `Suite` of the [benchmark](https://www.npmjs.com/package/benchmark) package into a table.
 * 
 * @param suite 
 */
function stringifySuite(suite: any, addName = true, addRelativ = true): string {
    const raw: [string, number, number, number, number][] = suite.map(
        (benchmark: any) => [
            benchmark.name,
            benchmark.hz,
            benchmark.stats.rme,
            benchmark.stats.sample.length
        ]
    );

    let min: number;
    if (addRelativ)
        min = raw.reduce((p, v) => v[1] < p ? v[1] : p, raw[0][1]);

    const formattedRows = raw.map(data => {
        if (addRelativ)
            data[4] = min == 0 ? 0 : data[1] / min;

        return data.map((r, i) => r == 0 ? '' : formatFunctions[i](r));
    })

    const columnnames = ['name', 'ops/sec', 'MoE', 'samples'];
    if (addRelativ) columnnames[4] = "relativ";

    return (addName ? (suite.name || "<unnamed suite>") + '\n' : '') + formatTableLike([columnnames].concat(formattedRows));
}

export {
    stringifySuite
};