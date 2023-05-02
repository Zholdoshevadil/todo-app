import React from 'react'
import { useState } from 'react'

const TodoItem = ({ todo, todos, setTodos, deleteTodo, toglleTodo }) => {
	const [edit, setEdit] = useState(null)
	const [title, setTitle] = useState('')
	const [text, setText] = useState('')

	const editTodo = (id, title, text) => {
		setEdit(id)
		setTitle(title)
		setText(text)
	}

	const editSave = id => {
		if (todo.id === id) {
			todo.title = title
			todo.text = text
			setTodos([...todos])
		} else {
			return todo
		}
		setEdit(null)
	}

	const isMounted = React.useRef(false)

	React.useEffect(() => {
		if (isMounted.current) {
			const json = JSON.stringify(todos)
			localStorage.setItem('todos', json)
		}

		isMounted.current = true
	}, [todos])

	return (
		<div className='item' key={todo.id}>
			<input
				onClick={() => toglleTodo(todo.id)}
				className='styled-checkbox'
				id={todo.id}
				defaultChecked={todo.isCompleted ? true : false}
				// checked={todo.isCompleted ? true : false}
				type='checkbox'
				value='value1'
			/>
			<label htmlFor={todo.id} />
			<div className='item__content'>
				{edit === todo.id ? (
					<div className='form__fields'>
						<input
							value={title}
							onChange={e => setTitle(e.target.value)}
							type='text'
							name='title'
							placeholder='Title...'
							className='input-title'
						/>
						<input
							value={text}
							onChange={e => setText(e.target.value)}
							type='text'
							name='text'
							placeholder='text...'
							className='input-text'
						/>
					</div>
				) : (
					<>
						<b>{todo.title}</b>
						<p>{todo.text}</p>
					</>
				)}
				<div className='item__bottom'>
					<ul>
						<li>
							<svg style={{ width: 24, height: 24 }} viewBox='0 0 70 70'>
								<path d='M51,19h-4v-4h-4v4H27v-4h-4v4h-4c-2.209,0-4,1.791-4,4v28c0,2.209,1.791,4,4,4h32c2.209,0,4-1.791,4-4V23   C55,20.791,53.209,19,51,19z M51,51H19V31h32V51z M51,27H19v-4h32V27z' />
								<rect height='4' width='4' x='35' y='35' />
								<rect height='4' width='4' x='43' y='35' />
								<rect height='4' width='4' x='35' y='43' />
								<rect height='4' width='4' x='27' y='43' />
							</svg>
							<span>{todo.date}</span>
						</li>
						<li>
							<svg
								onClick={() => deleteTodo(todo.id)}
								viewBox='0 0 24 24'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path d='M15 2H9c-1.103 0-2 .897-2 2v2H3v2h2v12c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2V8h2V6h-4V4c0-1.103-.897-2-2-2zM9 4h6v2H9V4zm8 16H7V8h10v12z' />
							</svg>
						</li>
						<li>
							{edit === todo.id ? (
								<b onClick={() => editSave(todo.id)}>Save changes</b>
							) : (
								<svg
									onClick={() => editTodo(todo.id, todo.title, todo.text)}
									viewBox='0 0 18 18'
								>
									<g
										fill='none'
										fillRule='evenodd'
										id='Page-1'
										stroke='none'
										strokeWidth='1'
									>
										<g
											fill='#000000'
											id='Core'
											transform='translate(-213.000000, -129.000000)'
										>
											<g
												id='create'
												transform='translate(213.000000, 129.000000)'
											>
												<path
													d='M0,14.2 L0,18 L3.8,18 L14.8,6.9 L11,3.1 L0,14.2 L0,14.2 Z M17.7,4 C18.1,3.6 18.1,3 17.7,2.6 L15.4,0.3 C15,-0.1 14.4,-0.1 14,0.3 L12.2,2.1 L16,5.9 L17.7,4 L17.7,4 Z'
													id='Shape'
												/>
											</g>
										</g>
									</g>
								</svg>
							)}
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}

export default TodoItem
