import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export default async function POST(request: NextRequest) {
  console.log("request made");
  const user = request.body;
  console.log(user);
  try {
    // prisma.user.create({data:{email:user?.email, }})
  } catch (error) {
    console.log("/api/register-user ERROR: ", error);
  }
}
