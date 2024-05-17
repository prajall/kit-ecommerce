import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    console.log("sadasd");
    //  console.log(data)
    return NextResponse.json({ message: "success" });
  } catch (error) {
    console.log("error routets: ", error);
    return NextResponse.json({ "error routets": "error" });
  }
};
export const POST = async (req: NextRequest) => {
  try {
    const data = await req.json();
    console.log(data);
    //  console.log(data)
    return NextResponse.json({ message: "success" });
  } catch (error) {
    console.log("error routets: ", error);
    return NextResponse.json({ "error routets": "error" });
  }
};
// this is a minor changes
