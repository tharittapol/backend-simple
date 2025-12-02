import { Router } from "express";
import { getMe, listUsers } from "../controllers/users.controller";
import { authJwt } from "../middleware/authJwt";

const router = Router();

router.get("/me", authJwt, getMe);
router.get("/", authJwt, listUsers);

export default router;