"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CorsMiddleware = void 0;
class CorsMiddleware {
    use(req, res, next) {
        console.log('send api key:', req.headers['x-api-key']);
        const allowedOrigins = (process.env.CORS_ORIGINS ?? '')
            .split(',')
            .map((o) => o.trim())
            .filter(Boolean);
        const origin = req.headers.origin;
        if (allowedOrigins.includes(origin)) {
            res.setHeader('Access-Control-Allow-Origin', origin);
        }
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-API-KEY');
        res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        if (req.method === 'OPTIONS') {
            res.status(204).end();
        }
        else {
            next();
        }
    }
}
exports.CorsMiddleware = CorsMiddleware;
