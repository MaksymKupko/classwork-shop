import { Router } from "express";
import { UserEntity } from "../../db/entities/user.entity";
import { validationMiddleware } from "../../tools/validate-body.middleware";
import { registration, login } from "./post";

const router = Router();
const userValidationMiddleware = validationMiddleware(UserEntity);

router.post("/registration", userValidationMiddleware, registration);
router.post("/login", login);

export default router;
