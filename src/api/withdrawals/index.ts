import { Router } from "express";
import { CardEntity } from "../../db/entities/card.entity";
import { findItemByIdMiddleware } from "../../tools/find-item-by-id.middleware";
import { validationMiddleware } from "../../tools/validation.middleware";
import { patchWithdrawals } from "./patch";
import { PatchWithdrawalsRequest } from "./requests/patch-withdrawals";

const router = Router();

router.patch(
  "/:id",
  findItemByIdMiddleware(CardEntity),
  validationMiddleware(PatchWithdrawalsRequest),
  patchWithdrawals
);

export default router;
