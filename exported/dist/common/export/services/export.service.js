"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportService = void 0;
const common_1 = require("@nestjs/common");
const csv_util_1 = require("../utils/csv.util");
const excel_util_1 = require("../utils/excel.util");
const pdf_util_1 = require("../utils/pdf.util");
let ExportService = class ExportService {
    async export(res, format, columns, data, fileName) {
        let buffer;
        let type = '';
        let extension = '';
        switch (format) {
            case 'excel':
                buffer = await (0, excel_util_1.generateExcel)(columns, data);
                type =
                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
                extension = 'xlsx';
                break;
            case 'csv':
                buffer = (0, csv_util_1.generateCSV)(columns, data);
                type = 'text/csv';
                extension = 'csv';
                break;
            case 'pdf':
                buffer = await (0, pdf_util_1.generatePDF)(columns, data);
                type = 'application/pdf';
                extension = 'pdf';
                break;
        }
        res.setHeader('Content-Type', type);
        res.setHeader('Content-Disposition', `attachment; filename=${fileName}.${extension}`);
        res.send(buffer);
    }
};
exports.ExportService = ExportService;
exports.ExportService = ExportService = __decorate([
    (0, common_1.Injectable)()
], ExportService);
