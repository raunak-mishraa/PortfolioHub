import React from "react";

function page() {
  return (
    <div className="py-32 flex w-full items-center justify-around">
      <div>
        <h1 className="h1">Create Project</h1>
      </div>
      <div>
        <div className="">
          <div className="relative z-10 flex w-full cursor-pointer items-center overflow-hidden rounded-xl border border-slate-800 p-[1.5px]">
            <div className="animate-rotate absolute inset-0 h-full w-full rounded-full bg-[conic-gradient(#AC6FFF_20deg,transparent_120deg)]"></div>
            <div className="relative z-20 flex w-full rounded-[0.60rem] bg-n-7 p-2">
              <div className="mr-2 h-full  flex-1 rounded-lg bg-transparent px-2 py-3 ">
                <form action="" className="space-y-3 bg-n-7 px-8 py-4">
                  <div>
                    <label
                      htmlFor="liveUrl"
                      className="block font-medium text-sm mb-2"
                    >
                      Live Url
                    </label>
                    <input
                      id="liveUrl"
                      type="text"
                      placeholder="url"
                      className="w-full bg-n-8 rounded-lg p-2.5 outline-0 text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="githubUrl"
                      className="block font-medium text-sm mb-2"
                    >
                      Github Url
                    </label>
                    <input
                      id="githubUrl"
                      type="text"
                      placeholder="github url"
                      className="w-full bg-n-8 rounded-lg p-2.5 outline-0 text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="imageUrl"
                      className="block font-medium text-sm mb-2"
                    >
                      Image Url
                    </label>
                    <input
                      id="imageUrl"
                      type="text"
                      placeholder="github url"
                      className="w-full bg-n-8 rounded-lg p-2.5 outline-0 text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="stack"
                      className="block font-medium text-sm mb-2"
                    >
                      Stack
                    </label>
                    <input
                      id="stack"
                      type="text"
                      placeholder="stack"
                      className="w-full bg-n-8 rounded-lg p-2.5 outline-0 text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="stack"
                      className="block font-medium text-sm mb-2"
                    >
                      Category
                    </label>
                  </div>
                  <button className="p-2 text-center bg-purple-600 rounded-sm w-full">Create</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
