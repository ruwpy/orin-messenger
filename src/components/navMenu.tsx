"use client";

import { useState } from "react";
import { Icons } from "./icons";
import Link from "next/link";
import { User } from "next-auth";
import Image from "next/image";

const NavMenu = ({ user }: { user: User }) => {
  const [navExpanded, setNavExpanded] = useState(false);

  return (
    <div
      className={`${
        navExpanded ? "w-60" : "w-14"
      } relative h-[100dvh] bg-midnight border-r-[1px] border-zinc-800 p-2 overflow-hidden`}
    >
      <div className={`flex flex-col gap-2 mt-2`}>
        <Link
          className={`text-white font-medium text-xl flex gap-2 items-center hover:bg-zinc-800 rounded-md  ${
            navExpanded ? "mx-0 w-full" : "mx-auto"
          }`}
          href="/chats"
        >
          <span className="flex justify-center items-center w-10 h-10">
            <Icons.message width={20} height={20} color="white" />
          </span>
          {navExpanded && <span>Chats</span>}
        </Link>

        <Link
          className={`text-white font-medium text-xl flex gap-2 items-center hover:bg-zinc-800 rounded-md  ${
            navExpanded ? "mx-0 w-full" : "mx-auto"
          }`}
          href="/friends"
        >
          <span className="flex justify-center items-center w-10 h-10">
            <Icons.friends width={20} height={20} color="white" />
          </span>
          {navExpanded && <span>Friends</span>}
        </Link>

        <Link
          className={`text-white font-medium text-xl flex gap-2 items-center hover:bg-zinc-800 rounded-md  ${
            navExpanded ? "mx-0 w-full" : "mx-auto"
          }`}
          href="/requests"
        >
          <span className="flex justify-center items-center w-10 h-10">
            <Icons.requests width={20} height={20} color="white" />
          </span>
          {navExpanded && <span>Requests</span>}
        </Link>
      </div>
      <div className="absolute m-2 bottom-0 right-0 flex flex-col gap-4">
        <span>
          <Image
            width={40}
            height={40}
            className="flex justify-center items-center cursor-pointer hover:bg-zinc-800 rounded-md"
            src={user.image!}
            alt="user profile picture"
          />
        </span>
        <span
          onClick={() => setNavExpanded((prev) => !prev)}
          className="w-10 h-10 flex justify-center items-center cursor-pointer hover:bg-zinc-800 rounded-md"
        >
          <Icons.expand
            color="white"
            className={!navExpanded ? "rotate-180" : ""}
            width={20}
            height={20}
          />
        </span>
      </div>
    </div>
  );
};

export default NavMenu;
