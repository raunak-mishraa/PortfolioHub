import Logo from "../../public/logo.svg";
import Image from "next/image";
import Button from "./Button";
import Link from "next/link";

function Navbar() {
  return (
    <div className="flex items-center justify-between px-5 lg:px-7.5 xl:px-10 lg:py-4 fixed top-0 left-0 w-full z-50 border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm">
      <div className="flex items-center">
        <Link href='/'>
          <Image height={32} src={Logo} alt="codescroll" />
        </Link>
        <Link
          className="button ml-10 transition-colors hover:text-color-1 pt-1"
          href="projects"
        >
          Projects
        </Link>
      </div>
      <div className="space-x-4">
        <Link
          href="/create"
          className="cursor-pointer md:py-2 md:px-4 rounded-md hover:text-color-1 drop-shadow-lg border inline-block border-n-3 bg-n-7 transition-colors button"
        >
          Create
        </Link>
        <Link
          href="/signup"
          className="cursor-pointer md:py-2 md:px-4 rounded-md hover:text-color-1 drop-shadow-lg border inline-block border-n-3 bg-n-7 transition-colors button"
        >
          SignUp
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
