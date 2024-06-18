// import { connectMongoDB } from "@/lib/mongodb";
// import User from "@/models/users";
// import { NextResponse } from "next/server";

// export async function POST(req: any) {
//     try {
//         await connectMongoDB();
//         const { email } = await req.json();

//         const user = await User.findOne({ email }).select("_id");
//         console.log("user: ", user);

//         if (user) {
//             return NextResponse.json({ user: true });
//         } else {
//             return NextResponse.json({ user: false });
//         }
//     } catch (error) {
//         console.error("Error checking user existence", error);
//         return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
//     }
// }



import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/users";
import { NextResponse } from "next/server";

export async function POST(req:any) {
  try {
    await connectMongoDB();
    const { email } = await req.json();
    const user = await User.findOne({ email }).select("_id");
    console.log("user: ", user);
    return NextResponse.json({ user });
  } catch (error) {
    console.log(error);
  }
}