import { usersInfo } from "@/db/schema";
// import { createDB } from "@/db/clientlocal";
import { eq } from "drizzle-orm";
import { handleErrorResponse } from "@/lib/utils";
import { getDB } from "@/db/client";

export const runtime = 'edge';

export async function POST(req, context) {
  try {
    const db = getDB();
    // const db = getDB(context.env);
    // const db = createDB(context.env);  //Local
    const { email, password } = await req.json();

    if (!email || !password) {
      return handleErrorResponse(400, "Missing email or password");
    }

    // Find user
    const user = await db
      .select()
      .from(usersInfo)
      .where(eq(usersInfo.email, email))
      .get();

    if (!user || user.password !== password) {
      return handleErrorResponse(401, "Invalid email or password");
    }

    return new Response(JSON.stringify({ success: true, message: "Login successful" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return handleErrorResponse(500, "Server error");
  }
}
