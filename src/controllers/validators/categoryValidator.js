const { body } = require('express-validator');

const validateCategory = [
  body("name")
    .trim()
    .notEmpty().withMessage("Name is required")
    .isLength({ min: 2, max: 40 }).withMessage("Name must have 2 to 40 characters")
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\-]+$/)
    .withMessage("Category name can only contain letters, spaces and hyphens")
];

module.exports = validateCategory;