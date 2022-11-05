import { Button } from '@nextui-org/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Checkbox, DateRangePicker } from 'rsuite'
import { RentableNFT } from '../../constant/types'
import addDays from 'date-fns/addDays'
import addMonths from 'date-fns/addMonths'
import 'rsuite/dist/rsuite.css'

interface Props {
  nft: RentableNFT
}

const predefinedRanges = [
  {
    label: 'Next 10 days',
    value: [new Date(), addDays(new Date(), 10)],
    placement: 'left',
  },
  {
    label: 'Next 30 days',
    value: [new Date(), addDays(new Date(), 30)],
    placement: 'left',
  },
  {
    label: 'Next 3 months',
    value: [new Date(), addMonths(new Date(), 3)],
    placement: 'left',
  },
  {
    label: 'Next 6 months',
    value: [new Date(), addMonths(new Date(), 6)],
    placement: 'left',
  },
  {
    label: 'Next 1 year',
    value: [new Date(), addMonths(new Date(), 12)],
    placement: 'left',
  },
]

const { beforeToday } = DateRangePicker

export default function DigitalIPCard({ nft }: Props) {
  const { push } = useRouter()
  return (
    <div className="relative z-10 w-full rounded-lg border border-black text-black">
      <Link
        href={`/assets/ethereum/${nft.autorizeIP.collectionAddress}/${nft.autorizeIP.collectionTokenId}`}
        passHref
      >
        <div className="relative w-full overflow-hidden rounded-lg">
          <img
            className="block w-full overflow-hidden rounded-lg object-contain transition-transform duration-200 ease-in-out hover:scale-105 hover:cursor-pointer"
            alt="design"
            style={{ aspectRatio: '1' }}
            src={nft.autorizeIP.imageUrl}
          />
        </div>
      </Link>

      <div className="flex w-full flex-col py-4">
        <div className="flex w-full flex-col items-start justify-between px-4 py-2 font-medium">
          {/* <div className="truncate pr-2 text-sm">
            {`${nft.autorizeIP.collectionName} #${nft.autorizeIP.collectionTokenId}`}
          </div> */}

          <div className="flex items-center justify-center rounded-2xl border-[0.5px] border-black px-4 font-title text-sm">
            Choose Avalibility
          </div>

          <div className="flex w-full flex-col pl-4 pt-2">
            <Checkbox defaultSelected={true} size="xs">
              <span className="pl-2 font-content text-xs font-semibold">
                Authorize by time
              </span>
            </Checkbox>
            <div className="flex items-center justify-start gap-2 bg-[#0004C3] bg-opacity-5 px-4 py-2">
              <div className="text-xs text-[#0004C3]">Set Your Price</div>
              <input
                type="number"
                name="price"
                id="price"
                min="0"
                step="0.001"
                required
                className="w-24 rounded-xl border border-[#0004C3] bg-[#0004C3] bg-opacity-5 pl-4 text-sm text-opacity-60"
                // className={classNames(styles.inputStyles)}
                // onChange={(e) => {
                //   setPrice(e.target.value)
                // }}
                // value={price}
              />
              <div className="text-xs text-[#0004C3] opacity-80">
                USDT / Day
              </div>
            </div>

            <Checkbox defaultSelected={true} size="xs">
              <span className="pl-2 font-content text-xs font-semibold">
                Authorize by quantity
              </span>
            </Checkbox>

            <div className="flex items-center justify-start gap-2 bg-[#0004C3] bg-opacity-5 px-4 py-2">
              <div className="text-xs text-[#0004C3]">Set Your Price</div>
              <input
                type="number"
                name="price"
                id="price"
                min="0"
                step="0.001"
                required
                className="w-24 rounded-xl border border-[#0004C3] bg-[#0004C3] bg-opacity-5 pl-4 text-sm text-opacity-60"
                // className={classNames(styles.inputStyles)}
                // onChange={(e) => {
                //   setPrice(e.target.value)
                // }}
                // value={price}
              />
              <div className="text-xs text-[#0004C3] opacity-80">
                USDT / Amount
              </div>
            </div>

            <div className="pt-4">
              <DateRangePicker
                ranges={predefinedRanges}
                disabledDate={beforeToday()}
                placeholder="Duration"
                style={{ width: 200 }}
              />
            </div>
          </div>

          {/* <div className="truncate pr-2 text-sm">
            {`${nft.currentRentalPriceByDuration} USD / day`}
          </div>
          <div className="truncate pr-2 text-sm">
            {`${nft.currentRentalPriceByAmount} USD / amount`}
          </div> */}
          <button className=" mt-4 flex items-center justify-center place-self-center rounded-2xl bg-black px-4 font-title text-sm text-white">
            Authorize
          </button>
          {/* <Button
            color="gradient"
            auto
            onClick={() => {
              push(
                `/assets/ethereum/${nft.autorizeIP.collectionAddress}/${nft.autorizeIP.collectionTokenId}/lend`
              )
            }}
          >
            Lend
          </Button> */}
        </div>
      </div>
    </div>
  )
}
