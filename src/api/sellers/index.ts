import { Router } from "express";
import { getItems } from "./get";
import { postItems } from "./post";
import { patchItems } from "./patch";
import { authByRoleMiddleware } from "../auth/auth.middleware";
import { UserRoleEnum } from "../../enums/user-role.enum";
import { validationMiddleware } from "../../tools/validation.middleware";
import { PostItemRequest } from "./requests/post-item.request";

const router = Router();

router.get("/items", authByRoleMiddleware(UserRoleEnum.SELLER), getItems);
router.post("/items", authByRoleMiddleware(UserRoleEnum.SELLER), validationMiddleware(PostItemRequest), postItems);
router.patch("/items/:id", authByRoleMiddleware(UserRoleEnum.SELLER), patchItems);

export default router;
