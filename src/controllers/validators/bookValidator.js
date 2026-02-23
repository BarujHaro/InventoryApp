const { body } = require('express-validator');

const validateBook = [
  body("title")
    .trim()
    .notEmpty().withMessage("Title is required")
    .isLength({ min: 2, max: 200 }).withMessage("Title must have 2 to 200 characters")
    .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s\-':,.!?()]+$/).withMessage("The title can only contain letters, spaces, and basic characters."),

  body("author")
    .trim()
    .notEmpty().withMessage("Author is required")
    .isLength({ min: 2, max: 100 }).withMessage("Author must have 2 to 100 characters")
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\-'.]+$/).withMessage("The author can only contain periods, dashes and apostrophes"),

  body("year")
    .trim()
    .notEmpty().withMessage("Year is required")
    .isInt({ min: 1000, max: new Date().getFullYear() + 1 })
    .withMessage(`The year must be between 1000 and ${new Date().getFullYear() + 1}`)
    .toInt(),

  body("isbn")
    .trim()
    .optional({ checkFalsy: true })
    .custom((value) => {
      const isbnClean = value.replace(/[-\s]/g, '');
      const isbn10Regex = /^\d{9}[\dX]$/;
      const isbn13Regex = /^\d{13}$/;
      if (!isbn10Regex.test(isbnClean) && !isbn13Regex.test(isbnClean)) {
        throw new Error(`ISBN invalid. Must be 10 or 13 digits`);
      }
      return true;
    }),

  body("category_id")
    .trim()
    .notEmpty().withMessage("Category is required")
    .isInt({ min: 1 }).withMessage("Category invalid")
    .toInt(),

  body("description")
    .trim()
    .optional({ checkFalsy: true })
    .isLength({ max: 1000 }).withMessage("Description must be no longer than 1000 characters")
    .escape()
];

module.exports = validateBook;