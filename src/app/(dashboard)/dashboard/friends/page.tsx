import AddFriend from "@/components/addFriend";
import FriendList from "@/components/friendList";
import { fetchRedis } from "@/lib/redis";
import { getUser } from "@/lib/session";

const FriendsPage = async () => {
  const user = await getUser();
  const friendsResultIds = (await fetchRedis("smembers", `user:${user?.id}:friends`)) as string[];

  const friends = await Promise.all(
    friendsResultIds.map(async (friendId) => {
      const friend = JSON.parse(await fetchRedis("get", `user:${friendId}`)) as User;
      return friend;
    })
  );

  return (
    <div className="w-80 flex p-4 flex-col h-[100dvh] bg-midnight border-r-[1px] border-zinc-800 overflow-hidden">
      <div className="relative flex justify-between">
        <h2 className="font-medium text-2xl">Friends</h2>
        <AddFriend />
      </div>
      {friendsResultIds.length ? (
        <div className="mt-4 flex flex-col gap-4">
          <FriendList friends={friends} />
        </div>
      ) : (
        <div className="flex grow justify-center items-center">
          <span className="opacity-60">There's no one here</span>
        </div>
      )}
    </div>
  );
};

export default FriendsPage;
