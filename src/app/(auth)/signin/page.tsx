'use client';
import Image from "next/image";
import Link from "next/link";
import mlogo from "../../../../public/mlogo.svg";
import google from "../../../../public/google.svg";
import github from "../../../../public/github.svg";
import { signIn } from 'next-auth/react';
import { signInSchema } from "@/schemas/signUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function page() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    console.log(data);
      const result = await signIn('credentials', {
        redirect: false,
        identifier: data.email,
        password: data.password,
      });

      if (result?.error) {
        if (result.error === 'CredentialsSignin') {
          toast.error("Incorect credentials");
        } else {
          toast.error(result.error);
        }
      }
      if (result?.url) {
        toast.success("Logged in successfully");
        router.replace('/developer-profile');
      }
      console.log(result)
  };

  return (
    <div className="py-10 dark:bg-grid-white/[0.02]">
      <div className="h-svh flex items-center justify-center">
        <div className="flex flex-col items-center">
          {/* <h1 className='h6 text-center mb-6'>CodeScroll</h1> */}
          <div className="flex items-center gap-x-2 mb-4">
            <Image height={"25"} src={mlogo} alt="Logo" />
            <h1 className="h5 font-bold">SignIn</h1>
          </div>
          <div className="w-96 border border-n-6 rounded-lg bg-n-7 lg:backdrop-blur-sm px-8 py-6 ">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3" action="">
              <div>
                <label
                  htmlFor="email"
                  className="block font-medium text-sm mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="raunakmshraa.dev@gmail.com"
                  className=" w-full bg-n-8 rounded-lg p-2.5 outline-0 text-sm"
                />
                  {errors.email && (
                    <p className="text-red-500">{errors?.email.message}</p>
                  )}
              </div>
              <div>
                <label
                  htmlFor="pass"
                  className="block font-medium text-sm mb-2"
                >
                  Password
                </label>
                <input
                  id="pass"
                  type="password"
                  {...register("password")}
                  placeholder="••••••••"
                  className="w-full bg-n-8 rounded-lg p-2.5 outline-0 text-sm"
                />
                  {errors.password && (
                    <p className="text-red-500">{errors?.password.message}</p>
                  )}
              </div>
              <span className="text-sm text-center block">
                Don't have an account?&nbsp;
                <Link href="/signup">Create</Link>
              </span>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full text-white bg-[#933aff] px-5 py-2.5 text-center rounded-lg"
              >
                {isSubmitting ? "Loading..." : "Sign In"}
              </button>
            </form>
            <span className="text-sm text-center block my-4">Or</span>
            <div className="flex space-x-2">
              {/* <button
                onClick={() => signIn('github')}
                className="w-2/4 text-white bg-n-8 border-n-6 border-2 px-5 py-2.5 text-center rounded-lg flex justify-center"
              >
                <Image src={github} width={20} height={20} alt="github icon" />
              </button> */}
              <button
                onClick={() => signIn('google')}
                className="w-full text-white border-n-6 bg-n-8 border-2 px-5 py-2.5 text-center rounded-lg flex items-center  justify-center"
              >
                {/* <Image src={google} width={20} height={20} alt="google icon" /> */}
                Sign In with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
