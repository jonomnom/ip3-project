import { Router } from "express";
import {
  listNFTForRent,
  getAllListedRentableNFT,
  getRentableNFT,
} from "../controllers/rentableNFTController";

// eslint-disable-next-line new-cap
const router = Router();

router.route("/").post(listNFTForRent).get(getAllListedRentableNFT);
router.route("/:id").get(getRentableNFT);

export default router;
