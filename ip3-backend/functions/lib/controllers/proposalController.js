"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.test = exports.getAllProposals = exports.createProposal = void 0;
const index_1 = require("../utils/index");
const firestore_1 = require("firebase-admin/firestore");
const firebase_admin_1 = require("firebase-admin");
const type_1 = require("../type");
/**
 * Create a new proposal
 */
const createProposal = async (req, res) => {
    const proposal = req.body;
    // Verify proposal info
    if (!(0, index_1.isInputDefined)([proposal.chain, proposal.description, proposal.title])) {
        return res
            .status(400)
            .json({ success: false, message: "Missing post info." });
    }
    // For a new proposal, validate xxx
    // if (
    //   post.isDesign &&
    //   (post.coverImageUrl === undefined ||
    //     post.price === undefined ||
    //     post.price < 0 ||
    //     post.quantity === undefined ||
    //     post.quantity <= 0)
    // ) {
    //   return res.status(400).json({
    //     success: false,
    //     message:
    //       "Design must have valid cover image URL, price, and quantity info.",
    //   });
    // }
    try {
        const writeResult = await (0, firestore_1.getFirestore)()
            .collection(type_1.Collections.PROPOSAL)
            .add({
            title: proposal.title,
            description: proposal.description,
            tokenAddress: proposal.tokenAddress,
            chain: proposal.chain,
            snapshot: proposal.snapshot,
            voteMode: proposal.voteMode,
            singleChoices: proposal.singleChoices || [],
            startTimestamp: proposal.startTimestamp || firebase_admin_1.firestore.FieldValue.serverTimestamp(),
            endTimestamp: proposal.endTimestamp || "",
            created: firebase_admin_1.firestore.FieldValue.serverTimestamp(),
            updated: firebase_admin_1.firestore.FieldValue.serverTimestamp(),
        });
        return res.status(200).json({
            success: true,
            message: "New proposal created.",
            data: {
                id: writeResult.id,
            },
        });
    }
    catch (e) {
        return res.status(500).send(e);
    }
};
exports.createProposal = createProposal;
/**
 * Get all posts.
 */
const getAllProposals = async (req, res) => {
    try {
        const allProposals = await (0, firestore_1.getFirestore)()
            .collection(type_1.Collections.PROPOSAL)
            .get();
        return res.status(200).json({
            success: true,
            data: allProposals.docs.map((doc) => {
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
exports.getAllProposals = getAllProposals;
const test = async (req, res) => {
    res.status(200).send("test proposal");
};
exports.test = test;
//# sourceMappingURL=proposalController.js.map