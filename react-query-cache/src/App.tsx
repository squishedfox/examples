import { useMutation, useQuery, useQueryClient, } from '@tanstack/react-query';

export interface Todo {
	id: number;
	name: string;
}
export interface GetTodosResponse {
	total: number;
	data: Todo[];
	page: number;
	pageSize: number;
}

const todos: GetTodosResponse = {
	total: 0,
	page: 1,
	pageSize: 10,
	data: [],
}

for (let i = 0; i < 10; ++i) {
	todos.data.push({
		id: i,
		name: `Todo ${i}`,
	});
}

const useTodos = () => useQuery(['todos'], async () => {
	return await new Promise<GetTodosResponse>((resolve, _) => {
		setTimeout(() => {
			resolve(todos);
		}, 1500);
	});
}, {
	enabled: true,
});

const useDeleteTodo = () => {
	const queryClient = useQueryClient();
	return useMutation(async (id: number) => {
		return await new Promise<Todo | undefined>((resolve, _) => {
			setTimeout(() => {
				const todo = todos.data.find((t) => t.id === id);
				resolve(todo);
			}, 1000)
		});
	}, {
		onMutate: (variables: number) => {
			const oldTodos = queryClient.getQueryData<GetTodosResponse>(['todos']);
			if (!oldTodos) {
				return
			}

			queryClient.setQueryData(['todos'], {
				...oldTodos,
				total: oldTodos.total - 1,
				data: oldTodos.data.filter((todo) => todo.id !== variables),
			});
		},
		onSuccess: () => {
			// queryClient.invalidateQueries(['todos']);
		}
	});
};

const App = () => {
	const {
		data,
		isLoading,
	} = useTodos();
	const {
		mutateAsync,
		isLoading: isMutating,
	} = useDeleteTodo();

	return (<table>
		<thead>
			<tr>
				<th>ID</th>
				<th>Name</th>
				<th>Actions</th>
			</tr>
		</thead>
		<tbody>
			{isLoading || isMutating ? (<tr><td colSpan={2}>Loading...</td></tr>) : null}
			{!isLoading && !isMutating ? data?.data.map(({ id, name }) => (<tr>
				<td>{id}</td>
				<td>{name}</td>
				<td><button onClick={() => mutateAsync(id)}>Delete</button></td>
			</tr>)) : null}
		</tbody>
	</table>);
};

export default App;
