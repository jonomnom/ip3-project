import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/Layout'
import { ethers } from 'ethers'
import { useAccount } from 'wagmi'
import { useCallback, useEffect } from 'react'
import { collectionsContracts } from '../constant/collections'
import Link from 'next/link'

interface Props {}

export default function Home({}: Props) {
  const { isConnected, address } = useAccount()

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-white font-title">
      <div className="flex h-screen w-full">
        <div className="relative flex flex-1 items-center justify-center bg-black">
          <div className="group relative flex flex-col items-center">
            <div className="relative group-hover:-top-24">
              <Link href="/auth/assets" passHref>
                <div className="relative rounded-full bg-white px-20 py-10 text-black group-hover:scale-75">
                  <div className=" text-8xl font-bold tracking-wider text-black">
                    RENT
                  </div>
                </div>
              </Link>

              <div className="hidden whitespace-pre-line text-center text-white group-hover:block">
                {`explore and rent your \n favorite NFTs for exhibitions \n or commercial use`}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center bg-white">
          <div className="relative flex flex-1 items-center justify-center">
            <div className="group relative flex flex-col items-center">
              <div className="relative group-hover:-top-24">
                <div className="relative rounded-full bg-black px-20 py-10 text-white group-hover:scale-75">
                  <div className="text-8xl font-bold tracking-wider text-white">
                    LEND
                  </div>
                </div>
                <div className="hidden whitespace-pre-line text-center text-black group-hover:block">
                  {`List your NFTs for rent and \n earn tokens today`}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="ins absolute inset-x-0 bottom-32 mx-auto h-48 w-48">
        <Link href="/auth/assets" passHref>
          <div
            aria-label="Logo"
            className="relative flex h-44 w-44 items-center justify-center 
            overflow-hidden rounded-full ring-4 ring-white drop-shadow-[0px_0px_8px_#FFFFFF]
              hover:ring-8 hover:drop-shadow-[-9px_2px_25px_#FFFFFF]"
            style={
              {
                // border: '5px solid #FFFFFF',
                // filter: 'drop-shadow(-0px -0px 8px #FFFFFF)',
              }
            }
          >
            <Image
              src="/logo.png"
              layout="fill"
              objectFit="contain"
              alt="ip3-logo"
            />
          </div>
        </Link>
      </div>
      <div className="sticky bottom-0 flex h-12 w-full items-center justify-center bg-white">
        <span className="text-lg font-bold uppercase tracking-widest">
          Rent or lend your Web3 IP today at IP3
        </span>
      </div>
    </div>
  )
}

// Home.Layout = Layout
