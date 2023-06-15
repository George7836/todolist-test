import { type } from 'os'
import React from 'react'
import { Todo } from './TodoCard'
import { useTodoList } from '../context/TodoListContext'

type TodoItemProps = {
  text: string
  completed: boolean
  id: number
}

export default function TodoItem({text, completed, id}: TodoItemProps) {
  const {changeStatus} = useTodoList()

  return (
    <li className='todo-item'>
      <label>
        <input 
          className='todo-item__input' 
          type="checkbox"
          checked={completed}
          onChange={() => changeStatus(id)}
        />
        <span className='todo-item__text'>{text}</span>
      </label>
    </li>
  )
}
