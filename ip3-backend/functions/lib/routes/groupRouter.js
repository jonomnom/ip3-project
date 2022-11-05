"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const groupController_1 = require("../controllers/groupController");
// eslint-disable-next-line new-cap
const router = (0, express_1.Router)();
router.route("/").post(groupController_1.addGroup).get(groupController_1.getAllGroups);
router.route("/:groupId").get(groupController_1.getGroup);
exports.default = router;
//# sourceMappingURL=groupRouter.js.map