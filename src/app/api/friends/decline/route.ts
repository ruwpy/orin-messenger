import { db } from "@/lib/db";
import { fetchRedis } from "@/lib/redis";
import { getUser } from "@/lib/session";
import { z } from "zod";

export const POST = async (req: Response) => {
  try {
    const body = await req.json();

    const { id: idToAdd } = z.object({ id: z.string() }).parse(body);

    const user = await getUser();
    if (!user) return new Response("Unauthorized", { status: 401 });

    // check if user has friend request
    const friendRequest = await fetchRedis(
      "sismember",
      `user:${user.id}:incoming_friend_requests`,
      idToAdd
    );

    if (!friendRequest) return new Response("Can't find a friend request");

    await db.srem(`user:${user.id}:incoming_friend_requests`, idToAdd);
  } catch (error) {}
};
