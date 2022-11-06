import { Request, Response } from "express";
import { Collections, RentableNFT } from "../type/index";
import { isInputDefined } from "../utils";
import { getFirestore } from "firebase-admin/firestore";
import { firestore } from "firebase-admin";

/**
 * Add a new Rentable NFT in IP3 Platform.
 */
const listNFTForRent = async (req: Request, res: Response) => {
  const rentableNFT: RentableNFT = req.body;
  if (
    !isInputDefined([
      rentableNFT.authorizer,
      rentableNFT.authorizerStartTime,
      rentableNFT.authorizerEndTime,
      rentableNFT.rentalTypes,
      rentableNFT.autorizeIP,
    ])
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Missing rentableNFT required info." });
  }
  try {
    // Check if current NFT already exist.
    const snapshot = await getFirestore()
      .collection(Collections.RENTABLE_NFT)
      .where("autorizeIP.chain", "==", rentableNFT.autorizeIP.chain)
      .where(
        "autorizeIP.collectionAddress",
        "==",
        rentableNFT.autorizeIP.collectionAddress
      )
      .where(
        "autorizeIP.collectionTokenId",
        "==",
        rentableNFT.autorizeIP.collectionTokenId
      )
      .limit(1)
      .get();
    if (!snapshot.empty) {
      return res.status(400).json({
        success: false,
        message:
          "Oops... current NFT has been listed on IP3 platform, you can't list the same NFT more than once",
        data: snapshot,
      });
    }

    // Create new doc.
    const writeResult = await getFirestore()
      .collection(Collections.RENTABLE_NFT)
      .add({
        autorizeIP: rentableNFT.autorizeIP,
        authorizer: rentableNFT.authorizer,
        authorizerStartTime: rentableNFT.authorizerStartTime,
        authorizerEndTime: rentableNFT.authorizerEndTime,
        initialRentalPriceByDuration:
          rentableNFT.initialRentalPriceByDuration ?? 1,
        currentRentalPriceByDuration:
          rentableNFT.currentRentalPriceByDuration ?? 1,
        initialRentalPriceByAmount: rentableNFT.initialRentalPriceByAmount ?? 1,
        currentRentalPriceByAmount: rentableNFT.currentRentalPriceByAmount ?? 1,
        rentalTypes: rentableNFT.rentalTypes,
        listed: rentableNFT.listed ?? true,
        signiture: rentableNFT.signiture ?? "",
        created: firestore.FieldValue.serverTimestamp(),
        updated: firestore.FieldValue.serverTimestamp(),
      });
    return res.status(200).json({
      success: true,
      message: "You autorized your NFT ip on the IP3 platform successfully!",
      result: {
        id: writeResult.id,
      },
    });
  } catch (e) {
    return res.status(500).send(e);
  }
};

/**
 * Get all listed rentable NFT.
 */
const getAllListedRentableNFT = async (req: Request, res: Response) => {
  try {
    const allNFTs = await getFirestore()
      .collection(Collections.RENTABLE_NFT)
      .get();
    console.log(allNFTs);
    return res.status(200).json({
      success: true,
      data: allNFTs.docs.map((item) => {
        const data = {
          id: item.id,
          ...item.data(),
        };
        return data;
      }),
    });
  } catch (e) {
    return res.status(500).send(e);
  }
};

/**
 * Get specific rentable NFT.
 */
const getRentableNFT = async (req: Request, res: Response) => {
  try {
    const { id: id } = req.params;
    if (id === undefined) {
      return res.status(400).json({
        success: false,
        message: "RentableNFT ID undefined.",
      });
    }

    const doc = await getFirestore()
      .collection(Collections.RENTABLE_NFT)
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
      data: {
        id: doc.id,
        ...doc.data(),
      },
    });
  } catch (e) {
    return res.status(500).send(e);
  }
};

/**
 * Get specific rentable NFT by contract and token id.
 */
const getRentableNFTByContract = async (req: Request, res: Response) => {
  try {
    const { collectionAddress, collectionTokenId } = req.query;
    if (!isInputDefined([collectionAddress, collectionTokenId])) {
      return res.status(400).json({
        success: false,
        message: "RentableNFT info missing.",
      });
    }
    const snapshot = await getFirestore()
      .collection(Collections.RENTABLE_NFT)
      .where(
        "autorizeIP.collectionAddress",
        "==",
        collectionAddress?.toString()
      )
      .where(
        "autorizeIP.collectionTokenId",
        "==",
        collectionTokenId?.toString()
      )
      .limit(1)
      .get();
    return res.status(200).json({
      success: true,
      data: snapshot.docs.map((item) => {
        console.log(item);
        const data = {
          id: item.id,
          ...item.data(),
        };
        return data;
      }),
    });
  } catch (e) {
    return res.status(500).send(e);
  }
};

export {
  listNFTForRent,
  getAllListedRentableNFT,
  getRentableNFT,
  getRentableNFTByContract,
};
