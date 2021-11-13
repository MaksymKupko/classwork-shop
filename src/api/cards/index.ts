import { Router } from "express";
import { getCards, getOneCard } from "./get";
import { postCards } from "./post";
import { putCards } from "./put";
import { deleteCards } from "./delete";
import { patchCards } from "./patch";
import { validationMiddleware } from "../../tools/validation.middleware";
import { PostCardRequest } from "./request/post-card.request";
import { DeleteCardRequest } from "./request/delete-card.request";
import { GetCardRequest } from "./request/get-card.request";

const router = Router();

router.get("/", getCards);
router.get("/:number", validationMiddleware(GetCardRequest, "params"), getOneCard);
router.post("/", validationMiddleware(PostCardRequest), postCards);
router.put("/", putCards);
router.delete("/:number", validationMiddleware(DeleteCardRequest, "params"), deleteCards);
router.patch("/", patchCards);

export default router;
