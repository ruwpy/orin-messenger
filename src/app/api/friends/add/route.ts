import { addFriendValidation } from "@/lib/validations/addFriend";
import { getUser } from "@/lib/session";
import { fetchRedis } from "@/lib/redis";
import { db } from "@/lib/db";
import { z } from "zod";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { email: userEmail } = addFriendValidation.parse(body.email);

    const idToAdd = await fetchRedis("get", `user:email:${userEmail}`);
    console.log(userEmail);

    const user = await getUser();

    // check if user logged in
    if (!user) return new Response("Unauthorized", { status: 401 });
    // check if user exist
    if (!idToAdd) return new Response("User not found", { status: 400 });
    // check if user trying to add himself
    if (user.id === idToAdd)
      return new Response("You can't add yourself as a friend", { status: 400 });
    // check if user is already added
    const isAlreadyAdded = await fetchRedis(
      "sismember",
      `user:${idToAdd}:incoming_friend_requests`,
      user.id
    );
    if (isAlreadyAdded) return new Response("Friend request already sent", { status: 400 });
    // check if user is already in friend list
    const isAlreadyFriend = await fetchRedis("sismember", `user:${user.id}:friends`, idToAdd);
    if (isAlreadyFriend)
      return new Response("You are already friends with this user", { status: 400 });

    db.sadd(`user:${idToAdd}:incoming_friend_requests`, user.id);

    return new Response("OK");
  } catch (error) {
    if (error instanceof z.ZodError)
      return new Response("Invalid request payload", { status: 422 });

    return new Response("Invalid request", { status: 400 });
  }
};
