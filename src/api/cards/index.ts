import { Router } from "express";
import { getCards } from "./get";
import { postCards } from "./post";
import { putCards } from "./put";
import { deleteCards } from "./delete";
import { patchCards } from "./patch";
import { validationMiddleware } from "../../tools/validate-body.middleware";
import { PostCardRequest } from "./request/post-card.request";

const router = Router();

router.get("/", getCards);
router.post("/", validationMiddleware(PostCardRequest), postCards);
router.put("/", putCards);
router.delete("/", deleteCards);
router.patch("/", patchCards);

export default router;
