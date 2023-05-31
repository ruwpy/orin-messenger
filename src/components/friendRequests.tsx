"use client";

import React, { useState } from "react";
import { Icons } from "./icons";
import Button from "./ui/Button";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import Image from "next/image";

interface FriendRequestsProps {
  requests: User[];
}

const FriendRequests = ({ requests }: FriendRequestsProps) => {
  const [incomingRequests, setIncomingRequests] = useState<User[]>(requests);

  const acceptFriendRequest = async (senderId: string) => {
    try {
      await axios.post("/api/friends/accept", { id: senderId });
      setIncomingRequests(incomingRequests.filter((request) => request.id !== senderId));
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
        return;
      }

      toast.error("Something went wrong");
    }
  };

  const declineFriendRequest = async (senderId: string) => {
    try {
      await axios.post("/api/friends/decline", { id: senderId });
      setIncomingRequests(incomingRequests.filter((request) => request.id !== senderId));
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
        return;
      }

      toast.error("Something went wrong");
    }
  };

  return (
    <>
      {incomingRequests.map((request) => (
        <div key={request.id} className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              className="rounded-md"
              width={36}
              height={36}
              src={request.image}
              alt="user pfp"
            />
            <span>{request.name}</span>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={() => acceptFriendRequest(request.id)}
              variant="secondary"
              className="p-[1.5]"
            >
              <Icons.check width={20} height={20} color="black" />
            </Button>
            <Button
              onClick={() => declineFriendRequest(request.id)}
              variant="primary"
              className="p-[1.5]"
            >
              <Icons.cross width={20} height={20} />
            </Button>
          </div>
        </div>
      ))}
    </>
  );
};

export default FriendRequests;
