import { classNames, parseAddressForShow } from '@lib/utils'
import { GetServerSidePropsContext } from 'next'
import React, { PureComponent } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

import axios from 'axios'
import Layout from '@components/Layout'
import { ethers } from 'ethers'
import { ParsedUrlQuery } from 'querystring'

import { DateRangePicker } from 'rsuite'
import addDays from 'date-fns/addDays'
import addMonths from 'date-fns/addMonths'
import 'rsuite/dist/rsuite.css'
import { useAccount } from 'wagmi'
import Banner from '@components/Banner'
import Link from 'next/link'
import Image from 'next/image'
import DemoSwiper from '@components/Swiper/DemoSwiper'
import { NFT, RentableNFT } from '../../../../../../constant/types'

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

const data = [
  {
    name: 'Page A',
    uv: 0,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 400,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 700,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 800,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 900,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 950,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 990,
    amt: 2100,
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

export default function ConfirmDuration({ nft }: Props) {
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
      <Banner title="Confirm" subtitle="Pick your price and date"></Banner>
      <div className="flex w-full items-center justify-center">
        <div className="flex w-full max-w-7xl flex-col items-start justify-center gap-8  py-16">
          <div className="h-96 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="flex w-full justify-between">
            <div className="flex flex-col">
              <div className="opacity-60">Listed Price for Authorization</div>
              <div className="font-title text-2xl font-semibold">
                20 USDT/Day
              </div>
            </div>

            <div className="flex flex-col">
              <div className="opacity-60">Available Until</div>
              <div className="font-title text-2xl font-semibold">
                20 USDT/Day
              </div>
            </div>
          </div>

          <div className="flex w-full justify-between">
            <div className="flex flex-col">
              <div className="opacity-60">Total Price</div>
              <div className="font-title text-2xl font-semibold">5000 USDT</div>
            </div>

            <div className="flex flex-col">
              <div className="opacity-60">Total Days</div>
              <div className="font-title text-2xl font-semibold">
                10 USDT/Day
              </div>
            </div>
          </div>

          <div className="w-full border-t border-black" />

          <div>
            <div className="pt-6 opacity-60">Your right with this License</div>
            <div className="text-black">
              <div>- Allow to use for exhibition, storefront display, etc.</div>
              <div>- No commercial use for sale</div>
            </div>
          </div>

          <div className="flex w-full items-center justify-between">
            <Link href="#" passHref>
              <div className="relative rounded-full bg-black px-8 py-2">
                <div className="font-title text-3xl font-bold tracking-wider text-white">
                  Get this License
                </div>
              </div>
            </Link>
            <Link
              href={`/assets/ethereum/${nft.collectionAddress}/${nft.collectionTokenId}/rent`}
              passHref
            >
              <div className="relative rounded-full border border-black bg-white px-8 py-2">
                <div className="font-title text-3xl font-bold tracking-wider text-black">
                  Back
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

ConfirmDuration.Layout = Layout
