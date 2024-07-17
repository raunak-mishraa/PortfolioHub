import Input from "@/components/Input"
import Section from "@/components/Section"
import Image from "next/image"
import Link from "next/link"
import mlogo from "../../../../public/mlogo.svg"
import google from '../../../../public/google.svg'
import github from '../../../../public/github.svg'
import grid from '../../../../public/grid.svg'
function page() {
  return (
    <Section className="py-32 h-svh dark:bg-grid-white/[0.02]">
     
      <div className='flex items-center justify-center'>
        <div className='flex flex-col items-center'>
          {/* <h1 className='h6 text-center mb-6'>CodeScroll</h1> */}
          <div className='flex items-center gap-x-2 mb-4'>
            <Image height={'25'} src={mlogo} alt='Logo' />
            <h1 className='h5 font-bold'>SignIn</h1>
          </div>
          <div className='w-96 border border-n-6 rounded-lg bg-n-7 lg:backdrop-blur-sm px-8 py-6 '>
          <form className="space-y-3" action="">
           <div>
            <label htmlFor="" className='block font-medium text-sm mb-2'>Username</label>
            <Input type='text' placeholder='mishraaraunak' className=' w-full bg-n-8 rounded-lg p-2.5 outline-0 text-sm' />
           </div>
           <div>
            <label htmlFor="" className='block font-medium text-sm mb-2'>Password</label>
            <Input type='password' placeholder='••••••••' className='w-full bg-n-8 rounded-lg p-2.5 outline-0 text-sm' />
           </div>
            <span className='text-sm text-center block'>Don't have an account?&nbsp;
              <Link href='/signup'>Create</Link>
            </span>
            <button type="submit" className="w-full text-white bg-[#933aff] px-5 py-2.5 text-center rounded-lg">Sign In </button>
          </form>
            <span className='text-sm text-center block my-4'>Or</span>
            <form className="flex space-x-2">
              <button type="submit" className="w-2/4 text-white bg-n-8 border-n-6 border-2 px-5 py-2.5 text-center rounded-lg flex justify-center">
              <Image 
                src={github} 
                width={20} 
                height={20}
                alt="github icon"/>
                </button>
              <button type="submit" className="w-2/4 text-white border-n-6 bg-n-8 border-2 px-5 py-2.5 text-center rounded-lg flex justify-center">
                <Image 
                src={google} 
                width={20} 
                height={20}
                alt="google icon"/>
                </button>
            </form>
          </div>
        </div>
      </div>
    </Section>
  )
}

export default page