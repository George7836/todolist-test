import { fireEvent, render, screen } from '@testing-library/react';
import TodoCard from '../components/TodoCard';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('TodoCard component', () => {
    it('typing in input works', () => {
        render(<App/>)
        userEvent.type(screen.getByRole('textbox'), 'New Task')
        expect(screen.queryByDisplayValue(/New Task/)).toBeInTheDocument()
    })

    it('should add class active by clicking on a category button', () => {
        const { container } = render(<App/>)
        const btn = container.querySelectorAll('.card__btn')
        fireEvent.click(btn[1])
        expect(btn[1]?.classList.contains('active')).toBeTruthy()
    })

    it('should add new task', () => {
        const { container } = render(<App/>)
        const addBtn = container.querySelector('.card__btn--add')
        const tasks = container.querySelector('.card__tasks')
        userEvent.type(screen.getByRole('textbox'), 'New Task')
        fireEvent.click(addBtn!)
        expect(tasks?.childNodes.length).toBe(1)
    })

    it('should delete a completed task', () => {
        const { container } = render(<App/>)
        const deleteBtn = container.querySelector('.card__btn--completed')
        const tasks = container.querySelector('.card__tasks')

        fireEvent.click(screen.getByText('New Task'))
        fireEvent.click(deleteBtn!)

        expect(tasks?.childNodes.length).toBe(0)
    })
})