"use client";
import React, { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";
// import { FcGoogle } from "react-icons/fc";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Password must be mininmum 8 characters",
  }),
  confirmPassword: z.string().min(8, {
    message: "Password must be mininmum 8 characters",
  }),
});

const LoginZ = () => {
  const { data: session } = useSession();
  if (session && session.user) {
    redirect("/");
  }

  const loginWithGoogle = async () => {
    signIn("google", { redirect: false });
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "prajalmhrzn@gmail.com",
      password: "password",
      confirmPassword: "password",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const registeredUser = await axios.post("/api/auth/register-user", {
        email: values.email,
        password: values.password,
      });
      console.log(registeredUser);
    } catch (error: any) {
      if (error.response.data) {
        console.log(
          "ERROR HANDLED SUCCESSFULLY: ",
          error.response.data.message
        );
      } else {
        console.log("/register ERROR: ", error);
      }
    }
  }

  return (
    <MaxWidthWrapper>
      <div className=" flex items-center">
        <div className=" w-[350px] sm:w-[400px] md:w-[450px] rounded-lg shadow-sm mx-auto py-7 px-5 ">
          <h2 className="font-extrabold text-xl text-center mb-5 ">
            Sign up to Kit
          </h2>
          <button
            onClick={loginWithGoogle}
            className="mx-auto text-center w-full border-2 hover:dark:bg-slate-900 duration-300 px-2 py-3 my-10 rounded-md flex justify-center "
          >
            <FcGoogle size={"23"} className="my-auto mr-2" />
            <span>Login With Google</span>
          </button>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 mt-5"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email:</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Email"
                        {...field}
                        className="border-zinc-300"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password:</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Password"
                        {...field}
                        type="password"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password:</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Confirm Password"
                        {...field}
                        type="password"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                variant="default"
                className="w-full duration-300 my-10"
              >
                Register
              </Button>
            </form>
          </Form>

          <p className="w-full text-center mt-8 text-muted-foreground">
            Already have an account?{" "}
            <Link href="/register" className="text-blue-700 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default LoginZ;
