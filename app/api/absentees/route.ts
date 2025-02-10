import { NextResponse } from "next/server";
import twilio from "twilio";

// Load environment variables
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = twilio(accountSid, authToken);

export async function POST(req: Request) {
  try {
    const { name, className, div, phone } = await req.json();

    const url = `http://lfemhs.com/reason/${name}/${className}/${div}/${phone}`;
    console.log([name, className, div, phone]);

    // Create WhatsApp message
    const message = await twilioClient.messages.create({
      from: "whatsapp:+14155238886",
      to: `whatsapp:+91${phone}`,
      body: `Your ward ${name} is absent in class ${className} ${div}. Kindly provide a reason: ${url}`,
    });

    return NextResponse.json({ success: true, messageSid: message.sid });
  } catch (error) {
    console.error("Twilio Error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
