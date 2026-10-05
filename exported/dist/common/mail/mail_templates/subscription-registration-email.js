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
exports.OpenRegistrationEmail = OpenRegistrationEmail;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const components_1 = require("@react-email/components");
function OpenRegistrationEmail({ name, softwareName, planType, users, companyName, companyLogo, mailReply, }) {
    return ((0, jsx_runtime_1.jsxs)(components_1.Html, { children: [(0, jsx_runtime_1.jsx)(components_1.Head, {}), (0, jsx_runtime_1.jsxs)(components_1.Preview, { children: ["Thank you for your interest in ", softwareName] }), (0, jsx_runtime_1.jsx)(components_1.Body, { style: styles.body, children: (0, jsx_runtime_1.jsx)(components_1.Container, { style: styles.outerContainer, children: (0, jsx_runtime_1.jsxs)(components_1.Container, { style: styles.container, children: [(0, jsx_runtime_1.jsxs)(components_1.Section, { style: styles.header, children: [companyLogo && (0, jsx_runtime_1.jsx)(components_1.Img, { src: companyLogo, alt: `${companyName} Logo`, style: styles.logo }), (0, jsx_runtime_1.jsx)(components_1.Text, { style: styles.companyName, children: companyName }), (0, jsx_runtime_1.jsx)(components_1.Hr, { style: styles.divider })] }), (0, jsx_runtime_1.jsxs)(components_1.Section, { style: styles.section, children: [(0, jsx_runtime_1.jsxs)(components_1.Text, { style: styles.greeting, children: ["\uD83D\uDC4B Hi ", name, ","] }), (0, jsx_runtime_1.jsxs)(components_1.Text, { style: styles.text, children: ["Thank you for registering your interest in ", (0, jsx_runtime_1.jsx)("strong", { children: softwareName }), ". You have requested the ", (0, jsx_runtime_1.jsx)("strong", { children: planType }), " plan for ", (0, jsx_runtime_1.jsx)("strong", { children: users }), " users."] }), (0, jsx_runtime_1.jsx)(components_1.Text, { style: styles.text, children: "Our team will reach out shortly with a detailed proposal and guide you through the purchase process." })] }), (0, jsx_runtime_1.jsxs)(components_1.Section, { style: styles.footerSection, children: [(0, jsx_runtime_1.jsx)(components_1.Hr, { style: styles.divider }), (0, jsx_runtime_1.jsxs)(components_1.Text, { style: styles.support, children: ["For any questions, please contact us at ", (0, jsx_runtime_1.jsx)("a", { href: `mailto:${mailReply}`, children: mailReply })] }), (0, jsx_runtime_1.jsx)(components_1.Text, { style: styles.disclaimer, children: "This is an automated message. Please do not reply directly to this email." })] })] }) }) })] }));
}
const styles = {
    body: { backgroundColor: "#f9f9f9", fontFamily: "Arial, sans-serif", padding: "20px" },
    outerContainer: { display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", padding: "40px 0" },
    container: { maxWidth: "600px", backgroundColor: "#ffffff", padding: "40px 20px", borderRadius: "10px", boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)" },
    header: { textAlign: "center", paddingBottom: "15px" },
    logo: { width: "120px", height: "auto", marginBottom: "10px" },
    companyName: { fontSize: "22px", fontWeight: "bold", color: "#333" },
    divider: { borderTop: "1px solid #ddd", margin: "15px 0" },
    section: { textAlign: "center", padding: "20px 0" },
    greeting: { fontSize: "18px", fontWeight: "bold", marginBottom: "10px", color: "#444" },
    text: { fontSize: "14px", marginBottom: "8px", color: "#555", lineHeight: 1.6 },
    footerSection: { textAlign: "center", marginTop: "20px" },
    support: { fontSize: "14px", color: "#666", marginBottom: "8px" },
    disclaimer: { fontSize: "12px", color: "#999", marginTop: "10px" },
};
