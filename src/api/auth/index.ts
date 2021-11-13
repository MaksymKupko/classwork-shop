import { Router } from "express";
import { UserEntity } from "../../db/entities/user.entity";
import { validationMiddleware } from "../../tools/validate-body.middleware";
import { registration, login } from "./post";
import { RegistrationRequest } from "./requests/registration.request";

const router = Router();

router.post("/registration", validationMiddleware(RegistrationRequest), registration);
router.post("/login", login);

export default router;
