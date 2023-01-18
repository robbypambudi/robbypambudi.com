import * as React from "react";
import { FaTimes } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";

import UnstyledLink from "@/components/links/UnstyledLink";
import NextImage from "@/components/NextImage";
import clsxm from "@/lib/clsxm";

const links = [
  { href: "#", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Work" },
  { href: "#", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleShowNav = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  return (
    <nav className={clsxm("fixed top-0 z-30 w-full bg-primary-900")}>
      <div className="mx-auto flex h-16 w-11/12 items-center justify-between gap-x-1 md:h-24 md:w-[98%] lg:w-11/12">
        <UnstyledLink href="/" className="font-bold hover:text-primary-100">
          <NextImage
            className="w-20 md:w-32"
            alt="Robby Pambudi Logo"
            src="/images/logo.png"
            width="75"
            height="60"
            priority
          />
        </UnstyledLink>
        <div className="hidden md:block">
          <ul className="hidden items-center justify-between space-x-2 font-semibold md:flex lg:space-x-6 xl:space-x-10">
            {links.map(({ href, label }) => (
              <li key={`${href}${label}`}>
                <UnstyledLink
                  href={href}
                  className="text-white hover:text-primary-100"
                >
                  {label}
                </UnstyledLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative z-30 mr-0 flex md:hidden">
          {!isOpen && (
            <GiHamburgerMenu
              className="text-3xl text-white"
              onClick={toggleShowNav}
            />
          )}
        </div>
      </div>
      <div
        className={`flex translate-y-[calc(100%-4rem)] md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full opacity-0"
        } absolute bottom-0 left-0 h-screen w-full flex-col bg-blue-900 pt-[6vh] text-white transition duration-300`}
      >
        <div className="relative z-30 flex h-screen w-full flex-col items-center">
          <ul>
            <UnstyledLink
              href="/"
              className="font-bold hover:text-primary-100 text-white"
            >
              <NextImage
                className="w-20"
                alt="ilits logo"
                src="/images/logo.png"
                width="100"
                height="60"
                priority
              />
            </UnstyledLink>
            {links.map(({ href, label }) => (
              <li key={`${href}${label}`} className="mt-4">
                <UnstyledLink
                  href={href}
                  className="flex w-full items-center justify-center font-semibold hover:text-gray-600"
                >
                  {label}
                </UnstyledLink>
              </li>
            ))}
          </ul>
          {isOpen && (
            <FaTimes
              className="absolute bottom-20 right-1/2 mx-auto h-12 w-12 translate-x-1/2 rounded-full border-[2px] border-black bg-white p-3 text-3xl font-thin text-black"
              onClick={toggleShowNav}
            />
          )}
        </div>
      </div>
    </nav>
  );
}
