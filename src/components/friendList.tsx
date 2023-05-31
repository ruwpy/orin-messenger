"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const FriendList = ({ friends }: { friends: User[] }) => {
  const router = useRouter();

  return (
    <>
      {friends.map((friend) => (
        <div
          onClick={() => router.push(`/dashboard/chats/${friend.id}`)}
          key={friend.id}
          className="flex items-center justify-between hover:bg-zinc-800 p-2 rounded-md cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Image
              className="rounded-md"
              width={36}
              height={36}
              src={friend.image}
              alt="user pfp"
            />
            <span>{friend.name}</span>
          </div>
        </div>
      ))}
    </>
  );
};

export default FriendList;
