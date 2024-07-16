'use client';
import { curve } from "../../public/assets";
import Button from "./Button";
import Image from "next/image";
import homemoc from "../../public/homemoc.svg";
import blur from "../../public/blur.svg";
import HomeButton from "./HomeButton";
import gradient from "../../public/gradient.png";
function Hero() {
  return (
    <div className="pt-[16rem] -mt-[5.25rem] ">
      {/* <div className="hidden absolute top-0 left-5 w-0.25 h-full bg-stroke-1 pointer-events-none md:block lg:left-7.5 xl:left-10" />
        <div className="hidden absolute top-0 right-5 w-0.25 h-full bg-stroke-1 pointer-events-none md:block lg:right-7.5 xl:right-10" /> */}
      <div>
        <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
          <h1 className="h1 mb-6">
            {/* Explore the Possibilities of&nbsp;AI&nbsp;Chatting with {` `} */}
            Discover, share, and be inspired &nbsp;by&nbsp;projects with {` `}
            <span className="inline-block relative">
              CodeScroll{" "}
              <Image
                src={curve}
                className="absolute top-full left-0 w-full xl:-mt-2"
                width={624}
                height={28}
                alt=""
              />
            </span>
          </h1>
          <p className="body-1 max-w-3xl mx-auto mb-6 text-n-2 lg:mb-8">
            A platform where developers can showcase their projects and browse
            through others' work for inspiration
          </p>
          {/* <Button className="cursor-pointer bg-white text-n-8 p-2 rounded-md text-sm hover:saturate-50  hover:shadow-xl hover:shadow-color-1 transition-shadow ">
            Browser Projects
          </Button> */}
          <HomeButton />
        </div>
        <div className="relative max-w-[23rem] mx-auto md:max-w-5xl xl:mb-24">
          <div className="relative z-1 p-0.5 rounded-2xl bg-conic-gradient">
            {/* <div className="relative bg-n-8 rounded-[1rem]"> */}
            {/* <div className="h-[1.4rem] rounded-t-[0.9rem]" /> */}
            {/* <div className="aspect-[33/40] rounded-b-[0.9rem] overflow-hidden md:aspect-[688/490] lg:aspect-[1024/490]"> */}
            <Image
              src={homemoc}
              className="w-full object-cover scale-[1.7] translate-y-[8%] md:scale-[1] md:-translate-y-[10%] lg:-translate-y-[0%]"
              width={1024}
              height={490}
              alt="AI"
            />
            {/* </div> */}
            {/* </div> */}
          </div>
          <div className="absolute -top-[84%] left-1/2 w-[234%]  -translate-x-1/2 lg:-top-[46%] md:w-[138%]">
            <Image
              src={blur}
              className="w-full opacity-85"
              width={1440}
              height={1800}
              alt="hero"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
