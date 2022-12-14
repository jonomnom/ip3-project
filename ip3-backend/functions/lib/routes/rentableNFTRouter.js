"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rentableNFTController_1 = require("../controllers/rentableNFTController");
// eslint-disable-next-line new-cap
const router = (0, express_1.Router)();
router.route("/").post(rentableNFTController_1.listNFTForRent).get(rentableNFTController_1.getAllListedRentableNFT);
router.route("/nft_info").get(rentableNFTController_1.getRentableNFTByContract);
router.route("/license").post(rentableNFTController_1.purchaseNFTLicense).get(rentableNFTController_1.getNFTLicense);
router.route("/:id").get(rentableNFTController_1.getRentableNFT);
exports.default = router;
//# sourceMappingURL=rentableNFTRouter.js.map