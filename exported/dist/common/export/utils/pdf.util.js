"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePDF = generatePDF;
const pdfkit_1 = __importDefault(require("pdfkit"));
function generatePDF(columns, data) {
    return new Promise((resolve) => {
        const pageSize = columns.length > 8 ? 'A3' : 'A4';
        const doc = new pdfkit_1.default({
            size: pageSize,
            layout: 'landscape',
            margin: 20,
        });
        const buffers = [];
        doc.on('data', (chunk) => buffers.push(chunk));
        doc.on('end', () => {
            resolve(Buffer.concat(buffers));
        });
        const headerFontSize = columns.length > 10 ? 8 : 10;
        const bodyFontSize = columns.length > 10 ? 7 : 9;
        const rowHeight = columns.length > 10 ? 35 : 25;
        const availableWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;
        const columnWidth = availableWidth / columns.length;
        const startX = doc.page.margins.left;
        let currentY = 60;
        doc.font('Helvetica-Bold').fontSize(18).text('Report', {
            align: 'center',
        });
        currentY = 60;
        const drawHeader = () => {
            let x = startX;
            doc.font('Helvetica-Bold');
            doc.fontSize(headerFontSize);
            columns.forEach((column) => {
                doc.rect(x, currentY, columnWidth, rowHeight).stroke();
                doc.text(column.header, x + 3, currentY + 7, {
                    width: columnWidth - 6,
                    align: 'center',
                });
                x += columnWidth;
            });
            currentY += rowHeight;
        };
        drawHeader();
        doc.font('Helvetica');
        doc.fontSize(bodyFontSize);
        data.forEach((row) => {
            if (currentY + rowHeight > doc.page.height - 30) {
                doc.addPage({
                    size: pageSize,
                    layout: 'landscape',
                    margin: 20,
                });
                currentY = 20;
                drawHeader();
                doc.font('Helvetica');
                doc.fontSize(bodyFontSize);
            }
            let x = startX;
            columns.forEach((column) => {
                doc.rect(x, currentY, columnWidth, rowHeight).stroke();
                let value = row[column.key];
                if (value === undefined || value === null || value === '') {
                    value = '-';
                }
                if (typeof value === 'boolean') {
                    value = value ? 'Active' : 'Inactive';
                }
                doc.text(String(value), x + 3, currentY + 6, {
                    width: columnWidth - 6,
                    align: 'left',
                    ellipsis: true,
                });
                x += columnWidth;
            });
            currentY += rowHeight;
        });
        doc.end();
    });
}
