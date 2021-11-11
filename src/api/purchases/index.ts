import { Router } from "express";
import { PurchaseEntity } from "../../db/entities/purchase.entity";
import { UserRoleEnum } from "../../enums/user-role.enum";
import { findItemByIdMiddleware } from "../../tools/find-item-by-id.middleware";
import { validationMiddleware } from "../../tools/validate-body.middleware";
import { authByRoleMiddleware } from "../auth/auth.middleware";
import { deletePurchases } from "./delete";
import { getPurchaseById, getPurchases } from "./get";
import { patchPurchases } from "./patch";
import { postPurchases } from "./post";
import { putPurchases } from "./put";
import { PatchPurchaseRequest } from "./requests/patch-purchase.request";

const router = Router();
const findPurchaseByIdMiddleware = findItemByIdMiddleware(PurchaseEntity);

router.get("/", authByRoleMiddleware(UserRoleEnum.CUSTOMER), getPurchases);
router.get("/:id", authByRoleMiddleware(UserRoleEnum.CUSTOMER), findPurchaseByIdMiddleware, getPurchaseById);
router.post("/", authByRoleMiddleware(UserRoleEnum.CUSTOMER), postPurchases);
router.put("/", putPurchases);
router.delete("/", deletePurchases);
router.patch(
  "/:id",
  authByRoleMiddleware(UserRoleEnum.SELLER),
  validationMiddleware(PatchPurchaseRequest),
  findPurchaseByIdMiddleware,
  patchPurchases
);

export default router;
