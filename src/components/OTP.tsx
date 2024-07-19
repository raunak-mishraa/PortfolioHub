import React, { useEffect, useRef, useState } from "react";

interface OTPProps {
  length: number;
  onChangeOTP: (otp: string) => void;
}

function OTP({ length, onChangeOTP }: OTPProps) {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
//   console.log(otp, "otp");
  const refs: any[] = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];
  useEffect(() => {
    if (refs[0].current) {
      refs[0].current.focus();
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    if (isNaN(Number(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (index < otp.length - 1) {
      refs[index + 1].current.focus();
    }
    onChangeOTP(newOtp.join(""));
  };

  const handleOnKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      
      if (index > 0 && otp[index] === "") {
        refs[index - 1].current.focus();
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
        onChangeOTP(newOtp.join(""));
      }
    }
  };
  return (
   <>
        <div className="flex items-center justify-center gap-3">
          {otp.map((data, index) => {
            return (
              <input
                type="text"
                value={data}
                className="w-14 focus:border-purple-400 h-14 text-center text-2xl font-extrabold bg-n-8 border border-n-6 rounded p-4 outline-none"
                maxLength={1}
                key={index}
                ref={refs[index]}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleOnKeyDown(e, index)}
              />
            );
          })}
        </div>
   </>
  );
}

export default OTP;
