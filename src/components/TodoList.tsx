import React, { useEffect, useState } from 'react'
import { Todo } from './TodoCard'
import TodoItem from './TodoItem'

type TodoListProps = {
    todos: Todo[]
    category: string
}

export default function TodoList({todos, category}: TodoListProps) {
    const [selectedTodos, setSelectedTodos] = useState(todos)

    const filterTodos = (category: string) => {
        let filteredTodos: Todo[]
        switch(category) {
            case 'all':
                filteredTodos = todos
                break
            case 'active':
                filteredTodos = todos.filter((todo) => todo.done === false)
                break
            case 'completed':
                filteredTodos = todos.filter((todo) => todo.done === true)
                break
        }
        setSelectedTodos(filteredTodos!)
    }

    useEffect(() => {
        filterTodos(category)
    }, [todos, category])

    return (
        <ul className='card__tasks list-reset'>
                {selectedTodos.map((todo: Todo) => (
                    <TodoItem 
                        key={todo.id}
                        text={todo.text} 
                        completed={todo.done}
                        id={todo.id}
                    />
                ))}
        </ul>
    )
}
