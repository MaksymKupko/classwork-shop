import { Router } from "express";
import { UserEntity } from "../../db/entities/user.entity";
import { findItemByIdMiddleware } from "../../tools/find-item-by-id.middleware";
import { getUserAccount } from "./get";

const router = Router();

router.get("/:id", findItemByIdMiddleware(UserEntity), getUserAccount);

export default router;
