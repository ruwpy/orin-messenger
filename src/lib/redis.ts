import env from "@/env";

type Command = "zrange" | "sismember" | "get" | "smembers";

export const fetchRedis = async (command: Command, ...args: (string | number)[]) => {
  const commandUrl = `${env.UPSTASH_REDIS_REST_URL}/${command}/${args.join("/")}`;

  const response = await fetch(commandUrl, {
    headers: {
      Authorization: `Bearer ${env.UPSTASH_REDIS_REST_TOKEN}`,
    },
    cache: "no-cache",
  });

  if (!response.ok) throw new Error(`Error executing redis command: ${response.statusText}`);

  const data = (await response.json()) as { result: string | null };
  return data.result;
};
