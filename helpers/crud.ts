import {$api} from "@/api";
import {ITodo} from "@/types/todo";

export const addTodo = async (data: ITodo) => $api.post('/todos', data).then((res) => res.data)

export const deleteTodo = async (id: number) => $api.delete(`/todos/${id}`).then((res) => res.data)

export const editTodo = async (data: ITodo) => {
    return $api.patch(`/todos/${data.id}`, data).then((res) => res.data)
}
