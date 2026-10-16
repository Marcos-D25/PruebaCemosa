import type { Todo } from "../types/todo";

const BASE_URL = "http://localhost:8000/todos";

export const getTodos = async (): Promise<Todo[]> => {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Error fetching todos");
  return res.json();
};

export const createTodo = async (title: string): Promise<void> => {
  await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, completed: false }),
  });
};

export const toggleTodoStatus = async (
  id: number,
  currentStatus: boolean
): Promise<Todo> => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ completed: !currentStatus }),
  });
  if (!res.ok) throw new Error("Error toggling todo status");
  return res.json();
};

export const deleteTodoJSON = async (
  id: number
): Promise<void> => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    }
  });
  if (!res.ok) throw new Error("Error deleting todo");
};

export const toggleTodoFavorite = async (
  id: number,
  currentStatus: boolean
): Promise<Todo> => {
  const res = await fetch(`${BASE_URL}/favorite/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ favorite: !currentStatus }),
  });
  if (!res.ok) throw new Error("Error toggling favorite status");
  return res.json();
};

export const addTodoDescription = async (
  id: number,
  description: string
): Promise<Todo> => {
  const res = await fetch(`${BASE_URL}/description/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ description: description }),
  });
  if (!res.ok) throw new Error("Error toggling adding description to Todo");
  return res.json();
};