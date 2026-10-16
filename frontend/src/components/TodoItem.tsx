import React, { useState } from "react";
import type { Todo } from "../types/todo";

interface TodoItemProps {
  todo: Todo;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  toggleFavorite: (id:number) => void;
  addDescription:(id:number, description:string) => Promise<void>;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleTodo, deleteTodo, toggleFavorite, addDescription}) => {
  const [description, setDescription] = useState("");
  return (
    <li
      key={todo.id}
      className={`flex gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200 `}
    >
      <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
          className="cursor-pointer"
      />
      <div className={`flex-col ${todo.completed ? "line-through text-gray-400" : ""}`}>
        <span className={`${todo.favorite ? "text-yellow-400" : "text-black-400"}`}>
          {todo.title} <br/>
          <i>{todo.description}</i>
        </span>
      </div>
      <div className="flex flex-col ml-auto items-center gap-2">
        <textarea 
        className="bg-white border rounded-lg"
        name="description" value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
        <button 
        className="bg-white text-black border px-4 py-2 rounded-lg transition cursor-pointer w-full"
        onClick={() => addDescription(todo.id, description).then(()=> setDescription(""))}>
          Submit
        </button>
      </div>
      <div className="flex ml-auto">
        <div className="flex right">
          <button
          onClick={() => deleteTodo(todo.id)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition cursor-pointer"
        >
          DELETE
        </button>
        <button
          onClick={() => toggleFavorite(todo.id)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition cursor-pointer"
        >
          FAVORITE
        </button>
        </div>
        
      </div>
      
    </li>
  );
};

export default TodoItem;
