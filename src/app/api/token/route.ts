import { headers } from "next/headers";
import jwt from "jsonwebtoken";
import { auth } from "@/lib/auth";

// Gives the logged-in user a short-lived token for the Express API
export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return Response.json({ message: "Not logged in" }, { status: 401 });
  }

  const token = jwt.sign(
    { email: session.user.email, name: session.user.name },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
  );
  return Response.json({ token });
}