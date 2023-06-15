import { fireEvent, render, screen } from '@testing-library/react';
import TodoList from '../components/TodoList';

let todos = [
    {
        id: 1,
        done: true,
        text: 'Task1'
    },
    {
        id: 2,
        done: false,
        text: 'Task2'
    }
]

describe('TodoList component', () => {
    it('should show todos from all categories', () => {
        render(<TodoList todos={todos} category='all'/>)
        expect(screen.getByText('Task1')).toBeInTheDocument()
        expect(screen.getByText('Task2')).toBeInTheDocument()
    })

    it('should show todos from active category', () => {
        render(<TodoList todos={todos} category='active'/>)
        expect(screen.queryByText('Task1')).not.toBeInTheDocument()
        expect(screen.queryByText('Task2')).toBeInTheDocument()
    })

    it('should show todos from completed category', () => {
        render(<TodoList todos={todos} category='completed'/>)
        expect(screen.queryByText('Task1')).toBeInTheDocument()
        expect(screen.queryByText('Task2')).not.toBeInTheDocument()
    })
})