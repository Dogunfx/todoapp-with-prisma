import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// App Router API handlers use this type for context
export async function DELETE(
  req: Request,
  context: { params: { id: string } }
) {
  const id = parseInt(context.params.id);
  await prisma.todo.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}
