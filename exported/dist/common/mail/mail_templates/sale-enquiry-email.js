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
exports.SalesEnquiryEmail = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const SalesEnquiryEmail = ({ name, email, phone, companyName, jobTitle, requirements, message, companySize, industry, budgetRange, timeline, convertToEnquiryUrl, companySizeLabel, industryLabel, budgetRangeLabel, timelineLabel, }) => ((0, jsx_runtime_1.jsxs)("div", { style: {
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f9f9f9",
        padding: "24px",
        borderRadius: "8px",
        color: "#333",
        lineHeight: 1.5,
    }, children: [(0, jsx_runtime_1.jsx)("h2", { style: { color: "#222", marginBottom: "12px" }, children: "\uD83D\uDCE9 New Sales Enquiry Received - Asset" }), (0, jsx_runtime_1.jsx)("p", { children: "Dear Sales Team," }), (0, jsx_runtime_1.jsx)("p", { children: "A new sales enquiry has been submitted through the Norbik Asset contact form. Please find the details below:" }), (0, jsx_runtime_1.jsx)("table", { style: {
                width: "100%",
                borderCollapse: "collapse",
                margin: "16px 0",
                fontSize: "14px",
            }, children: (0, jsx_runtime_1.jsxs)("tbody", { children: [(0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("td", { style: { fontWeight: "bold", padding: "6px 8px" }, children: "Name:" }), (0, jsx_runtime_1.jsx)("td", { style: { padding: "6px 8px" }, children: name || "-" }), (0, jsx_runtime_1.jsx)("td", { style: { fontWeight: "bold", padding: "6px 8px" }, children: "Email:" }), (0, jsx_runtime_1.jsx)("td", { style: { padding: "6px 8px" }, children: email || "-" }), (0, jsx_runtime_1.jsx)("td", { style: { fontWeight: "bold", padding: "6px 8px" }, children: "Phone:" }), (0, jsx_runtime_1.jsx)("td", { style: { padding: "6px 8px" }, children: phone || "-" })] }), (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("td", { style: { fontWeight: "bold", padding: "6px 8px" }, children: "Company:" }), (0, jsx_runtime_1.jsx)("td", { style: { padding: "6px 8px" }, children: companyName || "-" }), (0, jsx_runtime_1.jsx)("td", { style: { fontWeight: "bold", padding: "6px 8px" }, children: "Job Title:" }), (0, jsx_runtime_1.jsx)("td", { style: { padding: "6px 8px" }, children: jobTitle || "-" }), (0, jsx_runtime_1.jsx)("td", { style: { fontWeight: "bold", padding: "6px 8px" }, children: "Company Size:" }), (0, jsx_runtime_1.jsx)("td", { style: { padding: "6px 8px" }, children: companySizeLabel || "-" })] }), (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("td", { style: { fontWeight: "bold", padding: "6px 8px" }, children: "Industry:" }), (0, jsx_runtime_1.jsx)("td", { style: { padding: "6px 8px" }, children: industryLabel || "-" }), (0, jsx_runtime_1.jsx)("td", { style: { fontWeight: "bold", padding: "6px 8px" }, children: "Budget Range:" }), (0, jsx_runtime_1.jsx)("td", { style: { padding: "6px 8px" }, children: budgetRangeLabel || "-" }), (0, jsx_runtime_1.jsx)("td", { style: { fontWeight: "bold", padding: "6px 8px" }, children: "Timeline:" }), (0, jsx_runtime_1.jsx)("td", { style: { padding: "6px 8px" }, children: timelineLabel || "-" })] }), (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("td", { style: { fontWeight: "bold", padding: "6px 8px" }, children: "Requirements:" }), (0, jsx_runtime_1.jsx)("td", { colSpan: 5, style: { padding: "6px 8px" }, children: requirements || "-" })] }), (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("td", { style: { fontWeight: "bold", padding: "6px 8px" }, children: "Message:" }), (0, jsx_runtime_1.jsx)("td", { colSpan: 5, style: { padding: "6px 8px" }, children: message || "-" })] })] }) }), (0, jsx_runtime_1.jsx)("p", { children: "Please review the enquiry and take the appropriate action." }), (0, jsx_runtime_1.jsx)("div", { style: { marginTop: "16px" }, children: (0, jsx_runtime_1.jsx)("a", { href: convertToEnquiryUrl, target: "_blank", style: {
                    backgroundColor: "#007bff",
                    color: "#fff",
                    padding: "8px 16px",
                    borderRadius: "5px",
                    textDecoration: "none",
                    fontWeight: "bold",
                }, children: "Convert to Enquiry" }) }), (0, jsx_runtime_1.jsx)("hr", { style: { margin: "20px 0", border: "none", borderTop: "1px solid #ddd" } }), (0, jsx_runtime_1.jsxs)("p", { style: { fontSize: "12px", color: "#666" }, children: ["This email was automatically generated by the Norbik Sales Contact System.", (0, jsx_runtime_1.jsx)("br", {}), "For any assistance, please contact ", (0, jsx_runtime_1.jsx)("a", { href: "mailto:support@norbik.in", children: "support@norbik.in" }), "."] })] }));
exports.SalesEnquiryEmail = SalesEnquiryEmail;
