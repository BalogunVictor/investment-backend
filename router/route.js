import { Router } from "express";
const router = Router();

/** import all controllers */
import * as controller from "../controllers/appController.js";
import Auth, { localVariables } from "../middleware/auth.js";
import { registerMail } from "../controllers/mailer.js";

/** POST Method */
router.route("/register").post(controller.register); //register user
router.route("/registerMail").post(registerMail); // send the email
router
  .route("/authenticate")
  .post(controller.verifyUser, (req, res) => res.end()); //authenticate user
router.route("/login").post(controller.verifyUser, controller.login); //login in app

/** GET Method */
router.route("/user/:email").get(controller.getUser); //user with username
router.route("/").get(controller.getAllUser); //all user
router.route("/login").post(controller.verifyUser, controller.login); //login in app
router
  .route("/generateOTP")
  .get(controller.verifyUser, localVariables, controller.generateOTP); //generate random OTP
router.route("/verifyOTP").get(controller.verifyOTP); //verify generated OTP
router.route("/createResetSession").get(controller.createResetSession); // reset all the variables

/** PUT Method */
router.route("/updateuser").put(controller.updateUser); //is use to update the user
router.route("/transaction").post(controller.saveTransaction); //is use to update the user Transaction
router
  .route("/resetPassword")
  .put(controller.verifyUser, controller.resetPassword); // use to reset the password

export default router;
