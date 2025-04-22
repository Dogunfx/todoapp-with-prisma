"use client";

import { useState } from "react";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export default function TodoList({ todos: initialTodos }: { todos: Todo[] }) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [newTodo, setNewTodo] = useState("");

  async function createTodo(e: React.FormEvent) {
    e.preventDefault();
    if (!newTodo.trim()) return;
    const res = await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify({ title: newTodo }),
    });
    const data = await res.json();
    setTodos([data, ...todos]);
    setNewTodo("");
  }

  async function toggleTodo(id: number) {
    const res = await fetch(`/api/todos/${id}/toggle`, { method: "PATCH" });
    const updated = await res.json();
    setTodos(todos.map((t) => (t.id === id ? updated : t)));
  }

  async function deleteTodo(id: number) {
    await fetch(`/api/todos/${id}`, { method: "DELETE" });
    setTodos(todos.filter((t) => t.id !== id));
  }

  return (
    <>
      <form onSubmit={createTodo} className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="New todo..."
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Add
        </button>
      </form>

      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`flex justify-between items-center p-2 border ${
              todo.completed ? "bg-green-100" : ""
            }`}
          >
            <span
              onClick={() => toggleTodo(todo.id)}
              className={`cursor-pointer ${
                todo.completed ? "line-through text-gray-500" : ""
              }`}
            >
              {todo.title}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-red-500 hover:underline text-sm"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
