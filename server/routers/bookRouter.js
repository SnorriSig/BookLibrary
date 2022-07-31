import { Router } from "express";
const router = Router();

import { getAllBooks } from "../controllers/bookController.js";

router.get("/books", getAllBooks);

export default router;
