import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  
  // Get the authorization header
  const authorizationHeader = req.headers.get("authorization");

  // Check if the authorization header is missing
  if (!authorizationHeader) {
    return NextResponse.json(
      { error: "Authorization header missing" },
      { status: 401 }
    );
  }

  // Get the token from the authorization header
  const jwtToken = authorizationHeader.split(" ")[1];

  try {
    const decodedUser = jwt.verify(jwtToken, "muskangarg");
    return NextResponse.json({ user: decodedUser });
  } catch (err) {
    return NextResponse.json(
      { error: "Token verification failed" },
      { status: 401 }
    );
  }
}
