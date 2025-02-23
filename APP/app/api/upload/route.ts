import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";

const ProfilePicSchema = z.object({
  image: z.string().url(),
});

export const updateProfilePic = async (
  values: z.infer<typeof ProfilePicSchema>
) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const dbUser = await getUserById(user.id);
  if (!dbUser) {
    return { error: "Unauthorized" };
  }

  const validationResult = ProfilePicSchema.safeParse(values);
  if (!validationResult.success) {
    return { error: validationResult.error.errors };
  }

  await db.user.update({
    where: { id: user.id },
    data: {
      image: validationResult.data.image,
    },
  });
}

export const getProfilePic = async () => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const dbUser = await getUserById(user.id);
  if (!dbUser) {
    return { error: "Unauthorized" };
  }

  return { profilePic: dbUser.image };
}

export const GET = async (req: NextRequest) => {
  try {
    const profilePic = await getProfilePic();
    return NextResponse.json(profilePic);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export const PUT = async (req: NextRequest) => {
  try {
    const values = await req.json();
    const result = await updateProfilePic(values);
    if (result.error) {
      return NextResponse.json(result, { status: 400 });
    }
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
