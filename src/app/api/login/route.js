import { usersInfo } from "@/db/schema";
// import { createDB } from "@/db/clientlocal";
import { eq } from "drizzle-orm";
import { handleErrorResponse } from "@/lib/utils";
import { getDB } from "@/db/client";
import { corsHeaders } from "@/lib/cors";

export const runtime = "edge";

export async function POST(req, context) {
  try {
    const headers = corsHeaders(req);

    const db = getDB();
    // const db = getDB(context.env);
    // const db = createDB(context.env);  //Local
    const { email, password } = await req.json();

    if (!email || !password) {
      return handleErrorResponse(400, "Missing email or password", headers);
    }

    // Find user
    const user = await db
      .select()
      .from(usersInfo)
      .where(eq(usersInfo.email, email))
      .get();

    if (!user || user.password !== password) {
      return handleErrorResponse(401, "Invalid email or password", headers);
    }

    return new Response(
      JSON.stringify({ success: true, message: "Login successful" }),
      {
        status: 200,
        headers: { ...headers, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return handleErrorResponse(500, "Server error", corsHeaders(req));
  }
}

// Handle OPTIONS request for CORS preflight
export async function OPTIONS(req) {
  const headers = await corsHeaders(req);

  return new Response(null, {
    status: 204,
    headers: headers, // Include CORS headers here
  });
}