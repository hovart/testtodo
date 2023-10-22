'use client'

import React, {FC} from 'react';
import {FcCheckmark} from "react-icons/fc";
import {AiOutlineClose} from "react-icons/ai";
import useTodo from "@/hooks/useTodo";
import {ViewProps} from "@/types";

const View: FC<ViewProps> = ({id}) => {
    const {data, isSuccess} = useTodo(id)

    return (
        <div className="p-4">
            {isSuccess && <div>
                <div>
                    <h3 className="todo__title">{data.title}</h3>
                    <p className="todo__description">{data.description}</p>
                    <div className="todo__tags">
                        <span>Tags:</span>
                        <ul className="flex">
                            {
                                data.tags.map((tag: string) => {
                                    return <li key={tag} className="todo__tag">
                                        {tag},
                                    </li>
                                })
                            }
                        </ul>
                    </div>
                </div>
                <div className="flex mt-4 justify-between">
                    <div className="">
                        {data.dueDate}
                    </div>
                    <div className="flex items-center">
                        Completed: {data.completed ? <FcCheckmark/> : <span className="text-red-500 ml-1 text-2xl">
                    <AiOutlineClose/>
                </span>}
                    </div>
                </div>
            </div>}
        </div>
    );
};

export default View;