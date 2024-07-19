"use client";
import Section from "@/components/Section";
import mlogo from "../../../../public/mlogo.svg";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import React, { useEffect } from "react";
import { useDebounceCallback } from "usehooks-ts";
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/schemas/signUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { LuLoader2 } from "react-icons/lu";
import toast from "react-hot-toast";

function page() {
  const [username, setUsername] = React.useState("");
  const [usernameMessage, setUsernameMessage] = React.useState("");
  const [isCheckingUsername, setIsCheckingUsername] = React.useState(false);
  const debounced = useDebounceCallback(setUsername, 500);//used to add delay
  const router = useRouter();
  type TSignUpSchma = z.infer<typeof signUpSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TSignUpSchma>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      fullName: "",
      password: "",
    },
  });

  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (username) {
        setIsCheckingUsername(true);
        setUsernameMessage("");
        try {
          const response = await axios.get(
            `/api/check-username-unique?username=${username}`
          );
          setUsernameMessage(response.data.message);
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          setUsernameMessage(
            axiosError.response?.data.message ?? "Error checking username"
          );
        } finally {
          setIsCheckingUsername(false);
        }
      }
    };
    checkUsernameUnique();
  }, [username]);

  const onSubmit = async (data: TSignUpSchma) => {
    console.log(data)
    try {
      const response = await axios.post("/api/signup", data);
      toast.success(response.data.message);
      reset();
      router.replace(`/verify/${username}`);
    } catch (error : any) {
      console.error("Error in signup of user", error);
      toast.error(error.response?.data.message ?? "Error signing up");
    }
  };

  return (
    <div className="py-10 dark:bg-grid-white/[0.02]">
      <div className="flex items-center justify-center h-svh">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-x-2 mb-4">
            <Image height={"25"} src={mlogo} alt="Logo" />
            <h1 className="h5 font-bold">SignUp</h1>
          </div>
          {/* <h1 className='h6 text-center mb-6'>CodeScroll</h1> */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-96 border border-n-6 rounded-lg bg-n-7 lg:backdrop-blur-sm px-8 py-6 space-y-3"
          >
            <div>
              <label htmlFor="" className="block font-medium text-sm mb-2">
                Username
              </label>
              <input
                type="text"
                {...register("username")}
                onChange={(e) => debounced(e.target.value)}
                placeholder="mishraaraunak"
                className="w-full bg-n-8 rounded-lg p-2.5 outline-0 text-sm"
              />
              {isCheckingUsername && <LuLoader2 className="animate-spin"/>}
              {username!=='' && <p className={`text-sm mt-1 ${usernameMessage === "Username is unique" ? 'text-green-500':'text-red-500'}`}>{usernameMessage}</p>}
              {errors.username && (
                <p className="text-red-500">{errors.username.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="" className="block font-medium text-sm mb-2">
                Your email
              </label>
              <input
                type="email"
                {...register("email")}
                placeholder="raunakmshraa.dev@gmail.com"
                className="w-full bg-n-8 rounded-lg p-2.5 outline-0 text-sm"
              />
                {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="" className="block font-medium text-sm mb-2">
                Full name
              </label>
              <input
                type="text"
                {...register("fullName")}
                placeholder="Raunak Mishra"
                className="w-full bg-n-8 rounded-lg p-2.5 outline-0 text-sm"
              />
                {errors.fullName && (
                <p className="text-red-500">{errors.fullName.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="" className="block font-medium text-sm mb-2">
                Password
              </label>
              <input
                type="password"
                {...register("password")}
                placeholder="••••••••"
                className="w-full bg-n-8 rounded-lg p-2.5 outline-0 text-sm"
              />
                {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
            <span className="text-sm text-center block">
              Already have an account?&nbsp;
              <Link href="/signin">Login</Link>
            </span>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full text-white bg-[#933aff] px-5 py-2.5 text-center rounded-lg"
            >
              {
                isSubmitting ? 
                (
                  <>
                    <LuLoader2 className="animate-spin"/>Please wait...
                  </>
                ) : ('Create an account')
              }
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default page;
