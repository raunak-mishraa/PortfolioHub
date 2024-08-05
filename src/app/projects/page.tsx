"use client";
import { FaCaretDown } from "react-icons/fa";
import { data } from "@/helper/data";
import { FaAngleDown } from "react-icons/fa";
import Card from "@/components/Card";
import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "@/components/Pagination";

function page({ searchParams }: { searchParams: any }) {
  const [totalPages, setTotalPages] = useState<number>(0);
  const [projects, setProjects] = useState<any[]>([]);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  const page = parseInt(searchParams.page) || 1;
  useEffect(()=>{
    async function fetchData() {
      try {
        setLoading(true);
        const result = await axios.get(`/api/get-projects?page=${page}&search=${search}&category=${category}`);
        console.log(result.data);
        setTotalPages(result.data.totalPages);
        setProjects(result.data.projects);
      } catch (error) {
        console.log(error, 'error');
      } finally {
        setSearchValue('');
        // setSearch('');
        // setCategory('');
        setLoading(false);
      }
    }
    fetchData();
  }, [page, search, category]);
  
  const handleSearch = () => {
    if(searchValue.trim() === "") return;
    setSearch(searchValue);
  }


  

  return (
    <div className="py-32 px-10 container dark:bg-dot-white/[0.2]">

      {/* filter section */}
      <div className="flex justify-between items-start relative">
        <div className="flex gap-5">
          {data.map((category, index) => (
            <div
              key={index}
              className="relative flex items-start flex-col gap-2 transition delay-75 ease-in group "
            >
              <div className="absolute inset-0 -m-2 z-0" />
              <span className="border border-n-6 py-2.5 px-4 bg-n-8 text-sm capitalize rounded flex items-center gap-2 cursor-pointer ">
                {category.head}
                <FaCaretDown />
              </span>
              <div className="absolute w-max bg-n-8 top-8 z-10 hidden group-hover:md:block  border mt-4 rounded-md p-2 border-n-6">
                <div className="grid grid-cols-3 gap-2 cursor-pointer">
                  {category.datas.map((data, index) => (
                    <span
                      key={index}
                      onClick={()=>setCategory(data.slug)}
                      className="bg-n-7 text-sm p-2.5 rounded-md hover:bg-n-6 transition-colors"
                    >
                      {data.title}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-end">
          <input
            type="search"
            placeholder="Search projects..."
            name="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="rounded text-sm px-4 p-2.5 outline-none caret-purple-700 selection:bg-purple-700 bg-n-8 border border-n-6"
          />
          <div className="mt-5 flex items-center space-x-2">
            <span className=" capitalize font-medium text-sm opacity-40">
              Sort by
            </span>
            <span className="font-semibold opacity-90 flex items-center">
              Recent <FaAngleDown />
            </span>
          </div>
        </div>
      </div>

        {/* Project card  */}
       <div>
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 mt-10">
            {projects.map((project, index) => (
              <Card key={index} project={project} />
            ))}
          </div>
       </div>
        
        {/* pagination */}
        <Pagination totalPages={totalPages} currentPage={page}/> 
      </div>
  );
}

export default page;
