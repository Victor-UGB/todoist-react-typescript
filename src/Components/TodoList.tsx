import React from 'react'
import { Todo } from './models'
import SingleTodo from './SingleTodo';
import { Droppable } from 'react-beautiful-dnd';

interface Props {
        todos: Todo[];
        setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
        completedTodos: Todo[];
        setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>
    }


const TodoList:React.FC<Props> = ({todos, setTodos, completedTodos, setCompletedTodos}:Props) => {
    
    return (
        <div>
            <div className='text-left p-4 text-xl font-extrabold text-zinc-800'>TodoList</div>
            <Droppable droppableId='TodosList'>
                {
                    (provided) => (
                        <div className='bg-cyan-400 p-4' ref={provided.innerRef} {...provided.droppableProps}>
                            <span>Active Tasks</span>
                            {todos.map((todo, index) => 
                                <SingleTodo 
                                    index = {index}
                                    todo = {todo} 
                                    key = {todo.id}
                                    todos={todos}
                                    setTodos = {setTodos}
                                />
                            )}
                            {provided.placeholder}
                        </div>
                    )
                }
                
            </Droppable>
            <Droppable droppableId='TodosRemove'>
                {
                    (provided) => (
                        <div className='bg-red-300 p-4 my-4' ref={provided.innerRef} {...provided.droppableProps}>
                            <span>Completed Tasks</span>
                            {completedTodos.map((todo, index) => 
                                <SingleTodo 
                                    index = {index}
                                    todo = {todo} 
                                    key = {todo.id}
                                    todos={completedTodos}
                                    setTodos = {setCompletedTodos}

                                />
                            )}
                            {provided.placeholder}
                        </div>
                    )
                }
                
            </Droppable>
            
        </div>
    )
    }

export default TodoList