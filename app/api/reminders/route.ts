import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Status } from "@prisma/client";
import { validateE164Phone } from "@/lib/phone-utils";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, primaryPhone, backupPhone, scheduledAt } = body;

    if (!title || !primaryPhone || !scheduledAt) {
      return NextResponse.json(
        { error: "Missing required fields: title, primaryPhone, scheduledAt" },
        { status: 400 },
      );
    }

    if (!validateE164Phone(primaryPhone)) {
      return NextResponse.json(
        { error: "Primary phone must be in E.164 format (e.g., +1234567890)" },
        { status: 400 },
      );
    }

    if (backupPhone && !validateE164Phone(backupPhone)) {
      return NextResponse.json(
        { error: "Backup phone must be in E.164 format (e.g., +1234567890)" },
        { status: 400 },
      );
    }

    // Parse scheduledAt as UTC ISO 8601 string to ensure timezone-independent storage
    // Expected format: "2026-05-16T14:30:00Z" or "2026-05-16T14:30:00+00:00"
    let scheduledDate: Date;
    try {
      scheduledDate = new Date(scheduledAt);
      if (isNaN(scheduledDate.getTime())) {
        throw new Error("Invalid date value");
      }
      // Ensure the input is a valid ISO 8601 format with timezone info
      if (
        typeof scheduledAt !== "string" ||
        (!scheduledAt.includes("Z") && !scheduledAt.includes("+"))
      ) {
        return NextResponse.json(
          {
            error:
              'scheduledAt must be in ISO 8601 format with timezone (e.g., "2026-05-16T14:30:00Z")',
          },
          { status: 400 },
        );
      }
    } catch (error) {
      return NextResponse.json(
        { error: "Invalid scheduledAt date format" },
        { status: 400 },
      );
    }

    // Validate that scheduled time is in the future
    if (scheduledDate.getTime() <= Date.now()) {
      return NextResponse.json(
        { error: "Scheduled time must be in the future" },
        { status: 400 },
      );
    }

    const reminder = await prisma.reminder.create({
      data: {
        title,
        primaryPhone,
        backupPhone: backupPhone || null,
        scheduledAt: scheduledDate,
        nextAttemptAt: scheduledDate,
        status: Status.SCHEDULED,
        attempts: 0,
        backupAttempts: 0,
      },
    });

    return NextResponse.json(reminder, { status: 201 });
  } catch (error) {
    console.error("Error creating reminder:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const reminders = await prisma.reminder.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        callLogs: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    return NextResponse.json(reminders);
  } catch (error) {
    console.error("Error fetching reminders:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
