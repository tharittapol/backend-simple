import { Router } from "express";
import { listMyTasks, createMyTask } from "../controllers/tasks.controller";
import { authJwt } from "../middleware/authJwt";

const router = Router();

router.get("/", authJwt, listMyTasks);
router.post("/", authJwt, createMyTask);

export default router;