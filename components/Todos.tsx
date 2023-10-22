'use client'

import React, {FC, useEffect, useState} from 'react';
import Todo from "@/components/Todo";
import {ITodo} from "@/types/todo";
import {Skeletons} from "@/components/index";
import Modal from "@/components/modals/Modal";
import View from "@/components/modals/View";
import {deleteTodo} from "@/helpers/crud";
import {useMutation, useQueryClient} from "@tanstack/react-query";
// @ts-ignore
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Form from "@/components/modals/Form";
import Confirm from "@/components/modals/Confirm";
import {ITodosProps} from "@/types";

const Todos: FC<ITodosProps> = ({todos, isPending, isSuccess, error}) => {

    const queryClient = useQueryClient()

    const [characters, updateCharacters] = useState<ITodo[]>([]);
    const [selectAll, setSelectAll] = useState<boolean>(false);
    const [selected, setSelected] = useState<(number | string)[]>([])
    const [id, setId] = useState<null | number | string>(null)
    const [editTodo, setEditTodo] = useState<null | ITodo>(null)
    const [confirm, setConfirm] = useState<boolean>(false)

    function handleOnDragEnd(result: any) {
        if (!result.destination) return;

        const items = Array.from(characters);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        updateCharacters(items);
    }

    const handleSelectAllChange = (checked: any) => {
        setSelectAll(checked);
    };

    useEffect(() => {
        if(todos){
            updateCharacters(todos)
        }
    }, [todos])

    useEffect(() => {
        let arr: (number | string)[]
        if (selectAll) {
            arr = todos.map((todo: ITodo) => todo.id)
        } else {
            arr = []
        }
        setSelected(arr)
    }, [selectAll])

    const handleCheckboxChange = (id: number) => {
        setSelected((prevSelected) => {
            if (prevSelected.includes(id)) {
                return prevSelected.filter((item) => item !== id);
            } else {
                return [...prevSelected, id];
            }
        });
    };

    const selectedFn = useMutation({
        mutationFn: deleteTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['todos']})
        },
    })

    const remove = () => {
        let index = 0;

        function deleteNextTodo() {
            if (index < selected.length) {
                selectedFn.mutate(selected[index] as number)
                index++;
                setTimeout(deleteNextTodo, 100);
            }
        }

        deleteNextTodo();
        setConfirm(false)
    }

    if (isPending) return <Skeletons/>

    if (error) return <div>Server error</div>

    return (
        <div className="todos">
            <div className="flex items-center mt-2 sm:flex-row flex-col">
                <div>
                    <label className="flex items-center">
                        Select all
                        <input
                            type="checkbox"
                            className="border-gray-300 rounded h-5 w-5 accent-green-500 ml-2"
                            checked={selectAll}
                            onChange={e => handleSelectAllChange(e.target.checked)}
                        />
                    </label>
                </div>

                <button
                    className="button ml-4 sm:mt-0 mt-2 disabled:opacity-50"
                    disabled={!selected.length}
                    onClick={() => {
                        setConfirm(true)
                    }}
                >
                    Remove
                </button>
            </div>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="characters">
                    {
                        // @ts-ignore
                        (provided) => (
                            <ul {...provided.droppableProps} ref={provided.innerRef}>
                                {isSuccess && characters.map((todo, index) => {
                                    return (
                                        <Draggable key={todo.id} draggableId={todo.id} index={index}>
                                            {
                                                // @ts-ignore
                                                (provided) => (
                                                    <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                        <Todo
                                                            todo={todo}
                                                            setId={setId}
                                                            value={selected.includes(todo.id)}
                                                            handleCheckboxChange={handleCheckboxChange}
                                                            setEditTodo={setEditTodo}
                                                        />
                                                    </li>
                                                )
                                            }
                                        </Draggable>
                                    )
                                })}
                            </ul>
                        )
                    }
                </Droppable>
            </DragDropContext>
            {id && <Modal title="Todo details" close={() => setId(null)}>
                <View id={id}/>
            </Modal>}
            {editTodo && <Modal title="Edit todo" close={() => setEditTodo(null)}>
                <Form close={() => setEditTodo(null)} todo={editTodo}/>
            </Modal>}
            {
                confirm && <Modal title="Are you sure you want to delete todo?" close={() => setConfirm(false)}>
                    <Confirm yes={remove} no={() => setConfirm(false)} />
                </Modal>
            }
        </div>
    );
};


export default Todos;