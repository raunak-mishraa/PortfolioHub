"use client";
import React, { useCallback } from "react";
import { data } from "@/helper/data";
import TagsInput from "@/components/TagsInput";
import axios from "axios";
import { LuLoader2 } from "react-icons/lu";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { DataItem } from "@/helper/data";
function Page() {
  const categories = data[0]?.datas;
  const [image, setImage] = React.useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [projectData, setProjectData] = React.useState({
    liveUrl: "",
    githubUrl: "",
    image: "",
    stack: [""],
    category: "Portfolio",
  });

  const router = useRouter();

  const selected = useCallback((tags: string[]) => {
    setProjectData((prevData) => ({
      ...prevData,
      stack: tags,
    }));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProjectData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("liveUrl", projectData.liveUrl);
      formData.append("githubUrl", projectData.githubUrl);
      formData.append("image", image || "");
      formData.append("stack", JSON.stringify(projectData.stack));
      formData.append("category", projectData.category);

      if (
        !projectData.liveUrl ||
        !projectData.githubUrl ||
        !projectData.category ||
        !image ||
        projectData.stack.length === 0
      ) {
        toast.error("All fields are required");
        return;
      }

      const response = await axios.post("/api/create-project", formData);
      console.log(response.status);
      if (response.status === 200) {
        toast.success(response.data.message);
        router.push("/developer-profile");
      }
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-32 flex w-full items-center justify-around">
      <div>
        <h1 className="h1">Create Project</h1>
      </div>
      <div>
        <div>
          <div className="relative z-10 flex w-[23rem] cursor-pointer items-center overflow-hidden rounded-xl border border-slate-800 p-[1.5px]">
            <div className="animate-rotate absolute inset-0 h-full w-full rounded-full bg-[conic-gradient(#AC6FFF_20deg,transparent_120deg)]"></div>
            <div className="relative z-20 flex w-full rounded-[0.60rem] bg-n-7 p-2">
              <div className="mr-2 h-full flex-1 rounded-lg bg-transparent px-2 py-3">
                <form
                  onSubmit={handleSubmit}
                  className="space-y-3 bg-n-7 px-4 py-4"
                >
                  <div>
                    <label
                      htmlFor="liveUrl"
                      className="block font-medium text-sm mb-2"
                    >
                      Live Url
                    </label>
                    <input
                      required
                      id="liveUrl"
                      type="url"
                      value={projectData.liveUrl}
                      name="liveUrl"
                      onChange={handleChange}
                      placeholder="website url"
                      className="w-full text-white bg-n-8 rounded-lg p-2.5 outline-0 text-sm"
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
                      required
                      id="githubUrl"
                      type="url"
                      value={projectData.githubUrl}
                      name="githubUrl"
                      onChange={handleChange}
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
                      required
                      id="imageUrl"
                      type="file"
                      name="image"
                      placeholder="image url"
                      className="w-full bg-n-8 dark:file:bg-n-6 dark:file:text-white rounded-lg p-2.5 outline-0 text-sm"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setImage(file);
                        }
                      }}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="stack"
                      className="block font-medium text-sm mb-2"
                    >
                      Stack
                    </label>
                    <TagsInput selected={selected} />
                  </div>
                  <div>
                    <label
                      htmlFor="category"
                      className="block font-medium text-sm mb-2"
                    >
                      Category
                    </label>
                    <select
                      required
                      name="category"
                      value={projectData.category}
                      id="category"
                      onChange={handleChange}
                      className="dark:bg-n-8 p-2.5 rounded-lg outline-0 text-sm w-full"
                    >
                      {categories.map((category: DataItem) => (
                        <option key={category.title} value={category.slug}>
                          {category.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`${
                      isSubmitting ? "bg-purple-300" : "bg-purple-600"
                    } p-2 text-center hover:bg-purple-500 transition-colors bg-purple-600 rounded-sm w-full flex items-center justify-center gap-x-1 font-medium`}
                  >
                    {isSubmitting && <LuLoader2 className="animate-spin" />}
                    {isSubmitting ? "Creating..." : "Create"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
