import { Router } from "express";
import { loginUser, registerUser ,getProfile,logoutUser} from "../controllers/user.controller.js";
const router = Router();

router.route("/").get((req, res) => {
  res.status(200).send("hello world");
});
router.route("/profile").get(getProfile);
router.route("/login").post(loginUser);
router.route("/register").post(registerUser);
router.route('/logout').get(logoutUser);

export default router;
