import { Router } from "express";
import { CardEntity } from "../../db/entities/card.entity";
import { findItemByIdMiddleware } from "../../tools/find-item-by-id.middleware";
import { validationMiddleware } from "../../tools/validation.middleware";
import { deleteCards } from "./delete";
import { getCards, getOneCard } from "./get";
import { patchCards } from "./patch";
import { postCards } from "./post";
import { putCards } from "./put";
import { DeleteCardRequest } from "./request/delete-card.request";
import { PostCardRequest } from "./request/post-card.request";

const router = Router();

router.get("/", getCards);
router.get("/:id", findItemByIdMiddleware(CardEntity), getOneCard);
router.post("/", validationMiddleware(PostCardRequest), postCards);
router.put("/", putCards);
router.delete("/:number", validationMiddleware(DeleteCardRequest, "params"), deleteCards);
router.patch("/", patchCards);

export default router;
