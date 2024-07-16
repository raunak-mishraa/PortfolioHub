import Section from '@/components/Section'
import Input from '@/components/Input'
import logo from '../../../../public/logo.svg'
import Image from 'next/image'
import Link from 'next/link'

function page() {
  return (
    <Section className="py-32 dark:bg-grid-white/[0.02]">
      <div className='flex items-center justify-center '>
        <div className='flex flex-col items-center'>
          <Image height={'30'} src={logo} alt='Logo'className='mb-6' />
          {/* <h1 className='h6 text-center mb-6'>CodeScroll</h1> */}
          <form className='w-96 border border-n-6 rounded-lg bg-n-7 lg:backdrop-blur-sm px-8 py-6 space-y-3' action="">
           <div>
            <label htmlFor="" className='block font-medium text-sm mb-2'>Username</label>
            <Input type='text' placeholder='mishraaraunak' className='w-full bg-n-8 rounded-lg p-2.5 outline-0 text-sm' />
           </div>
           <div>
            <label htmlFor="" className='block font-medium text-sm mb-2'>Your email</label>
            <Input type='email' placeholder='raunakmshraa.dev@gmail.com' className='w-full bg-n-8 rounded-lg p-2.5 outline-0 text-sm' />
           </div>
           <div>
            <label htmlFor="" className='block font-medium text-sm mb-2'>Full name</label>
            <Input type='text' placeholder='Raunak Mishra' className='w-full bg-n-8 rounded-lg p-2.5 outline-0 text-sm' />
           </div>
           <div>
           <label htmlFor="" className='block font-medium text-sm mb-2'>Password</label>
           <Input type='password' placeholder='••••••••' className='w-full bg-n-8 rounded-lg p-2.5 outline-0 text-sm' />
           </div>
            <span className='text-sm text-center block'>Already have an account?&nbsp;
              <Link href='/signin'>Login</Link>
            </span>
            <button type="submit" className="w-full text-white bg-[#933aff] px-5 py-2.5 text-center rounded-lg">Create an account</button>
          </form>
        </div>
      </div>
    </Section>
  )
}

export default page