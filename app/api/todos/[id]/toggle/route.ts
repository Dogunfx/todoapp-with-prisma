import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const todo = await prisma.todo.update({
    where: { id: Number(params.id) },
    data: {
      completed: {
        set: true,
        // not: true,
      },
    },
  });
  return NextResponse.json(todo);
}
