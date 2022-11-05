import { classNames, parseAddressForShow } from '@lib/utils'
import { GetServerSidePropsContext } from 'next'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Layout from '@components/Layout'
// import { NFT } from '../../constant/types'
// import NFTCard from '@components/NFTCard'
// import { Button } from '@nextui-org/react'
// import { Filter2, Heart } from 'react-iconly'
import { ethers } from 'ethers'
import { ParsedUrlQuery } from 'querystring'
import { NFT, RentableNFT } from '../../../../../constant/types'

import { DateRangePicker } from 'rsuite'
import addDays from 'date-fns/addDays'
import addMonths from 'date-fns/addMonths'
import 'rsuite/dist/rsuite.css'
import { useAccount } from 'wagmi'
import Banner from '@components/Banner'
import Link from 'next/link'
import Image from 'next/image'
import DemoSwiper from '@components/Swiper/DemoSwiper'

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

const {
  allowedMaxDays,
  allowedDays,
  allowedRange,
  beforeToday,
  afterToday,
  combine,
} = DateRangePicker

export interface QParams extends ParsedUrlQuery {
  contract: string
  id: string
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { contract, id } = context.query as QParams
  if (!ethers.utils.isAddress(contract) || typeof id !== 'string') {
    return { notFound: true }
  }
  let nft = null
  try {
    const response = await axios.get(
      `${process.env.DOMAIN_URL}/api/nft/getNFTsByCollection`,
      {
        params: {
          collection: contract,
          tokens: id,
        },
      }
    )
    if (
      response.statusText !== 'OK' ||
      !response?.data?.success ||
      response?.data?.tokens?.length === 0
    ) {
      return { notFound: true }
    }
    nft = response?.data?.data?.tokens[0]
  } catch (error) {
    console.error(error)
  }

  return {
    props: {
      nft,
    },
  }
}

interface Props {
  // address: string
  nft: NFT
}

export default function RentPage({ nft }: Props) {
  const { address } = useAccount()
  //   const [hideSelectorTool, setHideSelectorTool] = useState(false)

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

  async function handleList(event: React.MouseEvent<HTMLElement>) {
    // event.preventDefault()
    if (!address || !ethers.utils.isAddress(address)) {
      alert('Please connect your wallet!')
      return
    }
    const data = {
      autorizeIP: nft,
      authorizer: address,
      authorizerStartTime: 1667079531,
      authorizerEndTime: 1669757931,
      initialRentalPriceByDuration: 1,
      initialRentalPriceByAmount: 1,
      signiture: 'xxx',
      rentalTypes: ['duration', 'amount'],
      listed: true,
    }
    await listNewDigitalIP(data)
    // window.location.reload()
  }

  return (
    <div className="relative w-full">
      <Banner
        title="License"
        subtitle="Get the license fits you best."
      ></Banner>

      <div className="flex w-full">
        <div className="relative flex min-h-[80vh] w-1/2 flex-col items-end justify-start bg-black pt-10 text-white">
          <div className="max-w-2xl">
            <DemoSwiper />

            <div className="pt-6 opacity-60">Your right with this License</div>
            <div className="text-white">
              <div>- Allow to use for exhibition, storefront display, etc.</div>
              <div>- No commercial use for sale</div>
            </div>

            <div className="mt-8 flex max-w-2xl gap-10">
              <div className="flex flex-col">
                <div className="opacity-60">Listed Price for Authorization</div>
                <div className="font-title text-lg font-semibold">
                  20 USDT/Day
                </div>
              </div>

              <div className="flex flex-col">
                <div className="opacity-60">Available Until</div>
                <div className="font-title text-lg font-semibold">
                  20 USDT/Day
                </div>
              </div>
            </div>

            <div className="group relative mt-8 flex max-w-2xl flex-col items-center">
              <div className="relative">
                <Link href="/explore" passHref>
                  <div className="relative rounded-full bg-white px-8 py-2 text-black">
                    <div className="text-3xl font-bold tracking-wider text-black">
                      Rent by days
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* <div className="my-6 border-t border-white" /> */}
        </div>

        <div className="relative flex min-h-[80vh] w-1/2 flex-col items-start justify-start bg-white pl-24 pt-10 text-black">
          <div className="max-w-2xl">
            <DemoSwiper />

            <div className="pt-6 opacity-60">Your right with this License</div>
            <div className="text-black">
              <div>- Allow to use for exhibition, storefront display, etc.</div>
              <div>- No commercial use for sale</div>
            </div>

            <div className="mt-8 flex max-w-2xl gap-10">
              <div className="flex flex-col">
                <div className="opacity-60">Listed Price for Authorization</div>
                <div className="font-title text-lg font-semibold">
                  20 USDT/Day
                </div>
              </div>

              <div className="flex flex-col">
                <div className="opacity-60">Available Until</div>
                <div className="font-title text-lg font-semibold">
                  20 USDT/Day
                </div>
              </div>
            </div>

            <div className="group relative mt-8 flex max-w-2xl flex-col items-center">
              <div className="relative">
                <Link href="/explore" passHref>
                  <div className="relative rounded-full bg-black px-8 py-2">
                    <div className="text-3xl font-bold tracking-wider text-white">
                      Rent by amounts
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* <div className="my-6 border-t border-white" /> */}
        </div>
      </div>
    </div>
  )
}

RentPage.Layout = Layout
