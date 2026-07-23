import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "data", "reviews.json");

export async function GET() {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    // If the file doesn't exist yet, return an empty list
    return NextResponse.json([]);
  }
}

export async function POST(request: Request) {
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

    const { name, role, text, rating, category } = body || {};

    // Validate inputs
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { success: false, error: "Please enter your name." },
        { status: 400 }
      );
    }

    if (!role || typeof role !== "string" || !role.trim()) {
      return NextResponse.json(
        { success: false, error: "Please enter your role or designation." },
        { status: 400 }
      );
    }

    if (!text || typeof text !== "string" || !text.trim()) {
      return NextResponse.json(
        { success: false, error: "Please write a review." },
        { status: 400 }
      );
    }

    const numericRating = Number(rating);
    if (isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
      return NextResponse.json(
        { success: false, error: "Rating must be a number between 1 and 5." },
        { status: 400 }
      );
    }

    const activeCategory = category?.trim() || "Mutual Funds";

    // Auto-generate initials
    const init = name.trim().charAt(0).toUpperCase();

    const newReview = {
      init,
      name: name.trim(),
      role: role.trim(),
      text: text.trim(),
      category: activeCategory,
      rating: numericRating
    };

    // Load existing reviews
    let reviews = [];
    try {
      const fileData = await fs.readFile(filePath, "utf-8");
      reviews = JSON.parse(fileData);
    } catch (e) {
      // File doesn't exist or is corrupted, start with empty array
    }

    // Prepend new review
    reviews.unshift(newReview);

    // Save back to disk
    await fs.writeFile(filePath, JSON.stringify(reviews, null, 2), "utf-8");

    console.log(`[REVIEW SUBMITTED] Author: ${newReview.name} | Rating: ${newReview.rating}`);

    return NextResponse.json({
      success: true,
      message: "Review added successfully!",
      review: newReview
    });
  } catch (error: any) {
    console.error("Review submission error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to submit review. Please try again." },
      { status: 500 }
    );
  }
}
