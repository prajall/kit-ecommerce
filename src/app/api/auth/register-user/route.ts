import { prisma } from "@/lib/prisma";
import { ApiError, ApiResponse } from "@/lib/apiResponse";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();
  console.log("post request made");
  try {
    if (!email || !password) {
      return new NextResponse("Email and Password are Required", {
        status: 400,
      });
    }
    if (password.length < 8) {
      return new NextResponse("Password must be 8 characters long", {
        status: 400,
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });
    if (existingUser) {
      console.log("Existing user");
      return new NextResponse("User already Exist", { status: 409 });
    }

    const registeredUser = await prisma.user.create({
      data: { email, password },
    });
    if (!registeredUser) {
      return new NextResponse("Failed to create User", { status: 500 });
    }

    return NextResponse.json(
      { message: "User Registered Successfully", data: registeredUser },
      { status: 200 }
    );
    // return new NextResponse("User created Successfully", { status: 200 });
  } catch (error: any) {
    if (error.message) {
      // return NextResponse.json(ApiError(error.message, 400));
      console.log(error.message);
      return new NextResponse(error.message, { status: 400 });
    } else {
      console.log("/api/register-user ERROR: ", error);
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  }
}

export async function GET() {
  console.log("get called");
}
