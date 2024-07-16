import React from "react";
import { socials } from "./constants";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
      <div className="border-t border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm  py-4 container flex sm:justify-between justify-center items-center gap-10 max-sm:flex-col">
        <p className="caption text-n-4 lg:block">
          © {new Date().getFullYear()}. All rights reserved.
        </p>

        <ul className="flex gap-5 flex-wrap">
          {socials.map((item) => (
            <Link
              key={item.id}
              href={item.url}
              target="_blank"
              className="flex items-center justify-center w-10 h-10 bg-n-7 rounded-full transition-colors hover:bg-n-6"
            >
              <Image src={item.iconUrl} width={16} height={16} alt={item.title} />
            </Link>
          ))}
        </ul>
      </div>
  );
};

export default Footer;
