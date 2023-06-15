import React, { useEffect, useState } from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import TodoList from './TodoList'
import { useLocalStorage } from './../hooks/useLocalStorage'
import { useTodoList } from '../context/TodoListContext'

export type Todo = {
    id: number
    done: boolean
    text: string
}

export default function TodoCard() {
    const {itemsLeft, todos, addTask, deleteCompletedTasks, text, setText} = useTodoList()

    useEffect(() => {
      itemsLeft()
    }, [todos])
   
    return (
        <div className='card'>
            <div className='card__header'>
                <input 
                    className='card__input' 
                    type="text" 
                    value={text}
                    placeholder='What needs to be done?'
                    onChange={(e) => setText(e.target.value)} 
                    alt='input'
                />
                <button 
                    className='card__btn--add btn-reset'
                    onClick={() => addTask()}
                >
                    Add Task
                </button>
            </div>
            <Routes>
                <Route path='/' element={<TodoList todos={todos} category='all'/>}/>
                <Route path='/active' element={<TodoList todos={todos} category='active'/>}/>
                <Route path='/completed' element={<TodoList todos={todos} category='completed'/>}/>
            </Routes>
            <div className='card__footer'>
                <span className='card__quantity'>
                    {itemsLeft()} {itemsLeft() === 1 ? 'item' : 'items'} left
                </span>
                <div className='card__categories'>
                    <NavLink 
                        className='card__btn btn-reset'
                        to='/'
                    >
                        All
                    </NavLink>
                    <NavLink 
                        className='card__btn btn-reset'
                        to='/active'
                    >
                        Active
                    </NavLink>
                    <NavLink 
                        className='card__btn btn-reset'
                        to='/completed'
                    >
                        Completed
                    </NavLink>
                </div>
                <button 
                    className='card__btn--completed btn-reset'
                    onClick={() => deleteCompletedTasks()}
                >
                    Clear completed
                </button>
            </div>
        </div>
    )
}
