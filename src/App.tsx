import React, { useState } from 'react';
import './App.css';
import { InputField } from './Components/InputField';
import { Todo } from './Components/models';
import TodoList from './Components/TodoList';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

let name: string;
let age: number;
let isStudent: boolean;
let hobbies: string[];
let role: [number, string];

type Person = {
  name: string
  age: number;
  dob?: number;
}

let person: Person = {
  name: "Victor",
  age: 25 
}

let lotsOfPeople: Person[];

name = "Victor";

const App: React.FC = () => {

  const [todo, setTodo] = useState<string>("")
  const [todos, setTodos] = useState<Todo[]>([])
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([])
  const handleAdd = (e:React.FormEvent) =>{
    e.preventDefault()
    if(todo){
      setTodos([...todos, {id: Date.now(), todo, isDone: false}])
      setTodo("");
    }
  };

  console.log(todo)
  console.log(todos)

  const onDragEnd = (result:DropResult) => {
    console.log(result)
    const {source, destination}  = result;

    if(!destination)  {
        console.log("no change") 
        return;
    }

    if(destination.droppableId===source.droppableId && destination.index === source.index) {
        console.log("no change") 
        return;
    }
    let add, 
    active= todos,
    complete = completedTodos;

    if (source.droppableId === "TodoList"){
      add = active[source.index];
      active.splice(source.index, 1)
    } else {
      add = complete[source.index];
      complete.splice( source.index, 1)
    }

    if (destination.droppableId === "TodoList"){
      console.log("hey look")
      active.splice(destination.index, 0, add)
    } else {
      complete.splice( destination.index, 0, add)
    }
    setTodos(active)
    setCompletedTodos(complete)

  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
    <div className="App bg-zinc-100 h-screen py-5">
      <span className='text-2xl font-bold'>Todoist</span>
      <div>
        {person.name}
        {person.age}
      </div>
      <div>
        <InputField todo={todo} setTodo ={setTodo} handleAdd = {handleAdd}/>
      </div>
      <div>
        <TodoList 
          todos={todos} 
          setTodos={setTodos}
          completedTodos = {completedTodos}
          setCompletedTodos = {setCompletedTodos}
        />
      </div>
    </div>
    </DragDropContext>
  );
}

export default App;
