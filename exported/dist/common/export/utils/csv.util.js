"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCSV = generateCSV;
const json2csv_1 = require("json2csv");
function generateCSV(columns, data) {
    const parser = new json2csv_1.Parser({
        fields: columns.map((c) => ({
            label: c.header,
            value: c.key,
        })),
    });
    return Buffer.from(parser.parse(data));
}
