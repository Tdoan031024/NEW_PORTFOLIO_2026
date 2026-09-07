import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import type { ResultSetHeader } from "mysql2";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }
    if (name.length > 120) {
      return NextResponse.json(
        { error: "Name cannot exceed 120 characters" },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || email.trim().length === 0) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) || email.length > 200) {
      return NextResponse.json(
        { error: "A valid email (max 200 characters) is required" },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const cleanSubject =
      subject && typeof subject === "string" ? subject.slice(0, 200) : null;

    // Insert into MySQL
    const [result] = await pool.execute<ResultSetHeader>(
      "INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)",
      [name.trim(), email.trim(), cleanSubject, message.trim()]
    );

    return NextResponse.json(
      {
        id: result.insertId,
        name: name.trim(),
        email: email.trim(),
        subject: cleanSubject,
        message: message.trim(),
        success: true,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error saving contact message:", error);
    return NextResponse.json(
      { error: "Failed to save message. Please try again later." },
      { status: 500 }
    );
  }
}
