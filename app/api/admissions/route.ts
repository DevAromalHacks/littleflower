import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(req: NextRequest) {
  try {
    const formData = await req.json();

    // Insert data into Supabase
    const { data, error } = await supabase
      .from("admissions")
      .insert([formData]);

    if (error) {
      console.error("Supabase insert error:", error);
      throw error;
    }

    console.log("Supabase response:", data);

    return NextResponse.json(
      { message: "Application submitted successfully!" },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { message: "An unknown error occurred." },
        { status: 500 }
      );
    }
  }
}
