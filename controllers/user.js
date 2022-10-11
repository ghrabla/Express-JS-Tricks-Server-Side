const AppError = require("../helpers/appError");
const model = require("../models/user")
const bcrypt = require("bcrypt"); 


exports.getAllusers = (req, res, next) => {
 model.getusers(req,res,next)
};

   
exports.sign_up = async (req, res, next) => {
    if (!req.body) return next(new AppError("No form data found", 404));
    const salt = await bcrypt.genSalt(10);
    let password = await bcrypt.hash(req.body.password, salt) ;
  const values = [
    req.body.fullname,
    req.body.email,
    password,
  ];
 model.createuser(values,res,next)
};

exports.login = async (req, res, next) => {
  if (!req.body) {
    return next(new AppError("No user found", 404));
  }
  model.checkuser(req, res, next) 
  // const user = await model.checkuser(req, res, next)
  
  // if (user) {
  //   // check user password with hashed password stored in the database
  //   const validPassword = await bcrypt.compare(req.body.password, user);
  //   if (validPassword) {
  //     res.status(200).json({ message: "Valid password" });
  //   } else {
  //     res.status(400).json({ error: "Invalid Password" });
  //   }
  // } else {
  //   res.status(401).json({ error: "User does not exist" });
  // }
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
