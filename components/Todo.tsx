'use client'

import React, {FC, useState} from 'react';
import {ITodoProps} from "@/types";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteTodo, editTodo} from "@/helpers/crud";
import Modal from "@/components/modals/Modal";
import Confirm from "@/components/modals/Confirm";
import {AiFillDelete, AiFillEdit, AiFillEye} from "react-icons/ai";

const Todo: FC<ITodoProps> = ({todo, setId, setEditTodo, value, handleCheckboxChange}) => {

    const queryClient = useQueryClient()

    const [confirm, setConfirm] = useState(false)
    const [checked, setChecked] = useState(todo.completed)

    const checkedFn = useMutation({
        mutationFn: editTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['todos']})
        },
    })

    const mutation = useMutation({
        mutationFn: deleteTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['todos']})
        },
    })

    return (
        <div className="todo" style={{backgroundColor: todo.completed ? "#22C55E" : "#E44E4EFF"}}>
            <div className="todo__content">
                <div className="flex items-center flex-col sm:flex-row">
                    <div className="flex items-center">
                        <div>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="border-gray-300 rounded h-5 w-5 accent-green-500 ml-2"
                                    checked={value}
                                    onChange={() => handleCheckboxChange(todo.id)}
                                />
                            </label>
                        </div>
                        <div className="todo__dueDate">
                            {todo.dueDate as string}
                        </div>
                    </div>
                    <div>
                        <h3 className="todo__title">{todo.title}</h3>
                        <div className="todo__tags">
                            <span>Tags:</span>
                            {todo.tags && todo?.tags.length > 0 && <ul className="flex">
                                {
                                    todo.tags.map((tag) => {
                                        return <li
                                            key={tag}
                                            className="todo__tag"
                                        >
                                            {tag},
                                        </li>
                                    })
                                }
                            </ul>}
                        </div>
                    </div>
                </div>

                <div>
                    <label className="flex items-center my-2 sm:mt-0">
                        Completed:
                        <input
                            type="checkbox"
                            className="border-gray-300 rounded h-5 w-5 accent-green-500 ml-2"
                            checked={checked}
                            onChange={e => {
                                if(todo.id){
                                    setChecked(e.target.checked)
                                    // @ts-ignore
                                    checkedFn.mutate({completed: e.target.checked, id: todo.id})
                                }
                            }}
                        />
                    </label>
                </div>
            </div>
            <div className="todo__settings">
                <div
                    className="todo__details flex items-center"
                    onClick={() => {
                        if(todo.id) {
                            setId(todo.id)
                        }
                    }}
                >
                    <span className="text-lg">
                        <AiFillEye/>
                    </span>
                    See more
                </div>
                <div
                    className="todo__details flex items-center"
                    onClick={() => {
                        setEditTodo(todo)
                    }}
                >
                    <span className="text-lg">
                        <AiFillEdit/>
                    </span>
                    Edit
                </div>
                <div
                    className="todo__details flex items-center"
                    onClick={() => {
                        setConfirm(true)
                    }}
                >
                    <span className="text-lg">
                        <AiFillDelete/>
                    </span>
                    Delete
                </div>
            </div>
            {
                confirm && todo.id && <Modal title="Are you sure you want to delete todo?" close={() => setConfirm(false)}>
                    <Confirm yes={() => mutation.mutate(todo?.id as number)} no={() => setConfirm(false)} />
                </Modal>
            }
        </div>
    );
};

export default Todo;