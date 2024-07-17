"use client";
import OTP from "@/components/OTP";
import Section from "@/components/Section";
import { useState } from "react";

function page() {
  const [otp, setOtp] = useState("");
  const handleChangeOTP = (newOTP: string) => {
    console.log(newOTP);
    setOtp(newOTP);
  }
  return (
    <Section className="flex items-center justify-center h-svh dark:bg-grid-white/[0.01]">
    <div className="max-w-md mx-auto text-center bg-n-8 border border-n-6  px-4 sm:px-8 py-10 rounded-xl shadow">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">OTP Verification</h1>
        <p className="text-[15px] text-slate-500">
          Enter the 6-digit verification code that was sent to your email.
        </p>
      </div>
      <OTP length={6} onChangeOTP={handleChangeOTP}/>
      <div className="max-w-[260px] mx-auto mt-4">
        <button
          type="submit"
          className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-color-1 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-purple-600 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150"
        >
          Verify Account
        </button>
      </div>
    </div>
  </Section>
  );
}

export default page;
