import Link from "next/link";
import { ConnectWallet } from '@3rdweb/react'
export default function Navbar() {
  return (
    <nav className="font-sans flex justify-between pt-4 pb-20 px-4 md:px-20 w-full h-10 ">
      <div className="flex gap-4 md:gap-10">
        <Link href="/">
          <a className="text-2xl no-underline text-grey-darkest hover:text-blue-900">
            Monuments
          </a>
        </Link>
        <Link href="/champions">
          <a className="text-2xl no-underline text-grey-darkest hover:text-blue-900">
            Monument Champions
          </a>
        </Link>
      </div>
      <ConnectWallet />
    </nav>
  );
}
