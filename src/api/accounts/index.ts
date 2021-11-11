import { Router } from "express";
import { getUserAccount } from "./get";
import { postAccounts } from "./post";
import { putAccounts } from "./put";
import { deleteAccounts } from "./delete";
import { patchAccounts } from "./patch";
import { findItemByIdMiddleware } from "../../tools/find-item-by-id.middleware";
import { UserEntity } from "../../db/entities/user.entity";

const router = Router();

router.get("/:id", findItemByIdMiddleware(UserEntity), getUserAccount);
router.post("/", postAccounts);
router.put("/", putAccounts);
router.delete("/", deleteAccounts);
router.patch("/", patchAccounts);

export default router;
