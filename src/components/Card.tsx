import Image from "next/image";
import test from "./test.png";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { LuBookmark } from "react-icons/lu";
import Link from "next/link";
import avatar from '../../public/01.png'
import { Project } from "@/types/project";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function Card({
  project,
} :{
  project:Project
}) {
    const [liked, setLiked] = useState<boolean>(false);
    const [saved, setSaved] = useState<boolean>(false)

    const handleLike = async (id:any) => {
      console.log("like");
      setLiked(!liked);
      try {
        console.log(id, liked);
        const newLike = !liked;
        console.log(newLike);
        const data = await axios.put('/api/like', {id, liked: newLike});
        toast.success(data.data.message);
      } catch (error:any) {
        console.log(error);
        toast.error(error.response.data.error);
      }
    };

    const handleSave = async (pid:any) =>{
      const save = !saved;
      // alert(pid)
      try {
        const id = pid;
        const savedData = await axios.put('/api/save', {id, save})
      } catch (error) {
        
      }
    }

  return (
    <div className="relative rounded-lg bg-[#05050A] w-96 border border-[#272A3C] overflow-hidden group">
          {/* <span className ="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span> */}
          <div className="w-full h-44">
            <Image
              src={project?.imageUrl}
              alt="card_image"
              width={400}
              height={200}
              className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
            />
          </div>
          <div className="my-6 mx-4">
              <div>
            <div className="flex justify-between">
              <div className="flex items-center gap-3">
                <Image
                  src={avatar}
                  className="w-9 h-9 rounded-full"
                  alt="user avatar"
                />
                <div className="space-y-1">
                  <span className="block font-semibold leading-none tracking-wide">
                    {project?.userId?.fullName}
                  </span>
                  <span className="block text-xs font-light tracking-wide  leading-none text-[#797D9B]">
                    Web developer
                  </span>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <Link href={project?.liveUrl} className="text-xs border border-[#21D08E] text-[#21D08E] py-1.5 px-4 rounded-full bg-[#08221B]   flex items-center gap-1 cursor-pointer">
                  <span className="h-2 absolute w-2 bg-[#21D08E] rounded-full"></span>
                  <span className="h-2 relative w-2 bg-[#21D08E] animate-ping rounded-full"></span>
                  Live
                </Link>
                <Link href={project?.githubUrl} className="text-xs border animate-pulse border-[#8d8dff] bg-[#0C071F] text-[#B6B6FF] py-1.5 px-4 rounded-full cursor-pointer">
                  Github
                </Link>
              </div>
            </div>
          </div>
        <div>
          <div className="my-4 flex justify-between items-center">
            <span className="block text-sm border border-[#272A3C] py-1 px-2 rounded-md bg-[#272A3C] text-[#9fa3c4]">
              {project?.projectType}
            </span>
            <span className="block border-[#ffcc01] text-[#ffcc01] text-xs py-1.5 px-2 rounded  border bg-[#4a3f15] cursor-pointer">Thanks</span>
          </div>
        </div>
        <div>
          <div className="flex flex-wrap items-start gap-2 h-[70px] overflow-clip">
            {project?.stack.map((tech:string, index:number) => (
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
          <div onClick={() => handleLike(project?._id)} >
            {liked 
             ? <GoHeartFill className="cursor-pointer w-5 h-5 text-color-6"/>
             : <GoHeart className="cursor-pointer w-5 h-5 text-[#797D9B] hover:text-color-6 transition-all duration-300 "/>}
          </div>
           <span className="text-sm text-[#797D9B]">{project?.likes}</span>
          </div>
          <div onClick={()=>handleSave(project?._id)}>
            <LuBookmark className="w-5 h-5 text-[#797D9B] transition-all duration-300 hover:text-[#5A67D8]" />
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default Card;
