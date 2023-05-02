export const getTodosFromLS = () => {
	const data = localStorage.getItem('todos')
	return data ? JSON.parse(data) : []
}
