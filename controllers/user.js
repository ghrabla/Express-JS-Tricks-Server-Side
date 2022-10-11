const AppError = require("../helpers/appError");
const model = require("../models/user")

exports.getAllusers = (req, res, next) => {
 model.getusers(req,res,next)
};

exports.sign_up = (req, res, next) => {
  if (!req.body) return next(new AppError("No form data found", 404));
  const values = [
    req.body.fullname,
    req.body.email,
    req.body.password,
  ];
 model.createuser(values,res,next)
};

exports.login = (req, res, next) => {
  if (!req.body) {
    return next(new AppError("No user found", 404));
  }
 model.checkuser(req, res, next)
};

exports.getuser = (req, res, next) => {
  if (!req.params.id) {
    return next(new AppError("No user id found", 404));
  }
 model.getoneuser(req,res,next);
};

exports.updateuser = (req, res, next) => {
  if (!req.params.id) {
    return next(new AppError("No user id found", 404));
  }
  else if(!req.body) return next(new AppError("No form data found", 404));
 
  model.updateuser(req, res, next)
  
};

exports.deleteuser = (req, res, next) => {
  if (!req.params.id) {
    return next(new AppError("No user id found", 404));
  }
  model.deleteuser(req, res, next)
  
};
