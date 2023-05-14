"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Button from "./ui/Button";
import { addFriendValidation } from "@/lib/validations/addFriend";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { Icons } from "./icons";
import toast from "react-hot-toast";

type FormData = z.infer<typeof addFriendValidation>;

const AddFriend = () => {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    resetField,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(addFriendValidation) });

  const addFriend = async (email: string) => {
    try {
      setIsLoading(true);
      const validatedEmail = addFriendValidation.parse({ email });

      await axios.post("/api/friends/add", { email: validatedEmail });
      toast.success("Request has sent!");
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError("email", { message: error.message });
        return;
      }

      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
        return;
      }

      toast.error("Something went wrong...");
    } finally {
      setIsLoading(false);
      setShowAddFriend(false);
      resetField("email");
    }
  };

  const onSubmit = (data: FormData) => {
    addFriend(data.email);
  };

  return (
    <>
      <Button
        onClick={() => setShowAddFriend((prev) => !prev)}
        variant="secondary"
        className="p-1.5"
      >
        <Icons.plus width={20} height={20} className={showAddFriend ? "rotate-45" : ""} />
      </Button>
      {showAddFriend && (
        <div className="absolute top-10 left-0 right-0 p-3 bg-midnight border border-zinc-800 rounded-md">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="relative flex flex-col gap-2">
              <label htmlFor="email" className="opacity-60">
                Add friend by email
              </label>
              <div className="flex gap-2 grow">
                <input
                  {...register("email")}
                  className="rounded-md w-full bg-midnight placeholder:text-white/50 focus:border-transparent focus:ring-mint"
                  name="email"
                  type="text"
                  placeholder="joeshmoe@example.com"
                />
                <Button variant="secondary">
                  {isLoading ? <Icons.spinner color="black" className="animate-spin" /> : "Add"}
                </Button>
              </div>
              {errors.email?.message && (
                <span className="mt-2 text-red-600">{errors.email?.message}</span>
              )}
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AddFriend;
