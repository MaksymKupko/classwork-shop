import { Router } from "express";
import { CardEntity } from "../../db/entities/card.entity";
import { findItemByIdMiddleware } from "../../tools/find-item-by-id.middleware";
import { validationMiddleware } from "../../tools/validation.middleware";
import { patchDeposits } from "./patch";
import { PatchDepositsRequest } from "./requests/patch-deposits.request";

const router = Router();

router.patch("/:id", validationMiddleware(PatchDepositsRequest), findItemByIdMiddleware(CardEntity), patchDeposits);

export default router;
