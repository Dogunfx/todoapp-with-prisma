import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  const { id } = await params;
  const todo = await prisma.todo.update({
    where: { id: Number(id) },
    data: {
      completed: {
        set: true,
        // not: true,
      },
    },
  });
  return NextResponse.json(todo);
}
