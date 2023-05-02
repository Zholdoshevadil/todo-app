import React from 'react'
import TodoItem from './TodoItem'

const TodoList = ({ todos, setTodos, toglleTodo, deleteTodo }) => {
	return todos.map(todo => (
		<TodoItem
			key={todo.id}
			todo={todo}
			todos={todos}
			setTodos={setTodos}
			toglleTodo={toglleTodo}
			deleteTodo={deleteTodo}
		/>
	))
}

export default TodoList
