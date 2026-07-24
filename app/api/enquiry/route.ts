import { NextResponse } from "next/server";
import { saveEnquiry, getAllEnquiries, updateEnquiryStatus } from "@/lib/enquiriesStore";

export async function GET() {
  try {
    const list = getAllEnquiries();
    return NextResponse.json({ success: true, enquiries: list });
  } catch (error: any) {
    console.error("Failed to retrieve enquiries:", error);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve enquiries from database." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    let body: any;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid request payload. Please check your form input." },
        { status: 400 }
      );
    }

    const { firstName, lastName, phone, email, service, message } = body || {};

    if (!firstName || typeof firstName !== "string" || !firstName.trim()) {
      return NextResponse.json(
        { success: false, error: "First name is required." },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== "string" || phone.trim().length < 8) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid phone number (at least 8-10 digits)." },
        { status: 400 }
      );
    }

    const fullName = `${firstName.trim()} ${lastName ? lastName.trim() : ""}`.trim();

    // Save enquiry safely
    const record = saveEnquiry({
      fullName,
      phone: phone.trim(),
      email: email?.trim() || "",
      service: service?.trim() || "General Enquiry",
      message: message?.trim() || "",
    });

    // Create pre-filled WhatsApp message to PK Financial Services WhatsApp (+91 83184 42129)
    const whatsappText = `Hello PK Financial Services, I would like to submit an enquiry.

👤 *Name:* ${fullName}
📞 *Phone:* ${phone.trim()}
✉️ *Email:* ${email?.trim() || "N/A"}
💼 *Service:* ${service?.trim() || "General Enquiry"}
💬 *Message:* ${message?.trim() || "N/A"}`;

    const whatsappUrl = `https://wa.me/918318442129?text=${encodeURIComponent(whatsappText)}`;

    console.log(`[ENQUIRY RECEIVED] Name: ${fullName} | Phone: ${phone} | Service: ${service}`);

    return NextResponse.json({
      success: true,
      message: "Enquiry received successfully!",
      whatsappUrl,
      data: record,
    });
  } catch (error: any) {
    console.error("Enquiry submission error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Something went wrong while processing your enquiry. Please try again." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    let body: any;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid request payload." },
        { status: 400 }
      );
    }

    const { phone, submittedAt, status } = body || {};

    if (!phone || !submittedAt || !status) {
      return NextResponse.json(
        { success: false, error: "Missing required enquiry update fields." },
        { status: 400 }
      );
    }

    const success = updateEnquiryStatus(phone, submittedAt, status);

    if (success) {
      return NextResponse.json({
        success: true,
        message: `Enquiry status successfully updated to '${status}'.`
      });
    } else {
      return NextResponse.json(
        { success: false, error: "Enquiry record not found." },
        { status: 404 }
      );
    }
  } catch (error: any) {
    console.error("Enquiry status update error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error while updating enquiry status." },
      { status: 500 }
    );
  }
}
