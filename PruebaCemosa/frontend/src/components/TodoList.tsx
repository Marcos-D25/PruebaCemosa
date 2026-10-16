import React from "react";
import type { Todo } from "../types/todo";
import TodoItem from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  toggleFavorite: (id:number) => void;
  addDescription:(id:number, description:string) => Promise<void>;

}

const TodoList: React.FC<TodoListProps> = ({ todos, toggleTodo, deleteTodo, toggleFavorite, addDescription}) => {
  return (
    <div className="flex gap-30">
      <ul className="space-y-2">
        <span className="text-black-400 justify-content-center align-items-center">NO FAVORITOS</span>
        {todos.map((todo) =>  {
          if (!todo.favorite){
            return (
            <TodoItem
              todo={todo}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
              toggleFavorite = {toggleFavorite}
              addDescription= {addDescription}
            />
            )
          }
        }
        )
      }
      </ul>
      
      <ul className="space-y-2">
        <span className="text-yellow-400 justify-content-center align-items-center">FAVORITOS</span>
        {todos.map((todo) =>  {
          if (todo.favorite){
            return (
            <TodoItem
              todo={todo}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
              toggleFavorite = {toggleFavorite}
              addDescription= {addDescription}
            />
            )
          }
        }
        )
      }
      </ul>
    </div>
  );
};

export default TodoList;
