"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const logger_1 = require("./utils/logger");
const PORT = process.env.PORT || 3001;
const PROTOCOL = process.env.PROTOCOL || "http://localhost";
app_1.default.listen(PORT, () => {
    logger_1.logger.info(`===============================================`);
    logger_1.logger.info(`User-Service Server is running on port ${PORT}`);
    logger_1.logger.info(`${PROTOCOL}:${PORT}/api/users`);
});
