import * as React from "react";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

import UnstyledLink from "@/components/links/UnstyledLink";

export default function Sidebar() {
  return (
    <div className="hidden lg:flex fixed flex-col top-[35%] left-0">
      <ul>
        <li className="w-[160px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-300 bg-blue-600 px-4">
          <UnstyledLink
            className="flex justify-between items-center w-full text-gray-300"
            href="https://www.linkedin.com/in/robbypambudi/"
          >
            Linkedin <FaLinkedin size={30} />
          </UnstyledLink>
        </li>
        <li className="w-[160px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-300 bg-[#333333] px-4">
          <UnstyledLink
            className="flex justify-between items-center w-full text-gray-300"
            href="https://github.com/robbypambudi"
          >
            Github <FaGithub size={30} />
          </UnstyledLink>
        </li>
        <li className="w-[160px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-300 bg-orange-400 px-4">
          <UnstyledLink
            className="flex justify-between items-center w-full text-gray-300"
            href="mailto:robby.pambudi10@gmail.com"
          >
            Email <HiOutlineMail size={30} />
          </UnstyledLink>
        </li>
        <li className="w-[160px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-300 bg-[#565f69] px-4">
          <UnstyledLink
            className="flex justify-between items-center w-full text-gray-300"
            href="/"
          >
            Resume <BsFillPersonLinesFill size={30} />
          </UnstyledLink>
        </li>
      </ul>
    </div>
  );
}
