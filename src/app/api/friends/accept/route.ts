import { db } from "@/lib/db";
import { fetchRedis } from "@/lib/redis";
import { getUser } from "@/lib/session";
import { z } from "zod";

export const POST = async (req: Response) => {
  try {
    const body = await req.json();

    console.log(body);

    const { id: idToAdd } = z.object({ id: z.string() }).parse(body);

    const user = await getUser();
    if (!user) return new Response("Unauthorized", { status: 401 });

    // check if users are not friends
    const isAlreadyFriends = await fetchRedis("sismember", `user:${user.id}:friends`, idToAdd);
    if (isAlreadyFriends) return new Response("Already friends", { status: 400 });

    // check if user has friend request
    const friendRequest = await fetchRedis(
      "sismember",
      `user:${user.id}:incoming_friend_requests`,
      idToAdd
    );
    if (!friendRequest) return new Response("Can't find a friend request", { status: 400 });

    //check if other user already accepted their request
    const doesOtherUserHasRequest = await fetchRedis(
      "sismember",
      `user:${idToAdd}:incoming_friend_requests`,
      user.id
    );
    if (doesOtherUserHasRequest) await db.srem(`user:${idToAdd}:incoming_friend_requests`, user.id);

    await db.srem(`user:${user.id}:incoming_friend_requests`, idToAdd);
    await db.sadd(`user:${user.id}:friends`, idToAdd);
    await db.sadd(`user:${idToAdd}:friends`, user.id);

    return new Response("OK");
  } catch (error) {
    console.log(error);
  }
};
