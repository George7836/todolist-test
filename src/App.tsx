import React from 'react';
import './styles/main.scss';
import TodoCard from './components/TodoCard';
import { HashRouter } from 'react-router-dom';
import { TodoListProvider } from './context/TodoListContext';

function App() {
  return (
     <TodoListProvider>
        <HashRouter basename='/'>
          <div className="container">
            <h1 className='todo__title'>Todos</h1>
            <TodoCard/>
          </div>
        </HashRouter>
     </TodoListProvider>
  );
}

export default App;
