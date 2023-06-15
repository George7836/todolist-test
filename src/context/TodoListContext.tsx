import React, { useContext, createContext, useState } from 'react'
import { Todo } from '../components/TodoCard'
import { useLocalStorage } from '../hooks/useLocalStorage'

type TodoListContextProps = {
    todos: Todo[]
    addTask: () => void
    deleteCompletedTasks: () => void
    itemsLeft: () => number
    changeStatus: (id: number) => void
    text: string
    setText: React.Dispatch<React.SetStateAction<string>>
}

type TodoListProviderProps = {
    children: React.ReactNode
}

const TodoListContext = createContext({} as TodoListContextProps)

export function useTodoList() {
    return useContext(TodoListContext)
}

export function TodoListProvider({children}: TodoListProviderProps) {
    const [todos, setTodos] = useLocalStorage<Todo[]>(
        'todos',
        []
    )
    const [text, setText] = useState('')


    const addTask = () => {
        setTodos([...todos, {
            id: Math.random(),
            done: false,
            text: text
        }])
        setText('')
    }

    const deleteCompletedTasks = () => {
        setTodos(todos.filter((todo) => todo.done === false))
    }

    const itemsLeft = () => {
        return todos.filter((todo) => todo.done === false).length
    }

    const changeStatus = (id: number) => {
        let updatedTodos = todos.map((todo) => {
          if(todo.id === id) {
            todo.done = !todo.done
          }
          return todo
        })
        setTodos(updatedTodos)
    }

    return (
        <TodoListContext.Provider
            value={{
                todos,
                addTask,
                deleteCompletedTasks,
                itemsLeft,
                changeStatus,
                text,
                setText
            }}
        >
            {children}
        </TodoListContext.Provider>
    )
}
