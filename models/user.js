const conn = require("../DB/db");
const AppError = require("../helpers/appError");
const bcrypt = require("bcrypt"); 

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
        "SELECT * FROM user WHERE email = ? ",
        [req.body.email],
        async function (err, data, fields) {
            if (err) return next(new AppError(err, 500));
           
            let user = data[0].password; 
            
            if (user) {
              // check user password with hashed password stored in the database
              const validPassword = await bcrypt.compare(req.body.password, user);
              if (validPassword) {
                res.status(200).json({ message: "Valid password" });
              } else {
                res.status(400).json({ error: "Invalid Password" });
              }
            } else {
              res.status(401).json({ error: "User does not exist" });
            }
            
           
        }
      );
      // $2b$10$jlJomfEcEwF9aWDvKKQ4Yej6utSX1ytS9ohMbrorWp5w2sXFUOX8W
    //  return "$2b$10$jlJomfEcEwF9aWDvKKQ4Yej6utSX1ytS9ohMbrorWp5w2sXFUOX8W";
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