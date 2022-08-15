import { Router } from "express";

import { protect } from "../controllers/authController.js";
import { checkoutBooks, getAllBooks, returnBooks } from "../controllers/bookController.js";

const router = Router();

router.get("/books", protect, getAllBooks);

router.patch("/checkout/:id", protect, checkoutBooks);
router.patch("/return/:id", protect, returnBooks);

export default router;
