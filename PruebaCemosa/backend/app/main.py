import json
from pathlib import Path

from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
#from typing import Optional

DATA_FILE = Path(__file__).parent / "todos.json"

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Todo(BaseModel):
    title: str
    completed: bool = False
    favorite: bool = False
    description: str = ""

class TodoFront(Todo):
    id:int

#class TodoPatch(BaseModel):
#    completed: Optional[bool] = False 
#    favorite: Optional[bool] = False
#    description: Optional[str] = ""



def load_todos() -> list[TodoFront]:
    """Load todos from the JSON file."""
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        return [TodoFront(id = id, **todo) for id, todo in enumerate(json.load(f))]



def save_todos(todos: list[TodoFront]):
    """
    Save todos to the JSON file.

    Args:
        todos (list[Todo]): List of Todo objects to save.
    """
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump([todo.model_dump(exclude="id") for todo in todos], f, indent=2)


@app.get("/todos", response_model=list[TodoFront])
def get_todos():
    """Get all ToDos."""
    return load_todos()


@app.post("/todos", response_model=Todo)
def add_todo(todo: Todo):
    """
    Add a new ToDo.

    Args:
        todo (ToDo): The ToDo to add.
    """
    todos = load_todos()
    todo = TodoFront(id = len(todos), **todo.model_dump())
    todos.append(todo)
    save_todos(todos)
    return todo

@app.patch("/todos/{id}", response_model=TodoFront)
#def toggle_todo(id: int, todo_patch: TodoPatch):
def toggle_todo(id: int, completed:bool = Body(embed=True)):
    '''
    Toggle To Do to a ToDo

    Args:
        id (int): The id of the ToDo
    '''
    todos = load_todos()
    todo = todos[id]
    #todo.completed = todo_patch.completed
    todo.completed = completed
    todos[id] = todo
    save_todos(todos)
    return todo

@app.patch("/todos/favorite/{id}", response_model=TodoFront)
#def favorite_todo(id:int, todo_patch: TodoPatch):
def favorite_todo(id: int, favorite:bool = Body(embed=True)):
    '''
    Toggle favorite to a ToDo

    Args:
        id (int): The id of the ToDo
    '''
    todos = load_todos()
    todo = todos[id]
    #todo.favorite = todo_patch.favorite
    todo.favorite = favorite
    todos[id] = todo
    save_todos(todos)
    return todo

@app.patch("/todos/description/{id}", response_model=TodoFront)
#def description_todo(id:int, todo_patch: TodoPatch):
def description_todo(id: int, description:str = Body(embed=True)):
    '''
    Add a description to a ToDo

    Args:
        id (int): The id of the ToDo
    '''
    todos = load_todos()
    todo = todos[id]
    #todo.description = todo_patch.description
    todo.description = description
    todos[id] = todo
    save_todos(todos)
    return todo

@app.delete("/todos/{id}",response_model=list[Todo])
def delete_todo(id:int):
    '''
    Delete a ToDo (must exist)

    Args:
        id (int): The id of the  ToDo
    '''
    todos = load_todos()
    if id < 0 or id >= len(todos):
        raise HTTPException(status_code=404, detail="Todo not found")
    
    del todos[id]
    save_todos(todos)
    return todos
