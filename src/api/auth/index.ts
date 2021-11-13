import { Router } from "express";
import { validationMiddleware } from "../../tools/validation.middleware";
import { login, registration } from "./post";
import { RegistrationRequest } from "./requests/registration.request";

const router = Router();

router.post("/registration", validationMiddleware(RegistrationRequest), registration);
router.post("/login", login);

export default router;
