import { body, check, validationResult, param } from "express-validator";
import { validationErrorCreation } from "../../utils/helper.js";
import { unlinkFile } from "../../utils/file.upload.js";
import TopicService from "../../services/web/topic.service.js";

export const add_post_validation = [
  body("title")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Invalid Title")
    .isLength({ min: 3, max: 50 })
    .withMessage("Title length should be min 3 and max 50"),
  body("content")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Invalid content")
    .isLength({ min: 3, max: 5000 })
    .withMessage("Content length should be min 3 and max 5000"),
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
    body("groupid")
    .if((value) => value !== "")
      .optional()
      .notEmpty(),
       
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

export const add_comment_validation = [
  body("content")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Invalid content")
    .isLength({ min: 1, max: 5000 })
    .withMessage("Content length should be min 3 and max 5000"),


  (req, res, next) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {      
      return validationErrorCreation(res, errors, next);
    }
    next();
  },
];