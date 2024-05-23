"use server";
import { auth } from "@/auth";

export const isAdmin = async () => {
  console.log("chlasddsyo");
  const session = await auth();
  if (!session || !session.user) {
    return "No user Please Login";
  }
  if (session.user.email == "prajalmhrzn@gmail.com") {
    return true;
  } else {
    return "You donot have permission to perform this action";
  }
};
