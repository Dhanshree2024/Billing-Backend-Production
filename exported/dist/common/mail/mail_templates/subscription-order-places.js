"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderPlacedEmail = OrderPlacedEmail;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const components_1 = require("@react-email/components");
function OrderPlacedEmail({ companyName, customerName, planName, billingCycle, price, paymentStatus, orderDate, renewalDate, orderPlacedBy, mailReply, productName, orderType = "Placed", }) {
    return ((0, jsx_runtime_1.jsxs)(components_1.Html, { children: [(0, jsx_runtime_1.jsx)(components_1.Head, {}), (0, jsx_runtime_1.jsxs)(components_1.Preview, { children: ["\uD83E\uDDFE ", orderType, " Confirmation - ", companyName] }), (0, jsx_runtime_1.jsx)(components_1.Body, { style: styles.body, children: (0, jsx_runtime_1.jsxs)(components_1.Container, { style: styles.container, children: [(0, jsx_runtime_1.jsxs)(components_1.Section, { style: styles.header, children: [(0, jsx_runtime_1.jsx)(components_1.Text, { style: styles.companyName, children: companyName }), (0, jsx_runtime_1.jsx)(components_1.Hr, { style: styles.divider })] }), (0, jsx_runtime_1.jsxs)(components_1.Section, { style: styles.section, children: [(0, jsx_runtime_1.jsxs)(components_1.Text, { style: styles.greeting, children: ["Hello ", customerName, ", \uD83D\uDC4B"] }), (0, jsx_runtime_1.jsxs)(components_1.Text, { style: styles.message, children: ["Your order for ", (0, jsx_runtime_1.jsx)("strong", { children: productName }), " has been ", (0, jsx_runtime_1.jsx)("strong", { children: orderType.toLowerCase() }), " successfully by ", (0, jsx_runtime_1.jsx)("strong", { children: orderPlacedBy }), "."] }), (0, jsx_runtime_1.jsx)(components_1.Text, { style: styles.detailsHeader, children: "\uD83D\uDCE6 Order Details" }), (0, jsx_runtime_1.jsx)("table", { style: styles.table, children: (0, jsx_runtime_1.jsxs)("tbody", { children: [(0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("td", { style: styles.label, children: "Plan:" }), (0, jsx_runtime_1.jsx)("td", { children: planName })] }), (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("td", { style: styles.label, children: "Billing Cycle:" }), (0, jsx_runtime_1.jsx)("td", { children: billingCycle })] }), (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("td", { style: styles.label, children: "Price:" }), (0, jsx_runtime_1.jsx)("td", { children: price.toLocaleString() })] }), (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("td", { style: styles.label, children: "Payment Status:" }), (0, jsx_runtime_1.jsx)("td", { children: paymentStatus })] }), (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("td", { style: styles.label, children: "Order Date:" }), (0, jsx_runtime_1.jsx)("td", { children: orderDate })] }), (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("td", { style: styles.label, children: "Renewal Date:" }), (0, jsx_runtime_1.jsx)("td", { children: renewalDate })] })] }) })] }), (0, jsx_runtime_1.jsxs)(components_1.Section, { style: styles.footerSection, children: [(0, jsx_runtime_1.jsx)(components_1.Hr, { style: styles.divider }), (0, jsx_runtime_1.jsxs)(components_1.Text, { style: styles.footer, children: ["Thank you for choosing ", companyName, "! \uD83D\uDE80"] }), (0, jsx_runtime_1.jsxs)(components_1.Text, { style: styles.support, children: ["For any queries, reach us at ", (0, jsx_runtime_1.jsx)("a", { href: `mailto:${mailReply}`, children: mailReply })] }), (0, jsx_runtime_1.jsx)(components_1.Text, { style: styles.disclaimer, children: "This is an automated email. Please do not reply." })] })] }) })] }));
}
const styles = {
    body: {
        backgroundColor: "#f9f9f9",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
    },
    container: {
        maxWidth: "600px",
        margin: "auto",
        backgroundColor: "#ffffff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 6px 12px rgba(0,0,0,0.1), 0 -6px 12px rgba(0,0,0,0.1)",
    },
    header: { textAlign: "center", paddingBottom: "15px" },
    companyName: { fontSize: "22px", fontWeight: "bold", color: "#333" },
    divider: { borderTop: "1px solid #ddd", margin: "15px 0" },
    section: { textAlign: "left", padding: "10px 0" },
    greeting: { fontSize: "18px", fontWeight: "bold", color: "#444" },
    message: { fontSize: "16px", marginBottom: "15px", color: "#555" },
    detailsHeader: { fontSize: "16px", fontWeight: "bold", marginBottom: "10px", color: "#444" },
    table: { width: "100%", borderCollapse: "collapse", marginTop: "5px" },
    label: { fontWeight: "bold", padding: "5px 0", width: "35%", color: "#333", verticalAlign: "top" },
    footerSection: { textAlign: "center", marginTop: "25px" },
    footer: { fontSize: "16px", fontWeight: "bold", color: "#444" },
    support: { fontSize: "14px", color: "#666", marginBottom: "8px" },
    disclaimer: { fontSize: "12px", color: "#999", marginTop: "10px" },
};
