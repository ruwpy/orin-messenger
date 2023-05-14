import AddFriend from "@/components/addFriend";

const FriendsPage = () => {
  return (
    <div className="w-80 flex p-4 flex-col h-[100dvh] bg-midnight border-r-[1px] border-zinc-800 overflow-hidden">
      <div className="relative flex justify-between">
        <h2 className="font-medium text-2xl">Friends</h2>
        <AddFriend />
      </div>
      <div className="flex grow justify-center items-center">
        <span className="opacity-60">There's no one here</span>
      </div>
    </div>
  );
};

export default FriendsPage;
