import { NextRequest, NextResponse } from "next/server";

interface ContactRequestBody {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

// --------------- Google Sheets via Apps Script ---------------
async function appendToGoogleSheet(
  name: string,
  email: string,
  subject: string,
  message: string
): Promise<void> {
  const scriptUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  if (!scriptUrl) {
    console.warn("[Sheets] GOOGLE_SHEET_WEBHOOK_URL is not set — skipping.");
    return;
  }

  const res = await fetch(scriptUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, subject, message }),
    // Apps Script redirects — follow them
    redirect: "follow",
  });

  const text = await res.text();
  console.log("[Sheets] Response:", text);
}

// --------------- POST handler ---------------
export async function POST(req: NextRequest) {
  try {
    const body: ContactRequestBody = await req.json();
    const { name, email, subject, message } = body;

    // --- Validation ---
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json({ error: "Your name is required." }, { status: 400 });
    }

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Your email address is required." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    }

    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json(
        { error: "Please write a message of at least 10 characters." },
        { status: 400 }
      );
    }

    // --- Save to Google Sheets (non-blocking — won't fail the form if Sheets is down) ---
    try {
      await appendToGoogleSheet(
        name.trim(),
        email.trim(),
        subject?.trim() || "No Subject",
        message.trim()
      );
    } catch (sheetErr) {
      console.error("[Sheets] Failed to save row:", sheetErr);
      // We intentionally don't return an error to the user here
    }

    // --- Optional Discord / Slack / Zapier webhook ---
    const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content: `📬 **New Portfolio Inquiry**\n**From:** ${name} (${email})\n**Subject:** ${
              subject || "General Inquiry"
            }\n**Message:**\n${message}`,
          }),
        });
      } catch (webhookErr) {
        console.warn("[Webhook] Failed to dispatch notification:", webhookErr);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been received! I will get back to you within 24 hours.",
        receivedAt: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error handling contact form submission:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again or email directly." },
      { status: 500 }
    );
  }
}
