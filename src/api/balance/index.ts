import { Router } from "express";
import { CardEntity } from "../../db/entities/card.entity";
import { findItemByIdMiddleware } from "../../tools/find-item-by-id.middleware";
import { validationMiddleware } from "../../tools/validation.middleware";
import { patchDeposits } from "./patchDeposits";
import { patchWithdrawals } from "./patchWithdrawals";
import { BalanceRequest } from "./requests/balance.request";

const router = Router();

router.patch(
  "/withdrawals/:id",
  validationMiddleware(BalanceRequest),
  findItemByIdMiddleware(CardEntity),
  patchWithdrawals
);
router.patch("/deposits/:id", validationMiddleware(BalanceRequest), findItemByIdMiddleware(CardEntity), patchDeposits);

export default router;
