import { body, check, validationResult, param } from "express-validator";
import { validationErrorCreation } from "../../utils/helper.js";
import TopicService from "../../services/web/topic.service.js";
import { USER_TYPE } from "../../utils/constants/user.js";
import { unlinkFile } from "../../utils/file.upload.js";

export const register_validation = [
  body("first_name")
    .trim()
    .if((value, { req }) => req.body.type !== USER_TYPE.business)
    .not()
    .isEmpty()
    .isLength({ min: 3, max: 20 })
    .withMessage("Invalid First name"),
  body("last_name")
    .trim()
    .if((value, { req }) => req.body.type !== USER_TYPE.business)
    .not()
    .isEmpty()    
    .isLength({ min: 3, max: 20 })
    .withMessage("Invalid Last name"),
  body("business_name")
    .trim()
    .if((value, { req }) => req.body.type !== USER_TYPE.personal)
    .not()
    .isEmpty()    
    .isLength({ min: 3, max: 20 })
    .withMessage("Invalid Business name"),
  body("business_type")
    .trim()
    .if((value, { req }) => req.body.type !== USER_TYPE.personal)
    .not()
    .isEmpty()    
    .isLength({ min: 3, max: 20 })
    .withMessage("Invalid Business Type"),

  body("username")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Invalid Username")
    .isLength({ min: 3, max: 25 })
    .matches(/^[A-Za-z0-9_]+$/)
    .withMessage("Username must be between 3 and 25 characters"),
  body("email")
    .not()
    .isEmpty()
    .withMessage("Invalid Email")
    .isEmail()
    .withMessage("Please enter a valid email.")
    .normalizeEmail(),

  (req, res, next) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return validationErrorCreation(res, errors, next);
    }
    next();
  },
];

export const sign_in_validation = [
  body("email")
    .not()
    .isEmpty()
    .withMessage("Invalid Email")
    .isEmail()
    .withMessage("Please enter a valid email.")
    .normalizeEmail(),
  body("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Invalid Password")
    .isLength({ min: 6 })
    .withMessage("Password is too short"),

  (req, res, next) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return validationErrorCreation(res, errors, next);
    }
    next();
  },
];

export const verify_otp_validation = [
  body("otp").trim().not().isEmpty().withMessage("Invalid empty otp code"),
  body("otp")
    .isString()
    .isLength({ min: 6, max: 6 })
    .withMessage("Otp length must be 6 characters"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return validationErrorCreation(res, errors, next);
    }
    next();
  },
];

export const create_password_validation = [
  body("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Invalid Password")
    .isLength({ min: 6 })
    .withMessage("Password is too short"),
  body("confirm_password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Invalid Confirm Password")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("The passwords do not match"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return validationErrorCreation(res, errors, next);
    }
    next();
  },
];

export const complete_profile_validation = [
  body("day")
    .if((value) => value !== "")
    .optional()
    .notEmpty()
    .isInt({ min: 1, max: 31 })
    .withMessage("Invalid Date of Birth"),
  body("month")
    .if((value) => value !== "")
    .optional()
    .notEmpty()
    .isInt({ min: 1, max: 12 })
    .withMessage("Invalid Date of Birth"),
  body("year")
    .if((value) => value !== "")
    .optional()
    .notEmpty()
    .isInt({ min: 1900, max: new Date().getFullYear() - 18 })
    .withMessage("Invalid Date of Birth"),
  body("gender")
    .if((value) => value !== "")
    .optional()
    .notEmpty()
    .isString()
    .isLength({ min: 4, max: 6 })
    .withMessage("Invalid Gender"),
  body("occupation")
    .if((value) => value !== "")
    .optional()
    .notEmpty()
    .isString()
    .isLength({ min: 3, max: 30 })
    .withMessage("Occupation should be min 3 and max 30 char long"),
  body("business_address")
    .if((value) => value !== "")
    .optional()
    .notEmpty()
    .isString()
    .isLength({ min: 3, max: 30 })
    .withMessage("Address should be min 10 and max 50 char long"),
  body("phoneNumber")
    .if((value) => value !== "")
    .optional()
    .notEmpty()
    .isString()
    .isLength({ min: 10, max: 13 })
    .withMessage("Phone should be min 10 and max 13 char long")
    .matches(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i),
  body("about")
    .if((value) => value !== "")
    .optional()
    .notEmpty()
    .isString()
    .isLength({ min: 3, max: 220 })
    .withMessage("About should be min 3 and max 220 char long"),
  body("interests")
    .if((value) => value !== "")
    .optional()
    .notEmpty()
    .bail()
    .custom(async (value) => {
      try {
        const topics = value.split(",");
        if (topics.length > 0) {
          const resp = await TopicService.findAllByIds(topics);
          if (resp.length !== topics.length) {
            throw new Error("Invalid Topics");
          }
        }
        return true;
      } catch (e) {
        throw new Error("Invalid Topics");
      }
    }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Delete Uploaded File Before Sending Errors
      if(req.body.profileImage && typeof req.body.profileImage === 'string')
       unlinkFile(req.body.profileImage, res, next);

      if(req.body.image1 && typeof req.body.image1 === 'string')
        unlinkFile(req.body.image1, res, next);
      
      if(req.body.image2 && typeof req.body.image2 === 'string')
        unlinkFile(req.body.image2, res, next);
      
      if(req.body.image3 && typeof req.body.image3 === 'string')
        unlinkFile(req.body.image3, res, next);
      
      return validationErrorCreation(res, errors, next);
    }
    next();
  },
];
export const recover_password_validation = [
  body("email")
    .not()
    .isEmpty()
    .withMessage("Invalid email")
    .isEmail()
    .withMessage("Please enter a valid email.")
    .normalizeEmail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return validationErrorCreation(res, errors, next);
    }
    next();
  },
];
