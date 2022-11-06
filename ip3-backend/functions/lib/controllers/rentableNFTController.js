"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRentableNFTByContract = exports.getRentableNFT = exports.getAllListedRentableNFT = exports.listNFTForRent = void 0;
const index_1 = require("../type/index");
const utils_1 = require("../utils");
const firestore_1 = require("firebase-admin/firestore");
const firebase_admin_1 = require("firebase-admin");
/**
 * Add a new Rentable NFT in IP3 Platform.
 */
const listNFTForRent = async (req, res) => {
    var _a, _b, _c, _d, _e, _f;
    const rentableNFT = req.body;
    if (!(0, utils_1.isInputDefined)([
        rentableNFT.authorizer,
        rentableNFT.authorizerStartTime,
        rentableNFT.authorizerEndTime,
        rentableNFT.rentalTypes,
        rentableNFT.autorizeIP,
    ])) {
        return res
            .status(400)
            .json({ success: false, message: "Missing rentableNFT required info." });
    }
    try {
        // Check if current NFT already exist.
        const snapshot = await (0, firestore_1.getFirestore)()
            .collection(index_1.Collections.RENTABLE_NFT)
            .where("autorizeIP.chain", "==", rentableNFT.autorizeIP.chain)
            .where("autorizeIP.collectionAddress", "==", rentableNFT.autorizeIP.collectionAddress)
            .where("autorizeIP.collectionTokenId", "==", rentableNFT.autorizeIP.collectionTokenId)
            .limit(1)
            .get();
        if (!snapshot.empty) {
            return res.status(400).json({
                success: false,
                message: "Oops... current NFT has been listed on IP3 platform, you can't list the same NFT more than once",
                data: snapshot,
            });
        }
        // Create new doc.
        const writeResult = await (0, firestore_1.getFirestore)()
            .collection(index_1.Collections.RENTABLE_NFT)
            .add({
            autorizeIP: rentableNFT.autorizeIP,
            authorizer: rentableNFT.authorizer,
            authorizerStartTime: rentableNFT.authorizerStartTime,
            authorizerEndTime: rentableNFT.authorizerEndTime,
            initialRentalPriceByDuration: (_a = rentableNFT.initialRentalPriceByDuration) !== null && _a !== void 0 ? _a : 1,
            currentRentalPriceByDuration: (_b = rentableNFT.currentRentalPriceByDuration) !== null && _b !== void 0 ? _b : 1,
            initialRentalPriceByAmount: (_c = rentableNFT.initialRentalPriceByAmount) !== null && _c !== void 0 ? _c : 1,
            currentRentalPriceByAmount: (_d = rentableNFT.currentRentalPriceByAmount) !== null && _d !== void 0 ? _d : 1,
            rentalTypes: rentableNFT.rentalTypes,
            listed: (_e = rentableNFT.listed) !== null && _e !== void 0 ? _e : true,
            signiture: (_f = rentableNFT.signiture) !== null && _f !== void 0 ? _f : "",
            created: firebase_admin_1.firestore.FieldValue.serverTimestamp(),
            updated: firebase_admin_1.firestore.FieldValue.serverTimestamp(),
        });
        return res.status(200).json({
            success: true,
            message: "You autorized your NFT ip on the IP3 platform successfully!",
            result: {
                id: writeResult.id,
            },
        });
    }
    catch (e) {
        return res.status(500).send(e);
    }
};
exports.listNFTForRent = listNFTForRent;
/**
 * Get all listed rentable NFT.
 */
const getAllListedRentableNFT = async (req, res) => {
    try {
        const allNFTs = await (0, firestore_1.getFirestore)()
            .collection(index_1.Collections.RENTABLE_NFT)
            .get();
        console.log(allNFTs);
        return res.status(200).json({
            success: true,
            data: allNFTs.docs.map((item) => {
                const data = Object.assign({ id: item.id }, item.data());
                return data;
            }),
        });
    }
    catch (e) {
        return res.status(500).send(e);
    }
};
exports.getAllListedRentableNFT = getAllListedRentableNFT;
/**
 * Get specific rentable NFT.
 */
const getRentableNFT = async (req, res) => {
    try {
        const { id: id } = req.params;
        if (id === undefined) {
            return res.status(400).json({
                success: false,
                message: "RentableNFT ID undefined.",
            });
        }
        const doc = await (0, firestore_1.getFirestore)()
            .collection(index_1.Collections.RENTABLE_NFT)
            .doc(id)
            .get();
        if (!doc.exists) {
            return res.status(404).json({
                success: false,
                message: `RentableNFT with ID ${id} does not exist.`,
            });
        }
        return res.status(200).json({
            success: true,
            data: Object.assign({ id: doc.id }, doc.data()),
        });
    }
    catch (e) {
        return res.status(500).send(e);
    }
};
exports.getRentableNFT = getRentableNFT;
/**
 * Get specific rentable NFT by contract and token id.
 */
const getRentableNFTByContract = async (req, res) => {
    try {
        const { collectionAddress, collectionTokenId } = req.query;
        if (!(0, utils_1.isInputDefined)([collectionAddress, collectionTokenId])) {
            return res.status(400).json({
                success: false,
                message: "RentableNFT info missing.",
            });
        }
        const snapshot = await (0, firestore_1.getFirestore)()
            .collection(index_1.Collections.RENTABLE_NFT)
            .where("autorizeIP.collectionAddress", "==", collectionAddress === null || collectionAddress === void 0 ? void 0 : collectionAddress.toString())
            .where("autorizeIP.collectionTokenId", "==", collectionTokenId === null || collectionTokenId === void 0 ? void 0 : collectionTokenId.toString())
            .limit(1)
            .get();
        return res.status(200).json({
            success: true,
            data: snapshot.docs.map((item) => {
                console.log(item);
                const data = Object.assign({ id: item.id }, item.data());
                return data;
            }),
        });
    }
    catch (e) {
        return res.status(500).send(e);
    }
};
exports.getRentableNFTByContract = getRentableNFTByContract;
//# sourceMappingURL=rentableNFTController.js.map