import { body, validationResult } from "express-validator";

const passwordCheck = (value) => {
    if(value.length < 6){
        throw new Error("Password should have atleast 6 characters");
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if(!passwordRegex.test(value)){
        throw new Error("Password should contain at least one uppercase letter, one number, and one special character");
    }
    return true;
  }

  
const validate = (req, res, next) => {
            const errors = validationResult(req)

            if(errors.isEmpty()){
                return next();
            }

            return res.status(400).json({
                errors: errors.array()
            })
        }

export const registerValidation = [
  body("username").isString().withMessage("Username should be string"),
  body("email").isEmail().withMessage("Email should be valid email address"),
  body("password").custom(passwordCheck).withMessage("Password should have atleast 6 characters and contain at least one uppercase letter, one number, and one special character"),
//   body("password").trim().isLength({min:6}).withMessage("Password should have atleast 6 characters"),
//   body("userid").isMongoId() // checks if it is in the right format of a mongo id
  validate
];
