import { classNames, parseAddressForShow } from '@lib/utils'
import { GetServerSidePropsContext } from 'next'
import React, { PureComponent, useState } from 'react'
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
import { useContract, useSigner } from 'wagmi'
import { ParsedUrlQuery } from 'querystring'

import { DateRangePicker } from 'rsuite'
import addDays from 'date-fns/addDays'
import 'rsuite/dist/rsuite.css'
import { useAccount } from 'wagmi'
import Banner from '@components/Banner'
import Link from 'next/link'
import { Input, Loading } from '@nextui-org/react'
import {
  getFirstNQuantityPrice,
  getQuantityLineChartData,
} from '@lib/ip3Protocal'

const { allowedMaxDays, beforeToday, afterToday, combine } = DateRangePicker

export interface QParams extends ParsedUrlQuery {
  //   contract: string
  //   id: string
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    // const response = await axios.get(
    //   `${process.env.BACKEND_API_DOMAIN}/${process.env.VERSION}/rentableNFT/nft_info`,
    //   {
    //     params: {
    //       collectionAddress: contract,
    //       collectionTokenId: id,
    //     },
    //   }
    // )
    // if (response.statusText !== 'OK' || !response?.data?.success) {
    //   return { notFound: true }
    // }
    // console.log(response.data)
    // nft = response?.data?.data[0]
  } catch (error) {
    console.error(error)
  }

  return {
    props: {},
  }
}

interface Props {
  // address: string
  //   nft: RentableNFT
}
export default function ConfirmAmount({}: Props) {
  return (
    <div className="relative w-full">
      <Banner
        title="Prove of Lisencing"
        subtitle="This is your Lisence ticket for xxxx  "
      ></Banner>
      <div className="flex w-full items-center justify-center px-8">
        <div className="flex w-full max-w-7xl items-start justify-center gap-8 py-16">
          <div className="my-10 flex w-full justify-center gap-20">
            <div className="w-2/5">
              <div className="relative w-full overflow-hidden bg-white">
                <img
                  className="w-full overflow-hidden rounded-lg object-fill transition-transform duration-200 ease-in-out hover:scale-105 hover:cursor-pointer"
                  alt="design"
                  style={{ aspectRatio: '1' }}
                  src={''}
                />
              </div>
            </div>

            <div className="relative flex w-2/5 flex-col gap-8">
              <div className="flex flex-col items-start gap-6">
                <div className="flex flex-col items-start justify-between py-2 font-medium">
                  <div className="flex items-center justify-center rounded-2xl border-[0.5px] border-black px-4 font-title text-sm">
                    xxxxx{' '}
                    {/* {`${nft.autorizeIP.collectionName} #${nft.autorizeIP.collectionTokenId}`} */}
                  </div>
                </div>

                <div className="flex w-full items-center justify-between">
                  {' '}
                  <div className="pt-2">
                    <div className="text-sm opacity-40">Authorized by</div>
                    <div>xxxxx</div>
                  </div>
                  <div className="pt-2">
                    <div className="text-sm opacity-40">Authorized to</div>
                    <div>xxxxx</div>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="text-sm opacity-40">Contract</div>
                  <div>xxxxx</div>
                </div>
                <div className="w-full border-t-2 border-black" />

                <div className="flex w-full justify-between">
                  <div className="flex flex-col">
                    <div className="opacity-60">
                      Listed Price for Authorization
                    </div>
                    <div className="font-title text-2xl font-semibold">xxx</div>
                  </div>

                  <div className="flex flex-col">
                    <div className="opacity-60">
                      Listed Price for Authorization
                    </div>
                    <div className="font-title text-2xl font-semibold">xxx</div>
                  </div>
                </div>

                <div className="flex w-full justify-between">
                  <div className="flex flex-col">
                    <div className="opacity-60">
                      Listed Price for Authorization
                    </div>
                    <div className="font-title text-2xl font-semibold">xxx</div>
                  </div>

                  <div className="flex flex-col">
                    <div className="opacity-60">
                      Listed Price for Authorization
                    </div>
                    <div className="font-title text-2xl font-semibold">xxx</div>
                  </div>
                </div>

                <div>
                  <div className="pt-6 opacity-60">
                    Your right with this License
                  </div>
                  <div className="text-black">
                    <div>
                      - Allow to use for exhibition, storefront display, etc.
                    </div>
                    <div>- No commercial use for sale</div>
                  </div>
                </div>
                {/* <div>{nft.name}</div>
                <Button
                  color="gradient"
                  auto
                  css={{
                    width: '200px',
                  }}
                  onClick={() => {
                    push(
                      `/assets/ethereum/${nft.collectionAddress}/${nft.collectionTokenId}/lend`
                    )
                  }}
                >
                  Lend
                </Button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

ConfirmAmount.Layout = Layout
