import { Router } from "express";
import { registration, login } from "./post";

const router = Router();

router.post("/registration", registration);
router.post("/login", login);

export default router;
