import { Router } from "express";
import { validationMiddleware } from "../../tools/validation.middleware";
import { login, registration } from "./post";
import { AuthRequest } from "./requests/auth.request";
import { RegistrationRequest } from "./requests/registration.request";

const router = Router();

router.post("/registration", validationMiddleware(RegistrationRequest), registration);
router.post("/login", validationMiddleware(AuthRequest), login);

export default router;
