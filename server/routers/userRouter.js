import { Router } from "express";
const router = Router();
 import { getAllUsers, getUser, updateUser, deleteUser } from "../controllers/userController.js";
import { signup, login, logout } from "../controllers/authController.js";
import { protect } from "../controllers/authController.js";

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);

router.get("/checktoken", protect, (req, res) => {
  res.send({ message: "success" });
});

 router.get("/users", getAllUsers);
// router.get("/users/:id", getUser);
 router.patch("/users/:id", updateUser);
// router.delete("/users/:id", deleteUser);

export default router;
