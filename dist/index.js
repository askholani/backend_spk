"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const alternatif_1 = __importDefault(require("./api/routes/alternatif"));
const kriteria_1 = __importDefault(require("./api/routes/kriteria"));
const rentangSkort_1 = __importDefault(require("./api/routes/rentangSkort"));
const cors_1 = __importDefault(require("cors"));
const result_1 = __importDefault(require("./api/routes/result"));
const matrix_1 = __importDefault(require("./api/routes/matrix"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json());
const corsOptions = {
    origin: [
        'http://localhost:3000',
        'http://127.0.0.1:5500',
        'http://127.0.0.1:5501',
        'http://127.0.0.1:3000',
    ],
    optionsSuccessStatus: 200,
};
app.use((0, cors_1.default)(corsOptions));
app.use('/api/alternatif', alternatif_1.default);
app.use('/api/kriteria', kriteria_1.default);
app.use('/api/rentang', rentangSkort_1.default);
app.use('/api/matrix', matrix_1.default);
app.use('/api/result', result_1.default);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
// export default app
// export default (req: Request, res: Response) => {
//   return app(req, res)
// }
