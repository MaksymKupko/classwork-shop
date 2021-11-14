import { Router } from "express";
import { CardEntity } from "../../db/entities/card.entity";
import { findItemByIdMiddleware } from "../../tools/find-item-by-id.middleware";
import { validationMiddleware } from "../../tools/validation.middleware";
import { patchWithdrawals } from "./patch";
import { PatchWithdrawalsRequest } from "./requests/patch-withdrawals.request";

const router = Router();

router.patch(
  "/:id",
  validationMiddleware(PatchWithdrawalsRequest),
  findItemByIdMiddleware(CardEntity),
  patchWithdrawals
);

export default router;
