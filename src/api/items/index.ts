import { Router } from "express";
import { getItems } from "./get";
import { postItems } from "./post";
import { putItems } from "./put";
import { deleteItems } from "./delete";
import { patchItems } from "./patch";
import { authByRoleMiddleware } from "../auth/auth.middleware";
import { UserRoleEnum } from "../../enums/user-role.enum";
import { validationMiddleware } from "../../tools/validate-body.middleware";
import { PostItemRequest } from "./requests/post-item.request";

const router = Router();

router.get("/", getItems);
router.post("/", authByRoleMiddleware(UserRoleEnum.SELLER), validationMiddleware(PostItemRequest), postItems);
router.put("/", putItems);
router.delete("/", deleteItems);
router.patch("/:id", authByRoleMiddleware(UserRoleEnum.SELLER), patchItems);

export default router;
