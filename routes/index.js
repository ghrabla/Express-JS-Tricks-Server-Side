const express = require("express");
const controllers = require("../controllers/user");
const filescontroller = require("../controllers/filescontroller");
const router = express.Router();

router.route("/users").get(controllers.getAllusers).post(controllers.sign_up);
router.route("/login").post(controllers.login);
router.route("/upload").post(filescontroller.uploadfile);
router
 .route("/:id")
 .get(controllers.getuser)
 .put(controllers.updateuser)
 .delete(controllers.deleteuser);
module.exports = router;