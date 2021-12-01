import { Router } from "express";
import { ItemEntity } from "../../db/entities/item.entity";
import { findItemByIdMiddleware } from "../../tools/find-item-by-id.middleware";
import { getItems, getItemById } from "./get";

const router = Router();

router.get("/", getItems);
router.get("/:id", findItemByIdMiddleware(ItemEntity), getItemById);

export default router;
