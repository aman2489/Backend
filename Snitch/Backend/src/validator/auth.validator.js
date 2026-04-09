import { body, validationResult } from "express-validator";


function validate(req, res, next){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    next();
}


export const registerUserValidator = [
  body("email").isEmail().withMessage("Please provide a valid email address."),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password mustbe atleast 6 charecters."),
  body("fullname")
    .notEmpty()
    .withMessage("Full name is required")
    .isLength({ min: 3 })
    .withMessage("Full name must be atleast 3 character or more."),
  body("contact").isMobilePhone().withMessage("Invalid phone number."),
  body("isSeller").isBoolean().withMessage("isSeller should be boolean value."),
  validate
];
