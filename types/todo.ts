export interface ITodo {
    id: number | string,
    title: string,
    description: string,
    tags: string[],
    dueDate: string | Date,
    completed: boolean
}
