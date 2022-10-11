const conn = require("../DB/db");
const AppError = require("../helpers/appError");

exports.createuser = (values,res, next) =>{
    conn.query(
        "INSERT INTO user (fullname, email, password) VALUES(?)",
        [values],
        function (err) {
          if (err) return next(new AppError(err, 500));
          res.status(201).json({
            status: 201,
            message: "User created successfully",
            // data: data,
          });
        }
      );
}

exports.getusers= (req,res,next) =>{
     conn.query("SELECT * FROM user", function (err, data, fields) {
    if (err) return next(new AppError(err));
    res.status(200).json({
      status: "success",
      length: data?.length,
      data: data,
    });
  });
}

exports.getoneuser = (req, res, next) => {
    conn.query(
        "SELECT * FROM user WHERE id = ?",
        [req.params.id],
        function (err, data, fields) {
          if (err) return next(new AppError(err, 500));
          res.status(200).json({
            status: "success",
            length: data?.length,
            data: data,
          });
        }
      );
}

exports.checkuser = (req, res, next) =>{
    conn.query(
        "SELECT * FROM user WHERE email = ? AND password = ?",
        [req.body.email, req.body.password],
        function (err, data, fields) {
          if (err) return next(new AppError(err, 500));
          if (data.length > 0) {
            res.status(200).json({
              status: "success",
              data: data,
            });
          } else {
            return next(new AppError("user does not exist please try again", 404));
          }
        }
      );
}

exports.updateuser = (req, res, next) =>{
    conn.query(
        "UPDATE user SET fullname = ?, email = ?, password = ? WHERE id = ?",
        [req.body.fullname,req.body.email,req.body.password,req.params.id],
        function (err) {
          if (err) return next(new AppError(err, 500));
          res.status(201).json({
            status: "success",
            message: "user updated!",
          });
        }
      );
}

exports.deleteuser = (req, res, next) => {
    conn.query(
        "DELETE FROM user WHERE id=?",
        [req.params.id],
        function (err, fields) {
          if (err) return next(new AppError(err, 500));
          res.status(201).json({
            status: "success",
            message: "user deleted!",
          });
        }
      );
}