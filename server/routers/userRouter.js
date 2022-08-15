import { Router } from "express";
import { getAllUsers, updateUser, getUser, } from "../controllers/userController.js";
import { signup, login, logout } from "../controllers/authController.js";
import { protect } from "../controllers/authController.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);

router.get("/checktoken", protect, (req, res) => {
  res.send({
    data: {
      user: req.user,
    },
  });
});

router.get("/users", getAllUsers, protect);
router.get("/users/:id", getUser, protect);
router.patch("/users/:id", updateUser, protect);
// router.delete("/users/:id", deleteUser);

export default router;
