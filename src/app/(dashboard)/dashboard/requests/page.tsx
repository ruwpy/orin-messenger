"use server";

import FriendRequests from "@/components/friendRequests";
import HandleRequest from "@/components/friendRequests";
import { fetchRedis } from "@/lib/redis";
import { getUser } from "@/lib/session";

const RequestsPage = async () => {
  const user = await getUser();
  const incomingRequestIds = (await fetchRedis(
    "smembers",
    `user:${user?.id}:incoming_friend_requests`
  )) as string[];

  const incomingRequests = await Promise.all(
    incomingRequestIds.map(async (senderId) => {
      const sender = JSON.parse(await fetchRedis("get", `user:${senderId}`)) as User;
      return sender;
    })
  );

  return (
    <div className="w-80 flex flex-col h-[100dvh] bg-midnight border-r-[1px] border-zinc-800 p-4 overflow-hidden">
      <h2 className="font-medium text-2xl">Requests</h2>
      {incomingRequestIds.length ? (
        <div className="mt-4 flex flex-col gap-4">
          <FriendRequests requests={incomingRequests} />
        </div>
      ) : (
        <div className="flex grow justify-center items-center">
          <span className="opacity-60">No have no friend requests</span>
        </div>
      )}
    </div>
  );
};

export default RequestsPage;
