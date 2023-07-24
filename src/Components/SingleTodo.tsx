import React, { useState, useRef, useEffect } from 'react'
import { Todo } from './models';
import { Draggable } from 'react-beautiful-dnd';

type Props = {
    index: number
    todo: Todo;
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    
}

const SingleTodo = ({todo, todos, setTodos, index}:Props) => {
    const [edit, setEdit] = useState<boolean>(false)
    const [editTodo,setEditTodo] = useState<string>(todo.todo)
    const handleDone = (id: number) => {
        setTodos(
            todos.map((todo) => 
            todo.id === id? {...todo, isDone: !todo.isDone}: todo)
        )
    }   
    const handleDelete = (id:number) => {
        setTodos(todos.filter(todo => todo.id !== id))
    }
    const handleEdit = (e:React.FormEvent, id:number) => {
        e.preventDefault()

        setTodos(todos.map(todo => 
            (todo.id === id? {...todo, todo:editTodo}: todo)
            ));
            setEdit(false)
    }
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, [edit])

    return (
        <Draggable draggableId={todo.id.toString()} index={index}>
            {(provided) => (
                <form className='flex justify-between p-2 px-4 bg-zinc-300 m-2'
                    onSubmit={(e) => handleEdit(e, todo.id)}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    ref={provided.innerRef}    
                >
                    {edit ? 
                        (<input value = {editTodo} onChange={(e) => setEditTodo(e.target.value)}
                                ref={inputRef}
                        />)
                    : 
                    todo.isDone? 
                        (<s>{todo.todo}</s>)
                    :
                        (<span>
                            {todo.todo}
                        </span>)
                    }
                    
                    <div className='flex'>
                        <div onClick={() => {
                            if(!edit && !todo.isDone){
                                setEdit(!edit)
                            }
                        }}
                            className='mx-1'
                        >Edit</div>
                        <div onClick={() => handleDone(todo.id)} className='mx-1'>Delete</div>
                        <div onClick={() => handleDelete(todo.id)} className='mx-1'>Done</div>
                    </div>
                    
                </form>
            )}
        
        </Draggable>
    )
}

export default SingleTodo