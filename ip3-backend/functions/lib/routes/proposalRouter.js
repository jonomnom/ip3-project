"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const proposalController_1 = require("../controllers/proposalController");
// eslint-disable-next-line new-cap
const router = (0, express_1.Router)();
router.route("/").post(proposalController_1.createProposal).get(proposalController_1.getAllProposals);
router.route("/test").get(proposalController_1.test);
exports.default = router;
//# sourceMappingURL=proposalRouter.js.map