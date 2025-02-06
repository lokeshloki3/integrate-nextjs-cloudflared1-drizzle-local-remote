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
    // const db = createDB(context.env); //Local
    const { email, password } = await req.json();

    if (!email || !password) {
      return handleErrorResponse(400, "Missing email or password", headers);
    }

    // Check if email already exists
    const existingUser = await db
      .select()
      .from(usersInfo)
      .where(eq(usersInfo.email, email))
      .get();
    if (existingUser) {
      return handleErrorResponse(400, "Email already in use", headers);
    }

    // Save plain text password (not recommended for production)
    await db.insert(usersInfo).values({ email, password }).run();

    return new Response(
      JSON.stringify({
        success: true,
        message: "User registered successfully",
      }),
      {
        status: 201,
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