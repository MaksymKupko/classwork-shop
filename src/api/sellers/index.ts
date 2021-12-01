import { Router } from "express";
import { getItemById, getItems } from "./get";
import { postItems } from "./post";
import { patchItems } from "./patch";
import { authByRoleMiddleware } from "../auth/auth.middleware";
import { UserRoleEnum } from "../../enums/user-role.enum";
import { validationMiddleware } from "../../tools/validation.middleware";
import { PostItemRequest } from "./requests/post-item.request";
import { findItemByIdMiddleware } from "../../tools/find-item-by-id.middleware";
import { ItemEntity } from "../../db/entities/item.entity";

const router = Router();

router.get("/items", authByRoleMiddleware(UserRoleEnum.SELLER), getItems);
router.get("/items/:id", authByRoleMiddleware(UserRoleEnum.SELLER), findItemByIdMiddleware(ItemEntity), getItemById);
router.post("/items", authByRoleMiddleware(UserRoleEnum.SELLER), validationMiddleware(PostItemRequest), postItems);
router.patch("/items/:id", authByRoleMiddleware(UserRoleEnum.SELLER), findItemByIdMiddleware(ItemEntity), patchItems);

export default router;
