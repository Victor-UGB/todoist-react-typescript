import React, { FC, useRef } from "react";

interface Props {
    todo: string,
    todos?: string[],
    setTodo: React.Dispatch<React.SetStateAction<string>>,
    handleAdd: (e: React.FormEvent) => void

}   

export const InputField:React.FC<Props> = ({todo, setTodo, handleAdd}) => {
    const inputRef = useRef<HTMLInputElement>(null)
    return(
        <form onSubmit={(e) => {
            handleAdd(e)
            inputRef.current?.blur()
            }}>
            <input
                ref={inputRef}
                type="input"
                value = {todo}
                onChange={(e) => setTodo(e.target.value)}
                placeholder="Enter New Task"
                className="p-2 text-base"
            />
            <button type="submit">Add</button>
        </form>
    )
}