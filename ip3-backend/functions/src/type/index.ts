/**
 * Defines all collections names.
 */
export class Collections {
  public static readonly RENTABLE_NFT = "rentable_nft";
}

export type NFT = {
  name: string;
  collectionTokenId: string;
  collectionName: string;
  imageUrl: string;
  collectionAddress: string;
  chain: string;
  network: string;
  description: string;
  currentOwner: string;
};

export interface RentableNFT {
  authorizer: string;
  authorizerStartTime: number; // Unix Timestamp
  authorizerEndTime: number; // Unix Timestamp
  initialRentalPriceByDuration: number;
  currentRentalPriceByDuration: number;
  initialRentalPriceByAmount: number;
  currentRentalPriceByAmount: number;
  rentalTypes: string[];
  signiture: string;
  listed: boolean;
  autorizeIP: NFT;
}
