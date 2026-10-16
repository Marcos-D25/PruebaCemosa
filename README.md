# TODO APP

Simple Todo App where you can keep track of your tasks , loading them from **todos.json**, adding them to the current list, marking as favourite/complete and deleting selected tasks.


## Requirements
**Python**: Version 3.13.12
**Node.js**: Version 24.22.0

## Installing & Launch
1. Create virtual environment and install backend dependencies:
```bash
   cd backend
   python -m venv .venv
   source .venv/bin/activate  # On Windows use `.venv\Scripts\activate`
   pip install -r requirements.txt
   ```
2. Install the frontend dependencies:
```bash
   cd ../frontend
   npm install
   ```

3. Run the application:
```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173` to see the application.

## Features
- Mark a task as completed.
- Add a new task.
- Add a description to a current task.
- Mark a task as favourite.
- Permanently delete a task.
- Auto-load tasks from **todos.json** after each action.

## API
**GET** /todos

_Get all ToDos_

**POST** /todos

_Add a new ToDo._
_Args: todo (ToDo): The ToDo to add_

_Example: {"title": "Complete Task APP", "completed": true, "favorite": true, "description": "I have to finish and polish the app"}_

**PATCH** /todos/{id}

_Toggle To Do to a ToDo._
_Args: id (int): The id of the ToDo_

_Example: /todos/1 {"completed":true}_

**DELETE** /todos/{id}

_Delete a ToDo (must exist)._
_Args: id (int): The id of the ToDo_

_Example: /todos/1_

**PATCH** /todos/favorite/{id}

_Toggle favorite to a ToDo._
_Args: id (int): The id of the ToDo_

_Example: /todos/1 {"favorite":true}_

**PATCH** /todos/description/{id}

_Add a description to a ToDo._
_Args: id (int): The id of the ToDo_

_Example: /todos/1 {"description":"New description"}_

## App Design

- **id** is assigned to the position of the task on the list
- The tasks are saved on a local **JSON** file

## App architecture
```
PruebaCemosa/
├── README.md
├── INSTRUCTIONS.md
├── backend/
│   ├── requirements.txt
│   └── app/
│       ├── main.py        # API FastAPI (endpoints, modelos, lectura/escritura del JSON)
│       └── todos.json     # Almacenamiento de las tareas
└── frontend/
    ├── package.json
    ├── vite.config.ts
    └── src/
        ├── main.tsx       # Punto de entrada
        ├── App.tsx        # Estado y lógica principal
        ├── api/
        │   └── todo.ts    # Llamadas al backend
        ├── components/
        │   ├── TodoForm.tsx
        │   ├── TodoList.tsx
        │   └── TodoItem.tsx
        └── types/
            └── todo.d.ts  # Tipo Todo
```