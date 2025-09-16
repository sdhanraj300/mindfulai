import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { ProfileSchema } from "@/schemas";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: {
      name: true,
      image: true,
      phone: true,
      location: true,
      bio: true,
      profession: true,
      experience: true,
      education: true,
      skills: true,
      email: true,
    },
  });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  return NextResponse.json({ profile: user });
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const json = await req.json().catch(() => null);
  const parsed = ProfileSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid data", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  // Normalize empty strings to null for optional fields where appropriate
  const data = parsed.data;
  const norm = {
    name: data.name || null,
    image: data.image || null,
    phone: data.phone || null,
    location: data.location || null,
    bio: data.bio || null,
    profession: data.profession || null,
    experience: data.experience || null,
    education: data.education || null,
    skills: data.skills ?? [],
  } as const;

  const updated = await db.user.update({
    where: { id: session.user.id },
    data: norm,
    select: {
      name: true,
      image: true,
      phone: true,
      location: true,
      bio: true,
      profession: true,
      experience: true,
      education: true,
      skills: true,
      email: true,
    },
  });

  return NextResponse.json({ profile: updated });
}
