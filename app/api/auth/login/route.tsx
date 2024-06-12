import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// Handle POST requests to /api/auth/login
export async function POST(req: NextRequest) {
  try {

    const body = await req.json();

    const { username } = body;

    // Generate a JWT token
    const token = jwt.sign({ username }, "muskangarg", {
      expiresIn: "1h",
    });

    // Return the token and user
    return NextResponse.json({
      user: { username },
      token,
      message: "Login successful!",
    });
  } 
  
  catch (error) {
    
    // Log the error to the console
    console.error("Unexpected Error:", error);
    return NextResponse.json(
      {
        message: "An unexpected error occurred. Please try again.",
      },
      {
        status: 500,
      }
    );
  }
}
