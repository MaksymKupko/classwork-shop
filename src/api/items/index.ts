import { Router } from "express";
import { getItems } from "./get";
import { postItems } from "./post";
import { putItems } from "./put";
import { deleteItems } from "./delete";
import { patchItems } from "./patch";
import { authByRoleMiddleware } from "../auth/auth.middleware";
import { UserRoleEnum } from "../../enums/user-role.enum";

const router = Router();

router.get("/", getItems);
router.post("/", authByRoleMiddleware(UserRoleEnum.SELLER), postItems);
router.put("/", putItems);
router.delete("/", deleteItems);
router.patch("/:id", authByRoleMiddleware(UserRoleEnum.SELLER), patchItems);

export default router;
