import { Router } from "express";
import { PurchaseEntity } from "../../db/entities/purchase.entity";
import { UserRoleEnum } from "../../enums/user-role.enum";
import { findItemByIdMiddleware } from "../../tools/find-item-by-id.middleware";
import { validationMiddleware } from "../../tools/validation.middleware";
import { authByRoleMiddleware } from "../auth/auth.middleware";
import { getPurchaseById, getPurchases } from "./get";
import { patchPurchases } from "./patch";
import { postPurchases } from "./post";
import { PatchPurchaseRequest } from "./requests/patch-purchase.request";
import { PostPurchaseRequest } from "./requests/post-purchase.request";

const router = Router();
const findPurchaseByIdMiddleware = findItemByIdMiddleware(PurchaseEntity);

router.get("/", authByRoleMiddleware(UserRoleEnum.CUSTOMER), getPurchases);
router.get("/:id", authByRoleMiddleware(UserRoleEnum.CUSTOMER), findPurchaseByIdMiddleware, getPurchaseById);
router.post("/", authByRoleMiddleware(UserRoleEnum.CUSTOMER), validationMiddleware(PostPurchaseRequest), postPurchases);
router.patch(
  "/:id",
  authByRoleMiddleware(UserRoleEnum.SELLER),
  validationMiddleware(PatchPurchaseRequest),
  findPurchaseByIdMiddleware,
  patchPurchases
);

export default router;
