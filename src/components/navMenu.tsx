"use client";

import { useEffect, useState } from "react";
import { Icons } from "./icons";
import Link from "next/link";
import { User } from "next-auth";
import Image from "next/image";
import { fetchRedis } from "@/lib/redis";

const NavMenu = ({ user }: { user: User }) => {
  const [navExpanded, setNavExpanded] = useState(false);
  const [friendRequestsCount, setFriendRequestsCount] = useState(0);

  useEffect(() => {
    const getRequests = async () => {
      const requests = (
        (await fetchRedis("smembers", `user:${user.id}:incoming_friend_requests`)) as string[]
      ).length;

      setFriendRequestsCount(requests);
    };

    getRequests();
  });

  return (
    <div
      className={`${
        navExpanded ? "w-60" : "w-14"
      } flex-shrink-0 relative h-[100dvh] bg-midnight border-r-[1px] border-zinc-800 p-2 overflow-hidden`}
    >
      <div className={`flex flex-col gap-2 mt-2`}>
        <Link
          className={`text-white font-medium text-xl flex gap-2 items-center hover:bg-zinc-800 rounded-md  ${
            navExpanded ? "mx-0 w-full" : "mx-auto"
          }`}
          href="/dashboard/chats"
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
          href="/dashboard/friends"
        >
          <span className="flex justify-center items-center w-10 h-10">
            <Icons.friends width={20} height={20} color="white" />
          </span>
          {navExpanded && <span>Friends</span>}
        </Link>

        <Link
          className={`relative text-white font-medium text-xl flex gap-2 items-center hover:bg-zinc-800 rounded-md  ${
            navExpanded ? "mx-0 w-full" : "mx-auto"
          }`}
          href="/dashboard/requests"
        >
          <span className="flex justify-center items-center w-10 h-10">
            <Icons.requests width={20} height={20} color="white" />
          </span>
          {navExpanded && <span>Requests</span>}
          {friendRequestsCount !== 0 && (
            <span
              className={`${
                navExpanded ? "" : "absolute -top-[2px] -right-[2px]"
              } w-5 h-5 flex justify-center items-center rounded-md bg-mint text-midnight text-xs`}
            >
              {friendRequestsCount}
            </span>
          )}
        </Link>
      </div>
      <div
        className={`absolute p-2 bottom-0 right-0 flex gap-2 items-center ${
          navExpanded ? "flex-row w-full justify-between" : "flex-col"
        }`}
      >
        <span className="flex gap-2 p-1 items-center cursor-pointer hover:bg-zinc-800 rounded-md">
          <Image
            width={36}
            height={36}
            className="flex justify-center items-center bg-zinc-400 rounded-md"
            src={user.image!}
            alt="user profile picture"
          />
          <span className="pr-2 whitespace-nowrap overflow-hidden text-ellipsis">
            {navExpanded && user.name}
          </span>
        </span>
        <span
          onClick={() => setNavExpanded((prev) => !prev)}
          className="w-10 h-10 flex flex-shrink-0 justify-center items-center cursor-pointer hover:bg-zinc-800 rounded-md"
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
