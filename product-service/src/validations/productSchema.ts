import Joi from "joi";

// Product Schema with enhanced validation checks
export const productSchema = Joi.object({
  productName: Joi.string()
    .min(3)
    .max(100)
    .pattern(/^[A-Za-z0-9\s]+$/) // Accepts letters, numbers, and spaces
    .required()
    .messages({
      "string.base": "Product name should be a string.",
      "string.empty": "Product name cannot be empty.",
      "string.min": "Product name should have at least 3 characters.",
      "string.max": "Product name should not exceed 100 characters.",
      "string.pattern.base":
        "Product name can only contain letters, numbers, and spaces.",
      "any.required": "Product name is required.",
    }),

  price: Joi.number().positive().precision(2).required().messages({
    "number.base": "Price should be a number.",
    "number.positive": "Price should be a positive number.",
    "number.precision": "Price can have up to 2 decimal places.",
    "any.required": "Price is required.",
  }),

  category: Joi.string().min(3).max(50).required().messages({
    "string.base": "Category should be a string.",
    "string.empty": "Category cannot be empty.",
    "string.min": "Category should have at least 3 characters.",
    "string.max": "Category should not exceed 50 characters.",
    "any.required": "Category is required.",
  }),

  inStock: Joi.boolean().required().messages({
    "boolean.base": "InStock should be a boolean.",
    "any.required": "InStock is required.",
  }),

  description: Joi.string().max(500).optional().messages({
    "string.base": "Description should be a string.",
    "string.max": "Description should not exceed 500 characters.",
  }),
});
