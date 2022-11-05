import { Button } from '@nextui-org/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { RentableNFT } from '../../constant/types'

interface Props {
  nft: RentableNFT
}

export default function DigitalIPCard({ nft }: Props) {
  const { push } = useRouter()
  return (
    <div className="relative z-10 w-full bg-[#3A3A3A]">
      <Link
        href={`/assets/ethereum/${nft.autorizeIP.collectionAddress}/${nft.autorizeIP.collectionTokenId}`}
        passHref
      >
        <div className="relative w-full overflow-hidden bg-white">
          <img
            className="block w-full overflow-hidden rounded-lg object-contain transition-transform duration-200 ease-in-out hover:scale-105 hover:cursor-pointer"
            alt="design"
            style={{ aspectRatio: '1' }}
            src={nft.autorizeIP.imageUrl}
          />
        </div>
      </Link>

      <div className="flex w-full flex-col divide-y divide-[#979797] divide-opacity-20 text-white">
        <div className="flex w-full flex-col justify-between px-4 py-2 font-medium">
          <div className="truncate pr-2 text-sm">
            {`${nft.autorizeIP.collectionName} #${nft.autorizeIP.collectionTokenId}`}
          </div>
          <div className="truncate pr-2 text-sm">
            {`${nft.currentRentalPriceByDuration} USD / day`}
          </div>
          <div className="truncate pr-2 text-sm">
            {`${nft.currentRentalPriceByAmount} USD / amount`}
          </div>
          <Button
            color="gradient"
            auto
            onClick={() => {
              push(
                `/assets/ethereum/${nft.autorizeIP.collectionAddress}/${nft.autorizeIP.collectionTokenId}/lend`
              )
            }}
          >
            Lend
          </Button>
        </div>
      </div>
    </div>
  )
}
