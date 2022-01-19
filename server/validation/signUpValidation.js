module.exports = {
  signUpVal: (req) => {
    req
      .checkBody("firstName", "Firstname should not be empty")
      .trim()
      .notEmpty();
    req.checkBody("lastName", "Lastname should not be empty").trim().notEmpty();
    req
      .checkBody("pass", "password must not be empty / minimum 8 characters")
      .trim()
      .notEmpty()
      .isLength({ min: 8 });
    req
      .checkBody("pass", "password does not match")
      .notEmpty()
      .equals(req.body.cPass);
    req
      .checkBody("mailAdd")
      .isEmail()
      .withMessage("Email should be in the format aaa@gmail.com")
      .trim()
      .normalizeEmail();
      
    let parseErrors = req.validationErrors();
    let getErrors = {};
    parseErrors
      ? parseErrors.forEach((element) => {
          getErrors[element.param] = element.msg;
        })
      : "";

    return getErrors;
  },
};
