"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const shared_constants_1 = require("shared-constants");
// Validation middleware
const validate = (schema, property = "body") => {
    return (req, res, next) => {
        const { error } = schema.validate(req[property], { abortEarly: false });
        if (error) {
            const errorMessages = error.details.map((detail) => detail.message);
            shared_constants_1.logger.info("Validation error");
            res.status(400).json({ errors: errorMessages });
            return;
        }
        next();
    };
};
exports.validate = validate;
