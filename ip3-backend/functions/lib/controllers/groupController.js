"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGroup = exports.getAllGroups = exports.addGroup = void 0;
const index_1 = require("../type/index");
const utils_1 = require("../utils");
const firestore_1 = require("firebase-admin/firestore");
const firebase_admin_1 = require("firebase-admin");
/**
 * Add a new Group.
 */
const addGroup = async (req, res) => {
    const group = req.body;
    // Verify mandatory product info
    if (!(0, utils_1.isInputDefined)([group.name, group.owner])) {
        return res
            .status(400)
            .json({ success: false, message: "Missing group info." });
    }
    try {
        // Check if community name already exist.
        const docSnapshot = await (0, firestore_1.getFirestore)()
            .collection(index_1.Collections.GROUP)
            .where("name", "==", group.name)
            .limit(1)
            .get();
        if (!docSnapshot.empty) {
            return res.status(400).json({
                success: false,
                message: `Group ${group.name} already exist.`,
            });
        }
        // Create new doc.
        const writeResult = await (0, firestore_1.getFirestore)()
            .collection(index_1.Collections.GROUP)
            .add({
            name: group.name,
            description: group.description,
            members: group.members || [],
            owner: group.owner,
            rule: group.rule,
            socialPlatforms: group.socialPlatforms,
            delegateAddress: group.delegateAddress,
            delegateToken: group.delegateToken,
            created: firebase_admin_1.firestore.FieldValue.serverTimestamp(),
            updated: firebase_admin_1.firestore.FieldValue.serverTimestamp(),
        });
        return res.status(200).json({
            success: true,
            message: "New group created.",
            data: {
                id: writeResult.id,
            },
        });
    }
    catch (e) {
        return res.status(500).send(e);
    }
};
exports.addGroup = addGroup;
/**
 * Get all groups.
 */
const getAllGroups = async (req, res) => {
    try {
        const allContents = await (0, firestore_1.getFirestore)()
            .collection(index_1.Collections.GROUP)
            .get();
        return res.status(200).json({
            success: true,
            data: allContents.docs.map((doc) => {
                const data = {
                    id: doc.id,
                    data: doc.data(),
                };
                return data;
            }),
        });
    }
    catch (e) {
        return res.status(500).send(e);
    }
};
exports.getAllGroups = getAllGroups;
/**
 * Get a group.
 */
const getGroup = async (req, res) => {
    try {
        const { groupId: groupId } = req.params;
        if (groupId === undefined) {
            return res.status(400).json({
                success: false,
                message: "Group ID undefined.",
            });
        }
        const doc = await (0, firestore_1.getFirestore)()
            .collection(index_1.Collections.GROUP)
            .doc(groupId)
            .get();
        if (!doc.exists) {
            return res.status(404).json({
                success: false,
                message: `Group with ID ${groupId} does not exist.`,
            });
        }
        return res.status(200).json({
            success: true,
            data: {
                id: doc.id,
                data: doc.data(),
            },
        });
    }
    catch (e) {
        return res.status(500).send(e);
    }
};
exports.getGroup = getGroup;
//# sourceMappingURL=groupController.js.map