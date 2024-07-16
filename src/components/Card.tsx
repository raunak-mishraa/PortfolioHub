import Image from "next/image";
import test from "./test.png";
import { GoHeart } from "react-icons/go";
import { LuBookmark } from "react-icons/lu";
function Card() {
  const post = {
    user: {
      avatar: "https://avatars.githubusercontent.com/u/47231161?v=4",
      name: "Raunak Mishra",
      role: "Full stack developer",
    },
    liveUrl: "https://codescroll.vercel.app",
    githubUrl: "",
    category: "Portfolio",
    technologies: [
      "React",
      "Tailwind",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Express.js",
      "MongoDB",
    ],
  };

  return (
    <div className="relative rounded-lg bg-[#05050A] w-96 border border-[#272A3C]">
          {/* <span className ="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span> */}
          <div className="w-full h-44">
            <Image
              src={test}
              alt="card_image"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="my-6 mx-4">
              <div>
            <div className="flex justify-between">
              <div className="flex items-center gap-3">
                <Image
                  src={test}
                  className="w-9 h-9 rounded-full"
                  alt="user avatar"
                />
                <div className="space-y-1">
                  <span className="block font-semibold leading-none tracking-wide">
                    Raunak Mishra
                  </span>
                  <span className="block text-xs font-light tracking-wide  leading-none text-[#797D9B]">
                    Full stack developer
                  </span>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <span className="text-xs border border-[#21D08E] text-[#21D08E] py-1.5 px-4 rounded-full bg-[#08221B]   flex items-center gap-1 cursor-pointer">
                  <span className="h-2 absolute w-2 bg-[#21D08E] rounded-full"></span>
                  <span className="h-2 relative w-2 bg-[#21D08E] animate-ping rounded-full"></span>
                  Live
                </span>
                <span className="text-xs border animate-pulse border-[#8d8dff] bg-[#0C071F] text-[#B6B6FF] py-1.5 px-4 rounded-full cursor-pointer">
                  Github
                </span>
              </div>
            </div>
          </div>
        <div>
          <div className="my-4 flex justify-between items-center">
            <span className="block text-sm border border-[#272A3C] py-1 px-2 rounded-md bg-[#272A3C] text-[#9fa3c4]">
              Portfolio
            </span>
            <span className="block border-[#ffcc01] text-[#ffcc01] text-xs py-1.5 px-2 rounded  border bg-[#4a3f15] cursor-pointer">Thanks</span>
          </div>
        </div>
        <div>
          <div className="flex flex-wrap gap-2">
            {post.technologies.map((tech, index) => (
              <span
                key={index}
                className="text-sm border border-[#272A3C] text-n-2 py-1 px-2 rounded"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        <div className="my-6 flex justify-between items-center">
          <div className="flex items-center gap-x-1.5">
           <GoHeart className="w-5 h-5 text-[#797D9B] hover:text-color-6 transition-all duration-300  "/>
           <span className="text-sm text-[#797D9B]">234</span>
          </div>
          <div>
            <LuBookmark className="w-5 h-5 text-[#797D9B] transition-all duration-300 hover:text-[#5A67D8]" />
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default Card;
