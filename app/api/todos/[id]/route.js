import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(_, { params }) {
  const { id } = await params;
  await prisma.todo.delete({
    where: { id: Number(await id) },
  });
  return NextResponse.json({ success: true });
}
