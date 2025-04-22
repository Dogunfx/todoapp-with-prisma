// app/page.tsx
import TodoList from "@/components/TodoList";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const todos = await prisma.todo.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="max-w-md mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4">Todo App</h1>
      <TodoList todos={todos} />
    </main>
  );
}
