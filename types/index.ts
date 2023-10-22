import {ITodo} from "@/types/todo";
import {ReactNode} from "react";

export interface ITodosProps {
    todos: ITodo[]
    isPending: boolean
    isSuccess: boolean
    error: any
}

export interface ITodoProps {
    todo: ITodo
    setId: (id: number | string) => void
    setEditTodo: any
    value: boolean
    handleCheckboxChange: any
}

export interface SelectProps {
    options: string[]
    type: string
    setFilters: () => void
}

export interface ConfirmProps {
    yes: () => void
    no: () => void
}

export interface FormProps {
    close: () => void
    todo?: ITodo | null
}

export interface ModalProps {
    title: string
    close: () => void
    children: ReactNode
}

export interface ViewProps {
    id: number | string | null
}

export interface SettingsProps {
    setFilters: any
    tags: string[]
}

export interface Filters {
    search: string
    sort: string
    completed: string
    tags: string
}