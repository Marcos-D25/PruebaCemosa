// src/App.tsx
import { useState , useEffect} from "react";
import type { Todo } from "./types/todo";
import { getTodos, createTodo, toggleTodoStatus, deleteTodoJSON, toggleTodoFavorite, addTodoDescription } from "./api/todo";
import TodoForm from "./components/TodoForm.tsx";
import TodoList from "./components/TodoList.tsx";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");

  const loadTodos = () => {
    getTodos().then((data) => {
      setTodos(data);
    });
  };

  const addTodo = () => {
    if (!title.trim()) return;
    createTodo(title).then(() => {
      setTitle("");
      loadTodos();
    })
  };

  const toggleTodo = (id: number) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    toggleTodoStatus(id, todo.completed).then(() => {
      loadTodos();
    });
    
  };

  const deleteTodo = (id: number) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    deleteTodoJSON(id).then(()=>{
      loadTodos();
    })
  };

  const toggleFavorite = (id: number) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    toggleTodoFavorite(id, todo.favorite).then(() => {
      loadTodos();
    });
    
  };

  const addDescription = (id: number, description:string) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return Promise.resolve();

    addTodoDescription(id, description).then(() => {
      loadTodos();
    });
    return Promise.resolve()
  };


  useEffect( () => {
    loadTodos()
  },[]);
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="gap-4 bg-white rounded-2xl shadow-xl p-6 w-full max-w-auto">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">ToDo List</h1>
        <TodoForm
          title={title}
          addTodo = {addTodo}
          loadTodos= {loadTodos}
          setTitle={setTitle}
        />
        <TodoList
          todos = {todos}
          toggleTodo = {toggleTodo}
          deleteTodo = {deleteTodo}
          toggleFavorite = {toggleFavorite}
          addDescription={addDescription}
        />
      </div>
    </div>
  );
}

export default App;
