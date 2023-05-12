"use client";

import Image from "next/image";
import logo from "/public/orin.svg";
import { Icons } from "@/components/icons";
import Button from "@/components/ui/Button";
import React, { useState } from "react";
import { signIn } from "next-auth/react";

const LoginPage = () => {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isGithubLoading, setIsGithubLoading] = useState(false);

  const login = async (
    provider: "google" | "github",
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setIsLoading(true);
    try {
      signIn("google");
    } catch (error) {}
  };

  return (
    <div className="h-[100dvh] w-full justify-center flex bg-mint">
      <div className="max-w-md w-full bg-midnight h-full p-8">
        <div className="relative flex flex-col h-full justify-center">
          <Image className="w-14 h-14 absolute left-0 top-0" src={logo} alt="logo" />
          <span className="text-2xl font-medium">
            Connect with <span className="text-cotton">people</span> on{" "}
            <span className="text-mint">orin</span>
          </span>
          <span className="opacity-50">to continue, choose one of login options</span>
          <div className="mt-8 flex gap-4">
            <Button
              onClick={() => login("google", setIsGoogleLoading)}
              isLoading={isGoogleLoading}
              variant={"secondary"}
            >
              {<Icons.google color="black" width={40} height={40} />}
            </Button>
            <Button isLoading={isGithubLoading} variant={"secondary"}>
              {<Icons.github color="black" width={40} height={40} />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
