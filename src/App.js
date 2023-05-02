import { useEffect, useState, useRef } from 'react'
import TodoForm from './components/TodoForm'
import './index.scss'
import TodoList from './components/TodoList'
import { getTodosFromLS } from './utils/getTodosFromLS'

const categories = [
	{ name: 'All', category: 'all', id: 0 },
	{ name: 'Open', category: false, id: 1 },
	{ name: 'Completed', category: true, id: 2 },
]

function App() {
	const [todos, setTodos] = useState(getTodosFromLS())
	const [filter, setFilter] = useState(todos)
	const [active, setActive] = useState(0)

	useEffect(() => {
		setFilter(todos)
	}, [todos])

	const addTodoHandler = (text, title) => {
		const newTodo = {
			title,
			text,
			isCompleted: false,
			id: Date.now(),
			date: new Date().toLocaleString(),
		}
		setTodos([...todos, newTodo])
	}

	const deleteTodoHandler = id => {
		setTodos(todos.filter(todo => todo.id !== id))
	}

	const allDeleteTodoHandler = () => {
		setTodos([])
	}

	const toglleTodoHandler = id => {
		setTodos(
			todos.map(todo => {
				return todo.id === id
					? { ...todo, isCompleted: !todo.isCompleted }
					: { ...todo }
			})
		)
	}

	const sortTodoHandler = obj => {
		setActive(obj.id)
		if (obj.category === 'all') {
			setFilter(todos)
		} else {
			setFilter(todos.filter(todo => todo.isCompleted === obj.category))
		}
	}

	return (
		<div className='App'>
			<div className='top'>
				<ul className='tabs'>
					{categories.map((obj, i) => (
						<li
							onClick={() => sortTodoHandler(obj)}
							className={active === i ? 'active' : ''}
							key={obj.id}
						>
							{obj.name}
						</li>
					))}
				</ul>
				<svg
					onClick={allDeleteTodoHandler}
					height='24'
					viewBox='0 0 24 24'
					width='24'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path d='M15 2H9c-1.103 0-2 .897-2 2v2H3v2h2v12c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2V8h2V6h-4V4c0-1.103-.897-2-2-2zM9 4h6v2H9V4zm8 16H7V8h10v12z' />
				</svg>
			</div>
			<TodoList
				todos={filter}
				setTodos={setTodos}
				toglleTodo={toglleTodoHandler}
				deleteTodo={deleteTodoHandler}
			/>
			<TodoForm addTodo={addTodoHandler} />
		</div>
	)
}

export default App
