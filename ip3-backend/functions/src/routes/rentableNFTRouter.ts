import { Router } from "express";
import {
  listNFTForRent,
  getAllListedRentableNFT,
  getRentableNFT,
  getRentableNFTByContract,
} from "../controllers/rentableNFTController";

// eslint-disable-next-line new-cap
const router = Router();

router.route("/").post(listNFTForRent).get(getAllListedRentableNFT);
router.route("/nft_info").get(getRentableNFTByContract);
router.route("/:id").get(getRentableNFT);

export default router;
