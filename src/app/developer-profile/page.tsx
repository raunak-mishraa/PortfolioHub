"use client";
import Image from 'next/image'
import React from 'react'
import test from '@/components/test.png' 
import profie_line from '../../../public/profile_line.svg'
import { FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useSession } from 'next-auth/react';

function page() {
  const { data: session, status } = useSession();
  console.log(session)
  const avatar = session?.user.image ?? test;
  // console.log(avatar)
  return (
    <div className='py-32 px-10 container'>

      {/* profile section */}
      <div className='flex  flex-col items-center justify-center gap-y-5'>
        <div className='flex flex-col items-center'>
          <div className='w-28 h-28 border border-n-5 p-3 overflow-hidden rounded-full'>
            <Image 
              src={avatar} 
              width={100}
              height={100}
              alt='avatar' 
              className='w-full h-full rounded-full object-cover'/>
          </div>
          <div className='-m-0.5'>
            <Image src={profie_line} alt='vector' className='animate-pulse'/>
          </div>
          <div>{session?.user.name}</div>
          <div className='flex gap-x-12'>
            <div className='w-10 h-10 border flex items-center justify-center rounded-full border-n-5'>
            <FaLinkedinIn className='text-[#757185]'/>
            </div>
            <div className='w-10 h-10 border flex items-center justify-center rounded-full border-n-5'>
            <FaXTwitter className='text-[#757185]'/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page