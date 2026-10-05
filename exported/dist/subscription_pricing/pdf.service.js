"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfService = void 0;
const common_1 = require("@nestjs/common");
const pdfkit_1 = __importDefault(require("pdfkit"));
let PdfService = class PdfService {
    async generateOrderPdf(order) {
        return new Promise((resolve) => {
            const doc = new pdfkit_1.default({
                size: 'A4',
                margin: 50,
            });
            const buffers = [];
            doc.on('data', (chunk) => buffers.push(chunk));
            doc.on('end', () => {
                resolve(Buffer.concat(buffers));
            });
            const formatDate = (date) => date ? new Date(date).toLocaleDateString('en-IN') : '-';
            doc.fontSize(22).text('Order Details', {
                align: 'center',
            });
            doc.moveDown();
            doc.fontSize(12);
            doc.text(`Organization : ${order.billingInfo?.company_name ?? '-'}`);
            doc.text(`Product      : ${order.product?.name ?? '-'}`);
            doc.text(`Plan         : ${order.plan?.plan_name ?? '-'}`);
            doc.text(`Billing Cycle: ${order.plan_billing_id ?? '-'}`);
            doc.text(`Start Date   : ${formatDate(order.start_date)}`);
            doc.text(`End Date     : ${formatDate(order.renewal_date)}`);
            doc.moveDown();
            doc.text(`Plan Price   : ₹${order.price ?? 0}`);
            doc.text(`Discount     : ${order.percentage ?? 0}%`);
            doc.text(`Grand Total  : ₹${order.grand_total ?? 0}`);
            doc.moveDown();
            doc.text(`Payment Status : ${order.payment_status ?? '-'}`);
            doc.text(`Customer PO    : ${order.billingInfo?.customerpo ?? '-'}`);
            doc.text(`Order By       : ${order.billingInfo?.orderplacedby ?? '-'}`);
            doc.end();
        });
    }
};
exports.PdfService = PdfService;
exports.PdfService = PdfService = __decorate([
    (0, common_1.Injectable)()
], PdfService);
