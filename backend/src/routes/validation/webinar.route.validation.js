import { body, check, validationResult, param } from "express-validator";
import { validationErrorCreation } from "../../utils/helper.js";
import { unlinkFile } from "../../utils/file.upload.js";
import TopicService from "../../services/web/topic.service.js";

  const currentDate = new Date();
  const maxDate = new Date();
  maxDate.setMonth(currentDate.getMonth() + 6);
export const add_webinar_validation = [
  body("title")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Invalid Title")
    .isLength({ min: 3, max: 50 })
    .withMessage("Title length should be min 3 and max 50"),
  body("about")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Invalid about")
    .isLength({ min: 3, max: 5000 })
    .withMessage("About length should be min 3 and max 5000"),
  body("type")
    .trim()
    .not()
    .isEmpty()
    .isLength({ min: 7, max: 7 })
    .withMessage("Invalid type"),
  body('price')
    .notEmpty().withMessage('Price is required')
    .isNumeric().withMessage('Price must be a number')
    .isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body("day")
    .notEmpty()
    .isInt({ min: 1, max: 31 })
    .withMessage("Invalid Day"),
  body("month")
    .notEmpty()
    .isInt({ min: 1, max: 12 })
    .withMessage("Invalid Month"),
  body("year")
    .notEmpty()
    .withMessage("Invalid Year")
    .custom((value, { req }) => {
      const selectedDay = parseInt(req.body.day, 10);
      const selectedMonth = parseInt(req.body.month, 10);
      const selectedYear = parseInt(value, 10);
      const selectedDate = new Date(selectedYear, selectedMonth - 1, selectedDay);
      const minDate = new Date(Date.now() + 24 * 60 * 60 * 1000).setHours(0, 0, 0, 0);
      const maxDate = new Date();
      maxDate.setMonth(maxDate.getMonth() + 6);
      maxDate.setHours(0, 0, 0, 0);
      if (selectedDate < minDate || selectedDate > maxDate) {
        throw new Error("Invalid Date");
      }
      return true;
    }),
    
  body("tags")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Invalid Tags")
    .bail()
    .custom(async (value) => {
      try {
        const tags = value.split(",");
        if (tags.length > 0) {
          const resp = await TopicService.findAllByIds(tags);
          if (resp.length !== tags.length) {
            throw new Error("Invalid Tags");
          }
        }
        return true;
      } catch (e) {
        throw new Error("Invalid Tags");
      }
    }),

  (req, res, next) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Delete Uploaded File Before Sending Errors
      if(req.body.coverImage && typeof req.body.coverImage === 'string')
       unlinkFile(req.body.coverImage, res, next);

      return validationErrorCreation(res, errors, next);
    }
    next();
  },
];
