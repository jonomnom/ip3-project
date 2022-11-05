import Link from 'next/link'
import { NFT, RentableNFT } from '../../constant/types'
import { Checkbox, DateRangePicker } from 'rsuite'
import addDays from 'date-fns/addDays'
import addMonths from 'date-fns/addMonths'
import 'rsuite/dist/rsuite.css'
import { Loading } from '@nextui-org/react'

import { Modal, useModal, Button, Text } from '@nextui-org/react'
import { useAccount, useSignMessage } from 'wagmi'
import { ethers } from 'ethers'
import LoadingState from '@components/Loading/Loading'
import { useState } from 'react'

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

interface Props {
  nft: NFT
}

const NFTCard = ({ nft }: Props) => {
  const { setVisible, bindings } = useModal()
  const [loadingModalVisable, setLoadingModalVisable] = useState(false)

  const { signMessageAsync } = useSignMessage()
  const { address } = useAccount()
  const [priceByDuration, setPriceByDuration] = useState('1')
  const [priceByAmount, setPriceByAmount] = useState('1')
  const [startTime, setStartTime] = useState(Math.floor(Date.now() / 1000))
  const [endTime, setEndTime] = useState(
    Math.floor(Date.now() / 1000) + 2629743
  ) // + 1 month

  const handleAuth = async () => {
    try {
      const message = `You agree to authorize ${nft.collectionName} ${nft.collectionTokenId} to the IP3 platform`
      const signature = await signMessageAsync({ message })
      if (!address || !ethers.utils.isAddress(address)) {
        alert('Please connect your wallet!')
        return
      }

      console.log(startTime, endTime)
      const data = {
        autorizeIP: nft,
        authorizer: address,
        authorizerStartTime: startTime,
        authorizerEndTime: endTime,
        initialRentalPriceByDuration: Number(priceByDuration),
        initialRentalPriceByAmount: Number(priceByAmount),
        currentRentalPriceByDuration: Number(priceByDuration),
        currentRentalPriceByAmount: Number(priceByAmount),
        signiture: 'xxx',
        rentalTypes: ['duration', 'amount'],
        listed: true,
      }
      await listNewDigitalIP(data)
      setVisible(false)
    } catch (error) {
      console.error(error)
    }
  }

  async function listNewDigitalIP(data: RentableNFT) {
    const res = await fetch('/api/authorization/list', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        if (res.ok) {
          return res.json()
        } else {
          console.log('Authorize failed!', res)
        }
      })
      .then((res) => {
        console.log(res)
        if (res.success) {
          alert(
            `${nft.collectionName} ${nft.collectionTokenId} listed on IP3 successfully!`
          )
        } else {
          alert(res.message)
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return (
    <div className="relative z-10 w-full rounded-lg border border-black text-black">
      <Link
        href={`/assets/ethereum/${nft.collectionAddress}/${nft.collectionTokenId}`}
        passHref
      >
        <div className="relative w-full overflow-hidden rounded-lg">
          <img
            className="block w-full overflow-hidden rounded-lg object-contain transition-transform duration-200 ease-in-out hover:scale-105 hover:cursor-pointer"
            alt="design"
            style={{ aspectRatio: '1' }}
            src={nft.imageUrl}
          />
        </div>
      </Link>

      <div className="flex w-full flex-col py-4">
        <div className="flex w-full flex-col items-start justify-between px-4 font-medium">
          <div className="truncate pr-2 text-sm">
            {`${nft.collectionName} #${nft.collectionTokenId}`}
          </div>

          {/* <div className="flex items-center justify-center rounded-2xl border-[0.5px] border-black px-4 font-title text-sm">
            Choose Avalibility
          </div> */}

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
                onChange={(e) => {
                  setPriceByDuration(e.target.value)
                }}
                value={priceByDuration}
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
                onChange={(e) => {
                  setPriceByAmount(e.target.value)
                }}
                value={priceByAmount}
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
                style={{ width: 300 }}
                onChange={(dates) => {
                  console.log(dates)
                  if (dates?.length === 2) {
                    setStartTime(Math.floor(dates[0].getTime() / 1000))
                    setEndTime(Math.floor(dates[1].getTime() / 1000))
                  }
                }}
              />
            </div>
          </div>

          <button
            className=" mt-4 flex items-center justify-center place-self-center rounded-2xl bg-black px-4 font-title text-sm text-white"
            onClick={() => setVisible(true)}
          >
            Authorize
          </button>
        </div>
      </div>

      <Modal
        className="font-content"
        scroll
        width="600px"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        {...bindings}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            IP3 Terms of service
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Text id="modal-description">
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros. Praesent commodo cursus
            magna, vel scelerisque nisl consectetur et. Cras mattis consectetur
            purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
            egestas eget quam. Morbi leo risus, porta ac consectetur ac,
            vestibulum at eros. Praesent commodo cursus magna, vel scelerisque
            nisl consectetur et. Cras mattis consectetur purus sit amet
            fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
            quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros. Praesent commodo cursus
            magna, vel scelerisque nisl consectetur et. Cras mattis consectetur
            purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
            egestas eget quam. Morbi leo risus, porta ac consectetur ac,
            vestibulum at eros. Praesent commodo cursus magna, vel scelerisque
            nisl consectetur et. Cras mattis consectetur purus sit amet
            fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
            quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros. Praesent commodo cursus
            magna, vel scelerisque nisl consectetur et. Cras mattis consectetur
            purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
            egestas eget quam. Morbi leo risus, porta ac consectetur ac,
            vestibulum at eros. Praesent commodo cursus magna, vel scelerisque
            nisl consectetur et. Cras mattis consectetur purus sit amet
            fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
            quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros. Praesent commodo cursus
            magna, vel scelerisque nisl consectetur et. Cras mattis consectetur
            purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
            egestas eget quam. Morbi leo risus, porta ac consectetur ac,
            vestibulum at eros. Praesent commodo cursus magna, vel scelerisque
            nisl consectetur et. Cras mattis consectetur purus sit amet
            fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
            quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros. Praesent commodo cursus
            magna, vel scelerisque nisl consectetur et. Cras mattis consectetur
            purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
            egestas eget quam. Morbi leo risus, porta ac consectetur ac,
            vestibulum at eros. Praesent commodo cursus magna, vel scelerisque
            nisl consectetur et. Cras mattis consectetur purus sit amet
            fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
            quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros. Praesent commodo cursus
            magna, vel scelerisque nisl consectetur et. Cras mattis consectetur
            purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
            egestas eget quam. Morbi leo risus, porta ac consectetur ac,
            vestibulum at eros. Praesent commodo cursus magna, vel scelerisque
            nisl consectetur et. Cras mattis consectetur purus sit amet
            fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
            quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros. Praesent commodo cursus
            magna, vel scelerisque nisl consectetur et. Cras mattis consectetur
            purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
            egestas eget quam. Morbi leo risus, porta ac consectetur ac,
            vestibulum at eros. Praesent commodo cursus magna, vel scelerisque
            nisl consectetur et. Cras mattis consectetur purus sit amet
            fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
            quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros. Praesent commodo cursus
            magna, vel scelerisque nisl consectetur et. Cras mattis consectetur
            purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
            egestas eget quam. Morbi leo risus, porta ac consectetur ac,
            vestibulum at eros. Praesent commodo cursus magna, vel scelerisque
            nisl consectetur et. Cras mattis consectetur purus sit amet
            fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
            quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros. Praesent commodo cursus
            magna, vel scelerisque nisl consectetur et. Cras mattis consectetur
            purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
            egestas eget quam. Morbi leo risus, porta ac consectetur ac,
            vestibulum at eros. Praesent commodo cursus magna, vel scelerisque
            nisl consectetur et. Cras mattis consectetur purus sit amet
            fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
            quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros. Praesent commodo cursus
            magna, vel scelerisque nisl consectetur et. Cras mattis consectetur
            purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
            egestas eget quam. Morbi leo risus, porta ac consectetur ac,
            vestibulum at eros. Praesent commodo cursus magna, vel scelerisque
            nisl consectetur et. Cras mattis consectetur purus sit amet
            fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
            quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros. Praesent commodo cursus
            magna, vel scelerisque nisl consectetur et. Cras mattis consectetur
            purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
            egestas eget quam. Morbi leo risus, porta ac consectetur ac,
            vestibulum at eros. Praesent commodo cursus magna, vel scelerisque
            nisl consectetur et. Cras mattis consectetur purus sit amet
            fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
            quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros. Praesent commodo cursus
            magna, vel scelerisque nisl consectetur et. Cras mattis consectetur
            purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
            egestas eget quam. Morbi leo risus, porta ac consectetur ac,
            vestibulum at eros. Praesent commodo cursus magna, vel scelerisque
            nisl consectetur et. Cras mattis consectetur purus sit amet
            fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
            quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros. Praesent commodo cursus
            magna, vel scelerisque nisl consectetur et. Cras mattis consectetur
            purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
            egestas eget quam. Morbi leo risus, porta ac consectetur ac,
            vestibulum at eros. Praesent commodo cursus magna, vel scelerisque
            nisl consectetur et. Cras mattis consectetur purus sit amet
            fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
            quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros. Praesent commodo cursus
            magna, vel scelerisque nisl consectetur et. Cras mattis consectetur
            purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
            egestas eget quam. Morbi leo risus, porta ac consectetur ac,
            vestibulum at eros. Praesent commodo cursus magna, vel scelerisque
            nisl consectetur et. Cras mattis consectetur purus sit amet
            fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
            quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros. Praesent commodo cursus
            magna, vel scelerisque nisl consectetur et. Cras mattis consectetur
            purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
            egestas eget quam. Morbi leo risus, porta ac consectetur ac,
            vestibulum at eros. Praesent commodo cursus magna, vel scelerisque
            nisl consectetur et. Cras mattis consectetur purus sit amet
            fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
            quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros. Praesent commodo cursus
            magna, vel scelerisque nisl consectetur et. Cras mattis consectetur
            purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
            egestas eget quam. Morbi leo risus, porta ac consectetur ac,
            vestibulum at eros. Praesent commodo cursus magna, vel scelerisque
            nisl consectetur et. Cras mattis consectetur purus sit amet
            fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
            quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros. Praesent commodo cursus
            magna, vel scelerisque nisl consectetur et. Cras mattis consectetur
            purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
            egestas eget quam. Morbi leo risus, porta ac consectetur ac,
            vestibulum at eros. Praesent commodo cursus magna, vel scelerisque
            nisl consectetur et.
          </Text>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color={'default'} onClick={() => setVisible(false)}>
            CLOSE
          </Button>
          <Button auto onClick={handleAuth}>
            AGREE
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
export default NFTCard
