import { Router } from "express";
import { PurchaseEntity } from "../../db/entities/purchase.entity";
import { UserRoleEnum } from "../../enums/user-role.enum";
import { findItemByIdMiddleware } from "../../tools/find-item-by-id.middleware";
import { authByRoleMiddleware } from "../auth/auth.middleware";
import { deletePurchases } from "./delete";
import { getPurchaseById, getPurchases } from "./get";
import { patchPurchases } from "./patch";
import { postPurchases } from "./post";
import { putPurchases } from "./put";

const router = Router();
const findPurchaseByIdMiddleware = findItemByIdMiddleware(PurchaseEntity);

router.get("/", authByRoleMiddleware(UserRoleEnum.CUSTOMER), getPurchases);
router.get("/:id", authByRoleMiddleware(UserRoleEnum.CUSTOMER), findPurchaseByIdMiddleware, getPurchaseById);
router.post("/", authByRoleMiddleware(UserRoleEnum.CUSTOMER), postPurchases);
router.put("/", putPurchases);
router.delete("/", deletePurchases);
router.patch("/:id", authByRoleMiddleware(UserRoleEnum.CUSTOMER), findPurchaseByIdMiddleware, patchPurchases);

export default router;
